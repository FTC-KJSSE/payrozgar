// PayRozgar PWA - Professional Payroll & Attendance Management System
// Pure Vanilla JavaScript (ES6+) State Store & View Transitions

class PayRozgar {
  constructor() {
    this.STORAGE_KEY = 'payrozgar_app_state_v2';
    this.BIZ_STORAGE_KEY = 'payrozgar_business_profile_v1';
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
      payrollState: 'draft',
      businessDetails: {
        name: '',
        category: '',
        phone: '',
        workforceSize: '',
        pin: ''
      },
      overtimeLog: [],
      adjustmentsLog: [
        {
          id: 'ADJ-101',
          empId: 'EMP-001',
          empName: 'Amit Sharma',
          type: 'advance',
          amount: 1500,
          date: '2026-12-10',
          reason: 'Festival advance payout'
        },
        {
          id: 'ADJ-102',
          empId: 'EMP-002',
          empName: 'Priya Mehta',
          type: 'deduction',
          amount: 2000,
          date: '2026-12-05',
          reason: 'Leave penalty / uniform deduction'
        },
        {
          id: 'ADJ-103',
          empId: 'EMP-004',
          empName: 'Vikram Singh',
          type: 'advance',
          amount: 2000,
          date: '2026-12-12',
          reason: 'Medical loan advance'
        }
      ],
      paymentHistory: [
        {
          id: 'PAY-1001',
          empId: 'EMP-001',
          empName: 'Amit Sharma',
          empPhoto: `https://ui-avatars.com/api/?name=${encodeURIComponent('Amit Sharma')}&background=random&color=fff&bold=true`,
          amount: 37500,
          datePaid: '2026-12-01',
          method: 'UPI',
          reference: 'UPI/6392019481/Salary'
        },
        {
          id: 'PAY-1002',
          empId: 'EMP-003',
          empName: 'Sneha Patel',
          empPhoto: `https://ui-avatars.com/api/?name=${encodeURIComponent('Sneha Patel')}&background=random&color=fff&bold=true`,
          amount: 29500,
          datePaid: '2026-12-01',
          method: 'Bank Transfer',
          reference: 'HDFC-NEFT-920194'
        },
        {
          id: 'PAY-1003',
          empId: 'EMP-005',
          empName: 'Rajesh Kumar',
          empPhoto: `https://ui-avatars.com/api/?name=${encodeURIComponent('Rajesh Kumar')}&background=random&color=fff&bold=true`,
          amount: 26000,
          datePaid: '2026-12-01',
          method: 'Cash',
          reference: 'Cash receipt #0482'
        },
        {
          id: 'PAY-1004',
          empId: 'EMP-006',
          empName: 'Pooja Verma',
          empPhoto: `https://ui-avatars.com/api/?name=${encodeURIComponent('Pooja Verma')}&background=random&color=fff&bold=true`,
          amount: 32300,
          datePaid: '2026-12-01',
          method: 'UPI',
          reference: 'UPI/9201847102/Salary'
        }
      ],
      employees: [
        {
          id: 'EMP-001',
          name: 'Amit Sharma',
          role: 'Sales Associate',
          department: 'Sales',
          salary: 35000,
          overtime: 4000,
          otHours: 50,
          otRate: 80,
          lastOtNote: 'Festival rush sales closing',
          deductions: 1500,
          photo: `https://ui-avatars.com/api/?name=${encodeURIComponent('Amit Sharma')}&background=random&color=fff&bold=true`,
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
          otHours: 37.5,
          otRate: 80,
          lastOtNote: 'Month-end inventory audit',
          deductions: 2000,
          photo: `https://ui-avatars.com/api/?name=${encodeURIComponent('Priya Mehta')}&background=random&color=fff&bold=true`,
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
          otHours: 31.25,
          otRate: 80,
          lastOtNote: 'Stock shipment unloading',
          deductions: 1000,
          photo: `https://ui-avatars.com/api/?name=${encodeURIComponent('Sneha Patel')}&background=random&color=fff&bold=true`,
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
          otHours: 62.5,
          otRate: 80,
          lastOtNote: 'Emergency equipment repair',
          deductions: 2000,
          photo: `https://ui-avatars.com/api/?name=${encodeURIComponent('Vikram Singh')}&background=random&color=fff&bold=true`,
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
          otHours: 25,
          otRate: 80,
          lastOtNote: 'Weekend store rush',
          deductions: 1000,
          photo: `https://ui-avatars.com/api/?name=${encodeURIComponent('Rajesh Kumar')}&background=random&color=fff&bold=true`,
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
          otHours: 18.75,
          otRate: 80,
          lastOtNote: 'Tax filing preparation',
          deductions: 1200,
          photo: `https://ui-avatars.com/api/?name=${encodeURIComponent('Pooja Verma')}&background=random&color=fff&bold=true`,
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
          otHours: 37.5,
          otRate: 80,
          lastOtNote: 'Night dispatch operations',
          deductions: 1000,
          photo: `https://ui-avatars.com/api/?name=${encodeURIComponent('Suresh Nair')}&background=random&color=fff&bold=true`,
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
          otHours: 12.5,
          otRate: 80,
          lastOtNote: 'Billing counter clearance',
          deductions: 800,
          photo: `https://ui-avatars.com/api/?name=${encodeURIComponent('Neha Gupta')}&background=random&color=fff&bold=true`,
          status: 'present',
          checkIn: '09:00 AM',
          checkOut: '06:00 PM',
          hours: '9h 00m'
        }
      ]
    };
  }

  get activeEmployees() {
    return (this.state.employees || []).filter(emp => emp.status !== 'inactive');
  }

  toggleEmployeeStatus(empId) {
    const emp = this.state.employees.find(e => e.id === empId);
    if (!emp) return;

    emp.status = emp.status === 'inactive' ? 'active' : 'inactive';
    this.saveState();

    this.renderEmployeesGrid();
    this.renderAttendanceTable();
    this.renderPayrollTable();
    this.renderOvertimeTable();
    this.renderAdjustments();
    this.renderDashboardMetrics();
    this.updateStatsBar();

    const actionText = emp.status === 'inactive' ? 'deactivated' : 'activated';
    this.showToast(`${emp.name} is now ${actionText}.`, 'info');
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
    this.setupAuthModal();
    this.setupChangePinForm();
    this.setupProfileDropdown();
    this.setupNavigation();
    this.setupQuickActions();
    this.setupOnboarding();
    this.setupFirstTimeOnboardingModal();
    this.setupAddEmployeeModal();
    this.setupRecordEntryModal();
    this.setupRecordOvertimeModal();
    this.setupAdjustmentModal();
    this.setupPayrollEngineControls();
    this.setupPayslipModalControls();
    
    // Wire up Back to Dashboard buttons on inner pages
    document.querySelectorAll('.back-to-dash-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.showPage('dashboard', true);
      });
    });

    const markAllBtn = document.getElementById('mark-all-present-btn');
    if (markAllBtn) {
      markAllBtn.addEventListener('click', () => this.markAllPresent());
    }

    this.loadBusinessProfile();
    const pin = this.state.businessDetails?.pin;
    const hasPin = !!(this.state.businessDetails && pin && pin.trim() !== '');

    const authModal = document.getElementById('auth-modal');
    if (hasPin && authModal && authModal.showModal) {
      this.isLocked = true;
      try {
        authModal.showModal();
      } catch (err) {
        authModal.classList.add('active');
      }
    }

    this.renderDashboardMetrics();
    this.renderAttendanceTable();
    this.renderEmployeesGrid();
    this.renderPayrollTable();
    this.renderOvertimeTable();
    this.renderAdjustments();
    this.renderPaymentHistory();
    this.updateStatsBar();
    this.setupSearch();
    this.setupKeyboardShortcuts();
    this.showPage('dashboard', false);
  }

  // Business Setup Onboarding (FR-01)
  setupOnboarding() {
    const form = document.getElementById('onboarding-form');
    const addFirstEmpBtn = document.getElementById('onboard-add-first-emp-btn');
    const goDashBtn = document.getElementById('onboard-go-dashboard-btn');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const bizName = document.getElementById('onboard-biz-name')?.value.trim();
        const bizCategory = document.getElementById('onboard-biz-category')?.value;
        const bizPhone = document.getElementById('onboard-biz-phone')?.value.trim();
        const workforceSize = document.getElementById('onboard-workforce-size')?.value;

        if (!bizName || !bizCategory || !bizPhone || !workforceSize) return;

        const profile = {
          name: bizName,
          category: bizCategory,
          phone: bizPhone,
          workforceSize,
          createdAt: new Date().toISOString()
        };

        try {
          localStorage.setItem(this.BIZ_STORAGE_KEY, JSON.stringify(profile));
        } catch (err) {
          console.error('Failed to save business profile:', err);
        }

        // Update UI elements with new business profile
        this.applyBusinessProfile(profile);

        // Show Success Step (Step 2)
        const step1 = document.getElementById('onboard-step-1');
        const step2 = document.getElementById('onboard-step-2');
        const successBizName = document.getElementById('success-biz-name');

        if (successBizName) successBizName.textContent = bizName;
        if (step1) step1.classList.remove('active');
        if (step2) step2.classList.add('active');

        this.showToast(`Welcome! ${bizName} setup completed.`, 'success');
      });
    }

    if (addFirstEmpBtn) {
      addFirstEmpBtn.addEventListener('click', () => {
        this.hideOnboardingOverlay();
        this.showPage('dashboard', false);
        this.openAddEmployeeModal();
      });
    }

    if (goDashBtn) {
      goDashBtn.addEventListener('click', () => {
        this.hideOnboardingOverlay();
        this.showPage('dashboard', true);
      });
    }

    const reopenBtn = document.getElementById('reopen-onboarding-btn');
    if (reopenBtn) {
      reopenBtn.addEventListener('click', () => {
        const setupModal = document.getElementById('setup-modal');
        
        // Pre-fill the form with existing data
        try {
          const saved = localStorage.getItem(this.BIZ_STORAGE_KEY);
          if (saved) {
            const profile = JSON.parse(saved);
            if (profile) {
              if (document.getElementById('setup-biz-name')) document.getElementById('setup-biz-name').value = profile.name || '';
              if (document.getElementById('setup-biz-category')) document.getElementById('setup-biz-category').value = profile.category || '';
              if (document.getElementById('setup-biz-phone')) document.getElementById('setup-biz-phone').value = profile.phone || '';
              if (document.getElementById('setup-workforce-size')) document.getElementById('setup-workforce-size').value = profile.workforceSize || '1-10';
            }
          }
        } catch (e) {}

        // Open the native dialog
        if (setupModal && setupModal.showModal) {
          try {
            setupModal.showModal();
          } catch(err) {
            setupModal.classList.add('active');
          }
        }
      });
    }
  }

  setupAuthModal() {
    const authModal = document.getElementById('auth-modal');
    const authForm = document.getElementById('auth-modal-form');
    const pinInput = document.getElementById('auth-pin-input');
    const errorMsg = document.getElementById('auth-error-msg');
    const factoryResetBtn = document.getElementById('factory-reset-btn');

    if (factoryResetBtn) {
      factoryResetBtn.addEventListener('click', () => {
        const warning = "WARNING: This will permanently delete all local payroll data, employee records, and business settings from this device so you can start a new business. This cannot be undone.\n\nAre you absolutely sure?";
        if (window.confirm(warning)) {
          // Clear all local storage associated with the app
          localStorage.clear();
          // Reload the page to trigger the first-time setup flow
          window.location.reload();
        }
      });
    }

    if (!authModal || !authForm) return;

    authModal.addEventListener('cancel', (e) => {
      if (this.isLocked) {
        e.preventDefault();
      }
    });

    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredPin = pinInput?.value.trim() || '';
      const storedPin = this.state.businessDetails?.pin || '';

      const encodedEntered = btoa(enteredPin);

      let isValid = (encodedEntered === storedPin);
      if (!isValid && storedPin) {
        try {
          isValid = (atob(storedPin) === enteredPin);
        } catch (ex) {
          isValid = (storedPin === enteredPin);
        }
      }

      if (isValid) {
        this.isLocked = false;
        if (errorMsg) errorMsg.style.display = 'none';
        if (pinInput) pinInput.value = '';
        if (authModal.close) {
          authModal.close();
        } else {
          authModal.classList.remove('active');
        }
      } else {
        if (errorMsg) errorMsg.style.display = 'block';
        if (pinInput) {
          pinInput.value = '';
          pinInput.focus();
        }
      }
    });
  }

  setupChangePinForm() {
    const form = document.getElementById('change-pin-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('new-auth-pin');
      const pinValue = input?.value.trim();

      if (!pinValue || pinValue.length !== 4) {
        this.showToast('Please enter a valid 4-digit PIN.', 'warning');
        return;
      }

      if (!this.state.businessDetails) {
        this.state.businessDetails = {};
      }

      this.state.businessDetails.pin = btoa(pinValue);

      this.saveState();
      try {
        localStorage.setItem(this.BIZ_STORAGE_KEY, JSON.stringify(this.state.businessDetails));
      } catch (err) {}

      form.reset();
      this.showToast('Security PIN updated successfully.', 'success');
    });
  }

  setupProfileDropdown() {
    const profileBtn = document.getElementById('user-profile-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    const logoutBtn = document.getElementById('logout-btn');

    // Toggle dropdown visibility
    if (profileBtn && profileDropdown) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.style.display = profileDropdown.style.display === 'none' ? 'flex' : 'none';
      });
    }

    // Close dropdown if clicked outside
    document.addEventListener('click', () => {
      if (profileDropdown) profileDropdown.style.display = 'none';
    });

    // Logout button forces the Auth PIN modal to reappear
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        profileDropdown.style.display = 'none';
        const authModal = document.getElementById('auth-modal');
        if (authModal && authModal.showModal) {
          this.isLocked = true;
          // Clear the PIN input field so it's empty
          const pinInput = document.getElementById('auth-pin-input');
          if (pinInput) pinInput.value = '';
          try {
            authModal.showModal();
          } catch (err) {
            authModal.classList.add('active');
          }
        } else {
          // Fallback: reload page to trigger auth lock
          window.location.reload();
        }
      });
    }
  }

  loadBusinessProfile() {
    try {
      const saved = localStorage.getItem(this.BIZ_STORAGE_KEY);
      if (saved) {
        const profile = JSON.parse(saved);
        if (profile && (profile.name || profile.pin)) {
          this.state.businessDetails = { ...this.state.businessDetails, ...profile };
          this.saveState();
          try {
            localStorage.setItem(this.BIZ_STORAGE_KEY, JSON.stringify(this.state.businessDetails));
          } catch (e) {}
          this.applyBusinessProfile(this.state.businessDetails);
          this.hideOnboardingOverlay();
          return this.state.businessDetails;
        }
      }
    } catch (e) {
      console.warn('Could not load business profile:', e);
    }

    if (this.state.businessDetails && (this.state.businessDetails.name || this.state.businessDetails.pin)) {
      this.saveState();
      try {
        localStorage.setItem(this.BIZ_STORAGE_KEY, JSON.stringify(this.state.businessDetails));
      } catch (e) {}
      this.applyBusinessProfile(this.state.businessDetails);
      this.hideOnboardingOverlay();
      return this.state.businessDetails;
    }

    return null;
  }

  setupFirstTimeOnboardingModal() {
    const setupModal = document.getElementById('setup-modal');
    const setupForm = document.getElementById('setup-modal-form');

    const bizName = this.state.businessDetails?.name;

    if (!bizName && setupModal && setupModal.showModal) {
      try {
        setupModal.showModal();
      } catch (err) {
        console.warn('Could not call showModal on setup-modal:', err);
      }
    } else if (bizName) {
      this.applyBusinessProfile(this.state.businessDetails);
    }

    if (setupForm) {
      setupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('setup-biz-name')?.value.trim();
        const category = document.getElementById('setup-biz-category')?.value;
        const phone = document.getElementById('setup-biz-phone')?.value.trim();
        const workforceSize = document.getElementById('setup-workforce-size')?.value;
        const rawPin = document.getElementById('setup-biz-pin')?.value.trim();

        if (!name || !category || !phone || !workforceSize) return;

        const pin = rawPin ? btoa(rawPin) : (this.state.businessDetails?.pin || '');

        this.state.businessDetails = {
          name,
          category,
          phone,
          workforceSize,
          pin,
          createdAt: new Date().toISOString()
        };

        // Save state to localStorage
        this.saveState();

        // Also sync BIZ_STORAGE_KEY
        try {
          localStorage.setItem(this.BIZ_STORAGE_KEY, JSON.stringify(this.state.businessDetails));
        } catch (err) {}

        // Apply profile to UI elements
        this.applyBusinessProfile(this.state.businessDetails);

        // Close modal
        if (setupModal && setupModal.close) {
          setupModal.close();
        }

        // Trigger Success Toast
        this.showToast('Welcome to PayRozgar!', 'success');
      });
    }
  }

  applyBusinessProfile(profile) {
    if (!profile) return;

    this.state.businessDetails = { ...this.state.businessDetails, ...profile };
    this.saveState();

    try {
      localStorage.setItem(this.BIZ_STORAGE_KEY, JSON.stringify(this.state.businessDetails));
    } catch (e) {}

    // Dynamically update dashboard title to include business name
    const greetingTitle = document.getElementById('dash-greeting-title');
    if (greetingTitle) greetingTitle.textContent = 'Monthly payroll for ' + profile.name;

    // Update sidebar profile name to match business name
    const sidebarName = document.getElementById('sidebar-user-name');
    if (sidebarName) sidebarName.textContent = profile.name;

    // Update Logo Subtitle
    const logoSub = document.querySelector('.logo-text span');
    if (logoSub) {
      logoSub.textContent = `${profile.name} • ${profile.category}`;
    }

    // Update User Profile Role in Sidebar
    const userRole = document.querySelector('.user-role');
    if (userRole) {
      userRole.textContent = `Admin`;
    }

    // Update Settings Summary
    const settingsSummary = document.getElementById('settings-biz-summary');
    if (settingsSummary) {
      settingsSummary.innerHTML = `<strong>Business Name:</strong> ${profile.name} &nbsp;|&nbsp; <strong>Category:</strong> ${profile.category} &nbsp;|&nbsp; <strong>Phone:</strong> ${profile.phone} &nbsp;|&nbsp; <strong>Workforce Size:</strong> ${profile.workforceSize} employees`;
    }
  }

  hideOnboardingOverlay() {
    const overlay = document.getElementById('onboarding-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
    }
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

    const photo = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&bold=true`;

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

  // Dedicated Record Overtime Modal & Logic (FR-04)
  setupRecordOvertimeModal() {
    const openBtn = document.getElementById('open-record-ot-btn');
    if (openBtn) {
      openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openRecordOvertimeModal();
      });
    }

    // Support both native dialog (#record-ot-modal) and overlay (#record-overtime-modal)
    const nativeModal = document.getElementById('record-ot-modal');
    const closeBtn = document.getElementById('record-ot-dialog-close-btn') || document.getElementById('record-ot-close-btn');
    const cancelBtn = document.getElementById('record-ot-dialog-cancel-btn') || document.getElementById('record-ot-cancel-btn');
    const form = document.getElementById('record-ot-dialog-form') || document.getElementById('record-overtime-form');
    const hoursInput = document.getElementById('ot-dialog-hours') || document.getElementById('ot-hours');
    const rateInput = document.getElementById('ot-dialog-rate') || document.getElementById('ot-rate');
    const calcPreview = document.getElementById('ot-dialog-calc-preview') || document.getElementById('ot-calc-preview');

    const updateCalcPreview = () => {
      const hrs = parseFloat(hoursInput?.value) || 0;
      const rate = parseFloat(rateInput?.value) || 80;
      if (calcPreview) {
        calcPreview.textContent = this.formatCurrency(hrs * rate);
      }
    };

    if (hoursInput) hoursInput.addEventListener('input', updateCalcPreview);
    if (rateInput) rateInput.addEventListener('input', updateCalcPreview);

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeRecordOvertimeModal());
    if (cancelBtn) cancelBtn.addEventListener('click', () => this.closeRecordOvertimeModal());

    if (form) {
      form.addEventListener('submit', (e) => this.handleRecordOvertimeSubmit(e));
    }
  }

  openRecordOvertimeModal(preselectEmpId = null) {
    const nativeModal = document.getElementById('record-ot-modal');
    const overlayModal = document.getElementById('record-overtime-modal');
    const select = document.getElementById('ot-dialog-emp-select') || document.getElementById('ot-emp-select');
    const dateInput = document.getElementById('ot-dialog-date') || document.getElementById('ot-date');
    const hoursInput = document.getElementById('ot-dialog-hours') || document.getElementById('ot-hours');
    const rateInput = document.getElementById('ot-dialog-rate') || document.getElementById('ot-rate');
    const calcPreview = document.getElementById('ot-dialog-calc-preview') || document.getElementById('ot-calc-preview');

    if (select) {
      select.innerHTML = this.state.employees.map(emp =>
        `<option value="${emp.id}" ${preselectEmpId === emp.id ? 'selected' : ''}>${emp.name} (${emp.id}) — Dept: ${emp.department}</option>`
      ).join('');
    }

    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }

    if (hoursInput && !hoursInput.value) {
      hoursInput.value = '2.5';
    }

    if (rateInput && !rateInput.value) {
      rateInput.value = '80';
    }

    const hrs = parseFloat(hoursInput?.value) || 2.5;
    const rate = parseFloat(rateInput?.value) || 80;
    if (calcPreview) calcPreview.textContent = this.formatCurrency(hrs * rate);

    if (nativeModal && nativeModal.showModal) {
      try {
        nativeModal.showModal();
      } catch(e) {
        if (overlayModal) overlayModal.classList.add('active');
      }
    } else if (overlayModal) {
      overlayModal.classList.add('active');
    }

    if (hoursInput) setTimeout(() => hoursInput.focus(), 100);
  }

  closeRecordOvertimeModal() {
    const nativeModal = document.getElementById('record-ot-modal');
    const overlayModal = document.getElementById('record-overtime-modal');
    const form1 = document.getElementById('record-ot-dialog-form');
    const form2 = document.getElementById('record-overtime-form');

    if (nativeModal && nativeModal.close) {
      try { nativeModal.close(); } catch(e) {}
    }
    if (overlayModal) overlayModal.classList.remove('active');
    if (form1) form1.reset();
    if (form2) form2.reset();
  }

  handleRecordOvertimeSubmit(e) {
    e.preventDefault();

    const empId = document.getElementById('ot-dialog-emp-select')?.value || document.getElementById('ot-emp-select')?.value;
    const date = document.getElementById('ot-dialog-date')?.value || document.getElementById('ot-date')?.value;
    const hours = parseFloat(document.getElementById('ot-dialog-hours')?.value || document.getElementById('ot-hours')?.value) || 0;
    const rate = parseFloat(document.getElementById('ot-dialog-rate')?.value || document.getElementById('ot-rate')?.value) || 80;
    const reason = (document.getElementById('ot-dialog-reason')?.value || document.getElementById('ot-reason')?.value || '').trim() || 'Late shift overtime';

    if (!empId || hours <= 0 || rate <= 0) return;

    const emp = this.state.employees.find(e => e.id === empId);
    if (!emp) return;

    const otPay = hours * rate;

    // Update specific employee's total overtime calculation
    emp.otHours = (emp.otHours || 0) + hours;
    emp.overtime = (emp.overtime || 0) + otPay;
    emp.otRate = rate;
    emp.lastOtNote = `${hours}h @ ₹${rate}/h: ${reason}`;

    // Push new OT object to state.overtimeLog
    if (!Array.isArray(this.state.overtimeLog)) {
      this.state.overtimeLog = [];
    }

    const otRecord = {
      id: `OT-${Date.now()}`,
      empId,
      empName: emp.name,
      date,
      hours,
      rate,
      amount: otPay,
      reason
    };

    this.state.overtimeLog.push(otRecord);

    if (!Array.isArray(emp.otLogs)) emp.otLogs = [];
    emp.otLogs.push(otRecord);

    // Save & update UI views
    this.saveState();
    this.renderOvertimeTable();
    this.renderPayrollTable();
    this.renderDashboardMetrics();

    this.closeRecordOvertimeModal();
    this.showToast(`Recorded ${hours}h OT (${this.formatCurrency(otPay)}) for ${emp.name}`, 'success');
  }

  renderOvertimeTable() {
    const tbody = document.querySelector('#overtime-table tbody');
    const sumHoursEl = document.getElementById('ot-summary-hours');
    const sumAmountEl = document.getElementById('ot-summary-amount');
    const sumCountEl = document.getElementById('ot-summary-emp-count');

    const employees = this.activeEmployees;
    let totalHours = 0;
    let totalAmount = 0;
    let empCount = 0;

    if (tbody) tbody.innerHTML = '';

    employees.forEach(emp => {
      const otHours = emp.otHours || (emp.overtime ? emp.overtime / 80 : 0);
      const otPay = emp.overtime || 0;
      const rate = emp.otRate || 80;

      totalHours += otHours;
      totalAmount += otPay;
      if (otHours > 0) empCount++;

      if (tbody) {
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
          <td><strong>${otHours.toFixed(1)} hrs</strong></td>
          <td>${this.formatCurrency(rate)}/hr</td>
          <td><strong style="color: var(--accent);">${this.formatCurrency(otPay)}</strong></td>
          <td>
            <button class="btn-sm ot-log-btn" data-emp-id="${emp.id}">+ Log OT</button>
          </td>
        `;

        const logBtn = tr.querySelector('.ot-log-btn');
        if (logBtn) {
          logBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.openRecordOvertimeModal(emp.id);
          });
        }

        tbody.appendChild(tr);
      }
    });

    if (sumHoursEl) sumHoursEl.textContent = `${totalHours.toFixed(1)} hrs`;
    if (sumAmountEl) sumAmountEl.textContent = this.formatCurrency(totalAmount);
    if (sumCountEl) sumCountEl.textContent = `${empCount} Staff`;
  }

  // Audited Financial Adjustments (FR-06)
  setupAdjustmentModal() {
    const advanceBtns = ['open-record-advance-btn', 'open-advance-inline-btn', 'qa-record-advance'];
    const deductionBtns = ['open-add-deduction-btn', 'open-deduction-inline-btn'];

    advanceBtns.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openAdjustmentModal('advance');
        });
      }
    });

    deductionBtns.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openAdjustmentModal('deduction');
        });
      }
    });

    const closeBtn = document.getElementById('adj-dialog-close-btn');
    const cancelBtn = document.getElementById('adj-dialog-cancel-btn');
    const form = document.getElementById('adjustment-form');

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeAdjustmentModal());
    if (cancelBtn) cancelBtn.addEventListener('click', () => this.closeAdjustmentModal());

    if (form) {
      form.addEventListener('submit', (e) => this.handleAdjustmentSubmit(e));
    }
  }

  openAdjustmentModal(type = 'advance') {
    const modal = document.getElementById('adjustment-modal');
    const titleEl = document.getElementById('adjustment-modal-title');
    const typeInput = document.getElementById('adj-type');
    const select = document.getElementById('adj-emp-select');
    const dateInput = document.getElementById('adj-date');
    const amountInput = document.getElementById('adj-amount');
    const reasonInput = document.getElementById('adj-reason');
    const submitBtn = document.getElementById('adj-dialog-submit-btn');

    if (!modal) return;

    if (typeInput) typeInput.value = type;
    if (titleEl) {
      titleEl.textContent = type === 'advance' ? 'Record Salary Advance (FR-06)' : 'Add Salary Deduction (FR-06)';
    }
    if (submitBtn) {
      submitBtn.textContent = type === 'advance' ? 'Save Advance' : 'Save Deduction';
    }

    if (select) {
      select.innerHTML = this.state.employees.map(emp =>
        `<option value="${emp.id}">${emp.name} (${emp.id}) — Dept: ${emp.department}</option>`
      ).join('');
    }

    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }

    if (amountInput && !amountInput.value) {
      amountInput.value = '1500';
    }

    if (reasonInput) reasonInput.value = '';

    if (modal.showModal) {
      try {
        modal.showModal();
      } catch (err) {
        modal.classList.add('active');
      }
    } else {
      modal.classList.add('active');
    }

    if (amountInput) setTimeout(() => amountInput.focus(), 100);
  }

  closeAdjustmentModal() {
    const modal = document.getElementById('adjustment-modal');
    const form = document.getElementById('adjustment-form');
    if (modal && modal.close) {
      try { modal.close(); } catch (e) {}
    }
    if (modal) modal.classList.remove('active');
    if (form) form.reset();
  }

  handleAdjustmentSubmit(e) {
    e.preventDefault();

    const empId = document.getElementById('adj-emp-select')?.value;
    const type = document.getElementById('adj-type')?.value || 'advance';
    const amount = parseFloat(document.getElementById('adj-amount')?.value) || 0;
    const date = document.getElementById('adj-date')?.value;
    const reason = document.getElementById('adj-reason')?.value.trim();

    if (!empId || amount <= 0 || !reason) {
      this.showToast('Audit reason note is required for financial adjustments.', 'warning');
      return;
    }

    const emp = this.state.employees.find(e => e.id === empId);
    if (!emp) return;

    // Update employee state balance
    emp.deductions = (emp.deductions || 0) + amount;

    // Create chronological log entry
    const entry = {
      id: `ADJ-${Date.now()}`,
      empId,
      empName: emp.name,
      empPhoto: emp.photo,
      type, // 'advance' or 'deduction'
      amount,
      date,
      reason,
      createdAt: new Date().toISOString()
    };

    if (!Array.isArray(this.state.adjustmentsLog)) {
      this.state.adjustmentsLog = [];
    }
    this.state.adjustmentsLog.unshift(entry);

    // Save & re-render UI views
    this.saveState();
    this.renderAdjustments();
    this.renderPayrollTable();
    this.renderDashboardMetrics();

    this.closeAdjustmentModal();
    const label = type === 'advance' ? 'Salary Advance' : 'Deduction';
    this.showToast(`Recorded ${this.formatCurrency(amount)} ${label} for ${emp.name}`, 'success');
  }

  renderAdjustments() {
    const advancesTbody = document.querySelector('#advances-history-table tbody');
    const deductionsTbody = document.querySelector('#deductions-history-table tbody');

    const logs = this.state.adjustmentsLog || [];

    if (advancesTbody) advancesTbody.innerHTML = '';
    if (deductionsTbody) deductionsTbody.innerHTML = '';

    const advances = logs.filter(l => l.type === 'advance');
    const deductions = logs.filter(l => l.type === 'deduction');

    if (advancesTbody) {
      if (advances.length === 0) {
        advancesTbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-light); padding:1.5rem;">No salary advances recorded yet.</td></tr>`;
      } else {
        advances.forEach(entry => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><span style="font-size: 0.8125rem; font-weight: 600;">${entry.date}</span></td>
            <td><strong>${entry.empName}</strong></td>
            <td><strong style="color: var(--accent);">${this.formatCurrency(entry.amount)}</strong></td>
            <td><span style="font-size: 0.8125rem; color: var(--text-light);">${entry.reason}</span></td>
          `;
          advancesTbody.appendChild(tr);
        });
      }
    }

    if (deductionsTbody) {
      if (deductions.length === 0) {
        deductionsTbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-light); padding:1.5rem;">No deductions recorded yet.</td></tr>`;
      } else {
        deductions.forEach(entry => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><span style="font-size: 0.8125rem; font-weight: 600;">${entry.date}</span></td>
            <td><strong>${entry.empName}</strong></td>
            <td><strong style="color: var(--error, #ef4444);">${this.formatCurrency(entry.amount)}</strong></td>
            <td><span style="font-size: 0.8125rem; color: var(--text-light);">${entry.reason}</span></td>
          `;
          deductionsTbody.appendChild(tr);
        });
      }
    }
  }

  // 5. Render Completed Payments History Audit Log (FR-08)
  renderPaymentHistory() {
    const tbody = document.querySelector('#payments-history-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    const history = this.state.paymentHistory || [];

    if (history.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-light); padding:2rem;">No completed payment records found.</td></tr>`;
      return;
    }

    history.forEach(item => {
      const tr = document.createElement('tr');
      const photo = item.empPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.empName)}&background=random&color=fff&bold=true`;
      const methodBadgeClass = item.method === 'UPI' ? 'badge-info' : item.method === 'Bank Transfer' ? 'badge-present' : 'badge-warning';

      tr.innerHTML = `
        <td>
          <div class="employee-cell">
            <img src="${photo}" alt="${item.empName}">
            <div>
              <div class="employee-name">${item.empName}</div>
              <div class="employee-id">${item.empId || item.id}</div>
            </div>
          </div>
        </td>
        <td><strong style="color: var(--success, #10b981); font-size: 0.95rem;">${this.formatCurrency(item.amount)}</strong></td>
        <td><span style="font-size: 0.8125rem; font-weight: 600;">${item.datePaid}</span></td>
        <td><span class="badge ${methodBadgeClass}">${item.method}</span></td>
        <td><span style="font-size: 0.8125rem; color: var(--text-light);">${item.reference || item.notes || 'Disbursed'}</span></td>
      `;
      tbody.appendChild(tr);
    });
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

      document.querySelectorAll('.back-to-dash-btn').forEach(btn => {
        btn.style.display = pageName === 'dashboard' ? 'none' : 'flex';
      });

      if (pageName === 'dashboard') {
        this.animateMetrics();
        this.renderDashboardMetrics();
      } else if (pageName === 'overtime') {
        this.renderOvertimeTable();
      } else if (pageName === 'advances') {
        this.renderAdjustments();
      } else if (pageName === 'payments') {
        this.renderPaymentHistory();
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

  setupQuickActions() {
    const addEmpBtn = document.getElementById('qa-add-employee');
    if (addEmpBtn) {
      addEmpBtn.addEventListener('click', () => this.openAddEmployeeModal());
    }

    const markAttBtn = document.getElementById('qa-mark-attendance');
    if (markAttBtn) {
      markAttBtn.addEventListener('click', () => this.showPage('attendance', true));
    }

    const addOtBtn = document.getElementById('qa-add-overtime');
    if (addOtBtn) {
      addOtBtn.addEventListener('click', () => this.openRecordOvertimeModal());
    }

    const recAdvBtn = document.getElementById('qa-record-advance');
    if (recAdvBtn) {
      recAdvBtn.addEventListener('click', () => this.openRecordEntryModalWith('deduction'));
    }

    const reviewBtn = document.getElementById('dashboard-review-btn');
    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => this.showPage('payroll', true));
    }

    const reviewLink = document.getElementById('dashboard-review-payroll-link');
    if (reviewLink) {
      reviewLink.addEventListener('click', () => this.showPage('payroll', true));
    }
  }

  openRecordEntryModalWith(type = 'overtime') {
    this.openRecordEntryModal();
    const radio = document.querySelector(`input[name="entryType"][value="${type}"]`);
    if (radio) {
      radio.checked = true;
    }
  }

  // 3. Render Dynamic Dashboard Metrics & Minimal Payroll Preview Table
  renderDashboardMetrics() {
    const totalEmpEl = document.getElementById('dash-total-emp');
    const totalPayableEl = document.getElementById('dash-total-payable');
    const payableSubEl = document.getElementById('dash-payable-sub');
    const pendingPaymentsEl = document.getElementById('dash-pending-payments');
    const attPresentEl = document.getElementById('dash-att-present');
    const attAbsentEl = document.getElementById('dash-att-absent');
    const attHalfdayEl = document.getElementById('dash-att-halfday');
    const attLeaveEl = document.getElementById('dash-att-leave');
    const otBadgeEl = document.getElementById('dash-ot-badge');

    const employees = this.activeEmployees;
    const totalEmp = employees.length;

    let totalPayable = 0;
    let totalPending = 0;
    let totalOtHoursSum = 0;
    let counts = { present: 0, absent: 0, halfday: 0, leave: 0 };

    employees.forEach(emp => {
      const net = emp.salary + (emp.overtime || 0) - (emp.deductions || 0);
      totalPayable += net;

      const isPaid = emp.status !== 'absent';
      if (!isPaid) {
        totalPending += net;
      }

      const hrs = emp.otHours || (emp.overtime ? emp.overtime / 80 : 0);
      totalOtHoursSum += hrs;

      if (counts[emp.status] !== undefined) {
        counts[emp.status]++;
      }
    });

    if (totalEmpEl) totalEmpEl.textContent = totalEmp;
    if (totalPayableEl) totalPayableEl.textContent = this.formatCurrency(totalPayable);
    if (payableSubEl) payableSubEl.textContent = `Calculated for ${totalEmp} active shop employees`;
    if (pendingPaymentsEl) pendingPaymentsEl.textContent = this.formatCurrency(totalPending);

    if (attPresentEl) attPresentEl.textContent = `${counts.present} Present`;
    if (attAbsentEl) attAbsentEl.textContent = `${counts.absent} Absent`;
    if (attHalfdayEl) attHalfdayEl.textContent = `${counts.halfday} Half Day`;
    if (attLeaveEl) attLeaveEl.textContent = `${counts.leave} On Leave`;

    if (otBadgeEl) {
      otBadgeEl.textContent = `⏱ Overtime: ${totalOtHoursSum.toFixed(1)} hrs`;
    }

    // Render Minimal Preview Table (Employee Name, Net Pay, Status)
    const tbody = document.querySelector('#dashboard-payroll-table tbody');
    if (tbody) {
      tbody.innerHTML = '';
      employees.forEach(emp => {
        const netPayable = emp.salary + (emp.overtime || 0) - (emp.deductions || 0);
        const isPaid = emp.status !== 'absent';
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
          <td><strong style="font-size: 0.95rem;">${this.formatCurrency(netPayable)}</strong></td>
          <td><span class="badge ${isPaid ? 'badge-success' : 'badge-warning'}">${isPaid ? 'Paid' : 'Pending'}</span></td>
        `;
        tbody.appendChild(tr);
      });
    }
  }

  // 4. Render & Manage Attendance (P, A, HD, L buttons)
  renderAttendanceTable() {
    const tbody = document.querySelector('#attendance .data-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    this.activeEmployees.forEach(emp => {
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
            <button class="attendance-btn ${emp.status === 'present' ? 'active present' : ''}" data-status="present" title="Mark Present">✓ Present</button>
            <button class="attendance-btn ${emp.status === 'absent' ? 'active absent' : ''}" data-status="absent" title="Mark Absent">✕ Absent</button>
            <button class="attendance-btn ${emp.status === 'halfday' ? 'active halfday' : ''}" data-status="halfday" title="Mark Half Day">◒ Half</button>
            <button class="attendance-btn ${emp.status === 'leave' ? 'active leave' : ''}" data-status="leave" title="Mark Leave">✈ Leave</button>
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

    if (!this.state.attendanceHistory) {
      this.state.attendanceHistory = [];
    }

    const today = new Date().toISOString().split('T')[0];
    const existingIndex = this.state.attendanceHistory.findIndex(
      rec => rec.empId === empId && rec.date === today
    );

    const isEdit = existingIndex !== -1;

    if (isEdit) {
      this.state.attendanceHistory[existingIndex].status = status;
      this.state.attendanceHistory[existingIndex].timestamp = new Date().toISOString();
    } else {
      this.state.attendanceHistory.push({
        empId,
        date: today,
        status,
        timestamp: new Date().toISOString()
      });
    }

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
    if (isEdit) {
      this.showToast('Updated attendance record for today', 'info');
    } else {
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
        `${emp.name} marked as ${titles[status] || status}`,
        toastTypes[status] || 'info'
      );
    }
  }

  markAllPresent() {
    this.state.employees.forEach(emp => {
      emp.status = 'present';
      emp.checkIn = '09:00 AM';
      emp.checkOut = '06:00 PM';
      emp.hours = '9h 00m';
    });

    this.saveState();
    this.renderAttendanceTable();
    this.renderEmployeesGrid();
    this.renderDashboardMetrics();
    this.updateStatsBar();
    this.showToast('Marked all employees present for today!', 'success');
  }

  updateStatsBar() {
    const counts = { present: 0, absent: 0, halfday: 0, leave: 0 };
    this.activeEmployees.forEach(emp => {
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

  // 5. Render Employees Grid (SRS Data Requirements)
  renderEmployeesGrid() {
    const grid = document.querySelector('#employees .employees-grid');
    if (!grid) return;

    grid.innerHTML = '';

    this.state.employees.forEach(emp => {
      const card = document.createElement('div');
      card.className = 'employee-card';
      const isActive = emp.status !== 'inactive';
      const joiningDate = emp.joiningDate || '15 Jan 2024';
      const phone = emp.phone || '+91 98765 43210';
      const salaryType = emp.salaryType || 'Monthly';

      card.innerHTML = `
        <div class="employee-card-header" style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div style="display:flex; gap:0.75rem; align-items:center;">
            <img src="${emp.photo}" alt="${emp.name}" class="employee-photo">
            <div>
              <h4 style="margin:0; font-size:1rem; font-weight:700; color:var(--text);">${emp.name}</h4>
              <p style="margin:0; font-size:0.8125rem; color:var(--text-light);">${emp.role}</p>
            </div>
          </div>
          <span style="font-size:0.75rem; font-weight:700; color:${isActive ? 'var(--success, #10b981)' : 'var(--text-lighter)'}; display:flex; align-items:center; gap:0.25rem;">
            ${isActive ? '● Active' : '○ Inactive'}
          </span>
        </div>
        <div class="employee-card-body" style="margin-top:0.85rem; display:flex; flex-direction:column; gap:0.35rem; font-size:0.8125rem; color:var(--text-light);">
          <div style="display:flex; justify-content:space-between;">
            <span>Emp ID:</span>
            <strong style="color:var(--text); font-family:monospace;">${emp.id}</strong>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span>Phone:</span>
            <strong style="color:var(--text);">${phone}</strong>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span>Joined:</span>
            <strong style="color:var(--text);">${joiningDate}</strong>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span>Salary Type:</span>
            <span class="badge badge-info" style="font-size:0.7rem;">${salaryType}</span>
          </div>
        </div>
        <div class="employee-card-footer" style="margin-top:0.85rem; padding-top:0.75rem; border-top:1px solid var(--border); display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div class="label" style="font-size:0.7rem; color:var(--text-lighter);">Base Salary</div>
            <div class="value" style="font-weight:700; color:var(--text);">${this.formatCurrency(emp.salary)}</div>
          </div>
          <div style="display:flex; gap:0.35rem; align-items:center;">
            <button class="btn-sm view-emp-payslip-btn" data-emp-id="${emp.id}">Payslip</button>
            <button class="btn-text toggle-emp-status-btn" data-emp-id="${emp.id}" style="color:${isActive ? 'var(--error)' : 'var(--success)'}; font-size:0.75rem;">
              ${isActive ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        </div>
      `;

      const payslipBtn = card.querySelector('.view-emp-payslip-btn');
      if (payslipBtn) {
        payslipBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.generatePayslip(emp.id);
        });
      }

      const toggleBtn = card.querySelector('.toggle-emp-status-btn');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleEmployeeStatus(emp.id);
        });
      }

      grid.appendChild(card);
    });
  }

  // 6. Overhauled Payroll Calculation Engine (FR-07, FR-08)
  setupPayrollEngineControls() {
    const finalizeBtn = document.getElementById('finalize-payroll-btn');
    const reopenBtn = document.getElementById('payroll-reopen-btn');
    const closeBreakdownBtn = document.getElementById('breakdown-modal-close-btn');
    const doneBreakdownBtn = document.getElementById('breakdown-modal-done-btn');

    if (finalizeBtn) {
      finalizeBtn.addEventListener('click', () => {
        this.state.payrollState = 'finalized';
        this.saveState();
        this.renderPayrollTable();
        this.showToast('Payroll finalized for December 2026. Explicit reopen required to edit.', 'warning');
      });
    }

    if (reopenBtn) {
      reopenBtn.addEventListener('click', () => {
        this.state.payrollState = 'draft';
        this.saveState();
        this.renderPayrollTable();
        this.showToast('Payroll reopened for editing.', 'info');
      });
    }

    if (closeBreakdownBtn) closeBreakdownBtn.addEventListener('click', () => this.closePayrollBreakdownModal());
    if (doneBreakdownBtn) doneBreakdownBtn.addEventListener('click', () => this.closePayrollBreakdownModal());
  }

  closePayrollBreakdownModal() {
    const modal = document.getElementById('payroll-breakdown-modal');
    if (modal && modal.close) {
      try { modal.close(); } catch(e) {}
    }
    if (modal) modal.classList.remove('active');
  }

  openPayrollBreakdownModal(emp) {
    const modal = document.getElementById('payroll-breakdown-modal');
    const nameEl = document.getElementById('breakdown-emp-name');
    const idEl = document.getElementById('breakdown-emp-id');
    const baseEl = document.getElementById('bm-base');
    const otEl = document.getElementById('bm-ot');
    const additionsEl = document.getElementById('bm-additions');
    const advancesEl = document.getElementById('bm-advances');
    const deductionsEl = document.getElementById('bm-deductions');
    const netEl = document.getElementById('bm-net');

    if (!modal || !emp) return;

    const base = emp.salary || 0;
    const ot = emp.overtime || 0;
    const additions = emp.additions || 0;
    const advances = emp.advances || 0;
    const deductions = emp.deductions || 0;
    const netPay = base + ot + additions - advances - deductions;

    if (nameEl) nameEl.textContent = `${emp.name} — Math Breakdown`;
    if (idEl) idEl.textContent = `${emp.id} • ${emp.role} (${emp.department})`;
    if (baseEl) baseEl.textContent = this.formatCurrency(base);
    if (otEl) otEl.textContent = `+${this.formatCurrency(ot)}`;
    if (additionsEl) additionsEl.textContent = `+${this.formatCurrency(additions)}`;
    if (advancesEl) advancesEl.textContent = `-${this.formatCurrency(advances)}`;
    if (deductionsEl) deductionsEl.textContent = `-${this.formatCurrency(deductions)}`;
    if (netEl) netEl.textContent = this.formatCurrency(netPay);

    if (modal.showModal) {
      try {
        modal.showModal();
      } catch (e) {
        modal.classList.add('active');
      }
    } else {
      modal.classList.add('active');
    }
  }

  renderPayrollTable() {
    const tbody = document.querySelector('#payroll-engine-table tbody') || document.querySelector('#payroll .data-table tbody');
    const stepDraft = document.getElementById('step-draft');
    const stepFinalized = document.getElementById('step-finalized');
    const stepPaid = document.getElementById('step-paid');
    const warningBanner = document.getElementById('payroll-finalized-banner');
    const finalizeBtn = document.getElementById('finalize-payroll-btn');

    const state = this.state.payrollState || 'draft';

    // Update Stepper Active State
    if (stepDraft) stepDraft.className = `stepper-step ${state === 'draft' ? 'active' : ''}`;
    if (stepFinalized) stepFinalized.className = `stepper-step ${state === 'finalized' ? 'active' : ''}`;
    if (stepPaid) stepPaid.className = `stepper-step ${state === 'paid' ? 'active' : ''}`;

    // Update Warning Banner & Finalize Button
    if (warningBanner) {
      warningBanner.style.display = state === 'finalized' ? 'flex' : 'none';
    }
    if (finalizeBtn) {
      if (state === 'finalized') {
        finalizeBtn.disabled = true;
        finalizeBtn.textContent = 'Payroll Finalized ✓';
        finalizeBtn.style.opacity = '0.6';
      } else {
        finalizeBtn.disabled = false;
        finalizeBtn.textContent = 'Finalize Payroll';
        finalizeBtn.style.opacity = '1';
      }
    }

    if (!tbody) return;
    tbody.innerHTML = '';

    let totalNet = 0;
    let totalBase = 0;
    let totalAdditions = 0;
    let totalOt = 0;
    let totalAdvances = 0;
    let totalDeductions = 0;

    this.activeEmployees.forEach(emp => {
      const base = emp.salary || 0;
      const ot = emp.overtime || 0;
      const additions = emp.additions || 0;
      const advances = emp.advances || 0;
      const deductions = emp.deductions || 0;

      // Exact math formula: Net Pay = Base + OT + Additions - Advances - Deductions
      const netPay = base + ot + additions - advances - deductions;

      totalBase += base;
      totalOt += ot;
      totalAdditions += additions;
      totalAdvances += advances;
      totalDeductions += deductions;
      totalNet += netPay;

      const isPaid = state === 'paid' || emp.status === 'present';

      const tr = document.createElement('tr');
      tr.style.cursor = 'pointer';
      tr.title = 'Click to view line-item math breakdown';

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
        <td>${this.formatCurrency(base)}</td>
        <td><span style="color: var(--success, #10b981); font-weight:600;">+${this.formatCurrency(ot)}</span></td>
        <td><span style="color: var(--success, #10b981); font-weight:600;">+${this.formatCurrency(additions)}</span></td>
        <td><span style="color: var(--error, #ef4444); font-weight:600;">-${this.formatCurrency(advances)}</span></td>
        <td><span style="color: var(--error, #ef4444); font-weight:600;">-${this.formatCurrency(deductions)}</span></td>
        <td><strong style="font-size: 1rem; color: var(--text);">${this.formatCurrency(netPay)}</strong></td>
        <td>
          <span class="badge ${isPaid ? 'badge-success' : 'badge-warning'}">${isPaid ? 'Paid' : 'Pending'}</span>
          <button class="btn-sm payslip-btn" style="margin-left:0.35rem;" data-emp-id="${emp.id}">Payslip</button>
        </td>
      `;

      const payslipBtn = tr.querySelector('.payslip-btn');
      if (payslipBtn) {
        payslipBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.generatePayslip(emp.id);
        });
      }

      tr.addEventListener('click', () => {
        this.openPayrollBreakdownModal(emp);
      });

      tbody.appendChild(tr);
    });

    // Update Summary Stats Bar
    const sumTotalEl = document.getElementById('payroll-summary-total');
    const sumBaseEl = document.getElementById('payroll-summary-base');
    const sumAdditionsEl = document.getElementById('payroll-summary-additions');
    const sumDeductionsEl = document.getElementById('payroll-summary-deductions');

    if (sumTotalEl) sumTotalEl.textContent = this.formatCurrency(totalNet);
    if (sumBaseEl) sumBaseEl.textContent = this.formatCurrency(totalBase);
    if (sumAdditionsEl) sumAdditionsEl.textContent = `+${this.formatCurrency(totalAdditions + totalOt)}`;
    if (sumDeductionsEl) sumDeductionsEl.textContent = `-${this.formatCurrency(totalAdvances + totalDeductions)}`;
  }

  // Shareable Digital Pay Statement (FR-09)
  setupPayslipModalControls() {
    const closeBtn = document.getElementById('payslip-close-btn');
    const downloadBtn = document.getElementById('payslip-download-btn');
    const shareBtn = document.getElementById('payslip-share-btn');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closePayslipModal());
    }

    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        window.print();
      });
    }

    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        const empName = document.getElementById('ps-emp-name')?.textContent || 'Employee';
        const netPay = document.getElementById('ps-net-pay')?.textContent || '₹0';
        const bizName = document.getElementById('ps-biz-name')?.textContent || 'PayRozgar Shop';

        const shareText = `PayRozgar Statement from ${bizName} for ${empName}: Net Payable ${netPay} for December 2026.`;

        if (navigator.share) {
          navigator.share({
            title: `Pay Statement - ${empName}`,
            text: shareText,
            url: window.location.href
          }).catch(err => console.warn('Error sharing statement:', err));
        } else if (navigator.clipboard) {
          navigator.clipboard.writeText(shareText);
          this.showToast(`Pay statement text copied to clipboard for ${empName}!`, 'success');
        } else {
          this.showToast(`Statement generated for ${empName}: ${netPay}`, 'info');
        }
      });
    }
  }

  closePayslipModal() {
    const modal = document.getElementById('payslip-modal');
    if (modal && modal.close) {
      try { modal.close(); } catch(e) {}
    }
    if (modal) modal.classList.remove('active');
  }

  generatePayslip(employeeId) {
    const modal = document.getElementById('payslip-modal');
    const emp = this.state.employees.find(e => e.id === employeeId || e.name === employeeId) || this.state.employees[0];
    if (!modal || !emp) return;

    // Business details
    let biz = this.state.businessDetails || {};
    try {
        const savedBiz = localStorage.getItem(this.BIZ_STORAGE_KEY);
        if (savedBiz) {
            biz = JSON.parse(savedBiz);
        }
    } catch(e) {}
    const bizNameEl = document.getElementById('ps-biz-name');
    const bizSubEl = document.getElementById('ps-biz-sub');

    if (bizNameEl) bizNameEl.textContent = biz.name || 'PayRozgar Shop';
    if (bizSubEl) bizSubEl.textContent = `${biz.category || 'General Store'} • Phone: ${biz.phone || '9876543210'}`;

    // Employee details
    const empNameEl = document.getElementById('ps-emp-name');
    const empIdEl = document.getElementById('ps-emp-id');
    const dateEl = document.getElementById('ps-date');

    if (empNameEl) empNameEl.textContent = emp.name;
    if (empIdEl) empIdEl.textContent = `${emp.id} • ${emp.role || emp.department || 'Staff'}`;
    if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    // Math line items
    const base = emp.salary || 0;
    const ot = emp.overtime || 0;
    const additions = emp.additions || 0;
    const advances = emp.advances || 0;
    const deductions = emp.deductions || 0;
    const grossEarnings = base + ot + additions;
    const totalDeductions = advances + deductions;
    const netPay = grossEarnings - totalDeductions;

    // Populate earnings & deductions
    const baseEl = document.getElementById('ps-base');
    const otEl = document.getElementById('ps-ot');
    const totEarningsEl = document.getElementById('ps-tot-earnings');
    const advanceEl = document.getElementById('ps-advance');
    const taxEl = document.getElementById('ps-tax');
    const totDeductionsEl = document.getElementById('ps-tot-deductions');
    const netPayEl = document.getElementById('ps-net-pay');

    if (baseEl) baseEl.textContent = this.formatCurrency(base);
    if (otEl) otEl.textContent = `+${this.formatCurrency(ot)}`;
    if (totEarningsEl) totEarningsEl.textContent = this.formatCurrency(grossEarnings);
    if (advanceEl) advanceEl.textContent = `-${this.formatCurrency(advances)}`;
    if (taxEl) taxEl.textContent = `-${this.formatCurrency(deductions)}`;
    if (totDeductionsEl) totDeductionsEl.textContent = `-${this.formatCurrency(totalDeductions)}`;
    if (netPayEl) netPayEl.textContent = this.formatCurrency(netPay);

    // Attendance totals at bottom
    const attPresentEl = document.getElementById('ps-att-present');
    const attAbsentEl = document.getElementById('ps-att-absent');
    const otHoursEl = document.getElementById('ps-ot-hours');

    if (attPresentEl) attPresentEl.textContent = emp.status === 'absent' ? '24 days' : '26 days';
    if (attAbsentEl) attAbsentEl.textContent = emp.status === 'absent' ? '4 days' : '1 day';
    if (otHoursEl) otHoursEl.textContent = `${(emp.otHours || (emp.overtime ? emp.overtime / 80 : 0)).toFixed(1)} hrs`;

    // Show modal
    if (modal.showModal) {
      try {
        modal.showModal();
      } catch (err) {
        modal.classList.add('active');
      }
    } else {
      modal.classList.add('active');
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
      setTimeout(() => toast.remove(), 300);
    }, 2400);
  }

  setupSearch() {
    const searchInputs = [
      document.querySelector('.search-container input'),
      document.getElementById('emp-search')
    ];

    searchInputs.forEach(input => {
      if (input) {
        input.addEventListener('input', (e) => {
          this.handleSearch(e.target.value);
        });
      }
    });
  }

  handleSearch(query) {
    const q = query.toLowerCase().trim();

    // Filter table rows
    document.querySelectorAll('.data-table tbody tr').forEach(el => {
      const text = el.innerText.toLowerCase();
      el.style.display = !q || text.includes(q) ? '' : 'none';
    });

    // Instant local filtering of employee cards based on name or role
    document.querySelectorAll('.employee-card').forEach(card => {
      const name = card.querySelector('h4')?.textContent.toLowerCase() || '';
      const role = card.querySelector('p')?.textContent.toLowerCase() || '';
      const allText = card.innerText.toLowerCase();

      const matches = !q || name.includes(q) || role.includes(q) || allText.includes(q);
      card.style.display = matches ? '' : 'none';
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