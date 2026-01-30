// ============================================
// AUTH.JS
// Authentication & Session Management
// ============================================

const Auth = {
    // Check if user is authenticated
    isAuthenticated() {
        const currentUser = StorageManager.get(StorageManager.KEYS.CURRENT_USER);
        return currentUser !== null;
    },

    // Get current user
    getCurrentUser() {
        return StorageManager.get(StorageManager.KEYS.CURRENT_USER);
    },

    // Login user
    login(email, password) {
        const users = StorageManager.get(StorageManager.KEYS.USERS);
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Don't store password in session
            const { password, ...userWithoutPassword } = user;
            StorageManager.set(StorageManager.KEYS.CURRENT_USER, userWithoutPassword);
            return { success: true, user: userWithoutPassword };
        }

        return { success: false, message: 'Invalid email or password' };
    },

    // Logout user
    logout() {
        StorageManager.remove(StorageManager.KEYS.CURRENT_USER);
        // Calculate correct path to login.html based on current location
        const currentPath = window.location.pathname;
        let loginPath = 'login.html';

        if (currentPath.includes('/dashboards/') || currentPath.includes('/events/')) {
            loginPath = '../login.html';
        }

        Utils.redirect(loginPath);
    },

    // Check user role
    hasRole(role) {
        const user = this.getCurrentUser();
        return user && user.role === role;
    },

    // Redirect if not authenticated
    requireAuth() {
        if (!this.isAuthenticated()) {
            const currentPath = window.location.pathname;
            let loginPath = 'login.html';

            if (currentPath.includes('/dashboards/') || currentPath.includes('/events/')) {
                loginPath = '../login.html';
            }

            Utils.redirect(loginPath);
            return false;
        }
        return true;
    },

    // Redirect if authenticated (for login page)
    redirectIfAuthenticated() {
        if (this.isAuthenticated()) {
            const user = this.getCurrentUser();
            this.redirectToDashboard(user.role);
            return true;
        }
        return false;
    },

    // Redirect to appropriate dashboard
    redirectToDashboard(role) {
        const currentPath = window.location.pathname;
        let prefix = '';

        if (currentPath.includes('/dashboards/') || currentPath.includes('/events/')) {
            prefix = '../';
        }

        const dashboards = {
            student: prefix + 'dashboards/student.html',
            faculty: prefix + 'dashboards/faculty.html',
            admin: prefix + 'dashboards/admin.html'
        };

        Utils.redirect(dashboards[role] || (prefix ? '../login.html' : 'login.html'));
    },

    // Require specific role
    requireRole(role) {
        if (!this.requireAuth()) return false;

        const user = this.getCurrentUser();
        if (user.role !== role) {
            this.redirectToDashboard(user.role);
            return false;
        }
        return true;
    }
};
