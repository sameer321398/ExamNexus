/* ===================================================================
   ExamNexus – Multi-Page JavaScript
   =================================================================== */

// ======================== DATA ========================
const academicData = {
    btechcse: {
        name: 'B.Tech CSE', fullName: 'Bachelor of Technology – Computer Science & Engineering', semesters: 8,
        subjects: {
            1: ['Engineering Mathematics-I', 'Engineering Physics', 'Engineering Chemistry', 'Basic Electrical Engineering', 'Programming in C'],
            2: ['Engineering Mathematics-II', 'Data Structures', 'Digital Logic Design', 'Engineering Mechanics', 'Environmental Science'],
            3: ['Discrete Mathematics', 'OOP with Java', 'Computer Organization', 'DBMS', 'Probability & Statistics'],
            4: ['Operating Systems', 'Software Engineering', 'Computer Networks', 'Design & Analysis of Algorithms', 'Theory of Computation'],
            5: ['Compiler Design', 'Machine Learning', 'Web Development', 'Computer Graphics', 'Elective-I'],
            6: ['Artificial Intelligence', 'Cloud Computing', 'Information Security', 'Big Data Analytics', 'Elective-II'],
            7: ['Deep Learning', 'IoT', 'DevOps', 'Blockchain Technology', 'Elective-III'],
            8: ['Major Project', 'Seminar', 'Industrial Training', 'Elective-IV', 'Elective-V']
        }
    },
    bca: {
        name: 'BCA', fullName: 'Bachelor of Computer Applications', semesters: 8,
        subjects: {
            1: ['Fundamentals of Computers', 'Programming in C', 'Fundamental Mathematics', 'Functional English-I', 'Indian Constitution & Polity'],
            2: ['Data Structures using C', 'Object Oriented Concepts using Java', 'Discrete Mathematical Structures', 'Functional English-II', 'Environment Protection, Sustainable Development & Living'],
            3: ['Database Management Systems', 'Data Communication & Networks', 'Operating Systems Concepts', 'German-I', 'Environmental Studies'],
            4: ['Web Technologies', 'Computer Multimedia and Animation', 'Software Engineering', 'Fundamental of E-Commerce', 'German-II'],
            5: ['Python Programming', 'Cloud Computing', 'Analysis and Design Algorithm', 'Computer Architecture & Organization', 'Software Project Management', 'Unix & Linux Programming', 'Aptitude and Reasoning'],
            6: ['Artificial Intelligence and Applications', 'Cyber Law and Cyber Security', 'Software Testing', 'Automata Theory', 'Internet of Things (IoT)'],
            7: ['Machine Learning', 'Compiler Design', 'Advanced Computer Networks', 'Optimization Methods and Applications', 'Research Methodology'],
            8: ['Big Data & Analytics', 'Advanced Database Management System', 'Advanced Web Technologies', 'Advanced Java Programming']
        }
    },
    bcom: {
        name: 'B.Com', fullName: 'Bachelor of Commerce', semesters: 6,
        subjects: {
            1: ['Financial Accounting-I', 'Business Organization', 'Business Economics-I', 'English-I', 'Computer Applications'],
            2: ['Financial Accounting-II', 'Business Law', 'Business Economics-II', 'English-II', 'Environmental Studies'],
            3: ['Corporate Accounting', 'Cost Accounting', 'Money & Banking', 'Business Mathematics', 'Hindi/MIL'],
            4: ['Income Tax', 'Auditing', 'Company Law', 'Business Statistics', 'Financial Markets'],
            5: ['Management Accounting', 'GST & Indirect Taxes', 'E-Commerce', 'Marketing', 'Elective-I'],
            6: ['International Trade', 'Financial Management', 'Entrepreneurship', 'Project Work', 'Elective-II']
        }
    },
    mba: {
        name: 'MBA', fullName: 'Master of Business Administration', semesters: 4,
        subjects: {
            1: ['Principles of Management', 'Organizational Behavior', 'Managerial Economics', 'Financial Accounting & Analysis', 'Business Communication', 'Quantitative Techniques for Management'],
            2: ['Marketing Management', 'Financial Management', 'Human Resource Management', 'Operations Management', 'Business Research Methods', 'Management Information Systems'],
            3: ['Strategic Management', 'International Business', 'Entrepreneurship Development', 'Business Analytics', 'Elective-I', 'Elective-II'],
            4: ['Corporate Governance & Ethics', 'Project Management', 'Summer Internship Project', 'Elective-III', 'Elective-IV']
        }
    },
    btechece: {
        name: 'B.Tech ECE', fullName: 'Bachelor of Technology – Electronics & Communication Engineering', semesters: 8,
        subjects: {
            1: ['Engineering Mathematics-I', 'Engineering Physics', 'Engineering Chemistry', 'Basic Electrical Engineering', 'Programming in C'],
            2: ['Engineering Mathematics-II', 'Electronic Devices & Circuits', 'Digital Electronics', 'Network Analysis', 'Environmental Science'],
            3: ['Signals & Systems', 'Analog Communication', 'Electromagnetic Theory', 'Electronic Instruments & Measurements', 'Probability & Statistics'],
            4: ['Digital Communication', 'Microprocessors & Microcontrollers', 'Control Systems', 'Linear Integrated Circuits', 'Digital Signal Processing'],
            5: ['VLSI Design', 'Antenna & Wave Propagation', 'Embedded Systems', 'Optical Communication', 'Elective-I'],
            6: ['Wireless Communication', 'Satellite Communication', 'Image Processing', 'Radar Engineering', 'Elective-II'],
            7: ['Nanoelectronics', 'Biomedical Instrumentation', 'Robotics', 'IoT for ECE', 'Elective-III'],
            8: ['Major Project', 'Seminar', 'Industrial Training', 'Elective-IV', 'Elective-V']
        }
    },
    bba: {
        name: 'BBA', fullName: 'Bachelor of Business Administration', semesters: 6,
        subjects: {
            1: ['Principles of Management', 'Business Economics', 'Financial Accounting', 'English-I', 'Computer Applications'],
            2: ['Organizational Behavior', 'Business Mathematics', 'Cost Accounting', 'English-II', 'Environmental Studies'],
            3: ['Marketing Management', 'HR Management', 'Business Law', 'Quantitative Techniques', 'Indian Economy'],
            4: ['Financial Management', 'Operations Management', 'Entrepreneurship', 'Business Communication', 'Statistics'],
            5: ['Strategic Management', 'International Business', 'Consumer Behavior', 'Business Analytics', 'Elective-I'],
            6: ['Corporate Governance', 'Supply Chain Management', 'Digital Marketing', 'Project Report', 'Elective-II']
        }
    }
};

