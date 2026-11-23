/* ===================================================================
   ExamNexus – Authentication & Profile Logic
   Uses localStorage for client-side data persistence
   =================================================================== */

// ======================== AUTH HELPERS ========================
const Auth = {
    // Get all users from storage
    getUsers() {
        return JSON.parse(localStorage.getItem('en_users') || '[]');
    },

    // Save users array
    saveUsers(users) {
        localStorage.setItem('en_users', JSON.stringify(users));
    },

    // Get current logged-in user
    getCurrentUser() {
        const email = localStorage.getItem('en_current_user');
        if (!email) return null;
        return this.getUsers().find(u => u.email === email) || null;
    },

    // Update current user data
    updateCurrentUser(updates) {
        const users = this.getUsers();
        const email = localStorage.getItem('en_current_user');
        const idx = users.findIndex(u => u.email === email);
        if (idx === -1) return null;
        users[idx] = { ...users[idx], ...updates };
        this.saveUsers(users);
        return users[idx];
    },

    // Send Real OTP via EmailJS
    async sendOTP(email, name) {
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        window.generatedOTP = otpCode; // Store globally for validation

        console.log(`[DEV MODE] Generated OTP for ${email}: ${otpCode}`);

        const serviceId = 'service_9nv7kgs';
        const templateId = 'template_ku0l3zr';
        const publicKey = 'aftciosVwKhVwoqbC';

        try {
            await emailjs.send(serviceId, templateId, {
                email: email,
                to_name: name || 'User',
                passcode: otpCode,
                reply_to: 'no-reply@examnexus.com'
            }, publicKey);
            
            console.log('Real Email Sent successfully!');
            if (typeof showToast === 'function') showToast('Verification code sent to your email!', 'info');
            return { success: true, message: 'Verification code sent!' };
        } catch (error) {
            console.error('EmailJS Error Object:', error);
            
            if (error && error.text) {
                if (typeof showToast === 'function') showToast(`EmailJS Error: ${error.text}`, 'error');
            } else {
                if (typeof showToast === 'function') showToast('Failed to send email. Check EmailJS Config/Quota', 'error');
            }
            
            return { success: false, message: 'Failed to send verification code. Check EmailJS config.' };
        }
    },

    // Sign up
    signup(name, email, password, role, branch) {
        const users = this.getUsers();
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'An account with this email already exists.' };
        }
        const user = {
            name, email, password, role, branch,
            bio: '',
            semester: '',
            joinedDate: new Date().toISOString(),
            savedItems: [],
            uploads: [],
            downloads: 0
        };
        users.push(user);
        this.saveUsers(users);
        return { success: true, user };
    },

    // Reset password
    resetPassword(email, newPassword) {
        const users = this.getUsers();
        const idx = users.findIndex(u => u.email === email);
        if (idx === -1) return { success: false, message: 'Account not found.' };
        users[idx].password = newPassword;
        this.saveUsers(users);
        return { success: true };
    },

    // Login
    login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email);
        if (!user) return { success: false, message: 'No account found with this email.' };
        if (user.password !== password) return { success: false, message: 'Incorrect password.' };
        localStorage.setItem('en_current_user', email);
        return { success: true, user };
    },

    // Logout
    logout() {
        localStorage.removeItem('en_current_user');
    },

    // Check if logged in
    isLoggedIn() {
        return !!localStorage.getItem('en_current_user');
    },

    // Delete account
    deleteAccount() {
        const email = localStorage.getItem('en_current_user');
        if (!email) return;
        let users = this.getUsers();
        users = users.filter(u => u.email !== email);
        this.saveUsers(users);
        this.logout();
    },

    // Record download
    recordDownload() {
        const user = this.getCurrentUser();
        if (!user) return false;
        const currentDownloads = parseInt(user.downloads) || 0;
        const newCount = currentDownloads + 1;
        this.updateCurrentUser({ downloads: newCount });
        
        // Immediate UI feedback if on profile page
        const downloadCountEl = document.getElementById('downloadCount');
        if (downloadCountEl) {
            downloadCountEl.textContent = newCount;
        }
        return true;
    },

    // Save an item
    saveItem(item) {
        const user = this.getCurrentUser();
        if (!user) return false;
        // Check for duplicates - more precise check including year and semester
        const exists = user.savedItems.find(
            s => s.subject === item.subject && 
                 s.type === item.type && 
                 s.branch === item.branch && 
                 String(s.semester) === String(item.semester) &&
                 (s.year === item.year || !s.year && !item.year)
        );
        if (exists) return 'already_saved';
        user.savedItems.push({
            ...item,
            savedAt: new Date().toISOString()
        });
        this.updateCurrentUser({ savedItems: user.savedItems });
        return true;
    },

    // Remove saved item
    removeSavedItem(index) {
        const user = this.getCurrentUser();
        if (!user) return false;
        user.savedItems.splice(index, 1);
        this.updateCurrentUser({ savedItems: user.savedItems });
        return true;
    },

    // Add upload
    addUpload(upload) {
        const user = this.getCurrentUser();
        if (!user) return false;
        upload.id = Date.now();
        upload.uploadedAt = new Date().toISOString();
        upload.uploaderName = user.name;
        upload.uploaderEmail = user.email;
        upload.downloads = 0;
        upload.status = 'published';
        upload.rating = (4.0 + Math.random() * 1.0).toFixed(1);
        upload.reviews = Math.floor(Math.random() * 50);
        upload.isVerified = user.role === 'faculty'; // Faculty are verified uploaders by default
        user.uploads.push(upload);
        this.updateCurrentUser({ uploads: user.uploads });
        return true;
    },

    // Remove upload
    removeUpload(id) {
        const user = this.getCurrentUser();
        if (!user) return false;
        user.uploads = user.uploads.filter(u => u.id !== id);
        this.updateCurrentUser({ uploads: user.uploads });
        return true;
    },

    // Get user initials
    getInitials(name) {
        if (!name) return '?';
        return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    },

    // Format date
    formatDate(dateStr) {
        const d = new Date(dateStr);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[d.getMonth()]} ${d.getFullYear()}`;
    },

    // Get branch display name
    getBranchName(branch) {
        const map = { btechcse: 'B.Tech CSE', bca: 'BCA', bcom: 'B.Com', mba: 'MBA', btechece: 'B.Tech ECE', bba: 'BBA' };
        return map[branch] || branch || 'Not Set';
    }
};


// ======================== NAVBAR AUTH UI ========================
function renderNavAuthUI() {
    const navAuthArea = document.getElementById('navAuthArea');
    if (!navAuthArea) return;

    const user = Auth.getCurrentUser();

    if (!user) {
        navAuthArea.innerHTML = `
            <div class="nav-auth-buttons">
                <a href="login.html" class="btn btn-outline" style="padding: 8px 18px; font-size: 0.82rem;">Login</a>
                <a href="signup.html" class="btn btn-primary" style="padding: 8px 18px; font-size: 0.82rem;">Sign Up</a>
            </div>
        `;
    } else {
        const initials = Auth.getInitials(user.name);
        navAuthArea.innerHTML = `
            <div class="nav-user-menu">
                <button class="nav-user-btn" id="navUserBtn" aria-label="User menu">
                    <span class="nav-user-avatar">${initials}</span>
                    <span>${user.name.split(' ')[0]}</span>
                    <i class="fas fa-chevron-down" style="font-size: 0.6rem; margin-left: 2px; color: var(--text-muted);"></i>
                </button>
                <div class="nav-user-dropdown" id="navUserDropdown">
                    <div class="nav-user-dropdown-header">
                        <h4>${user.name}</h4>
                        <span>${user.email}</span>
                    </div>
                    <a href="profile.html" class="nav-dropdown-item">
                        <i class="fas fa-user"></i> My Profile
                    </a>
                    <a href="profile.html#saved" class="nav-dropdown-item">
                        <i class="fas fa-bookmark"></i> Saved Items
                    </a>
                    <a href="profile.html#uploads" class="nav-dropdown-item">
                        <i class="fas fa-cloud-upload-alt"></i> My Uploads
                    </a>

                    <div class="nav-dropdown-divider"></div>
                    <button class="nav-dropdown-item logout-item" id="navLogoutBtn">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </div>
        `;

        // Toggle dropdown
        const navUserBtn = document.getElementById('navUserBtn');
        const navUserDropdown = document.getElementById('navUserDropdown');
        if (navUserBtn && navUserDropdown) {
            navUserBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                navUserDropdown.classList.toggle('active');
            });
            document.addEventListener('click', (e) => {
                if (!navUserDropdown.contains(e.target) && !navUserBtn.contains(e.target)) {
                    navUserDropdown.classList.remove('active');
                }
            });
        }

        // Logout button in nav
        const navLogoutBtn = document.getElementById('navLogoutBtn');
        if (navLogoutBtn) {
            navLogoutBtn.addEventListener('click', () => {
                Auth.logout();
                if (typeof showToast === 'function') showToast('Logged out successfully!', 'success');
                setTimeout(() => window.location.href = 'index.html', 800);
            });
        }
    }
}


// ======================== LOGIN PAGE ========================
function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    // Redirect if already logged in
    if (Auth.isLoggedIn()) {
        window.location.href = 'profile.html';
        return;
    }

    // Password toggle
    const toggleLoginPass = document.getElementById('toggleLoginPass');
    const loginPassword = document.getElementById('loginPassword');
    if (toggleLoginPass && loginPassword) {
        toggleLoginPass.addEventListener('click', () => {
            const isPassword = loginPassword.type === 'password';
            loginPassword.type = isPassword ? 'text' : 'password';
            toggleLoginPass.querySelector('i').className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
        });
    }

    // "Forgot Password" toggles
    const forgotPassLink = document.getElementById('forgotPassLink');
    const backToLoginFromForgot = document.getElementById('backToLoginFromForgot');
    const mainLoginSection = document.getElementById('mainLoginSection');
    const forgotPasswordSection = document.getElementById('forgotPasswordSection');

    if (forgotPassLink && backToLoginFromForgot) {
        forgotPassLink.addEventListener('click', (e) => {
            e.preventDefault();
            mainLoginSection.style.display = 'none';
            forgotPasswordSection.style.display = 'block';
        });

        backToLoginFromForgot.addEventListener('click', () => {
            forgotPasswordSection.style.display = 'none';
            mainLoginSection.style.display = 'block';
        });
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const statusEl = document.getElementById('loginStatus');
        const submitBtn = document.getElementById('loginSubmit');

        if (!email || !password) {
            statusEl.textContent = 'Please fill in all fields.';
            statusEl.className = 'form-status error';
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';

        setTimeout(() => {
            // Admin Global Override
            if (email === 'admin@examnexus.com' && password === 'admin123') {
                sessionStorage.setItem('en_admin_logged_in', 'true');
                statusEl.textContent = 'Admin verification successful! Redirecting...';
                statusEl.className = 'form-status success';
                if (typeof showToast === 'function') showToast('Authenticating Administrator...', 'success');
                setTimeout(() => window.location.href = 'admin.html', 1000);
                return;
            }

            const users = Auth.getUsers();
            const user = users.find(u => u.email === email);
            if (!user) {
                statusEl.textContent = 'No account found with this email.';
                statusEl.className = 'form-status error';
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
                return;
            }
            if (user.password !== password) {
                statusEl.textContent = 'Incorrect password.';
                statusEl.className = 'form-status error';
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
                return;
            }

            // Generate and send authentic OTP
            Auth.sendOTP(email, user.name);

            // Move to OTP phase
            window.authMode = 'login';
            document.getElementById('mainLoginSection').style.display = 'none';
            document.getElementById('otpSection').style.display = 'block';
            document.getElementById('verifyEmailText').textContent = email;
            document.getElementById('otpCode').focus();
            
            // Store pending creds
            window.pendingAuthEmail = email;
            window.pendingAuthPass = password;
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
        }, 800);
    });

    const otpForm = document.getElementById('otpForm');
    if (otpForm) {
        otpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const code = document.getElementById('otpCode').value.trim();
            const statusEl = document.getElementById('otpStatus');
            const submitBtn = document.getElementById('otpSubmit');

            if (code !== window.generatedOTP) {
                statusEl.textContent = 'Incorrect verification code.';
                statusEl.className = 'form-status error';
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';

            setTimeout(() => {
                if (window.authMode === 'forgot_verify') {
                    // Go to Reset Password phase
                    document.getElementById('otpSection').style.display = 'none';
                    document.getElementById('resetPasswordSection').style.display = 'block';
                    if (typeof showToast === 'function') showToast('Code verified! Set your new password.', 'success');
                    
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Verify & Continue';
                } else {
                    // Go to Login phase
                    const result = Auth.login(window.pendingAuthEmail, window.pendingAuthPass);
                    if (result.success) {
                        statusEl.textContent = 'Verification successful! Redirecting...';
                        statusEl.className = 'form-status success';
                        if (typeof showToast === 'function') showToast('Welcome back, ' + result.user.name + '!', 'success');
                        setTimeout(() => window.location.href = 'profile.html', 1000);
                    } else {
                        statusEl.textContent = result.message;
                        statusEl.className = 'form-status error';
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Verify & Continue';
                    }
                }
            }, 800);
        });

        document.getElementById('backToAuthBtn').addEventListener('click', () => {
            document.getElementById('otpSection').style.display = 'none';
            if (window.authMode === 'forgot_verify') {
                document.getElementById('forgotPasswordSection').style.display = 'block';
            } else {
                document.getElementById('mainLoginSection').style.display = 'block';
            }
        });
    }

    // "Forgot Password" form submission
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('forgotEmail').value.trim();
            const statusEl = document.getElementById('forgotStatus');
            const submitBtn = document.getElementById('forgotSubmit');

            if (!email) return;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';

            setTimeout(() => {
                const users = Auth.getUsers();
                const user = users.find(u => u.email === email);
                if (!user) {
                    statusEl.textContent = 'No account matches this email address.';
                    statusEl.className = 'form-status error';
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Reset Code';
                    return;
                }

                // Generate and send authentic OTP
                Auth.sendOTP(email, user.name);

                // Move to OTP phase
                window.authMode = 'forgot_verify';
                window.pendingAuthEmail = email; // Save for password reset
                
                document.getElementById('forgotPasswordSection').style.display = 'none';
                document.getElementById('otpSection').style.display = 'block';
                document.getElementById('verifyEmailText').textContent = email;
                document.getElementById('otpCode').focus();

                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Reset Code';
            }, 800);
        });
    }

    // Reset password form submission
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    if (resetPasswordForm) {
        setupPasswordToggle('toggleNewPass', 'newPassword');
        setupPasswordToggle('toggleConfirmNewPass', 'confirmNewPassword');

        resetPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newPass = document.getElementById('newPassword').value;
            const confirmPass = document.getElementById('confirmNewPassword').value;
            const statusEl = document.getElementById('resetStatus');
            const submitBtn = document.getElementById('resetSubmit');

            if (newPass.length < 6) {
                statusEl.textContent = 'Password must be at least 6 characters.';
                statusEl.className = 'form-status error';
                return;
            }

            if (newPass !== confirmPass) {
                statusEl.textContent = 'Passwords do not match.';
                statusEl.className = 'form-status error';
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

            setTimeout(() => {
                const res = Auth.resetPassword(window.pendingAuthEmail, newPass);
                if (res.success) {
                    statusEl.textContent = 'Password reset successfully! Redirecting to login...';
                    statusEl.className = 'form-status success';
                    if (typeof showToast === 'function') showToast('Password reset successful!', 'success');
                    
                    // Auto-login with new password
                    Auth.login(window.pendingAuthEmail, newPass);
                    setTimeout(() => window.location.href = 'profile.html', 1500);
                } else {
                    statusEl.textContent = res.message;
                    statusEl.className = 'form-status error';
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-save"></i> Save New Password';
                }
            }, 800);
        });
    }
}


// ======================== SIGNUP PAGE ========================
function initSignupPage() {
    const signupForm = document.getElementById('signupForm');
    if (!signupForm) return;

    // Redirect if already logged in
    if (Auth.isLoggedIn()) {
        window.location.href = 'profile.html';
        return;
    }

    // Show/hide branch based on role
    const roleSelect = document.getElementById('signupRole');
    const branchGroup = document.getElementById('branchGroup');
    if (roleSelect && branchGroup) {
        roleSelect.addEventListener('change', () => {
            branchGroup.style.display = roleSelect.value === 'faculty' ? 'none' : 'block';
        });
    }

    // Password toggles
    setupPasswordToggle('toggleSignupPass', 'signupPassword');
    setupPasswordToggle('toggleSignupConfirmPass', 'signupConfirmPassword');

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const role = document.getElementById('signupRole').value;
        const branch = document.getElementById('signupBranch').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;
        const statusEl = document.getElementById('signupStatus');
        const submitBtn = document.getElementById('signupSubmit');

        if (!name || !email || !role || !password || !confirmPassword) {
            statusEl.textContent = 'Please fill in all required fields.';
            statusEl.className = 'form-status error';
            return;
        }

        if (password.length < 6) {
            statusEl.textContent = 'Password must be at least 6 characters.';
            statusEl.className = 'form-status error';
            return;
        }

        if (password !== confirmPassword) {
            statusEl.textContent = 'Passwords do not match.';
            statusEl.className = 'form-status error';
            return;
        }

        if (!agreeTerms) {
            statusEl.textContent = 'You must agree to the Terms of Service.';
            statusEl.className = 'form-status error';
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';

        setTimeout(() => {
            const users = Auth.getUsers();
            if (users.find(u => u.email === email)) {
                statusEl.textContent = 'An account with this email already exists.';
                statusEl.className = 'form-status error';
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
                return;
            }

            // Generate and send authentic OTP
            Auth.sendOTP(email, name);

            document.getElementById('mainSignupSection').style.display = 'none';
            document.getElementById('otpSection').style.display = 'block';
            document.getElementById('verifyEmailText').textContent = email;
            document.getElementById('otpCode').focus();
            
            window.pendingSignup = { name, email, password, role, branch };
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
        }, 800);
    });

    const otpForm = document.getElementById('otpForm');
    if (otpForm) {
        otpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const code = document.getElementById('otpCode').value.trim();
            const statusEl = document.getElementById('otpStatus');
            const submitBtn = document.getElementById('otpSubmit');

            if (code !== window.generatedOTP) {
                statusEl.textContent = 'Incorrect verification code.';
                statusEl.className = 'form-status error';
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';

            setTimeout(() => {
                const s = window.pendingSignup;
                const result = Auth.signup(s.name, s.email, s.password, s.role, s.branch);
                
                if (result.success) {
                    Auth.login(s.email, s.password);
                    statusEl.textContent = 'Account verified & created! Redirecting...';
                    statusEl.className = 'form-status success';
                    if (typeof showToast === 'function') showToast('Welcome to ExamNexus, ' + s.name + '!', 'success');
                    setTimeout(() => window.location.href = 'profile.html', 1000);
                } else {
                    statusEl.textContent = result.message;
                    statusEl.className = 'form-status error';
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Create Account';
                }
            }, 800);
        });

        document.getElementById('backToAuthBtn').addEventListener('click', () => {
            document.getElementById('otpSection').style.display = 'none';
            document.getElementById('mainSignupSection').style.display = 'block';
        });
    }
}

function setupPasswordToggle(toggleId, inputId) {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);
    if (toggle && input) {
        toggle.addEventListener('click', () => {
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            toggle.querySelector('i').className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
        });
    }
}


// ======================== PROFILE PAGE ========================
function initProfilePage() {
    const profileSection = document.getElementById('profileSection');
    if (!profileSection) return;

    const user = Auth.getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Populate profile info
    populateProfile(user);

    // Tabs
    initProfileTabs();

    // Render tab content
    renderSavedItems();
    renderUploads();
    populateSettings(user);

    // Saved filter
    initSavedFilters();

    // Upload modal
    initUploadModal();

    // Edit profile modal
    initEditProfileModal(user);

    // Settings form
    initSettingsForm(user);

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            Auth.logout();
            if (typeof showToast === 'function') showToast('Logged out successfully!', 'success');
            setTimeout(() => window.location.href = 'index.html', 800);
        });
    }

    // Delete account
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                Auth.deleteAccount();
                if (typeof showToast === 'function') showToast('Account deleted successfully.', 'info');
                setTimeout(() => window.location.href = 'index.html', 800);
            }
        });
    }

    // Check URL hash for tab
    const hash = window.location.hash.replace('#', '');
    if (hash === 'saved' || hash === 'uploads' || hash === 'settings') {
        switchProfileTab(hash);
    }
}

function populateProfile(user) {
    const profileAvatar = document.getElementById('profileAvatar');
    const profileName = document.getElementById('profileName');
    const profileRoleBadge = document.getElementById('profileRoleBadge');
    const profileEmail = document.getElementById('profileEmail');
    const profileBranch = document.getElementById('profileBranch');
    const profileJoined = document.getElementById('profileJoined');
    const savedCount = document.getElementById('savedCount');
    const uploadCount = document.getElementById('uploadCount');
    const downloadCount = document.getElementById('downloadCount');

    if (profileAvatar) {
        profileAvatar.innerHTML = `<span style="font-size: 1.5rem; font-weight: 700;">${Auth.getInitials(user.name)}</span>`;
    }
    if (profileName) profileName.textContent = user.name;
    if (profileRoleBadge) {
        profileRoleBadge.textContent = user.role === 'faculty' ? 'Faculty' : 'Student';
        if (user.role === 'faculty') profileRoleBadge.classList.add('faculty');
    }
    if (profileEmail) profileEmail.textContent = user.email;
    if (profileBranch) profileBranch.textContent = Auth.getBranchName(user.branch);
    if (profileJoined) profileJoined.textContent = 'Joined ' + Auth.formatDate(user.joinedDate);
    if (savedCount) savedCount.textContent = (user.savedItems || []).length;
    if (uploadCount) uploadCount.textContent = (user.uploads || []).length;
    if (downloadCount) downloadCount.textContent = user.downloads || 0;
}

function initProfileTabs() {
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            switchProfileTab(tab.dataset.tab);
        });
    });
}

function switchProfileTab(tabName) {
    document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.profile-tab-content').forEach(c => c.classList.remove('active'));

    const tab = document.querySelector(`.profile-tab[data-tab="${tabName}"]`);
    const content = document.getElementById(tabName + 'Content');
    if (tab) tab.classList.add('active');
    if (content) content.classList.add('active');
}

function renderSavedItems(filter = 'all') {
    const grid = document.getElementById('savedItemsGrid');
    if (!grid) return;

    const user = Auth.getCurrentUser();
    if (!user) return;

    // We keep a reference to the original index for correct deletion
    const items = (user.savedItems || []).map((item, originalIdx) => ({...item, originalIdx})).filter(item => {
        if (filter === 'all') return true;
        return item.type === filter;
    });

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bookmark"></i>
                <h4>No saved items${filter !== 'all' ? ' in this category' : ''}</h4>
                <p>Start bookmarking PYQs, Notes, and Lab Files to see them here.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = items.map((item) => {
        const typeLabel = item.type === 'pyq' ? 'PYQ' : item.type === 'notes' ? 'Notes' : 'Lab File';
        const typeIcon = item.type === 'pyq' ? 'fa-scroll' : item.type === 'notes' ? 'fa-book-open' : 'fa-flask';
        return `
            <div class="saved-item-card">
                <span class="saved-item-type ${item.type}">
                    <i class="fas ${typeIcon}"></i> ${typeLabel}
                </span>
                <h4>${item.subject}</h4>
                <p>${Auth.getBranchName(item.branch)} • Semester ${item.semester}${item.year ? ' • ' + item.year : ''}</p>
                <div class="saved-item-actions">
                    <button class="btn btn-primary" onclick="window.handleViewPaper('${item.subject.replace(/'/g, "\\'")}', '${item.type}', '${item.id || ""}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-outline" onclick="window.handleDownload('${item.subject.replace(/'/g, "\\'")}', '${item.type}', '${item.id || ""}')" style="border-color: #3b82f6; color: #3b82f6;" aria-label="Download">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="btn btn-outline" onclick="removeSavedItem(${item.originalIdx})" style="border-color: #ec4899; color: #ec4899;">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function removeSavedItem(originalIndex) {
    Auth.removeSavedItem(originalIndex);
    // Get the current active filter to refresh correctly
    const activeFilterBtn = document.querySelector('.saved-filter-btn.active');
    const currentFilter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
    renderSavedItems(currentFilter);
    updateProfileCounts();
    if (typeof showToast === 'function') showToast('Item removed from saved.', 'info');
}

function initSavedFilters() {
    document.querySelectorAll('.saved-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.saved-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSavedItems(btn.dataset.filter);
        });
    });
}

