/* ===================================================================
   ExamNexus – Admin Dashboard Logic
   Handles admin auth, data rendering, CSV export
   =================================================================== */

// ======================== ADMIN CREDENTIALS ========================
const ADMIN_CREDENTIALS = {
    email: 'admin@examnexus.com',
    password: 'admin123'
};

// Branch name map
const BRANCH_MAP = {
    btechcse: 'B.Tech CSE',
    bca: 'BCA',
    bcom: 'B.Com',
    mba: 'MBA',
    btechece: 'B.Tech ECE',
    bba: 'BBA'
};

// ======================== ADMIN AUTH ========================
const AdminAuth = {
    isLoggedIn() {
        return sessionStorage.getItem('en_admin_logged_in') === 'true';
    },
    login(email, password) {
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            sessionStorage.setItem('en_admin_logged_in', 'true');
            return { success: true };
        }
        return { success: false, message: 'Invalid admin credentials.' };
    },
    logout() {
        sessionStorage.removeItem('en_admin_logged_in');
    }
};

// ======================== GET USER DATA ========================
function getAllUsers() {
    try {
        return JSON.parse(localStorage.getItem('en_users') || '[]');
    } catch {
        return [];
    }
}

function getBranchName(branch) {
    return BRANCH_MAP[branch] || branch || 'Not Set';
}

function formatJoinDate(dateStr) {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function formatRelativeTime(dateStr) {
    if (!dateStr) return 'Unknown';
    const now = new Date();
    const d = new Date(dateStr);
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatJoinDate(dateStr);
}

// ======================== INITIALIZATION ========================
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = document.getElementById('adminDashboard');

    if (!dashboard) return;

    // Check if already logged in
    if (AdminAuth.isLoggedIn()) {
        showDashboard();
    } else {
        window.location.href = 'login.html';
        return;
    }

    // Sidebar navigation
    initSidebar();

    // Logout
    const logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            AdminAuth.logout();
            
            // Optionally wipe primary application user state concurrently
            if (typeof Auth !== 'undefined' && Auth.logout) Auth.logout();

            if (typeof showToast === 'function') showToast('Securely logged out. Redirecting...', 'success');
            setTimeout(() => window.location.href = 'login.html', 800);
        });
    }

    // Download buttons
    const downloadAllBtn = document.getElementById('downloadAllUsersBtn');
    if (downloadAllBtn) {
        downloadAllBtn.addEventListener('click', () => downloadCSV('all'));
    }

    const downloadBranchBtn = document.getElementById('downloadBranchBtn');
    if (downloadBranchBtn) {
        downloadBranchBtn.addEventListener('click', () => {
            const activeBranch = document.querySelector('.branch-tab.active');
            if (activeBranch) {
                downloadCSV(activeBranch.dataset.branch);
            }
        });
    }

    // User search
    const searchInput = document.getElementById('userSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', () => renderAllUsersTable(searchInput.value.trim().toLowerCase()));
    }
});

// ======================== SHOW/HIDE SECTIONS ========================

function showDashboard() {
    const loginOverlay = document.getElementById('adminLoginOverlay');
    const dashboard = document.getElementById('adminDashboard');
    if (loginOverlay) loginOverlay.style.display = 'none';
    if (dashboard) dashboard.style.display = 'flex';

    // Set current date
    const dateEl = document.getElementById('currentDate');
    if (dateEl) {
        const now = new Date();
        dateEl.textContent = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    // Render dashboard data
    renderOverview();
    renderAllUsersTable();
    renderBranchTabs();
    renderActivityFeed();
}

// ======================== SIDEBAR NAVIGATION ========================

// ======================== SIDEBAR NAVIGATION ========================
function initSidebar() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            switchSection(link.dataset.section);
        });
    });

    // Sidebar toggle (mobile)
    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('adminSidebar');
    if (toggleBtn && sidebar) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.id = 'sidebarOverlay';
        document.body.appendChild(overlay);

        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }
}

