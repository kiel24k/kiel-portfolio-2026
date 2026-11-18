import type { Portfolio, TechStack } from './types'

// Shared stack for the School Management System, RFID Library Management System and
// Virtual Learning System (the notes say these use the same stack).
const nodeStack: TechStack = {
  frontend: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'TanStack', 'WebSocket'],
  backend: ['Node.js', 'Express', 'Prisma'],
  database: ['PostgreSQL'],
  devops: ['Docker', 'Nginx', 'Cron'],
}

export const portfolio: Portfolio = {
  profile: {
    name: 'Ezekiel A. Bermudez',
    preferredName: 'Kiel',
    title: 'Full Stack Developer',
    location: 'Philippines',
    email: 'kielbermudez200104@gmail.com',
    phone: '+63 919 347 1522',
    resumeUrl: '/resume/Ezekiel-Bermudez-Resume.pdf',
    summary:
      'Full Stack Developer with 5+ years of experience, from academic projects to today, building production systems for organizations, schools and small businesses through freelance and client work. I own projects end to end: frontend, backend, database design, server deployment, automated backups and testing.',
  },

  education: [
    {
      school: 'Cavite State University',
      degree: 'Bachelor of Science in Information Technology',
      coursework: [
        'Software Engineering',
        'Database Systems',
        'Data Structures and Algorithms',
        'Operating Systems',
      ],
    },
  ],

  skills: [
    {
      category: 'Frontend',
      items: [
        'React',
        'Vue.js',
        'TypeScript',
        'JavaScript',
        'Tailwind CSS',
        'shadcn/ui',
        'TanStack',
        'Zustand',
        'PrimeVue',
        'MUI',
        'Bootstrap',
        'Chart.js',
        'Three.js',
      ],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'Laravel', 'PHP', 'Prisma', 'REST APIs', 'WebSocket', 'JWT'],
    },
    {
      category: 'Database',
      items: ['PostgreSQL', 'MySQL', 'MongoDB'],
    },
    {
      category: 'DevOps & Tools',
      items: [
        'Docker',
        'Cloudflare',
        'Nginx',
        'Linux',
        'Cron jobs',
        'Automated backups',
        'Git',
        'GitHub',
        'RFID/NFC integration',
      ],
    },
    {
      category: 'AI-Assisted Development',
      items: [
        'Claude and Claude Code for fast coding, debugging and code review',
        'Building custom agents and skills',
        'Prompt engineering',
      ],
    },
    {
      category: 'Soft Skills',
      items: ['Fast learner', 'Adaptable', 'Detail-oriented', 'Creative problem solver'],
    },
  ],

  projects: [
    // ------------------------------------------------------------------ HRIS
    {
      slug: 'hris',
      name: 'Human Resource Information System',
      shortName: 'HRIS',
      kind: 'Client / Production',
      status: 'In production',
      timeline: 'Dec 2025 – Jul 2026',
      audience: 'A multi-company organization: 64–70 companies with 350–450 employees in total.',
      role: 'Full Stack Developer',
      tagline:
        'A multi-company HR, payroll and attendance system in live use by 64–70 companies.',
      summary: [
        'Built and maintain a multi-company HRIS in live use by 64–70 companies, handling payroll and attendance for 350–450 employees.',
        'Automated payroll, tax and government contribution computation, loan deductions, and compensation and benefits.',
        'Delivered geofence and device-based attendance via API, 201 files, request workflows (OB, leave, OT, UT, offset), branch setup and RBAC.',
      ],
      responsibilities: [
        'Full stack development: frontend, backend and database',
        'Server maintenance',
        'System backups and maintenance, automated with scheduled tasks (cron)',
        'Testing',
      ],
      results: [
        { value: '64–70', label: 'companies' },
        { value: '350–450', label: 'employees' },
      ],
      stack: {
        frontend: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'TanStack', 'WebSocket'],
        backend: ['Laravel'],
        database: ['PostgreSQL'],
        devops: ['Docker', 'Nginx', 'Cron'],
      },
      featureGroups: [
        {
          title: 'Overview',
          items: [
            'Workforce summary and KPIs',
            'Time In / Time Out with a geofence check',
            'Your own requests and items awaiting your action',
            'Approve or reject with comments',
          ],
        },
        {
          title: 'Dashboard',
          items: [
            "Employee: today's status, leave balance and latest payslip",
            'Department Head: pending approvals and attendance issues',
            "HR: today's workforce and payroll readiness",
            'Finance: payroll totals, deductions and contributions',
            "Driver: today's trips, with accept or decline",
            'Curia: staff in the office, on OB and with birthdays',
          ],
        },
        {
          title: 'KPI',
          items: [
            'Create and update KPI templates',
            'Code, target and weight for each item',
            'Scoring per employee',
          ],
        },
        {
          title: 'Time Keeping',
          items: [
            'Time In / Time Out (location is verified)',
            'Location justification when outside the allowed area',
            'OB check-in on arrival at the destination',
            'Undo a time out',
            'Own attendance logs (print / CSV)',
            'Request an attendance correction',
          ],
        },
        {
          title: 'My Request',
          items: [
            'File Leave, OB, Overtime, Half Day, Undertime and Workday Offset requests',
            'OB with a map and multiple stops',
            'OT for multiple dates in a single filing',
            'Half day that uses 0.5 credit',
            'Attach files',
            'Cancel or delete a request',
          ],
        },
        {
          title: 'Leave Balance',
          items: [
            'Credits, used and remaining',
            'Leave ledger history',
            'OT balance and limit per window',
          ],
        },
        {
          title: 'My Payslip',
          items: [
            'List of released payslips',
            'Earnings, deductions and net pay',
            'Print or download (PDF / Excel / Word)',
          ],
        },
        {
          title: 'My Memo',
          items: ['Memo list with an unread filter', 'View or download attachments'],
        },
        {
          title: 'My Loan',
          items: [
            'Company, SSS and Pag-IBIG loans',
            'Request a company loan with a promissory note',
            'Record SSS / Pag-IBIG loans',
            'Payment history and next deduction',
          ],
        },
        {
          title: 'My Profile',
          items: [
            'Change cover and profile photos',
            'Edit profile and change password',
            'Personal and employment info',
            'Night differential and holiday work',
            'Government IDs, contributions and tax',
            'Retirement pay estimate',
          ],
        },
        {
          title: 'Employee Management',
          items: [
            'Employee list (search, filter, sort)',
            'Add and edit employees',
            'Export to Excel or PDF',
            'Delete or force delete',
            'Reset passwords',
            'Assign leave types, compensation and assets',
            'Approve sign-up and password reset requests',
            'Change history',
          ],
        },
        {
          title: 'Attendance & Timekeeping',
          items: [
            "Live view of today's attendance",
            'Roster by date with a status filter',
            'Create, edit, bulk-edit or delete attendance records',
            'Mark as no attendance or as scheduled',
            'Print or export',
            'Approve exceptions (bulk supported)',
          ],
        },
        {
          title: 'Schedule Assignment',
          items: [
            'Schedule templates (Window / Quota)',
            'Office, non-office and rest days',
            'Assign per employee or in bulk',
            'Rest day pay',
          ],
        },
        {
          title: 'Grace Period',
          items: [
            'Create, edit and delete grace periods',
            'Assign to or remove from employees',
            'Grace usage count and reset',
          ],
        },
        {
          title: 'Leave Management',
          items: [
            'Leave ledger (balance edits, audited)',
            'Credit allocation (paid or unpaid, credits per year)',
            'Annual reset: carry over, convert to cash or forfeit',
            'Year-end history',
          ],
        },
        {
          title: 'Contributions',
          items: [
            'SSS, PhilHealth and Pag-IBIG per employee',
            'ON/OFF toggle and which cutoff to deduct from',
            'Contribution table (SSS brackets, PhilHealth / Pag-IBIG rates)',
          ],
        },
        {
          title: 'Tax',
          items: [
            'Withholding tax (taxed or exempt)',
            'Computation breakdown',
            'BIR tax table',
          ],
        },
        {
          title: 'Loans',
          items: [
            'SSS, Pag-IBIG and company loans',
            'Add, approve or reject',
            'Payment schedule',
            'Mark as paid or unpaid (bulk supported)',
            'Deactivate or delete',
          ],
        },
        {
          title: 'Allowances, Bonuses, Incentives, Benefits & Deductions',
          items: [
            'Create, edit and delete items',
            'Fixed, percentage or formula',
            'Per-day amount',
            'Taxable and de minimis cap',
            'Include in or exclude from payroll',
          ],
        },
        {
          title: 'Annual Bonus',
          items: [
            '13th month, Christmas and Mid-Year',
            'Accrual period and payout cutoff',
            'Split into two installments',
            '13th month runs (compute and release)',
          ],
        },
        {
          title: 'Payroll',
          items: [
            'Create payroll (preview before submitting)',
            'Per-employee details (rate, recompute, review or return)',
            'Step 1: Approval',
            'Step 2: Checking',
            'Step 3: Funding (Excel export)',
            'Step 4: Payslip release and lock',
            'Locked and unlocked payroll',
            'Edit locked payroll (additional earnings or deductions)',
          ],
        },
        {
          title: 'Payroll Settings',
          items: [
            'Rest day pay',
            'OT pay (multiplier, whole hours)',
            'Loan setup (lending policy and loan income)',
            'Night differential',
            'Holiday management (calendar, pay rules, preview)',
          ],
        },
        {
          title: 'Request Center',
          items: [
            'Leave, OB, OT, Half Day, Undertime and Workday Offset',
            'Approve or reject (bulk supported)',
            'Edit or delete requests',
            'Review cancellation requests',
            'Create requests on behalf of employees',
            'OB settings (check-in and radius)',
            'OT settings (buffer, minimum and limit)',
          ],
        },
        {
          title: 'Memo',
          items: [
            'Post, edit and delete memos',
            'Send to everyone, to specific roles or to selected employees',
          ],
        },
        {
          title: 'Activity',
          items: ['Review location justifications', 'Approve or reject'],
        },
        {
          title: 'Recruitment',
          items: [
            'Hiring requests (confirm or reject)',
            'Access per request',
            'Add, edit or cancel applicants',
            'Stages: Screening, Interview, Consultation, Endorsement and Hiring',
            'Hired applicants become employees',
          ],
        },
        {
          title: 'Report Center',
          items: [
            'All reports (favorites, monthly export)',
            'Payroll, deductions and government-mandated reports',
            'Tenure and retirement',
            'Service incentive leave',
            'Loans and loan income',
            'Employee list',
            'Print (RDL) or CSV',
          ],
        },
        {
          title: 'Audit Logs',
          items: [
            'Audit trail (old and new values)',
            'Login activity',
            'Time in and time out logs',
            'Export to PDF or Excel',
          ],
        },
        {
          title: 'Notifications & Announcements',
          items: ['Notification feed', 'Create and publish for selected roles'],
        },
        {
          title: 'Messages',
          items: [
            'Direct and group chat',
            'Files, images, emoji, replies, unsend and reactions',
            'Pins, seen-by, typing and online status',
            'Voice and video calls',
            'Group management (members, photo, mute, leave)',
          ],
        },
        {
          title: 'Transport',
          items: [
            'Book a vehicle with multiple stops',
            'Warning when another trip overlaps on the same vehicle',
            'Booking approval',
            'Calendar',
            'Driver: accept or decline',
          ],
        },
        {
          title: 'Conference',
          items: ['Book a room (equipment, attendees)', 'Booking approval', 'Calendar'],
        },
        {
          title: 'Geofence',
          items: [
            'Location list (map and radius)',
            'Assign to employees (with a primary location)',
            'Map preview',
          ],
        },
        {
          title: 'Organization',
          items: [
            'Authorities and staff assignment (multiple authorities allowed)',
            'Departments',
            'Employment status (whether attendance is tracked)',
            'Compensation settings (salary types, policies, rules, history)',
            'Biometric monitor (punch logs, connection, turn devices on or off)',
            'Booking setup (rooms, drivers and vehicles)',
          ],
        },
        {
          title: 'Settings',
          items: [
            'Company profile (logo, government details, ND, minimum wage)',
            'Company assets',
            'System appearance and colors',
            'Notification sounds (custom sounds supported)',
            'Report Manager and Report Designer',
          ],
        },
        {
          title: 'About',
          items: [
            'System version',
            'Update the system',
            'Branch sites (updates and backups)',
            'Backups (on demand or scheduled, retention count, download)',
            'Restore (password required; a backup is taken first before restoring)',
          ],
        },
        {
          title: 'Manage Access',
          items: [
            'Assign roles and branches (bulk supported)',
            'Impersonate an employee',
            'Roles (create, edit, delete, default)',
            'Permissions per role',
          ],
        },
        {
          title: 'Branch Setup',
          items: ['Branches (logo, legal and trade name)', 'Employee access to branches'],
        },
        {
          title: 'System Control',
          items: [
            'Realtime health (force disconnect)',
            'Tracking of the pages users have open',
            'Refresh the Curia kiosk',
            'Login security (lockout, session duration)',
          ],
        },
        {
          title: 'Endpoint',
          items: ['Create, reissue or revoke tokens', 'Active token list'],
        },
        {
          title: 'AI Settings',
          items: [
            'On/off toggle, name and greeting',
            'Server address and connection test',
            'Model, creativity, memory and additional instructions',
          ],
        },
      ],
    },

    // ------------------------------------------------------- School Management System
    {
      slug: 'school-management-system',
      name: 'School Management System',
      shortName: 'School System',
      kind: 'Client / Production',
      status: "Completed Nov 2026 – handed over to the school's consultant",
      timeline: 'Nov 2026 (completed)',
      audience: 'A school with Senior High School and College levels.',
      role: 'Full Stack Developer',
      tagline:
        'An all-in-one school platform for Senior High School and College, with one login across Public, Student, Staff and Admin portals.',
      summary: [
        'Built an all-in-one school platform for Senior High School and College with a single login across Public, Student, Staff and Admin portals and a CMS-driven public website.',
        'Covers admissions, enrollment, cashiering and ledgers, grading and DepEd forms (SF2, SF7, SF9), attendance, e-learning with a quiz builder, guidance and clinic records, library and audit logs.',
        "Completed in November 2026 and handed over to the school's consultant; expected to serve an estimated minimum of 500 students and teachers.",
      ],
      responsibilities: [
        'Full stack development: frontend, backend and database',
        'Server management',
        'System backups',
        'Testing',
      ],
      results: [{ value: '500+', label: 'students & teachers expected (est. minimum)' }],
      stack: nodeStack,
      featureGroups: [
        {
          title: 'Website & Login',
          items: [
            'Single login for four portals: Public, Student, Staff and Admin',
            'Forgot/reset password, and self sign-up that goes through approval',
            'Campus switcher and portal switcher',
            'Public website with a CMS: pages, hero and footer, front page, branding and media',
            'Guest chat on the website and an Inquiries inbox for staff',
            'Theming (light/dark, accent, density), Demo mode and Demo guides',
          ],
        },
        {
          title: 'Admission',
          items: [
            'Online application form with status tracking via a tracking code',
            'Requirements checklist and file uploads',
            'Staff decisions: Accept, Waitlist or Reject, with an email to the family',
            'Admission schedule and applicant booking',
            'Admission slots: capacity and requirements per program',
            'Automatic reminders for appointments and requirements',
          ],
        },
        {
          title: 'Enrollment & Student Records',
          items: [
            'Enrollment of new and returning students, and sectioning',
            'College subject enlistment (add/drop) and prerequisite waivers',
            'Re-enrollment requests from the portal',
            'Student records, guardian links and portal access provisioning',
            'Campus transfers',
            'Records requests from former students',
          ],
        },
        {
          title: 'Finance & Cashier',
          items: [
            'Fee setup: fee items, fee structures, payment schemes and discount types',
            'Fee assessment for each student',
            'Cashiering: payments, official receipts, voids and reprints',
            'Cashier shifts, daily collections and bank remittances',
            'Student ledger / statement of account',
            'Adjustments and refunds',
            'Discounts and scholarships',
            'Holds, exam permits, promissory notes and finance clearance',
            'Collection report (aging)',
          ],
        },
        {
          title: 'Academics & Grading',
          items: [
            'Setup of departments, programs, year levels, school years, terms and the school calendar',
            'Subjects and curriculum: prospectus, prerequisites and Latin honors',
            'Grading rulesets',
            'Class schedules and timetables with clash checking, and teaching loads',
            'Class record (ECR and college grid)',
            'Grade submission, approval, correction and release to families',
            'INC/NFE completion',
            'Report card (SF9) and Observed Values',
            'Academic report',
          ],
        },
        {
          title: 'Attendance',
          items: [
            'Daily homeroom attendance by day, month and term',
            'Per-subject attendance for SHS and College, plus make-up classes',
            'Excuses and CSV export',
            'Attendance report',
            'Attendance visible to students and parents',
          ],
        },
        {
          title: 'Documents & Reports',
          items: [
            'Document requests: online, walk-in and certificate printing',
            'Document templates',
            'DepEd forms: SF2, SF7 and SF9',
            'Enrollment, academic, collection and analytics reports',
          ],
        },
        {
          title: 'E-Learning',
          items: [
            'Teacher classes: lessons, announcements, assignments and quizzes',
            'Topics, bulk publishing and copying from a previous class',
            'Comments, both class-wide and private',
            'Checking hand-ins and extending deadlines',
            'Quiz builder, attempts and item analysis',
            'Scores grid and export, and sending scores to the class record',
            'For students: view classes, hand in work, answer quizzes and see the Schoolwork overview',
          ],
        },
        {
          title: 'Guidance & Clinic (Confidential)',
          items: [
            'Counseling sessions and notes',
            'Discipline incidents and sanctions',
            'Health records, immunizations, clinic visits and medication log',
            'Access log and break-glass emergency access',
          ],
        },
        {
          title: 'Library',
          items: [
            'Catalog',
            'Borrowing, returns, renewals and overdue tracking',
            'Fines and library clearance',
          ],
        },
        {
          title: 'Student/Parent Portal',
          items: [
            'Grades, attendance, schedule and curriculum progress',
            'Statement of account',
            'Document requests, re-enrollment and admission tracker',
            'E-learning classes and schoolwork',
          ],
        },
        {
          title: 'Admin & Security',
          items: [
            'Users, roles and permission matrix',
            'Staff directory and Plantilla (staffing positions)',
            'Campuses (branches)',
            'Audit log, sign-in history, active sessions and per-record history',
            'Act as another user (impersonation)',
            'Notifications: inbox, templates, delivery log and settings',
            'Backups, scheduled jobs and system status',
          ],
        },
      ],
      notes: [
        'User count is an estimate: a minimum of about 500 students and teachers across Senior High School and College. Exact figures are not yet available.',
      ],
    },

    // ------------------------------------------------- RFID Library Management System
    {
      slug: 'rfid-library-management-system',
      name: 'RFID Library Management System',
      shortName: 'RFID Library',
      kind: 'Client / Production',
      status: 'Completed Nov 2026 – client project',
      timeline: 'Nov 2026 (completed)',
      audience: 'A client company: library staff managing one or more libraries, and their borrowers.',
      role: 'Full Stack Developer',
      tagline:
        'A multi-library system where every book copy carries its own RFID/NFC tag for scan-to-search, borrowing and returns.',
      summary: [
        'Built a multi-library system where every book copy has its own RFID/NFC tag for scan-to-search, borrowing and returns, plus bulk import from Excel or Google Sheets.',
        'Added a public catalog with borrow requests, a borrower portal, email notices, overdue tracking, a live dashboard and a 33-permission role editor.',
        'Delivered quickly, as the project mainly needed simple configuration and hardware setup.',
      ],
      responsibilities: [
        'Full stack development: frontend, backend and database',
        'RFID/NFC scanner and tag integration',
        'Server management',
        'System backups',
        'Testing',
      ],
      results: [],
      stack: {
        ...nodeStack,
        hardware: ['RFID/NFC scanners', 'RFID/NFC tags'],
      },
      featureGroups: [
        {
          title: 'Sign-In & Security',
          items: [
            'Login with email and password',
            '7-day sessions',
            'Forced password change',
            'Login rate limiting',
            'API security',
          ],
        },
        {
          title: 'Users, Roles & Permissions',
          items: [
            'Account management',
            'Roles and permissions editor (33 permissions)',
            'Default role',
            'Menus based on permissions',
            'Profile page',
          ],
        },
        {
          title: 'Libraries & Company',
          items: [
            'Multiple libraries',
            'Groupings (categories)',
            'Library switcher',
            'Company profile and logo',
          ],
        },
        {
          title: 'Book Catalog',
          items: [
            'Book list with search and filters',
            'Book details and history',
            'Add a single book or many books at once',
            'Paste from Excel or Google Sheets',
            'Book photo (camera or upload)',
            'Archive or restore',
            'Number of copies',
          ],
        },
        {
          title: 'RFID/NFC Tags',
          items: [
            'One tag per copy',
            'Tag status',
            'Find a copy',
            'Scan-to-search',
            'Scanning for borrowing and returns',
          ],
        },
        {
          title: 'Borrowers',
          items: [
            'Borrower list and search',
            'Add, edit and delete borrowers',
            'Borrower profile and history',
          ],
        },
        {
          title: 'Borrow Records',
          items: [
            'Lending at the counter',
            'Accept, reject or cancel requests',
            'Emails to borrowers, with resend',
            'Due date changes',
            'Return check (Good, Damaged, Lost)',
            'Statuses and overdue tracking',
          ],
        },
        {
          title: 'Public Catalog',
          items: [
            'Library selection',
            'Public book catalog',
            'Request list and request form',
            'Request status check',
            'Spam protection',
          ],
        },
        {
          title: 'My Books (Borrower)',
          items: [
            'Current loans, pending requests and history',
            'Borrow again while signed in',
            'Automatic account creation',
          ],
        },
        {
          title: 'Dashboard',
          items: [
            '8 number cards',
            'Overdue, pending and recent activity',
            'Live updates and alerts',
          ],
        },
        {
          title: 'Appearance & System',
          items: [
            'Light, Dark or Auto theme, plus color options',
            'Works on phones',
            'Email (SMTP)',
            'Docker setup',
            'Database migrations and health checks',
          ],
        },
      ],
    },

    // ------------------------------------------------------------- Agent Studio
    {
      slug: 'agent-studio',
      name: 'Agent Studio',
      shortName: 'Agent Studio',
      kind: 'Personal',
      status: 'Pre-deployment – deployment planned',
      timeline: '',
      audience: 'My own project: a workspace for running and managing Claude Code agents. Deployment is planned.',
      role: 'Full Stack Developer',
      tagline:
        'A browser workspace that runs Claude Code terminals on local and SSH projects and manages agents, skills and tasks.',
      summary: [
        'Built a browser workspace that runs Claude Code terminals on local and SSH projects, with split terminals, session controls and context-usage tracking.',
        'Added agent and skill management, a task board with agent handoffs, a 3D office view of agent teams, Git integration, a file editor and LAN-only authenticated access.',
      ],
      responsibilities: ['Full stack development: frontend, backend and database'],
      results: [],
      stack: {
        frontend: ['TypeScript', 'React 19', 'Three.js', 'WebSocket'],
        backend: ['Node.js', 'Express'],
        database: ['PostgreSQL'],
        devops: [],
      },
      featureGroups: [
        {
          title: 'Projects',
          items: [
            'Projects from local folders or SSH hosts',
            'Folder picker',
            'Group projects into folders in the sidebar',
            'Pin projects in the sidebar',
            'Drag-to-reorder in the sidebar',
            'Sidebar layout follows the account across devices',
          ],
        },
        {
          title: 'Terminals',
          items: [
            'Real Claude Code running in the browser',
            'Split terminals',
            'Launch options: model, effort, permission mode, ultracode, and new/continue/resume session',
            'Prompt history',
            'Pie chart of context usage',
          ],
        },
        {
          title: 'Skills & Agents',
          items: [
            'List, create, edit, validate and delete .claude/skills and .claude/agents',
            'Run an agent in its own terminal',
            'View and edit agent memory',
            'Auto-generated "lead" router agent',
          ],
        },
        {
          title: 'Offices',
          items: [
            'Group agents into departments',
            '3D office room',
            'Agent avatars',
            'Character looks',
          ],
        },
        {
          title: 'Task Board',
          items: [
            'Work broken into steps for agents',
            'Step status taken from agent events',
            "Handoff between agents on the user's click",
          ],
        },
        {
          title: 'Live Status',
          items: [
            'Activity feed',
            'Run counts for each agent and skill',
            'Unseen/finished markers',
            'Sound notifications',
            'Browser notifications',
          ],
        },
        {
          title: 'My Activity',
          items: ['Usage charts across all projects for 7, 30 or 90 days'],
        },
        {
          title: 'Claude Account',
          items: ['Login status', 'Sign out', 'Plan usage'],
        },
        {
          title: 'Git',
          items: [
            'Initialize a repository',
            'Connect a remote',
            'Fetch, commit, pull and push',
            'Refuses to commit while behind the remote',
            'Never force-pushes',
          ],
        },
        {
          title: 'File Browser & Editor',
          items: [
            'Create, rename, delete and edit files',
            'Check for changes made on disk',
          ],
        },
        {
          title: 'To-Do List',
          items: ['Per-project to-do list'],
        },
        {
          title: 'Security',
          items: [
            'Sign-in required on every route',
            'Access only from the host PC and the local network (LAN)',
            'Hook listener isolation',
            'Untrusted YAML parsed safely',
            'Every value in SSH commands quoted',
          ],
        },
        {
          title: 'System Switcher',
          items: ['Extensible sidebar for adding more systems in the future'],
        },
      ],
      notes: ['Not yet deployed; deployment is planned.'],
    },

    // --------------------------------------------------------- Virtual Learning System
    {
      slug: 'virtual-learning-system',
      name: 'Virtual Learning System',
      shortName: 'VLS',
      kind: 'Personal',
      status: 'Personal side project – no users yet',
      timeline: '',
      audience: 'Organizations that publish courses and the learners who take them – a Coursera-style platform built as a side project.',
      role: 'Full Stack Developer',
      tagline:
        'A Coursera-style, multi-organization learning platform with a course builder, learning paths and certificates.',
      summary: [
        'Built a multi-organization learning platform with a course builder (video streaming, readings, quizzes), learning paths, certificates and resume-where-you-left-off.',
        'Added custom roles, English/Filipino UI and emails, reminders, spreadsheet reports, platform admin moderation, rate limiting and backups.',
      ],
      responsibilities: ['Full stack development: frontend, backend and database'],
      results: [],
      stack: nodeStack,
      featureGroups: [
        {
          title: 'Account & Settings',
          items: [
            'Sign up, sign in and sign out',
            'Password reset via email',
            'Email confirmation',
            'Profile: name, photo and password',
            'Font size',
            'Language (English / Filipino)',
            'Turn course-related emails on or off',
          ],
        },
        {
          title: 'Organizations & Members',
          items: [
            'Create an organization',
            'Organization settings, logo and colors',
            'Invite members by email',
            'Member list',
            "Change a member's role or remove a member",
            'Roles and permissions (including custom roles)',
          ],
        },
        {
          title: 'Course Creation',
          items: [
            'Guided course creation',
            'Sections and lessons (Video, Reading, Quiz)',
            'Video upload and streaming',
            'Create quizzes',
            'Cover photo and certificate',
            'Checklist and publishing',
            'Preview as a learner',
            'Learning Paths',
          ],
        },
        {
          title: 'Learning',
          items: [
            '"Learn" page',
            'Start or accept a course',
            'Video player',
            'Resume where you left off',
            'Lesson progress',
            'Take quizzes',
            'Certificates',
            'Questions and answers on every lesson',
            'Ratings and reviews',
            'Dashboard',
          ],
        },
        {
          title: 'Public Catalog',
          items: [
            'List of public courses with search and filters',
            'Learn as a guest',
            'Popular courses',
          ],
        },
        {
          title: 'Communication',
          items: [
            'Announcements (can also be sent by email)',
            'Notification bell',
            'Automatic reminders and greetings',
            'Emails in English or Filipino',
          ],
        },
        {
          title: 'Reports',
          items: [
            'Organization summary',
            'Reports on courses, people and late learners',
            'Download as a spreadsheet',
          ],
        },
        {
          title: 'Platform Admin',
          items: [
            'Site-wide count of people and organizations',
            'Pause or resume an organization',
            'Remove a course from the catalog',
            'Hide reviews',
            'View sent emails',
          ],
        },
        {
          title: 'Operations & Security',
          items: [
            'Limits against abuse (rate limiting)',
            'Backup and restore',
            'Health check',
            'Automatic cleanup of old data',
          ],
        },
      ],
      notes: ['No users yet – this is a personal side project modeled after Coursera.'],
    },

    // ---------------------------------------------------- Inventory Management of FCIE
    {
      slug: 'inventory-management-fcie',
      name: 'Inventory Management of FCIE',
      shortName: 'FCIE Inventory',
      kind: 'Academic',
      status: 'Capstone project',
      timeline: '2025',
      audience: '',
      role: '',
      tagline: 'Capstone project (2025).',
      summary: [],
      responsibilities: [],
      results: [],
      stack: {
        frontend: ['Vue.js', 'Chart.js'],
        backend: ['Laravel'],
        database: ['MySQL'],
        devops: [],
      },
      featureGroups: [],
      notes: ['Detailed project description not yet available.'],
    },
  ],
}