function renderUploads() {
    const grid = document.getElementById('uploadsGrid');
    if (!grid) return;

    const user = Auth.getCurrentUser();
    if (!user) return;

    const uploads = user.uploads || [];

    if (uploads.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-cloud-upload-alt"></i>
                <h4>No uploads yet</h4>
                <p>Share your notes, PYQs, or lab files with the ExamNexus community.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = uploads.map(u => {
        const typeIcon = u.type === 'pyq' ? 'fa-scroll' : u.type === 'notes' ? 'fa-book-open' : 'fa-flask';
        const typeLabel = u.type === 'pyq' ? 'PYQ' : u.type === 'notes' ? 'Notes' : 'Lab File';
        
        // Calculate dynamic freshness
        const uploadDateStr = u.uploadedAt ? new Date(u.uploadedAt) : new Date();
        const daysAgo = Math.floor((new Date() - uploadDateStr) / (1000 * 60 * 60 * 24));
        const updatedText = daysAgo === 0 ? 'Updated today' : `Updated ${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;

        return `
            <div class="upload-item-card">
                <div class="upload-item-header">
                    <div class="upload-item-icon ${u.type}">
                        <i class="fas ${typeIcon}"></i>
                    </div>
                    <div>
                        <h4>${u.subject}</h4>
                        <div class="flex-center gap-2">
                            ${u.isVerified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>' : ''}
                            <span>${Auth.getBranchName(u.branch)} • Sem ${u.semester} • ${typeLabel}</span>
                        </div>
                    </div>
                </div>
                <p>${u.description}</p>
                <div class="qa-metrics">
                    <span class="rating-badge"><i class="fas fa-star"></i> ${u.rating || 'New'} (${u.reviews || 0} reviews)</span>
                    <span class="freshness-indicator"><i class="fas fa-clock"></i> ${updatedText}</span>
                </div>
                <div class="upload-item-meta">
                    <span><i class="fas fa-calendar"></i> ${Auth.formatDate(u.uploadedAt)}</span>
                    <span><i class="fas fa-file"></i> ${u.fileName || 'No file'}</span>
                    <span><i class="fas fa-download"></i> ${u.downloads}</span>
                </div>
                <div class="upload-item-actions">
                    <button class="btn btn-primary btn-sm" onclick="openUpdateModal(${u.id})" style="margin-right:8px;">
                        <i class="fas fa-sync-alt"></i> Update File
                    </button>
                    <button class="btn btn-outline btn-sm" onclick="removeUpload(${u.id})" style="border-color: #ec4899; color: #ec4899;">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function removeUpload(id) {
    if (confirm('Are you sure you want to delete this upload?')) {
        Auth.removeUpload(id);
        renderUploads();
        updateProfileCounts();
        if (typeof showToast === 'function') showToast('Upload deleted.', 'info');
    }
}


function updateProfileCounts() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    const savedCount = document.getElementById('savedCount');
    const uploadCount = document.getElementById('uploadCount');
    if (savedCount) savedCount.textContent = (user.savedItems || []).length;
    if (uploadCount) uploadCount.textContent = (user.uploads || []).length;
}

// ======================== UPLOAD MODAL ========================

let currentUploadMode = 'create';
let currentEditId = null;

window.openUpdateModal = function(id) {
    const user = Auth.getCurrentUser();
    if (!user) return;
    const upload = user.uploads.find(u => u.id === id);
    if (!upload) return;

    currentUploadMode = 'edit';
    currentEditId = id;

    // Pre-fill form
    document.getElementById('uploadType').value = upload.type;
    const uploadBranchEl = document.getElementById('uploadBranch');
    const uploadSemesterEl = document.getElementById('uploadSemester');
    
    if (uploadBranchEl) uploadBranchEl.value = upload.branch;
    if (uploadSemesterEl) uploadSemesterEl.value = upload.semester;

    // Trigger change event to populate subjects
    if (uploadBranchEl) {
        uploadBranchEl.dispatchEvent(new Event('change'));
    }

    // Now safely set subject since options exist
    const uploadSubjectEl = document.getElementById('uploadSubject');
    if (uploadSubjectEl) uploadSubjectEl.value = upload.subject;

    if (document.getElementById('uploadYear') && upload.year) {
        document.getElementById('uploadYear').value = upload.year;
    }
    document.getElementById('uploadDescription').value = upload.description;

    const uploadYearGroup = document.getElementById('uploadYearGroup');
    if (uploadYearGroup) {
        uploadYearGroup.style.display = upload.type === 'pyq' ? 'block' : 'none';
    }

    const modalTitle = document.querySelector('#uploadModal .modal-header h3');
    if (modalTitle) {
        modalTitle.innerHTML = '<i class="fas fa-sync-alt" style="color: var(--accent-1); margin-right: 8px;"></i> Update Resource';
    }
    const submitBtn = document.getElementById('uploadSubmitBtn');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Update File Content';
    }

    // Clear file input specifically so they HAVE to re-select
    const fileInput = document.getElementById('uploadFile');
    if (fileInput) fileInput.value = '';
    const filePreview = document.getElementById('filePreview');
    if (filePreview) filePreview.style.display = 'none';

    document.getElementById('uploadModal').classList.add('active');
};

function initUploadModal() {
    const openBtn = document.getElementById('openUploadModal');
    const modal = document.getElementById('uploadModal');
    const closeBtn = document.getElementById('closeUploadModal');
    const uploadForm = document.getElementById('uploadForm');
    const uploadType = document.getElementById('uploadType');
    const uploadYearGroup = document.getElementById('uploadYearGroup');
    const fileUploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('uploadFile');
    const filePreview = document.getElementById('filePreview');
    const fileName = document.getElementById('fileName');
    const fileRemove = document.getElementById('fileRemove');
    
    if (!modal) return;

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            currentUploadMode = 'create';
            currentEditId = null;
            if (uploadForm) uploadForm.reset();
            
            const modalTitle = document.querySelector('#uploadModal .modal-header h3');
            if (modalTitle) modalTitle.innerHTML = '<i class="fas fa-cloud-upload-alt" style="color: var(--accent-1); margin-right: 8px;"></i> Upload Resource';
            const submitBtn = document.getElementById('uploadSubmitBtn');
            if (submitBtn) submitBtn.innerHTML = '<i class="fas fa-upload"></i> Upload Resource';
            
            modal.classList.add('active');
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

    // Show year field for PYQ type
    if (uploadType && uploadYearGroup) {
        uploadType.addEventListener('change', () => {
            uploadYearGroup.style.display = uploadType.value === 'pyq' ? 'block' : 'none';
        });
    }

    // Dynamic Subject Populator
    const uploadBranch = document.getElementById('uploadBranch');
    const uploadSemester = document.getElementById('uploadSemester');
    const uploadSubject = document.getElementById('uploadSubject');

    function populateUploadSubjects() {
        if (!uploadBranch || !uploadSemester || !uploadSubject || typeof academicData === 'undefined') return;
        
        const branch = uploadBranch.value;
        const sem = uploadSemester.value;

        // Reset subjects
        uploadSubject.innerHTML = '<option value="">Select Subject</option>';

        if (branch && sem && academicData[branch] && academicData[branch].subjects[sem]) {
            const subjects = academicData[branch].subjects[sem];
            subjects.forEach(sub => {
                const opt = document.createElement('option');
                opt.value = sub;
                opt.textContent = sub;
                uploadSubject.appendChild(opt);
            });
        }
    }

    if (uploadBranch) uploadBranch.addEventListener('change', populateUploadSubjects);
    if (uploadSemester) uploadSemester.addEventListener('change', populateUploadSubjects);

    // File upload area
    if (fileUploadArea && fileInput) {
        fileUploadArea.addEventListener('click', () => fileInput.click());
        fileUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUploadArea.classList.add('drag-over');
        });
        fileUploadArea.addEventListener('dragleave', () => {
            fileUploadArea.classList.remove('drag-over');
        });
        fileUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadArea.classList.remove('drag-over');
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                showFilePreview(e.dataTransfer.files[0]);
            }
        });
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) showFilePreview(fileInput.files[0]);
        });
    }

    function showFilePreview(file) {
        if (filePreview && fileName) {
            filePreview.style.display = 'flex';
            fileName.textContent = file.name;
        }
    }

    if (fileRemove) {
        fileRemove.addEventListener('click', (e) => {
            e.stopPropagation();
            if (fileInput) fileInput.value = '';
            if (filePreview) filePreview.style.display = 'none';
        });
    }

    // Upload form submit
    if (uploadForm) {
        uploadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const type = document.getElementById('uploadType').value;
            const branch = document.getElementById('uploadBranch').value;
            const semester = document.getElementById('uploadSemester').value;
            const subject = document.getElementById('uploadSubject').value.trim();
            const year = document.getElementById('uploadYear') ? document.getElementById('uploadYear').value : '';
            const description = document.getElementById('uploadDescription').value.trim();
            const pages = document.getElementById('uploadPages') ? parseInt(document.getElementById('uploadPages').value) || 1 : 1;
            const statusEl = document.getElementById('uploadStatus');
            const submitBtn = document.getElementById('uploadSubmitBtn');

            if (!type || !branch || !semester || !subject || !description) {
                statusEl.textContent = 'Please fill in all required fields.';
                statusEl.className = 'form-status error';
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

            const processUpload = (base64Data = null) => {
                if (currentUploadMode === 'create') {
                    const upload = {
                        type, branch, semester, subject, year, description, pages,
                        fileName: fileInput && fileInput.files[0] ? fileInput.files[0].name : 'document.pdf',
                        fileData: base64Data
                    };
                    Auth.addUpload(upload);
                    if (typeof showToast === 'function') showToast('Resource uploaded successfully!', 'success');
                } else if (currentUploadMode === 'edit' && currentEditId) {
                    const user = Auth.getCurrentUser();
                    if (user) {
                        const idx = user.uploads.findIndex(u => u.id === currentEditId);
                        if (idx > -1) {
                            user.uploads[idx] = {
                                ...user.uploads[idx],
                                type, branch, semester, subject, year, description, pages,
                                uploadedAt: new Date().toISOString(),
                                fileName: fileInput && fileInput.files[0] ? fileInput.files[0].name : user.uploads[idx].fileName,
                                fileData: base64Data || user.uploads[idx].fileData
                            };
                            Auth.updateCurrentUser({ uploads: user.uploads });
                        }
                    }
                    if (typeof showToast === 'function') showToast('Resource updated successfully!', 'success');
                }
                
                // Reset form and UI
                if (modal) modal.classList.remove('active');
                uploadForm.reset();
                if (filePreview) filePreview.style.display = 'none';
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-upload"></i> Upload Resource';
                statusEl.textContent = '';
                statusEl.className = 'form-status';
                
                if (typeof renderUploads === 'function') renderUploads();
                if (typeof updateProfileCounts === 'function') updateProfileCounts();
            };

            // Read file if present, limit Base64 to 2MB to avoid localStorage issues
            if (fileInput && fileInput.files[0]) {
                const file = fileInput.files[0];
                if (file.size > 2 * 1024 * 1024) {
                    processUpload(); // Save without data if too large
                } else {
                    const reader = new FileReader();
                    reader.onload = (re) => processUpload(re.target.result);
                    reader.onerror = () => processUpload();
                    reader.readAsDataURL(file);
                }
            } else {
                processUpload();
            }
        });
    }
}