// Generate PYQ data
function generatePYQs() {
    const pyqs = [];
    const years = [2025, 2024, 2023, 2022, 2021];
    const examTypes = ['End Semester', 'Mid Semester', 'Supplementary'];
    const sampleQuestions = [
        "Explain the core concepts and architecture related to this subject.",
        "Compare and contrast the different methodologies used in modern implementations.",
        "Draw a neat diagram and explain the internal working mechanism.",
        "Solve the following numerical problem based on recent university patterns.",
        "Discuss the future scope and recent advancements in this field.",
        "Write a detailed short note on the historical development and key milestones.",
        "What are the major challenges faced during the practical application of these theories?",
        "Define the mathematical foundations and prove the relevant theorems."
    ];
    let id = 1;
    for (const [branch, data] of Object.entries(academicData)) {
        for (let sem = 1; sem <= data.semesters; sem++) {
            for (const subject of data.subjects[sem]) {
                for (const year of years.slice(0, 2 + Math.floor(Math.random() * 3))) {
                    const rating = (3.5 + Math.random() * 1.5).toFixed(1);
                    const reviews = Math.floor(Math.random() * 150) + 5;
                    const isVerified = Math.random() > 0.3;
                    const updateDays = Math.floor(Math.random() * 180);
                    const updatedText = updateDays === 0 ? 'Updated today' : `Updated ${updateDays} day${updateDays > 1 ? 's' : ''} ago`;
                    
                    // Add 5-8 random questions
                    const questions = [];
                    const qCount = 5 + Math.floor(Math.random() * 4);
                    const shuffled = [...sampleQuestions].sort(() => 0.5 - Math.random());
                    for(let i=0; i<qCount; i++) questions.push(shuffled[i % shuffled.length]);

                    pyqs.push({
                        id: id++, branch, semester: sem, subject, year,
                        examType: examTypes[Math.floor(Math.random() * examTypes.length)],
                        pages: 4 + Math.floor(Math.random() * 8),
                        downloads: 50 + Math.floor(Math.random() * 500),
                        rating, reviews, isVerified, updatedText,
                        questions: questions
                    });
                }
            }
        }
    }
    return pyqs;
}

function generateResources(type) {
    const resources = [];
    let id = 1;
    const sampleTopics = [
        "Fundamental principles and theoretical background.",
        "Detailed analysis of key algorithms and structures.",
        "Case studies and real-world application scenarios.",
        "Comprehensive summary of the entire syllabus.",
        "Important questions and frequently asked topics.",
        "Step-by-step guide for practical implementation.",
        "Expert tips and shortcuts for examination success.",
        "Advanced concepts for higher-level understanding."
    ];
    for (const [branch, data] of Object.entries(academicData)) {
        for (let sem = 1; sem <= data.semesters; sem++) {
            for (const subject of data.subjects[sem]) {
                const rating = (3.8 + Math.random() * 1.2).toFixed(1);
                const reviews = Math.floor(Math.random() * 200) + 10;
                const authorData = ['Faculty Notes', 'Student Contribution', 'Compiled Notes'][Math.floor(Math.random() * 3)];
                const isVerified = authorData === 'Faculty Notes' ? true : Math.random() > 0.4;
                const updateDays = Math.floor(Math.random() * 180);
                const updatedText = updateDays === 0 ? 'Updated today' : `Updated ${updateDays} day${updateDays > 1 ? 's' : ''} ago`;
                
                const topics = [];
                const tCount = 4 + Math.floor(Math.random() * 3);
                const shuffled = [...sampleTopics].sort(() => 0.5 - Math.random());
                for(let i=0; i<tCount; i++) topics.push(shuffled[i % shuffled.length]);

                resources.push({
                    id: id++, type, branch, semester: sem, subject,
                    description: type === 'notes'
                        ? `Complete ${subject} notes covering full syllabus with diagrams and examples.`
                        : `Lab manual for ${subject} with experiments, code, and viva questions.`,
                    author: authorData,
                    pages: 15 + Math.floor(Math.random() * 50),
                    downloads: 30 + Math.floor(Math.random() * 300),
                    rating, reviews, isVerified, updatedText,
                    topics: topics
                });
            }
        }
    }
    return resources;
}

const allPYQs = generatePYQs();
const allNotes = generateResources('notes');
const allLabFiles = generateResources('labfiles');