function switchSection(sectionName) {
    // Update nav
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    const activeLink = document.querySelector(`.sidebar-link[data-section="${sectionName}"]`);
    if (activeLink) activeLink.classList.add('active');

    // Update sections
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    const section = document.getElementById('section' + capitalize(sectionName));
    if (section) section.classList.add('active');

    // Update title
    const titles = {
        overview: 'Dashboard Overview',
        users: 'All Users',
        branches: 'Users by Branch',
        activity: 'Recent Activity'
    };

    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) pageTitle.textContent = titles[sectionName] || 'Admin Dashboard';

    // Close mobile sidebar
    const sidebar = document.getElementById('adminSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ======================== RENDER OVERVIEW ========================
function renderOverview() {
    const users = getAllUsers();

    const totalUsers = users.length;
    const students = users.filter(u => u.role === 'student');
    const faculty = users.filter(u => u.role === 'faculty');
    const totalUploads = users.reduce((acc, u) => acc + (u.uploads ? u.uploads.length : 0), 0);
    const totalBookmarks = users.reduce((acc, u) => acc + (u.savedItems ? u.savedItems.length : 0), 0);

    // Animate stats
    animateStatValue('statTotalUsers', totalUsers);
    animateStatValue('statTotalStudents', students.length);
    animateStatValue('statTotalFaculty', faculty.length);
    animateStatValue('statTotalUploads', totalUploads);
    animateStatValue('statTotalBookmarks', totalBookmarks);

    // Branch chart
    renderBranchChart(users);

    // Recent users table
    renderRecentUsers(users);
}

function animateStatValue(elementId, target) {
    const el = document.getElementById(elementId);
    if (!el) return;

    let current = 0;
    const duration = 1200;
    const step = target / (duration / 16);

    if (target === 0) { el.textContent = '0'; return; }

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

function renderBranchChart(users) {
    const chart = document.getElementById('branchChart');
    if (!chart) return;

    // Count users per branch
    const branchCounts = {};
    Object.keys(BRANCH_MAP).forEach(key => { branchCounts[key] = 0; });
    let noBranch = 0;

    users.forEach(u => {
        if (u.branch && BRANCH_MAP[u.branch]) {
            branchCounts[u.branch]++;
        } else {
            noBranch++;
        }
    });

    const maxCount = Math.max(...Object.values(branchCounts), noBranch, 1);

    let html = '';
    for (const [key, count] of Object.entries(branchCounts)) {
        const percent = (count / maxCount) * 100;
        html += `
            <div class="chart-bar-row">
                <span class="chart-bar-label">${BRANCH_MAP[key]}</span>
                <div class="chart-bar-track">
                    <div class="chart-bar-fill ${key}" style="width: ${Math.max(percent, 3)}%">${count}</div>
                </div>
                <span class="chart-bar-count">${count} user${count !== 1 ? 's' : ''}</span>
            </div>
        `;
    }

    if (noBranch > 0) {
        const percent = (noBranch / maxCount) * 100;
        html += `
            <div class="chart-bar-row">
                <span class="chart-bar-label">No Branch</span>
                <div class="chart-bar-track">
                    <div class="chart-bar-fill nobranch" style="width: ${Math.max(percent, 3)}%">${noBranch}</div>
                </div>
                <span class="chart-bar-count">${noBranch} user${noBranch !== 1 ? 's' : ''}</span>
            </div>
        `;
    }

    if (users.length === 0) {
        html = '<div class="admin-empty"><i class="fas fa-chart-bar"></i><h4>No users registered yet</h4><p>User data will appear here once students sign up.</p></div>';
    }

    chart.innerHTML = html;
}

function renderRecentUsers(users) {
    const table = document.getElementById('recentUsersTable');
    if (!table) return;

    // Sort by join date (most recent first)
    const sorted = [...users].sort((a, b) => new Date(b.joinedDate) - new Date(a.joinedDate));
    const recent = sorted.slice(0, 5);

    if (recent.length === 0) {
        table.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:40px; color:#5a6a7e;">No users found</td></tr>';
        return;
    }

    table.innerHTML = recent.map(u => `
        <tr>
            <td style="color: #111827; font-weight: 700;">${escapeHtml(u.name)}</td>
            <td>${escapeHtml(u.email)}</td>
            <td><span class="role-badge ${u.role}">${u.role === 'faculty' ? '<i class="fas fa-chalkboard-teacher"></i>' : '<i class="fas fa-user-graduate"></i>'} ${capitalize(u.role || 'student')}</span></td>
            <td><span class="branch-badge">${getBranchName(u.branch)}</span></td>
            <td>${formatRelativeTime(u.joinedDate)}</td>
        </tr>
    `).join('');
}

// ======================== ALL USERS TABLE ========================
function renderAllUsersTable(searchQuery = '') {
    const table = document.getElementById('allUsersTable');
    const footer = document.getElementById('allUsersFooter');
    if (!table) return;

    let users = getAllUsers();

    // Filter by search
    if (searchQuery) {
        users = users.filter(u =>
            (u.name && u.name.toLowerCase().includes(searchQuery)) ||
            (u.email && u.email.toLowerCase().includes(searchQuery)) ||
            (u.branch && getBranchName(u.branch).toLowerCase().includes(searchQuery))
        );
    }

    // Sort by join date
    users.sort((a, b) => new Date(b.joinedDate) - new Date(a.joinedDate));

    if (users.length === 0) {
        table.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:50px; color:#5a6a7e;">
            <i class="fas fa-users" style="display:block; font-size:1.5rem; margin-bottom:10px; color:#3d4a5c;"></i>
            ${searchQuery ? 'No users match your search.' : 'No registered users found.'}
        </td></tr>`;
        if (footer) footer.innerHTML = '';
        return;
    }

    table.innerHTML = users.map((u, i) => `
        <tr>
            <td>${i + 1}</td>
            <td style="color: #111827; font-weight: 700;">${escapeHtml(u.name)}</td>
            <td>${escapeHtml(u.email)}</td>
            <td><span class="role-badge ${u.role}">${capitalize(u.role || 'student')}</span></td>
            <td><span class="branch-badge">${getBranchName(u.branch)}</span></td>
            <td>${u.semester || '—'}</td>
            <td>${(u.uploads || []).length}</td>
            <td>${(u.savedItems || []).length}</td>
            <td>${formatJoinDate(u.joinedDate)}</td>
        </tr>
    `).join('');

    if (footer) {
        footer.innerHTML = `Showing ${users.length} user${users.length !== 1 ? 's' : ''} total`;
    }
}

// ======================== BRANCH TABS ========================
function renderBranchTabs() {
    const tabsContainer = document.getElementById('branchTabs');
    if (!tabsContainer) return;

    const users = getAllUsers();

    let html = '';
    for (const [key, name] of Object.entries(BRANCH_MAP)) {
        const count = users.filter(u => u.branch === key).length;
        html += `<button class="branch-tab" data-branch="${key}" onclick="selectBranchTab('${key}')">${name}<span class="tab-count">${count}</span></button>`;
    }

    tabsContainer.innerHTML = html;
}

function selectBranchTab(branchKey) {
    // Update tab UI
    document.querySelectorAll('.branch-tab').forEach(t => t.classList.remove('active'));
    const activeTab = document.querySelector(`.branch-tab[data-branch="${branchKey}"]`);
    if (activeTab) activeTab.classList.add('active');

    // Update title
    const title = document.getElementById('branchCardTitle');
    if (title) title.innerHTML = `<i class="fas fa-code-branch"></i> ${getBranchName(branchKey)} Students`;

    // Show download button
    const downloadBtn = document.getElementById('downloadBranchBtn');
    if (downloadBtn) downloadBtn.style.display = 'inline-flex';

    // Get users for this branch (students only)
    const users = getAllUsers().filter(u => u.branch === branchKey);
    users.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    const table = document.getElementById('branchUsersTable');
    const footer = document.getElementById('branchUsersFooter');
    if (!table) return;

    if (users.length === 0) {
        table.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:50px; color:#5a6a7e;">
            <i class="fas fa-user-slash" style="display:block; font-size:1.5rem; margin-bottom:10px; color:#3d4a5c;"></i>
            No students registered in ${getBranchName(branchKey)}.
        </td></tr>`;
        if (footer) footer.innerHTML = '';
        return;
    }

    table.innerHTML = users.map((u, i) => `
        <tr>
            <td>${i + 1}</td>
            <td style="color: #111827; font-weight: 700;">${escapeHtml(u.name)}</td>
            <td>${escapeHtml(u.email)}</td>
            <td>${u.semester || '—'}</td>
            <td>${(u.uploads || []).length}</td>
            <td>${(u.savedItems || []).length}</td>
            <td>${formatJoinDate(u.joinedDate)}</td>
        </tr>
    `).join('');

    if (footer) {
        footer.innerHTML = `Total: ${users.length} student${users.length !== 1 ? 's' : ''} in ${getBranchName(branchKey)}`;
    }
}

// ======================== ACTIVITY FEED ========================
function renderActivityFeed() {
    const feed = document.getElementById('activityFeed');
    if (!feed) return;

    const users = getAllUsers();
    const activities = [];

    // Generate signup activities
    users.forEach(u => {
        activities.push({
            type: 'signup',
            icon: 'fas fa-user-plus',
            title: `${u.name} joined ExamNexus`,
            desc: `Registered as ${capitalize(u.role || 'student')} — ${getBranchName(u.branch)}`,
            time: u.joinedDate
        });

        // Generate upload activities
        if (u.uploads && u.uploads.length > 0) {
            u.uploads.forEach(upload => {
                activities.push({
                    type: 'upload',
                    icon: 'fas fa-cloud-upload-alt',
                    title: `${u.name} uploaded a resource`,
                    desc: `${upload.subject} — ${getBranchName(upload.branch)} Sem ${upload.semester}`,
                    time: upload.uploadedAt || u.joinedDate
                });
            });
        }

        // Generate bookmark activities
        if (u.savedItems && u.savedItems.length > 0) {
            u.savedItems.slice(0, 2).forEach(item => {
                activities.push({
                    type: 'bookmark',
                    icon: 'fas fa-bookmark',
                    title: `${u.name} bookmarked ${item.subject}`,
                    desc: `${capitalize(item.type || 'resource')} — ${getBranchName(item.branch)} Sem ${item.semester}`,
                    time: item.savedAt || u.joinedDate
                });
            });
        }
    });

    // Sort by most recent
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    const recent = activities.slice(0, 20);

    if (recent.length === 0) {
        feed.innerHTML = '<div class="admin-empty"><i class="fas fa-clock"></i><h4>No activity yet</h4><p>User activity will appear here.</p></div>';
        return;
    }

    feed.innerHTML = recent.map(a => `
        <div class="activity-item">
            <div class="activity-icon ${a.type}">
                <i class="${a.icon}"></i>
            </div>
            <div class="activity-info">
                <h4>${escapeHtml(a.title)}</h4>
                <p>${escapeHtml(a.desc)}</p>
            </div>
            <span class="activity-time">${formatRelativeTime(a.time)}</span>
        </div>
    `).join('');
}

// ======================== CSV DOWNLOAD ========================
function downloadCSV(branchKey) {
    let users = getAllUsers();
    let filename = 'examnexus_all_users.csv';

    if (branchKey !== 'all') {
        users = users.filter(u => u.branch === branchKey);
        filename = `examnexus_${branchKey}_students.csv`;
    }

    if (users.length === 0) {
        if (typeof showToast === 'function') showToast('No users to download.', 'warning');
        return;
    }

    // Build CSV
    const headers = ['Name', 'Email', 'Role', 'Branch', 'Semester', 'Uploads', 'Bookmarks', 'Joined Date'];
    const rows = users.map(u => [
        u.name || '',
        u.email || '',
        capitalize(u.role || 'student'),
        getBranchName(u.branch),
        u.semester || '',
        (u.uploads || []).length,
        (u.savedItems || []).length,
        formatJoinDate(u.joinedDate)
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
        csvContent += row.map(cell => {
            // Escape quotes and wrap in quotes if needed
            const str = String(cell);
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                return '"' + str.replace(/"/g, '""') + '"';
            }
            return str;
        }).join(',') + '\n';
    });

    // Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (typeof showToast === 'function') showToast(`Downloaded ${users.length} user records.`, 'success');
}

// ======================== UTILITY ========================
function escapeHtml(text) {
    if (!text) return '';
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}