// ======================== EDIT PROFILE MODAL ========================
function initEditProfileModal(user) {
    const editBtn = document.getElementById('editProfileBtn');
    const modal = document.getElementById('editProfileModal');
    const closeBtn = document.getElementById('closeEditProfile');
    const editForm = document.getElementById('editProfileForm');

    if (!editBtn || !modal) return;

    editBtn.addEventListener('click', () => {
        // Pre-fill form
        const editName = document.getElementById('editName');
        const editBranch = document.getElementById('editBranch');
        const editBio = document.getElementById('editBio');
        if (editName) editName.value = user.name;
        if (editBranch) editBranch.value = user.branch || '';
        if (editBio) editBio.value = user.bio || '';
        modal.classList.add('active');
    });

    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('editName').value.trim();
            const branch = document.getElementById('editBranch').value;
            const bio = document.getElementById('editBio').value.trim();

            if (!name) {
                if (typeof showToast === 'function') showToast('Name cannot be empty.', 'warning');
                return;
            }

            Auth.updateCurrentUser({ name, branch, bio });
            const updatedUser = Auth.getCurrentUser();
            populateProfile(updatedUser);
            modal.classList.remove('active');
            if (typeof showToast === 'function') showToast('Profile updated successfully!', 'success');
        });
    }
}