// Merge user uploads from localStorage into global pools
function mergeUserUploads() {
    try {
        const usersData = JSON.parse(localStorage.getItem('en_users') || '[]');
        usersData.forEach(user => {
            if (user.uploads && Array.isArray(user.uploads)) {
                user.uploads.forEach(upload => {
                    // Skip if item already merged (prevent duplicates on re-calls)
                    const targetPool = upload.type === 'pyq' ? allPYQs : 
                                     upload.type === 'notes' ? allNotes : allLabFiles;
                    if (targetPool.some(item => item.id === 'u_' + upload.id)) return;

                    const uploadDateStr = upload.uploadedAt ? new Date(upload.uploadedAt) : new Date();
                    const daysAgo = Math.floor((new Date() - uploadDateStr) / (1000 * 60 * 60 * 24));
                    const updatedText = daysAgo === 0 ? 'Updated today' : `Updated ${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;

                    const uData = {
                        id: 'u_' + upload.id,
                        branch: upload.branch.toLowerCase(),
                        semester: parseInt(upload.semester),
                        subject: upload.subject,
                        year: upload.year || new Date().getFullYear(),
                        examType: 'Community Upload',
                        pages: upload.pages || Math.floor(Math.random() * 20) + 5,
                        downloads: upload.downloads || 0,
                        rating: upload.rating || (4.0 + Math.random() * 1.0).toFixed(1),
                        reviews: upload.reviews || 0,
                        isVerified: upload.isVerified || false,
                        updatedText: updatedText,
                        description: upload.description,
                        author: upload.uploaderName || user.name,
                        type: upload.type === 'labfiles' ? 'lab' : upload.type,
                        fileData: upload.fileData,
                        // Ensure required properties for resource modal exist
                        topics: (upload.type !== 'pyq') ? ["Community Shared Topic", "Complete Exercise", "Viva Questions", "Practical Implementation"] : []
                    };
                    
                    if (upload.type === 'pyq') {
                        allPYQs.unshift(uData);
                    } else if (upload.type === 'notes') {
                        allNotes.unshift(uData);
                    } else if (upload.type === 'labfiles' || upload.type === 'lab') {
                        allLabFiles.unshift(uData);
                    }
                });
            }
        });
    } catch (e) {
        console.error('Error merging user uploads:', e);
    }
}

// Perform initial merge
mergeUserUploads();

// ======================== DOM HELPERS ========================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ======================== URL PARAMS ========================
function getUrlParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// ======================== PRELOADER ========================
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = $('#preloader');
        if (preloader) {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.style.display = 'none', 300);
        }
        if ($$('.stat-number').length) animateCounters();
    }, 150);
});

// ======================== NAVBAR ========================
const navbar = $('#navbar');
const hamburger = $('#hamburger');
const navLinks = $('#navLinks');

if (navbar) {
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        
        // Hide navbar on scroll down, show on scroll up
        if (window.scrollY > lastScrollY && window.scrollY > 150) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
        lastScrollY = window.scrollY;

        const backToTop = $('#backToTop');
        if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
        revealOnScroll();
    });
}

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    $$('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ======================== SEARCH ========================
const searchToggle = $('#searchToggle');
const searchOverlay = $('#searchOverlay');
const searchInput = $('#searchInput');
const searchResults = $('#searchResults');
const searchClose = $('#searchClose');

if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.toggle('active');
        if (searchOverlay.classList.contains('active') && searchInput) searchInput.focus();
    });
}
if (searchClose && searchOverlay && searchInput && searchResults) {
    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });
}

if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        if (q.length < 2) { searchResults.innerHTML = ''; return; }
        const results = [];
        allPYQs.filter(p => p.subject.toLowerCase().includes(q) || academicData[p.branch].name.toLowerCase().includes(q))
            .slice(0, 5).forEach(p => results.push({ type: 'pyq', icon: 'fas fa-scroll', color: '#f59e0b', title: p.subject, info: `${academicData[p.branch].name} • Sem ${p.semester} • ${p.year}`, data: p }));
        allNotes.filter(n => n.subject.toLowerCase().includes(q))
            .slice(0, 3).forEach(n => results.push({ type: 'notes', icon: 'fas fa-book-open', color: '#10b981', title: n.subject, info: `${academicData[n.branch].name} • Sem ${n.semester} • Notes`, data: n }));
        allLabFiles.filter(l => l.subject.toLowerCase().includes(q))
            .slice(0, 2).forEach(l => results.push({ type: 'lab', icon: 'fas fa-flask', color: '#3b82f6', title: l.subject, info: `${academicData[l.branch].name} • Sem ${l.semester} • Lab File`, data: l }));

        if (results.length === 0) {
            searchResults.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:20px;">No results found</p>';
            return;
        }
        searchResults.innerHTML = results.map(r => `
            <div class="search-result-item" onclick="handleSearchClick('${r.type}', '${r.data ? r.data.id : 0}', '${r.data ? r.data.branch : ''}')">
                <div class="result-icon" style="background:${r.color}20;color:${r.color}"><i class="${r.icon}"></i></div>
                <div class="result-info"><h4>${r.title}</h4><span>${r.info}</span></div>
            </div>
        `).join('');
    });
}

function handleSearchClick(type, id, branch) {
    if (searchOverlay) searchOverlay.classList.remove('active');
    if (type === 'pyq') {
        // If we're on pyqs page, open modal directly
        if ($('#pyqGrid')) {
            openPYQModal(id);
        } else {
            window.location.href = `pyqs.html?openPyq=${id}`;
        }
    } else if (type === 'notes') {
        window.location.href = 'resources.html';
    } else if (type === 'lab') {
        window.location.href = 'resources.html?tab=labfiles';
    }
}

// ======================== ANIMATED COUNTERS ========================
function animateCounters() {
    $$('.stat-number').forEach(counter => {
        const target = +counter.dataset.count;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            counter.textContent = Math.floor(current).toLocaleString();
        }, 16);
    });
}

// Animate about page stats when scrolled into view
function animateAboutStats() {
    const statNumbers = $$('.about-stat-number');
    if (!statNumbers.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(counter => {
                    const target = +counter.dataset.count;
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) { current = target; clearInterval(timer); }
                        counter.textContent = Math.floor(current).toLocaleString();
                    }, 16);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });
    const statsBar = document.querySelector('.about-stats-bar');
    if (statsBar) observer.observe(statsBar);
}
animateAboutStats();

// ======================== BACK TO TOP ========================
const backToTopBtn = $('#backToTop');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ======================== PYQ FILTERING (pyqs.html) ========================
const branchFilter = $('#branchFilter');
const semesterFilter = $('#semesterFilter');
const subjectFilter = $('#subjectFilter');
const yearFilter = $('#yearFilter');
let displayedPYQs = 12;

function handleBranchChange() {
    if (!branchFilter || !semesterFilter || !subjectFilter) return;
    const branch = branchFilter.value;
    semesterFilter.innerHTML = '<option value="all">All Semesters</option>';
    subjectFilter.innerHTML = '<option value="all">All Subjects</option>';
    if (branch !== 'all') {
        const data = academicData[branch];
        for (let i = 1; i <= data.semesters; i++) {
            semesterFilter.innerHTML += `<option value="${i}">Semester ${i}</option>`;
        }
    } else {
        for (let i = 1; i <= 8; i++) semesterFilter.innerHTML += `<option value="${i}">Semester ${i}</option>`;
    }
    displayedPYQs = 12;
    renderPYQs();
}

function handleSemesterChange() {
    if (!branchFilter || !semesterFilter || !subjectFilter) return;
    const branch = branchFilter.value;
    const sem = semesterFilter.value;
    subjectFilter.innerHTML = '<option value="all">All Subjects</option>';
    if (branch !== 'all' && sem !== 'all') {
        const subjects = academicData[branch].subjects[sem] || [];
        subjects.forEach(s => subjectFilter.innerHTML += `<option value="${s}">${s}</option>`);
    } else if (branch !== 'all') {
        const allSubs = new Set();
        Object.values(academicData[branch].subjects).flat().forEach(s => allSubs.add(s));
        [...allSubs].sort().forEach(s => subjectFilter.innerHTML += `<option value="${s}">${s}</option>`);
    }
    displayedPYQs = 12;
    renderPYQs();
}

if (branchFilter) branchFilter.addEventListener('change', handleBranchChange);
if (semesterFilter) semesterFilter.addEventListener('change', handleSemesterChange);
if (subjectFilter) subjectFilter.addEventListener('change', () => { displayedPYQs = 12; renderPYQs(); });
if (yearFilter) yearFilter.addEventListener('change', () => { displayedPYQs = 12; renderPYQs(); });

const resetFiltersBtn = $('#resetFilters');
if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
        if (branchFilter) branchFilter.value = 'all';
        if (semesterFilter) semesterFilter.value = 'all';
        if (subjectFilter) subjectFilter.value = 'all';
        if (yearFilter) yearFilter.value = 'all';
        handleBranchChange();
        showToast('Filters reset', 'info');
    });
}

function getFilteredPYQs() {
    return allPYQs.filter(p => {
        if (branchFilter && branchFilter.value !== 'all' && p.branch !== branchFilter.value) return false;
        if (semesterFilter && semesterFilter.value !== 'all' && p.semester !== +semesterFilter.value) return false;
        if (subjectFilter && subjectFilter.value !== 'all' && p.subject !== subjectFilter.value) return false;
        if (yearFilter && yearFilter.value !== 'all' && p.year !== +yearFilter.value) return false;
        return true;
    });
}

function renderPYQs() {
    const grid = $('#pyqGrid');
    if (!grid) return;

    const filtered = getFilteredPYQs();
    const toShow = filtered.slice(0, displayedPYQs);

    const resultsCount = $('#resultsCount');
    if (resultsCount) resultsCount.textContent = `Showing ${Math.min(displayedPYQs, filtered.length)} of ${filtered.length} PYQs`;

    const loadMoreContainer = $('#loadMoreContainer');
    if (loadMoreContainer) loadMoreContainer.style.display = displayedPYQs < filtered.length ? 'block' : 'none';

    if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-muted);"><i class="fas fa-search" style="font-size:2rem;margin-bottom:12px;display:block;"></i><p>No PYQs found matching your filters.</p></div>';
        return;
    }

    grid.innerHTML = toShow.map(p => `
        <div class="pyq-card">
            <div class="pyq-card-body">
                <div class="resource-card-header">
                    <div class="resource-type-icon pyq-icon">
                        <i class="fas fa-file-pdf"></i>
                    </div>
                    <div>
                        <h3>${p.subject}</h3>
                        <span>${academicData[p.branch].name} • Sem ${p.semester}</span>
                    </div>
                </div>
                <p class="pyq-subject">${p.examType} Examination • <span style="font-weight:700;">${p.year}</span></p>
                <div class="qa-metrics">
                    <span class="rating-badge"><i class="fas fa-star"></i> ${p.rating} (${p.reviews})</span>
                    <span class="freshness-indicator"><i class="fas fa-clock"></i> ${p.updatedText}</span>
                </div>
                <div class="resource-tags">
                    <span class="resource-tag">${p.pages} Pages</span>
                    <span class="resource-tag">${p.downloads} Downloads</span>
                    ${p.isVerified ? '<span class="resource-tag verified"><i class="fas fa-check-circle" style="color:var(--notes-color);margin-right:4px;"></i>Verified</span>' : ''}
                </div>
                <div class="resource-actions">
                    <button class="btn btn-primary btn-sm" onclick="openPYQModal('${p.id}')"><i class="fas fa-eye"></i> View Details</button>
                    <button class="btn btn-outline btn-sm bookmark-btn ${isPYQBookmarked(p.subject, p.branch, p.semester, p.year) ? 'bookmarked' : ''}" onclick="handlePYQBookmark('${p.id}', '${p.subject.replace(/'/g, "\\'")}', '${p.branch}', ${p.semester}, '${p.year}', this)"><i class="${isPYQBookmarked(p.subject, p.branch, p.semester, p.year) ? 'fas' : 'far'} fa-bookmark"></i></button>
                </div>
            </div>
        </div>
    `).join('');
}

window.handlePYQBookmark = function(id, subject, branch, semester, year, btnElement) {
    window.requireAuthAction(() => {
        const user = Auth.getCurrentUser();
        const existingIdx = (user.savedItems || []).findIndex(
            s => s.subject === subject && 
                 s.type === 'pyq' && 
                 s.branch === branch && 
                 String(s.semester) === String(semester) &&
                 String(s.year) === String(year)
        );
        if (existingIdx > -1) {
            Auth.removeSavedItem(existingIdx);
            if (btnElement) {
                btnElement.innerHTML = '<i class="far fa-bookmark"></i>';
                btnElement.classList.remove('bookmarked');
                btnElement.classList.add('bookmark-pop');
                setTimeout(() => btnElement.classList.remove('bookmark-pop'), 400);
            }
            showToast(`${subject} removed from bookmarks`, 'info');
        } else {
            Auth.saveItem({ type: 'pyq', subject, branch, semester, year });
            if (btnElement) {
                btnElement.innerHTML = '<i class="fas fa-bookmark"></i>';
                btnElement.classList.add('bookmarked');
                btnElement.classList.add('bookmark-pop');
                setTimeout(() => btnElement.classList.remove('bookmark-pop'), 400);
            }
            showToast(`${subject} bookmarked!`, 'success');
        }
    }, 'Please login to bookmark items.');
};

function isPYQBookmarked(subject, branch, semester, year) {
    if (typeof Auth === 'undefined' || !Auth.isLoggedIn()) return false;
    const user = Auth.getCurrentUser();
    if (!user) return false;
    return (user.savedItems || []).some(
        s => s.subject === subject && 
             s.type === 'pyq' && 
             s.branch === branch && 
             String(s.semester) === String(semester) &&
             String(s.year) === String(year)
    );
}

const loadMoreBtn = $('#loadMoreBtn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        displayedPYQs += 12;
        renderPYQs();
    });
}

// ======================== PYQ MODAL ========================
function openPYQModal(id) {
    const p = allPYQs.find(x => String(x.id) === String(id));
    if (!p) return;
    const modalTitle = $('#modalTitle');
    const modalBody = $('#modalBody');
    const pyqModal = $('#pyqModal');
    if (!modalTitle || !modalBody || !pyqModal) return;

    modalTitle.textContent = p.subject;
    modalBody.innerHTML = `
        <div class="detail-row"><span class="label">Branch</span><span class="value">${academicData[p.branch].fullName} (${academicData[p.branch].name})</span></div>
        <div class="detail-row"><span class="label">Semester</span><span class="value">Semester ${p.semester}</span></div>
        <div class="detail-row"><span class="label">Year</span><span class="value">${p.year}</span></div>
        <div class="detail-row"><span class="label">Exam Type</span><span class="value">${p.examType}</span></div>
        <div class="detail-row"><span class="label">Quality</span><span class="value"><span class="rating-badge"><i class="fas fa-star"></i> ${p.rating} (${p.reviews} reviews)</span></span></div>
        <div class="detail-row"><span class="label">Status</span><span class="value">${p.isVerified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i> Verified Contributor</span>' : 'Community Upload'}</span></div>
        <div class="detail-row"><span class="label">Last Updated</span><span class="value">${p.updatedText}</span></div>
        <div class="detail-row"><span class="label">Pages</span><span class="value">${p.pages} pages</span></div>
        <div class="detail-row"><span class="label">Downloads</span><span class="value">${p.downloads}+</span></div>
        <div class="detail-description">
            <h4>About This Paper</h4>
            <p>${p.description || `This is the ${p.examType} question paper for ${p.subject} from the ${p.year} session, Semester ${p.semester} of the ${academicData[p.branch].fullName} program. The paper contains ${p.pages} pages covering the complete syllabus as per university guidelines.`}</p>
        </div>
    `;
    pyqModal.classList.add('active');

    const modalViewPDF = $('#modalViewPDF');
    const modalDownload = $('#modalDownload');
    const modalBookmark = $('#modalBookmark');
    
    if (modalViewPDF) {
        modalViewPDF.onclick = () => {
            window.handleViewPaper(`${p.subject} PYQ (${p.year})`, 'pyq', p.id);
        };
    }
    
    if (modalDownload) {
        modalDownload.onclick = () => {
            window.handleDownload(`${p.subject} PYQ (${p.year})`, 'pyq', p.id);
        };
    }
    if (modalBookmark) {
        // Check if already bookmarked and set initial state
        const isBookmarked = Auth.isLoggedIn() && Auth.getCurrentUser() && 
            (Auth.getCurrentUser().savedItems || []).find(
                s => s.subject === p.subject && 
                     s.type === 'pyq' && 
                     s.branch === p.branch && 
                     String(s.semester) === String(p.semester) &&
                     String(s.year) === String(p.year)
            );
        if (isBookmarked) {
            modalBookmark.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
            modalBookmark.classList.add('bookmarked');
        } else {
            modalBookmark.innerHTML = '<i class="far fa-bookmark"></i> Bookmark';
            modalBookmark.classList.remove('bookmarked');
        }

        modalBookmark.onclick = (e) => {
            e.stopPropagation();
            window.requireAuthAction(() => {
                const user = Auth.getCurrentUser();
                const existingIdx = (user.savedItems || []).findIndex(
                    s => s.subject === p.subject && 
                         s.type === 'pyq' && 
                         s.branch === p.branch && 
                         String(s.semester) === String(p.semester) &&
                         String(s.year) === String(p.year)
                );
                if (existingIdx > -1) {
                    // Unbookmark
                    Auth.removeSavedItem(existingIdx);
                    modalBookmark.innerHTML = '<i class="far fa-bookmark"></i> Bookmark';
                    modalBookmark.classList.remove('bookmarked');
                    modalBookmark.classList.add('bookmark-pop');
                    setTimeout(() => modalBookmark.classList.remove('bookmark-pop'), 400);
                    showToast(`${p.subject} removed from bookmarks`, 'info');
                } else {
                    // Bookmark
                    Auth.saveItem({
                        type: 'pyq',
                        subject: p.subject,
                        branch: p.branch,
                        semester: p.semester,
                        year: p.year
                    });
                    modalBookmark.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
                    modalBookmark.classList.add('bookmarked');
                    modalBookmark.classList.add('bookmark-pop');
                    setTimeout(() => modalBookmark.classList.remove('bookmark-pop'), 400);
                    showToast(`${p.subject} bookmarked!`, 'success');
                }
            }, 'Please login to bookmark items.');
        };
    }
}

const modalClose = $('#modalClose');
const pyqModal = $('#pyqModal');
if (modalClose) modalClose.addEventListener('click', () => { if (pyqModal) pyqModal.classList.remove('active'); });
if (pyqModal) pyqModal.addEventListener('click', (e) => { if (e.target === pyqModal) pyqModal.classList.remove('active'); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && pyqModal) pyqModal.classList.remove('active'); });

// ======================== RESOURCES TAB (resources.html) ========================
let currentTab = 'notes';
$$('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        $$('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTab = btn.dataset.tab;
        renderResources();
    });
});

const resBranchFilter = $('#resourceBranchFilter');
const resSemesterFilter = $('#resourceSemesterFilter');

if (resBranchFilter) {
    resBranchFilter.addEventListener('change', () => {
        const branch = resBranchFilter.value;
        if (resSemesterFilter) {
            resSemesterFilter.innerHTML = '<option value="all">All Semesters</option>';
            if (branch !== 'all') {
                for (let i = 1; i <= academicData[branch].semesters; i++) {
                    resSemesterFilter.innerHTML += `<option value="${i}">Semester ${i}</option>`;
                }
            } else {
                for (let i = 1; i <= 8; i++) resSemesterFilter.innerHTML += `<option value="${i}">Semester ${i}</option>`;
            }
        }
        renderResources();
    });
}
if (resSemesterFilter) resSemesterFilter.addEventListener('change', renderResources);

function renderResources() {
    const grid = $('#resourcesGrid');
    if (!grid) return;

    const source = currentTab === 'notes' ? allNotes : allLabFiles;
    const branch = resBranchFilter ? resBranchFilter.value : 'all';
    const sem = resSemesterFilter ? resSemesterFilter.value : 'all';
    let filtered = source.filter(r => {
        if (branch !== 'all' && r.branch !== branch) return false;
        if (sem !== 'all' && r.semester !== +sem) return false;
        return true;
    }).slice(0, 12);

    if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-muted);"><i class="fas fa-folder-open" style="font-size:2rem;margin-bottom:12px;display:block;"></i><p>No resources found. Try different filters.</p></div>';
        return;
    }

    grid.innerHTML = filtered.map(r => `
        <div class="resource-card">
            <div class="resource-card-accent ${currentTab === 'notes' ? 'notes' : 'lab'}"></div>
            <div class="resource-card-body">
                <div class="resource-card-header">
                    <div class="resource-type-icon ${currentTab === 'notes' ? 'notes' : 'lab'}">
                        <i class="fas ${currentTab === 'notes' ? 'fa-book-open' : 'fa-flask'}"></i>
                    </div>
                    <div>
                        <h3>${r.subject}</h3>
                        <span>${academicData[r.branch].name} • Sem ${r.semester}</span>
                    </div>
                </div>
                <p>${r.description}</p>
                <div class="qa-metrics">
                    <span class="rating-badge"><i class="fas fa-star"></i> ${r.rating} (${r.reviews})</span>
                    <span class="freshness-indicator"><i class="fas fa-clock"></i> ${r.updatedText}</span>
                </div>
                <div class="resource-card-divider"></div>
                <div class="resource-tags">
                    <span class="resource-tag">${academicData[r.branch].name}</span>
                    <span class="resource-tag">Semester ${r.semester}</span>
                    <span class="resource-tag ${r.isVerified ? 'verified' : ''}">${r.isVerified ? '<i class="fas fa-check-circle" style="color:var(--notes-color);margin-right:4px;"></i>' : ''}${r.author}</span>
                </div>
                <div class="resource-actions">
                    <button class="btn btn-primary btn-sm" onclick="window.handleViewPaper('${r.subject.replace(/'/g, "\\'")}', '${currentTab}', '${r.id}')"><i class="fas fa-eye"></i> View</button>
                    <button class="btn btn-outline btn-sm" onclick="window.handleDownload('${r.subject.replace(/'/g, "\\'")}', '${currentTab}', '${r.id}')"><i class="fas fa-download"></i> Download</button>
                    <button class="btn btn-outline btn-sm bookmark-btn ${isResourceBookmarked(currentTab, r.subject, r.branch, r.semester) ? 'bookmarked' : ''}" onclick="handleResourceBookmark('${currentTab}', '${r.subject.replace(/'/g, "\\'")}', '${r.branch}', ${r.semester}, this)"><i class="${isResourceBookmarked(currentTab, r.subject, r.branch, r.semester) ? 'fas' : 'far'} fa-bookmark"></i></button>
                </div>
            </div>
        </div>
    `).join('');
}

function handleResourceBookmark(type, subject, branch, semester, btnElement) {
    window.requireAuthAction(() => {
        const user = Auth.getCurrentUser();
        const itemType = type === 'notes' ? 'notes' : 'labfiles';
        const existingIdx = (user.savedItems || []).findIndex(
            s => s.subject === subject && 
                 s.type === itemType && 
                 s.branch === branch && 
                 String(s.semester) === String(semester)
        );
        if (existingIdx > -1) {
            // Unbookmark
            Auth.removeSavedItem(existingIdx);
            if (btnElement) {
                btnElement.innerHTML = '<i class="far fa-bookmark"></i>';
                btnElement.classList.remove('bookmarked');
                btnElement.classList.add('bookmark-pop');
                setTimeout(() => btnElement.classList.remove('bookmark-pop'), 400);
            }
            showToast(`${subject} removed from bookmarks`, 'info');
        } else {
            // Bookmark
            Auth.saveItem({
                type: itemType,
                subject: subject,
                branch: branch,
                semester: semester
            });
            if (btnElement) {
                btnElement.innerHTML = '<i class="fas fa-bookmark"></i>';
                btnElement.classList.add('bookmarked');
                btnElement.classList.add('bookmark-pop');
                setTimeout(() => btnElement.classList.remove('bookmark-pop'), 400);
            }
            showToast(`${subject} bookmarked!`, 'success');
        }
    }, 'Please login to bookmark items.');
}

function isResourceBookmarked(type, subject, branch, semester) {
    if (typeof Auth === 'undefined' || !Auth.isLoggedIn()) return false;
    const user = Auth.getCurrentUser();
    if (!user) return false;
    const itemType = type === 'notes' ? 'notes' : 'labfiles';
    return (user.savedItems || []).some(
        s => s.subject === subject && 
             s.type === itemType && 
             s.branch === branch && 
             String(s.semester) === String(semester)
    );
}

// ======================== TESTIMONIAL SLIDER (about.html) ========================
const track = $('#testimonialTrack');
const dotsContainer = $('#testimonialDots');
let testimonialIndex = 0;

function getTestimonialsPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}

function initTestimonials() {
    if (!track || !dotsContainer) return;
    const cards = $$('.testimonial-card');
    const perView = getTestimonialsPerView();
    const totalDots = Math.max(1, cards.length - perView + 1);
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('button');
        dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => { testimonialIndex = i; updateTestimonialSlider(); });
        dotsContainer.appendChild(dot);
    }
    testimonialIndex = 0;
    updateTestimonialSlider();
}

function updateTestimonialSlider() {
    if (!track) return;
    const cards = $$('.testimonial-card');
    const perView = getTestimonialsPerView();
    const maxIndex = Math.max(0, cards.length - perView);
    testimonialIndex = Math.min(testimonialIndex, maxIndex);
    const cardWidth = 100 / perView;
    track.style.transform = `translateX(-${testimonialIndex * cardWidth}%)`;
    $$('.testimonial-dot').forEach((dot, i) => dot.classList.toggle('active', i === testimonialIndex));
}

const testimonialPrev = $('#testimonialPrev');
const testimonialNext = $('#testimonialNext');
if (testimonialPrev) testimonialPrev.addEventListener('click', () => { testimonialIndex = Math.max(0, testimonialIndex - 1); updateTestimonialSlider(); });
if (testimonialNext) testimonialNext.addEventListener('click', () => { testimonialIndex++; updateTestimonialSlider(); });
if (track) window.addEventListener('resize', initTestimonials);

// ======================== FAQ ACCORDION (contact.html) ========================
$$('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        $$('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// ======================== CONTACT FORM (contact.html) ========================
const contactForm = $('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = $('#contactName').value.trim();
        const email = $('#contactEmail').value.trim();
        const subject = $('#contactSubject').value;
        const message = $('#contactMessage').value.trim();

        if (!name || !email || !subject || !message) {
            showFormStatus('Please fill in all fields.', 'error');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showFormStatus('Please enter a valid email.', 'error');
            return;
        }

        const submitBtn = $('#submitContact');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }

        setTimeout(() => {
            showFormStatus('Message sent successfully! We will get back to you soon.', 'success');
            showToast('Message sent successfully!', 'success');
            contactForm.reset();
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }
        }, 1500);
    });
}

function showFormStatus(msg, type) {
    const el = $('#formStatus');
    if (!el) return;
    el.textContent = msg;
    el.className = 'form-status ' + type;
    setTimeout(() => { el.textContent = ''; el.className = 'form-status'; }, 5000);
}

// ======================== BRANCH DETAIL (branches.html) ========================
const branchDetailFilter = $('#branchDetailFilter');
const semesterGrid = $('#semesterGrid');

function renderSemesterGrid() {
    if (!branchDetailFilter || !semesterGrid) return;
    const branch = branchDetailFilter.value;
    const data = academicData[branch];

    semesterGrid.innerHTML = '';
    for (let sem = 1; sem <= data.semesters; sem++) {
        const subjects = data.subjects[sem];
        semesterGrid.innerHTML += `
            <div class="semester-card">
                <div class="semester-card-header">
                    <div class="semester-number">${sem}</div>
                    <h3>Semester ${sem}</h3>
                </div>
                <div class="semester-subjects">
                    ${subjects.map(s => `
                        <div class="semester-subject-item">
                            <i class="fas fa-circle"></i>
                            <span>${s}</span>
                            <a href="pyqs.html?branch=${branch}&semester=${sem}">View PYQs</a>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

if (branchDetailFilter) {
    branchDetailFilter.addEventListener('change', renderSemesterGrid);
    renderSemesterGrid(); // Initialize on page load

    // Allow clicking the big branch cards themselves to switch the selected branch!
    $$('.branches-grid .branch-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Check if they clicked the 'Explore' button, if so let the native link work
            if (e.target.closest('.branch-link-wrapper')) return;
            
            const selectedBranch = card.dataset.branch;
            if (selectedBranch && branchDetailFilter.value !== selectedBranch) {
                branchDetailFilter.value = selectedBranch;
                renderSemesterGrid();
                showToast(`Switched to ${academicData[selectedBranch].name} Details`, 'info');
            }
            
            // Smooth scroll down to the details section
            const detailsSection = document.querySelector('.branch-details-section');
            if (detailsSection) {
                detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        // Make sure it looks clickable
        card.style.cursor = 'pointer';
    });
}

// ======================== TOAST NOTIFICATION ========================
function showToast(message, type = 'info') {
    const container = $('#toastContainer');
    if (!container) return;
    const icons = { success: 'fa-check-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${icons[type]}"></i><span>${message}</span><button class="toast-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>`;
    container.appendChild(toast);
    setTimeout(() => { if (toast.parentElement) toast.remove(); }, 4000);
}

window.requireAuthAction = function(actionCallback, messageMsg) {
    if (typeof Auth !== 'undefined' && Auth.isLoggedIn()) {
        actionCallback();
    } else {
        showToast(messageMsg || 'Please login to perform this action.', 'warning');
        setTimeout(() => window.location.href = 'login.html', 1500);
    }
};

window.handleViewPaper = function(resourceName, type, id) {
    window.requireAuthAction(() => {
        let item = null;
        if (type === 'pyq') item = allPYQs.find(x => String(x.id) === String(id));
        else if (type === 'notes') item = allNotes.find(x => String(x.id) === String(id));
        else if (type === 'labfiles' || type === 'lab') item = allLabFiles.find(x => String(x.id) === String(id));

        if (item) {
            localStorage.setItem('en_preview_data', JSON.stringify(item));
        }
        
        const previewUrl = `preview.html?file=${encodeURIComponent(resourceName)}&type=${type}`;
        window.open(previewUrl, '_blank');
    }, 'Please login to view resources.');
};

window.handleDownload = function(resourceName, type, id) {
    window.requireAuthAction(() => {
        showToast(`Preparing ${resourceName} for download...`, 'info');
        
        if (typeof Auth !== 'undefined') Auth.recordDownload();
        
        let item = null;
        if (type === 'pyq') item = allPYQs.find(x => String(x.id) === String(id));
        else if (type === 'notes') item = allNotes.find(x => String(x.id) === String(id));
        else if (type === 'labfiles' || type === 'lab') item = allLabFiles.find(x => String(x.id) === String(id));

        setTimeout(() => {
            if (item && item.fileData) {
                // If it's a stored file (Base64), download the actual file
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = item.fileData;
                a.download = item.fileName || `${resourceName.replace(/\s+/g, '_')}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                showToast('Downloading original file...', 'success');
                return;
            }

            // Fallback for generated data: Generate mock file content
            let content = `EXAMNEXUS - ACADEMIC RESOURCE\n`;
            content += `==============================\n\n`;
            content += `Resource: ${resourceName}\n`;
            if (item) {
                content += `Branch: ${academicData[item.branch].fullName}\n`;
                content += `Semester: ${item.semester}\n`;
                if (item.year) content += `Year: ${item.year}\n`;
                content += `Type: ${type.toUpperCase()}\n\n`;
                
                if (item.description) {
                    content += `DESCRIPTION / NOTES:\n`;
                    content += `${item.description}\n\n`;
                }
                
                if (item.questions) {
                    content += `SAMPLE QUESTIONS:\n`;
                    item.questions.forEach((q, i) => content += `${i+1}. ${q}\n`);
                } else if (item.topics) {
                    content += `TOPICS COVERED:\n`;
                    item.topics.forEach((t, i) => content += `- ${t}\n`);
                }
            }
            content += `\n\nThis is a sample document generated by ExamNexus Preview System.`;

            // Create blob and download
            const blob = new Blob([content], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${resourceName.replace(/\s+/g, '_')}.txt`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            
            showToast('Download started!', 'success');
        }, 800);
    }, 'Please login to download resources.');
};

// ======================== SCROLL REVEAL ========================
function revealOnScroll() {
    $$('.feature-card, .branch-card, .contact-info-card, .highlight-item, .semester-card').forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 60) el.classList.add('visible');
    });
}

// ======================== INIT ========================
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal class for scroll animation
    $$('.feature-card, .branch-card, .contact-info-card, .highlight-item, .semester-card').forEach(el => el.classList.add('reveal'));

    // Read URL params for PYQ page
    const urlBranch = getUrlParam('branch');
    const urlSemester = getUrlParam('semester');
    const urlTab = getUrlParam('tab');
    const urlOpenPyq = getUrlParam('openPyq');

    // PYQ page init
    if (branchFilter) {
        if (urlBranch && academicData[urlBranch]) {
            branchFilter.value = urlBranch;
        }
        handleBranchChange();

        // Set semester after branch change populates options
        if (urlSemester && semesterFilter) {
            semesterFilter.value = urlSemester;
            handleSemesterChange();
        }

        // Open a specific PYQ modal from URL
        if (urlOpenPyq) {
            setTimeout(() => openPYQModal(urlOpenPyq), 1000);
        }
    }

    // Resources page init
    if ($('#resourcesGrid')) {
        if (urlTab === 'labfiles') {
            currentTab = 'labfiles';
            const notesTab = $('#tabNotes');
            const labTab = $('#tabLabFiles');
            if (notesTab) notesTab.classList.remove('active');
            if (labTab) labTab.classList.add('active');
        }
        renderResources();
    }

    // About page - testimonials init
    if (track) initTestimonials();

    // Branches page init
    if (branchDetailFilter) renderSemesterGrid();

    // Initial reveal
    revealOnScroll();

    // ===== Apple-style mouse parallax on hero 3D scene =====
    const heroVisual = document.getElementById('heroVisual');
    const scene = heroVisual ? heroVisual.querySelector('.hero-3d-scene') : null;
    if (heroVisual && scene) {
        let ticking = false;
        heroVisual.addEventListener('mousemove', (e) => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const rect = heroVisual.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                const rotateY = x * 12;
                const rotateX = -y * 8;
                scene.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
                ticking = false;
            });
        });
        heroVisual.addEventListener('mouseleave', () => {
            scene.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
        scene.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
    }

    // =====================================================
    // SCROLL ANIMATION ENGINE
    // =====================================================

    // 1. Scroll Progress Bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.id = 'scrollProgress';
    document.body.prepend(progressBar);

    // 2. Cursor Glow Follower
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);
    let cursorX = 0, cursorY = 0, glowX = 0, glowY = 0;
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX; cursorY = e.clientY;
    });
    function animateCursorGlow() {
        glowX += (cursorX - glowX) * 0.08;
        glowY += (cursorY - glowY) * 0.08;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateCursorGlow);
    }
    animateCursorGlow();

    // 3. Floating Particles Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.1;
            const colors = ['26,54,93', '45,90,142', '201,168,76', '45,139,111'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
            ctx.fill();
        }
    }
    for (let i = 0; i < 60; i++) particles.push(new Particle());
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        // Draw subtle connection lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(26,54,93,${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // 4. IntersectionObserver for Scroll Animations
    const scrollElements = document.querySelectorAll('.scroll-fade-up, .scroll-fade-left, .scroll-fade-right, .scroll-scale, .scroll-blur, .clip-reveal, .char-reveal');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    scrollElements.forEach(el => scrollObserver.observe(el));

    // 5. Apply scroll animation classes to existing elements
    document.querySelectorAll('.section-header').forEach(el => {
        if (!el.classList.contains('scroll-fade-up')) el.classList.add('scroll-fade-up');
        scrollObserver.observe(el);
    });
    document.querySelectorAll('.feature-card').forEach((el, i) => {
        el.classList.add('scroll-fade-up');
        el.style.transitionDelay = (i * 0.08) + 's';
        scrollObserver.observe(el);
    });
    document.querySelectorAll('.branch-card').forEach((el, i) => {
        el.classList.add('scroll-fade-up');
        el.style.transitionDelay = (i * 0.08) + 's';
        scrollObserver.observe(el);
    });
    document.querySelectorAll('.contact-info-card').forEach((el, i) => {
        el.classList.add('scroll-fade-up');
        el.style.transitionDelay = (i * 0.06) + 's';
        scrollObserver.observe(el);
    });
    document.querySelectorAll('.highlight-item').forEach((el, i) => {
        el.classList.add('scroll-fade-up');
        el.style.transitionDelay = (i * 0.06) + 's';
        scrollObserver.observe(el);
    });
    document.querySelectorAll('.semester-card').forEach((el, i) => {
        el.classList.add('scroll-fade-up');
        el.style.transitionDelay = (i * 0.04) + 's';
        scrollObserver.observe(el);
    });

    const ctaBanner = document.querySelector('.cta-banner .cta-content');
    if (ctaBanner) {
        ctaBanner.classList.add('scroll-scale');
        scrollObserver.observe(ctaBanner);
    }

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.classList.add('scroll-fade-right');
        scrollObserver.observe(contactForm);
    }
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        contactInfo.classList.add('scroll-fade-left');
        scrollObserver.observe(contactInfo);
    }

    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        aboutContent.classList.add('scroll-fade-left');
        scrollObserver.observe(aboutContent);
    }
    const aboutVisual = document.querySelector('.about-visual');
    if (aboutVisual) {
        aboutVisual.classList.add('scroll-fade-right');
        scrollObserver.observe(aboutVisual);
    }

    // 6. Continuous Scroll Listener for parallax + progress
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                // Scroll progress
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
                progressBar.style.transform = `scaleX(${scrollPercent})`;
                progressBar.style.width = '100%';

                // Parallax backgrounds
                document.querySelectorAll('.parallax-bg').forEach(bg => {
                    const section = bg.parentElement;
                    const rect = section.getBoundingClientRect();
                    const speed = 0.3;
                    const yPos = rect.top * speed;
                    bg.style.transform = `translateY(${yPos}px)`;
                });

                // Hero parallax - elements move at different speeds
                const heroEl = document.querySelector('.hero');
                if (heroEl) {
                    const heroRect = heroEl.getBoundingClientRect();
                    if (heroRect.bottom > 0) {
                        const scrollRatio = -heroRect.top / window.innerHeight;
                        const heroContent = heroEl.querySelector('.hero-content');
                        const heroVis = heroEl.querySelector('.hero-visual');
                        if (heroContent) heroContent.style.transform = `translateY(${scrollRatio * 60}px)`;
                        if (heroVis) heroVis.style.transform = `translateY(${scrollRatio * 30}px)`;
                        // Floating shapes parallax
                        heroEl.querySelectorAll('.shape').forEach((shape, i) => {
                            const factor = (i + 1) * 15;
                            shape.style.transform = `translate(0, ${scrollRatio * factor}px)`;
                        });
                    }
                }

                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });

    // 7. Card Hover Glow Effect (mouse position tracking)
    document.querySelectorAll('.feature-card, .branch-card, .pyq-card, .resource-card, .semester-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });

    // 8. Add glow dividers between major sections
    document.querySelectorAll('.features, .branches, .cta-banner, .testimonials, .faq-section, .contact-section, .pyqs-section, .resources-section').forEach(section => {
        const divider = document.createElement('div');
        divider.className = 'glow-divider';
        section.parentNode.insertBefore(divider, section);
    });

    // 9. Add parallax backgrounds to major sections
    document.querySelectorAll('.features, .branches, .cta-banner, .about-section').forEach(section => {
        section.classList.add('parallax-section');
        const bg = document.createElement('div');
        bg.className = 'parallax-bg';
        section.prepend(bg);
    });

});
