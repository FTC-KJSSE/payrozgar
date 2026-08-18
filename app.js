// PayRozgar PWA - Professional Payroll & Attendance Management System
// Pure Vanilla JavaScript (ES6+) State Store & View Transitions

class PayRozgar {
  constructor() {
    this.STORAGE_KEY = 'payrozgar_app_state_v2';
    this.currentPage = 'dashboard';
    this.state = this.loadState();
    this.init();
  }

  // Currency formatting helper using Indian Rupee format (en-IN)
  formatCurrency(amount) {
    return '₹' + new Intl.NumberFormat('en-IN').format(amount || 0);
  }

  // 1. Initial State Definition with 8 Realistic Shop/Business Employees
  getInitialState() {
    return {
      employees: [
        {
          id: 'EMP-001',
          name: 'Amit Sharma',
          role: 'Sales Associate',
          department: 'Sales',
          salary: 35000,
          overtime: 4000,
          deductions: 1500,
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          status: 'present',
          checkIn: '09:15 AM',
          checkOut: '06:30 PM',
          hours: '9h 15m'
        },
        {
          id: 'EMP-002',
          name: 'Priya Mehta',
          role: 'Store Manager',
          department: 'Management',
          salary: 45000,
          overtime: 3000,
          deductions: 2000,
          photo: 'https://images.unsplash.com/photo-1494790108755-2616c0763c04?w=100&h=100&fit=crop',
          status: 'absent',
          checkIn: '—',
          checkOut: '—',
          hours: '—'
        },
        {
          id: 'EMP-003',
          name: 'Sneha Patel',
          role: 'Inventory Specialist',
          department: 'Inventory',
          salary: 28000,
          overtime: 2500,
          deductions: 1000,
          photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
          status: 'halfday',
          checkIn: '09:00 AM',
          checkOut: '02:00 PM',
          hours: '5h 00m'
        },
        {
          id: 'EMP-004',
          name: 'Vikram Singh',
          role: 'Senior Technician',
          department: 'Technical',
          salary: 40000,
          overtime: 5000,
          deductions: 2000,
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
          status: 'leave',
          checkIn: '—',
          checkOut: '—',
          hours: '—'
        },
        {
          id: 'EMP-005',
          name: 'Rajesh Kumar',
          role: 'Customer Assistant',
          department: 'Sales',
          salary: 25000,
          overtime: 2000,
          deductions: 1000,
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
          status: 'present',
          checkIn: '09:00 AM',
          checkOut: '06:00 PM',
          hours: '9h 00m'
        },
        {
          id: 'EMP-006',
          name: 'Pooja Verma',
          role: 'Accounts Executive',
          department: 'Accounts',
          salary: 32000,
          overtime: 1500,
          deductions: 1200,
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
          status: 'present',
          checkIn: '09:30 AM',
          checkOut: '06:30 PM',
          hours: '9h 00m'
        },
        {
          id: 'EMP-007',
          name: 'Suresh Nair',
          role: 'Logistics Handler',
          department: 'Logistics',
          salary: 27000,
          overtime: 3000,
          deductions: 1000,
          photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop',
          status: 'present',
          checkIn: '08:45 AM',
          checkOut: '05:45 PM',
          hours: '9h 00m'
        },
        {
          id: 'EMP-008',
          name: 'Neha Gupta',
          role: 'Billing Specialist',
          department: 'Billing',
          salary: 24000,
          overtime: 1000,
          deductions: 800,
          photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
          status: 'present',
          checkIn: '09:00 AM',
          checkOut: '06:00 PM',
          hours: '9h 00m'
        }
      ]
    };
  }

  loadState() {
    try {
      const savedState = localStorage.getItem(this.STORAGE_KEY);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed && Array.isArray(parsed.employees) && parsed.employees.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not parse saved state from localStorage, falling back to defaults:', e);
    }
    const initialState = this.getInitialState();
    this.saveState(initialState);
    return initialState;
  }