// ======================== SETTINGS FORM ========================
function populateSettings(user) {
    const settingName = document.getElementById('settingName');
    const settingEmail = document.getElementById('settingEmail');
    const settingBranch = document.getElementById('settingBranch');
    const settingSemester = document.getElementById('settingSemester');
    const settingBio = document.getElementById('settingBio');

    if (settingName) settingName.value = user.name;
    if (settingEmail) settingEmail.value = user.email;
    if (settingBranch) settingBranch.value = user.branch || '';
    if (settingSemester) settingSemester.value = user.semester || '';
    if (settingBio) settingBio.value = user.bio || '';
}

function initSettingsForm(user) {
    const settingsForm = document.getElementById('settingsForm');
    if (!settingsForm) return;

    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('settingName').value.trim();
        const branch = document.getElementById('settingBranch').value;
        const semester = document.getElementById('settingSemester').value;
        const bio = document.getElementById('settingBio').value.trim();

        if (!name) {
            if (typeof showToast === 'function') showToast('Name cannot be empty.', 'warning');
            return;
        }

        Auth.updateCurrentUser({ name, branch, semester, bio });
        const updatedUser = Auth.getCurrentUser();
        populateProfile(updatedUser);
        if (typeof showToast === 'function') showToast('Settings saved successfully!', 'success');
    });
}


// ======================== BOOKMARK FROM OTHER PAGES ========================
// Bookmark logic is now fully handled in script.js with toggle support.
// This function is kept as a no-op for backward compatibility.
function setupGlobalBookmarks() {
    // All bookmark toggle logic is in script.js handleResourceBookmark and openPYQModal
}


// ======================== INITIALIZATION ========================
document.addEventListener('DOMContentLoaded', () => {
    // Render nav auth UI on every page
    renderNavAuthUI();

    // Page-specific init
    initLoginPage();
    initSignupPage();
    initProfilePage();

    // Setup global bookmarks after a small delay (wait for script.js)
    setTimeout(setupGlobalBookmarks, 500);
});
