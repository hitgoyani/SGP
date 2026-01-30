// ============================================
// STORAGE.JS
// LocalStorage Management & Data Initialization
// ============================================

const StorageManager = {
  // Storage keys
  KEYS: {
    USERS: 'sums_users',
    EVENTS: 'sums_events',
    REGISTRATIONS: 'sums_registrations',
    NOTICES: 'sums_notices',
    CURRENT_USER: 'sums_current_user'
  },

  // Initialize storage with sample data
  init() {
    if (!this.get(this.KEYS.USERS)) {
      this.initUsers();
    }
    if (!this.get(this.KEYS.EVENTS)) {
      this.initEvents();
    }
    if (!this.get(this.KEYS.REGISTRATIONS)) {
      this.set(this.KEYS.REGISTRATIONS, []);
    }
    if (!this.get(this.KEYS.NOTICES)) {
      this.initNotices();
    }
  },

  // Initialize sample users
  initUsers() {
    const users = [
      {
        id: 1,
        name: 'Raj Patel',
        email: 'student@charusat.edu.in',
        password: 'student123',
        role: 'student',
        enrollmentNo: '20CE001',
        department: 'Computer Engineering',
        semester: 6
      },
      {
        id: 2,
        name: 'Dr. Priya Shah',
        email: 'faculty@charusat.edu.in',
        password: 'faculty123',
        role: 'faculty',
        employeeId: 'FAC001',
        department: 'Computer Engineering',
        designation: 'Assistant Professor'
      },
      {
        id: 3,
        name: 'Admin User',
        email: 'admin@charusat.edu.in',
        password: 'admin123',
        role: 'admin',
        employeeId: 'ADM001',
        department: 'Administration'
      }
    ];
    this.set(this.KEYS.USERS, users);
  },

  // Initialize sample events
  initEvents() {
    const now = new Date();
    const events = [
      {
        id: 1,
        title: 'Tech Fest 2026',
        category: 'Technical',
        description: 'Annual technical festival featuring coding competitions, hackathons, and tech talks by industry experts. Join us for three days of innovation and learning.',
        date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        time: '09:00 AM',
        venue: 'Main Auditorium',
        maxParticipants: 200,
        organizer: 'Dr. Priya Shah',
        organizerId: 2,
        status: 'approved',
        createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        registeredCount: 45
      },
      {
        id: 2,
        title: 'Cultural Night',
        category: 'Cultural',
        description: 'Celebrate diversity with performances including dance, music, drama, and fashion show. Showcase your talent and enjoy an evening of entertainment.',
        date: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        time: '06:00 PM',
        venue: 'Open Air Theatre',
        maxParticipants: 500,
        organizer: 'Dr. Priya Shah',
        organizerId: 2,
        status: 'approved',
        createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        registeredCount: 120
      },
      {
        id: 3,
        title: 'Sports Tournament',
        category: 'Sports',
        description: 'Inter-department sports competition including cricket, football, basketball, and athletics. Register your team and compete for the championship trophy.',
        date: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString(),
        time: '07:00 AM',
        venue: 'Sports Complex',
        maxParticipants: 300,
        organizer: 'Dr. Priya Shah',
        organizerId: 2,
        status: 'approved',
        createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        registeredCount: 78
      },
      {
        id: 4,
        title: 'Workshop on AI & Machine Learning',
        category: 'Workshop',
        description: 'Hands-on workshop covering fundamentals of AI and ML. Learn about neural networks, deep learning, and practical applications. Certificates will be provided.',
        date: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        time: '10:00 AM',
        venue: 'Computer Lab 3',
        maxParticipants: 50,
        organizer: 'Dr. Priya Shah',
        organizerId: 2,
        status: 'approved',
        createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        registeredCount: 32
      },
      {
        id: 5,
        title: 'Career Guidance Seminar',
        category: 'Seminar',
        description: 'Expert guidance on career opportunities, higher education, and industry trends. Featuring speakers from top companies and universities.',
        date: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        time: '02:00 PM',
        venue: 'Seminar Hall',
        maxParticipants: 150,
        organizer: 'Dr. Priya Shah',
        organizerId: 2,
        status: 'approved',
        createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        registeredCount: 89
      },
      {
        id: 6,
        title: 'Blockchain Technology Summit',
        category: 'Technical',
        description: 'Explore the world of blockchain, cryptocurrency, and decentralized applications. Network with industry professionals and learn about emerging opportunities.',
        date: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        time: '11:00 AM',
        venue: 'Conference Hall',
        maxParticipants: 100,
        organizer: 'Dr. Priya Shah',
        organizerId: 2,
        status: 'pending',
        createdAt: new Date().toISOString(),
        registeredCount: 0
      },
      {
        id: 7,
        title: 'Blood Donation Camp',
        category: 'Social',
        description: 'Annual blood donation drive in collaboration with local blood bank. Save lives by donating blood. All donors will receive certificates and refreshments.',
        date: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        time: '09:00 AM',
        venue: 'Medical Center',
        maxParticipants: 200,
        organizer: 'Dr. Priya Shah',
        organizerId: 2,
        status: 'pending',
        createdAt: new Date().toISOString(),
        registeredCount: 0
      },
      {
        id: 8,
        title: 'Entrepreneurship Boot Camp',
        category: 'Workshop',
        description: 'Learn how to start and scale your startup. Sessions on business planning, funding, marketing, and legal aspects. Mentorship from successful entrepreneurs.',
        date: new Date(now.getTime() + 18 * 24 * 60 * 60 * 1000).toISOString(),
        time: '10:00 AM',
        venue: 'Innovation Lab',
        maxParticipants: 60,
        organizer: 'Dr. Priya Shah',
        organizerId: 2,
        status: 'approved',
        createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        registeredCount: 41
      }
    ];
    this.set(this.KEYS.EVENTS, events);
  },

  // Initialize sample notices
  initNotices() {
    const notices = [
      {
        id: 1,
        title: 'Mid-Semester Exam Schedule Released',
        content: 'The mid-semester examination schedule has been published. Please check the academic portal for details.',
        date: new Date().toISOString(),
        priority: 'high'
      },
      {
        id: 2,
        title: 'Library Timing Extended',
        content: 'Library will remain open until 10 PM during exam week to facilitate student preparation.',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'medium'
      },
      {
        id: 3,
        title: 'Campus Placement Drive',
        content: 'Leading IT companies will be visiting campus next week for placement interviews. Eligible students should register.',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'high'
      },
      {
        id: 4,
        title: 'Holiday Notice',
        content: 'University will remain closed on 15th August for Independence Day celebrations.',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'low'
      }
    ];
    this.set(this.KEYS.NOTICES, notices);
  },

  // Get data from localStorage
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  // Set data to localStorage
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },

  // Remove data from localStorage
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  // Clear all data
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

// Initialize storage on load
StorageManager.init();