  saveState(stateToSave = this.state) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }

  init() {
    this.initTheme();
    this.createToastContainer();
    this.setupNavigation();
    this.setupAddEmployeeModal();
    this.setupRecordEntryModal();
    this.renderDashboardMetrics();
    this.renderAttendanceTable();
    this.renderEmployeesGrid();
    this.renderPayrollTable();
    this.updateStatsBar();
    this.setupSearch();
    this.setupKeyboardShortcuts();
    this.showPage('dashboard', false);
  }

  // Theme Management (Light / Dark mode)
  initTheme() {
    const savedTheme = localStorage.getItem('payrozgar_theme');
    if (savedTheme) {
      this.theme = savedTheme;
    } else {
      this.theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    this.applyTheme(false);

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    }
  }

  applyTheme(showToastNotification = true) {
    document.documentElement.setAttribute('data-theme', this.theme);
    
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      const sunIcon = themeBtn.querySelector('.sun-icon');
      const moonIcon = themeBtn.querySelector('.moon-icon');
      if (sunIcon && moonIcon) {
        if (this.theme === 'dark') {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
          themeBtn.title = 'Switch to Light Mode';
        } else {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
          themeBtn.title = 'Switch to Dark Mode';
        }
      }
    }

    if (showToastNotification) {
      const title = this.theme === 'dark' ? 'Dark Mode Enabled' : 'Light Mode Enabled';
      this.showToast(title, 'info');
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('payrozgar_theme', this.theme);
    this.applyTheme(true);
  }

  // Add Employee Modal Functionality
  setupAddEmployeeModal() {
    // Attach click handlers to all "Add Employee" buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
      if (btn.textContent.trim().toLowerCase().includes('add employee')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openAddEmployeeModal();
        });
      }
    });

    const modal = document.getElementById('add-employee-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    const form = document.getElementById('add-employee-form');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeAddEmployeeModal());
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => this.closeAddEmployeeModal());
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeAddEmployeeModal();
        }
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => this.handleAddEmployeeSubmit(e));
    }
  }

  openAddEmployeeModal() {
    const modal = document.getElementById('add-employee-modal');
    if (!modal) return;
    modal.classList.add('active');
    const nameInput = document.getElementById('emp-name');
    if (nameInput) {
      setTimeout(() => nameInput.focus(), 100);
    }
  }

  closeAddEmployeeModal() {
    const modal = document.getElementById('add-employee-modal');
    const form = document.getElementById('add-employee-form');
    if (modal) {
      modal.classList.remove('active');
    }
    if (form) {
      form.reset();
    }
  }

  handleAddEmployeeSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('emp-name')?.value.trim();
    const role = document.getElementById('emp-role')?.value.trim();
    const department = document.getElementById('emp-dept')?.value;
    const salary = parseFloat(document.getElementById('emp-salary')?.value) || 0;

    if (!name || !role || !salary) return;

    // Generate new EMP-XXX ID
    const nextIndex = this.state.employees.length + 1;
    const newId = `EMP-${String(nextIndex).padStart(3, '0')}`;

    // Sample avatar photo list
    const avatarPhotos = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop'
    ];
    const photo = avatarPhotos[Math.floor(Math.random() * avatarPhotos.length)];

    const newEmp = {
      id: newId,
      name,
      role,
      department,
      salary,
      overtime: 0,
      deductions: 0,
      photo,
      status: 'present',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      hours: '9h 00m'
    };

    // Push into state and save to localStorage
    this.state.employees.push(newEmp);
    this.saveState();

    // Re-render UI views
    this.renderAttendanceTable();
    this.renderEmployeesGrid();
    this.renderPayrollTable();
    this.renderDashboardMetrics();
    this.updateStatsBar();

    // Close modal & reset form
    this.closeAddEmployeeModal();

    // Trigger Toast Notification
    this.showToast(`${name} (${newId}) added successfully!`, 'success');
  }

  // Record Financial Entry Modal Functionality
  setupRecordEntryModal() {
    const openBtn = document.getElementById('open-record-entry-btn');
    if (openBtn) {
      openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openRecordEntryModal();
      });
    }

    const modal = document.getElementById('record-entry-modal');
    const closeBtn = document.getElementById('record-entry-close-btn');
    const cancelBtn = document.getElementById('record-entry-cancel-btn');
    const form = document.getElementById('record-entry-form');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeRecordEntryModal());
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => this.closeRecordEntryModal());
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeRecordEntryModal();
        }
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => this.handleRecordEntrySubmit(e));
    }
  }

  openRecordEntryModal() {
    const modal = document.getElementById('record-entry-modal');
    const select = document.getElementById('entry-emp-select');
    if (!modal) return;

    if (select) {
      select.innerHTML = this.state.employees.map(emp =>
        `<option value="${emp.id}">${emp.name} (${emp.id}) — Base: ${this.formatCurrency(emp.salary)}</option>`
      ).join('');
    }

    modal.classList.add('active');
    const amountInput = document.getElementById('entry-amount');
    if (amountInput) {
      setTimeout(() => amountInput.focus(), 100);
    }
  }

  closeRecordEntryModal() {
    const modal = document.getElementById('record-entry-modal');
    const form = document.getElementById('record-entry-form');
    if (modal) {
      modal.classList.remove('active');
    }
    if (form) {
      form.reset();
    }
  }

  handleRecordEntrySubmit(e) {
    e.preventDefault();

    const empId = document.getElementById('entry-emp-select')?.value;
    const amount = parseFloat(document.getElementById('entry-amount')?.value) || 0;
    const entryTypeEl = document.querySelector('input[name="entryType"]:checked');
    const entryType = entryTypeEl ? entryTypeEl.value : 'overtime';

    if (!empId || amount <= 0) return;

    const emp = this.state.employees.find(e => e.id === empId);
    if (!emp) return;

    if (entryType === 'overtime') {
      emp.overtime = (emp.overtime || 0) + amount;
    } else {
      emp.deductions = (emp.deductions || 0) + amount;
    }

    // 1. Save state
    this.saveState();

    // 2. Re-render Payroll & Dashboard metrics
    this.renderPayrollTable();
    this.renderDashboardMetrics();

    // 3. Close modal
    this.closeRecordEntryModal();

    // 4. Trigger Toast Notification
    const label = entryType === 'overtime' ? 'Overtime/Bonus' : 'Advance/Deduction';
    this.showToast(`Recorded ${this.formatCurrency(amount)} ${label} for ${emp.name}`, 'success');
  }

  // 2. Navigation Logic using View Transitions API
  setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        if (page) {
          this.showPage(page, true);
        }
      });
    });
  }

  showPage(pageName, useTransition = true) {
    if (pageName === this.currentPage && document.getElementById(pageName)?.classList.contains('active')) {
      return;
    }

    const updateDOM = () => {
      // Update nav link active state
      document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.page === pageName) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // Update page active state
      document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
      });

      const targetPage = document.getElementById(pageName);
      if (targetPage) {
        targetPage.classList.add('active');
      }

      this.currentPage = pageName;

      if (pageName === 'dashboard') {
        this.animateMetrics();
        this.renderDashboardMetrics();
      }
    };

    if (useTransition && document.startViewTransition) {
      document.startViewTransition(() => updateDOM());
    } else {
      updateDOM();
    }
  }

  animateMetrics() {
    const cards = document.querySelectorAll('.metric-card');
    cards.forEach((card, index) => {
      card.style.animation = 'none';
      card.offsetHeight; // Reflow
      card.style.setProperty('--delay', index);
      card.style.animation = `slideUp 400ms cubic-bezier(0.23, 1, 0.32, 1) ${index * 80}ms backwards`;
    });
  }

  // 3. Render Dynamic Dashboard Metrics
  renderDashboardMetrics() {
    const metricValues = document.querySelectorAll('#dashboard .metric-card .metric-value');
    if (metricValues.length >= 3) {
      // 1. Total Employees
      const totalCount = this.state.employees.length;
      metricValues[0].textContent = totalCount;

      // 2. Attendance Rate
      const presentCount = this.state.employees.filter(e => e.status === 'present' || e.status === 'halfday').length;
      const rate = totalCount > 0 ? ((presentCount / totalCount) * 100).toFixed(1) : '0';
      metricValues[1].textContent = `${rate}%`;

      // 3. This Month Payroll Total
      const totalPayroll = this.state.employees.reduce((acc, e) => acc + (e.salary + e.overtime - e.deductions), 0);
      metricValues[2].textContent = this.formatCurrency(totalPayroll);
    }
  }

  // 4. Render & Manage Attendance (P, A, HD, L buttons)
  renderAttendanceTable() {
    const tbody = document.querySelector('#attendance .data-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    this.state.employees.forEach(emp => {
      const tr = document.createElement('tr');
      tr.setAttribute('data-emp-id', emp.id);

      tr.innerHTML = `
        <td>
          <div class="employee-cell">
            <img src="${emp.photo}" alt="${emp.name}">
            <div>
              <div class="employee-name">${emp.name}</div>
              <div class="employee-id">${emp.id}</div>
            </div>
          </div>
        </td>
        <td>${emp.department}</td>
        <td>${emp.checkIn || '—'}</td>
        <td>${emp.checkOut || '—'}</td>
        <td>${emp.hours || '—'}</td>
        <td class="status-cell">
          ${this.getStatusBadgeHtml(emp.status)}
        </td>
        <td>
          <div class="attendance-actions">
            <button class="attendance-btn ${emp.status === 'present' ? 'active present' : ''}" data-status="present" title="Mark Present (P)">P</button>
            <button class="attendance-btn ${emp.status === 'absent' ? 'active absent' : ''}" data-status="absent" title="Mark Absent (A)">A</button>
            <button class="attendance-btn ${emp.status === 'halfday' ? 'active halfday' : ''}" data-status="halfday" title="Mark Half Day (HD)">HD</button>
            <button class="attendance-btn ${emp.status === 'leave' ? 'active leave' : ''}" data-status="leave" title="Mark Leave (L)">L</button>
          </div>
        </td>
      `;

      // Attach click handlers to P, A, HD, L buttons
      tr.querySelectorAll('.attendance-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetStatus = btn.dataset.status;
          this.setAttendanceStatus(emp.id, targetStatus);
        });
      });

      tbody.appendChild(tr);
    });
  }

  getStatusBadgeHtml(status) {
    const labels = {
      present: 'Present',
      absent: 'Absent',
      halfday: 'Half Day',
      leave: 'On Leave'
    };
    const classes = {
      present: 'badge-present',
      absent: 'badge-absent',
      halfday: 'badge-halfday',
      leave: 'badge-leave'
    };
    return `<span class="badge ${classes[status] || 'badge-primary'}">${labels[status] || status}</span>`;
  }

  setAttendanceStatus(empId, status) {
    const emp = this.state.employees.find(e => e.id === empId);
    if (!emp) return;

    if (emp.status === status) return; // Status unchanged

    emp.status = status;

    // Realistic time updates based on status
    if (status === 'present') {
      emp.checkIn = '09:00 AM';
      emp.checkOut = '06:00 PM';
      emp.hours = '9h 00m';
    } else if (status === 'halfday') {
      emp.checkIn = '09:00 AM';
      emp.checkOut = '02:00 PM';
      emp.hours = '5h 00m';
    } else {
      emp.checkIn = '—';
      emp.checkOut = '—';
      emp.hours = '—';
    }

    // 1. Save state
    this.saveState();

    // 2. Re-render UI views
    this.renderAttendanceTable();
    this.renderEmployeesGrid();
    this.renderPayrollTable();
    this.renderDashboardMetrics();
    this.updateStatsBar();

    // 3. Trigger Toast Notification
    const titles = {
      present: 'Present',
      absent: 'Absent',
      halfday: 'Half Day',
      leave: 'On Leave'
    };
    const toastTypes = {
      present: 'success',
      absent: 'error',
      halfday: 'warning',
      leave: 'info'
    };

    this.showToast(
      `${emp.name} marked as ${titles[status]}`,
      toastTypes[status] || 'info'
    );
  }

  updateStatsBar() {
    const counts = { present: 0, absent: 0, halfday: 0, leave: 0 };
    this.state.employees.forEach(emp => {
      if (counts[emp.status] !== undefined) {
        counts[emp.status]++;
      }
    });

    const statValues = document.querySelectorAll('#attendance .stats-bar .stat-value');
    if (statValues.length >= 4) {
      statValues[0].textContent = counts.present;
      statValues[1].textContent = counts.absent;
      statValues[2].textContent = counts.halfday;
      statValues[3].textContent = counts.leave;
    }
  }

  // 5. Render Employees Grid
  renderEmployeesGrid() {
    const grid = document.querySelector('#employees .employees-grid');
    if (!grid) return;

    grid.innerHTML = '';

    this.state.employees.forEach(emp => {
      const card = document.createElement('div');
      card.className = 'employee-card';
      card.innerHTML = `
        <div class="employee-card-header">
          <img src="${emp.photo}" alt="${emp.name}" class="employee-photo">
          <button class="btn-icon" title="More options">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="12" cy="5" r="1"/>
              <circle cx="12" cy="19" r="1"/>
            </svg>
          </button>
        </div>
        <div class="employee-card-body">
          <h4>${emp.name}</h4>
          <p>${emp.role}</p>
          <div class="employee-meta">
            <span>${emp.id}</span>
            <span>${emp.department}</span>
          </div>
        </div>
        <div class="employee-card-footer">
          <div>
            <div class="label">Salary</div>
            <div class="value">${this.formatCurrency(emp.salary)}/mo</div>
          </div>
          ${this.getStatusBadgeHtml(emp.status)}
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // 6. Render Payroll Table & Summary
  renderPayrollTable() {
    const tbody = document.querySelector('#payroll .data-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    let totalPayable = 0;
    let totalProcessed = 0;
    let totalPending = 0;

    this.state.employees.forEach(emp => {
      const netPayable = emp.salary + emp.overtime - emp.deductions;
      totalPayable += netPayable;

      const isPaid = emp.status !== 'absent';
      if (isPaid) {
        totalProcessed += netPayable;
      } else {
        totalPending += netPayable;
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="employee-cell">
            <img src="${emp.photo}" alt="${emp.name}">
            <div>
              <div class="employee-name">${emp.name}</div>
              <div class="employee-id">${emp.id}</div>
            </div>
          </div>
        </td>
        <td>${this.formatCurrency(emp.salary)}</td>
        <td>+${this.formatCurrency(emp.overtime)}</td>
        <td>-${this.formatCurrency(emp.deductions)}</td>
        <td><strong>${this.formatCurrency(netPayable)}</strong></td>
        <td><span class="badge ${isPaid ? 'badge-success' : 'badge-warning'}">${isPaid ? 'Paid' : 'Pending'}</span></td>
        <td>
          <button class="btn-sm">${isPaid ? 'Payslip' : 'Process'}</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Update Summary cards
    const summaryValues = document.querySelectorAll('#payroll .payroll-summary .summary-value');
    if (summaryValues.length >= 3) {
      summaryValues[0].textContent = this.formatCurrency(totalPayable);
      summaryValues[1].textContent = this.formatCurrency(totalProcessed);
      summaryValues[2].textContent = this.formatCurrency(totalPending);
    }
  }

  // 7. Toast Notification System
  createToastContainer() {
    if (!document.querySelector('.toast-container')) {
      const container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
  }

  showToast(message, type = 'info') {
    const container = document.querySelector('.toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-out');
      toast.addEventListener('transitionend', () => toast.remove());
    }, 2400);
  }

  setupSearch() {
    const searchInput = document.querySelector('.search-container input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });
    }
  }

  handleSearch(query) {
    const q = query.toLowerCase().trim();
    document.querySelectorAll('.data-table tbody tr, .employee-card').forEach(el => {
      const text = el.innerText.toLowerCase();
      el.style.display = !q || text.includes(q) ? '' : 'none';
    });
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('.search-container input')?.focus();
      }
      if (e.key === 'Escape') {
        this.closeAddEmployeeModal();
        this.closeRecordEntryModal();
      }
    });
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new PayRozgar();
});

// Register Service Worker for PWA Offline Functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('[PayRozgar] ServiceWorker registered with scope:', reg.scope))
      .catch(err => console.warn('[PayRozgar] ServiceWorker registration failed:', err));
  });
}