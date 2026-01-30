// ============================================
// UTILS.JS
// Utility Functions & Helpers
// ============================================

const Utils = {
    // Format date to readable string
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-IN', options);
    },

    // Format date to short string
    formatDateShort(dateString) {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-IN', options);
    },

    // Format time
    formatTime(timeString) {
        return timeString;
    },

    // Get relative time (e.g., "2 days ago")
    getRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return this.formatDateShort(dateString);
    },

    // Get days until event
    getDaysUntil(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = date - now;
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Past';
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        return `In ${diffDays} days`;
    },

    // Validate email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Validate required fields
    validateRequired(value) {
        return value && value.trim() !== '';
    },

    // Show toast notification
    showToast(message, type = 'info') {
        // Create toast container if it doesn't exist
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';

        // Set icon based on type
        let icon = 'ℹ️';
        let bgColor = 'var(--info)';
        if (type === 'success') {
            icon = '✓';
            bgColor = 'var(--success)';
        } else if (type === 'error') {
            icon = '✕';
            bgColor = 'var(--error)';
        } else if (type === 'warning') {
            icon = '⚠';
            bgColor = 'var(--warning)';
        }

        toast.innerHTML = `
      <div style="width: 32px; height: 32px; border-radius: 50%; background-color: ${bgColor}; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">
        ${icon}
      </div>
      <div style="flex: 1;">
        <div style="font-weight: 600; color: var(--gray-900);">${message}</div>
      </div>
    `;

        container.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                container.removeChild(toast);
                if (container.children.length === 0) {
                    document.body.removeChild(container);
                }
            }, 300);
        }, 3000);
    },

    // Show loading state
    showLoading(element) {
        const originalContent = element.innerHTML;
        element.setAttribute('data-original-content', originalContent);
        element.disabled = true;
        element.innerHTML = '<span class="spinner"></span> Loading...';
    },

    // Hide loading state
    hideLoading(element) {
        const originalContent = element.getAttribute('data-original-content');
        element.disabled = false;
        element.innerHTML = originalContent;
        element.removeAttribute('data-original-content');
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Get query parameter
    getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },

    // Set query parameter
    setQueryParam(param, value) {
        const url = new URL(window.location);
        url.searchParams.set(param, value);
        window.history.pushState({}, '', url);
    },

    // Truncate text
    truncate(text, length) {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    },

    // Generate unique ID
    generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    },

    // Escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // Get initials from name
    getInitials(name) {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    },

    // Redirect to page
    redirect(url) {
        window.location.href = url;
    },

    // Reload page
    reload() {
        window.location.reload();
    }
};

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
