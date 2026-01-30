# Student Utility and Event Management System

A comprehensive frontend prototype for university student utility and event management, built for final-year academic project demonstration.

## 🎯 Project Overview

This system provides a unified platform for managing student utilities and events at CHARUSAT-like universities. It demonstrates a complete event management workflow with role-based access control, built entirely with vanilla HTML, CSS, and JavaScript.

## 🚀 Features

### User Roles
- **Student**: Browse events, register/cancel registrations, view notices
- **Faculty**: Create events, track submissions, view registrations
- **Admin**: Approve/reject events, manage system, view statistics

### Core Functionality
- **Authentication System**: Role-based login with session management
- **Event Management**: Complete CRUD operations with approval workflow
- **Registration System**: Student event registration with capacity limits
- **Approval Workflow**: Faculty → Admin → Student event flow
- **Responsive Design**: Mobile-friendly interface
- **Data Persistence**: LocalStorage-based data management

## 📁 Project Structure

```
student-utility-system/
├── index.html                 # Landing page with auto-redirect
├── login.html                 # Authentication page
├── dashboards/
│   ├── student.html          # Student dashboard
│   ├── faculty.html          # Faculty dashboard
│   └── admin.html            # Admin dashboard
├── events/
│   ├── event-list.html       # Browse all events
│   ├── event-detail.html     # Single event view
│   └── create-event.html     # Faculty event creation
├── css/
│   ├── main.css              # Design system & global styles
│   ├── components.css        # Reusable UI components
│   └── dashboard.css         # Dashboard-specific styles
├── js/
│   ├── storage.js            # LocalStorage management
│   ├── utils.js              # Utility functions
│   ├── auth.js               # Authentication logic
│   └── events.js             # Event management
└── assets/
    └── images/               # Image assets
```

## 🔐 Demo Credentials

Use these credentials to test different user roles:

| Role    | Email                      | Password    |
|---------|----------------------------|-------------|
| Student | student@charusat.edu.in    | student123  |
| Faculty | faculty@charusat.edu.in    | faculty123  |
| Admin   | admin@charusat.edu.in      | admin123    |

## 🎨 Design Features

- **Modern UI**: Clean, professional university-themed design
- **Color Palette**: Blue/white/neutral academic colors
- **Responsive**: Desktop, tablet, and mobile support
- **Animations**: Smooth transitions and micro-interactions
- **Components**: Reusable cards, buttons, forms, modals
- **Accessibility**: Semantic HTML and clear navigation

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom design system with CSS variables
- **Vanilla JavaScript (ES6)**: No frameworks or libraries
- **LocalStorage**: Client-side data persistence

## 📋 Event Workflow

```
1. Faculty creates event → Status: Pending
2. Admin reviews event → Approve/Reject
3. If approved → Students can view and register
4. Students register → Capacity tracking
5. Students can cancel registration
```

## 🎓 Academic Context

This is a **3-4 week final-year university project** demonstrating:
- Problem understanding and solution design
- Clean code architecture
- User role management
- Complete user workflows
- Professional UI/UX design
- Academic presentation readiness

## 🚦 Getting Started

1. **Open the project**:
   - Simply open `index.html` in a modern web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve
     ```

2. **Login**:
   - Use one of the demo credentials above
   - You'll be redirected to the appropriate dashboard

3. **Explore Features**:
   - **As Student**: Browse events, register, view dashboard
   - **As Faculty**: Create events, view submissions
   - **As Admin**: Approve/reject events, manage system

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🔧 Key Components

### Authentication (`auth.js`)
- Login/logout functionality
- Session management
- Role-based access control
- Auto-redirect based on role

### Event Management (`events.js`)
- CRUD operations
- Registration handling
- Approval workflow
- Filtering and sorting
- Statistics generation

### Storage (`storage.js`)
- LocalStorage wrapper
- Sample data initialization
- Data persistence
- CRUD helpers

### Utilities (`utils.js`)
- Date formatting
- Form validation
- Toast notifications
- Loading states
- Helper functions

## 🎯 Sample Data

The system comes pre-loaded with:
- 3 users (one per role)
- 8 sample events (various categories and statuses)
- 4 notices/announcements
- Sample registrations

## 📊 Event Categories

- Technical
- Cultural
- Sports
- Workshop
- Seminar
- Social

## ✨ UI Components

- Navigation bars
- Sidebars
- Cards
- Buttons (primary, secondary, danger, outline)
- Forms and inputs
- Badges and status indicators
- Modals
- Tables
- Toast notifications
- Loading spinners
- Empty states

## 🔍 Testing Scenarios

1. **Student Flow**:
   - Login as student
   - Browse upcoming events
   - Register for an event
   - View registration in dashboard
   - Cancel registration

2. **Faculty Flow**:
   - Login as faculty
   - Create new event
   - View event status (pending)
   - Check created events list

3. **Admin Flow**:
   - Login as admin
   - View pending approvals
   - Approve/reject events
   - View system statistics

4. **Complete Workflow**:
   - Faculty creates event
   - Admin approves event
   - Student registers for event
   - Faculty views registrations

## 🎓 Presentation Points

- **Problem Statement**: Fragmented university portals
- **Solution**: Unified student utility platform
- **User Roles**: Clear separation of concerns
- **Event Workflow**: Well-defined approval process
- **UI/UX**: Professional, modern design
- **Data Management**: Simulated backend with localStorage
- **Scalability**: Ready for backend integration

## 📝 Future Enhancements

- Backend API integration
- Real-time notifications
- Email notifications
- Advanced search and filters
- Event analytics dashboard
- Mobile app version
- Payment integration for paid events
- QR code-based attendance

## 👥 Credits

Developed as a final-year university project for CHARUSAT University.

## 📄 License

This is an academic project for educational purposes.

---

**Note**: This is a frontend prototype. All data is stored in browser localStorage and will be cleared when browser data is cleared. For production use, integrate with a proper backend system.
