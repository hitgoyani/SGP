// ============================================
// EVENTS.JS
// Event Management Functions
// ============================================

const EventManager = {
    // Get all events
    getAllEvents() {
        return StorageManager.get(StorageManager.KEYS.EVENTS) || [];
    },

    // Get event by ID
    getEventById(id) {
        const events = this.getAllEvents();
        return events.find(e => e.id === parseInt(id));
    },

    // Get approved events (for students)
    getApprovedEvents() {
        return this.getAllEvents().filter(e => e.status === 'approved');
    },

    // Get pending events (for admin)
    getPendingEvents() {
        return this.getAllEvents().filter(e => e.status === 'pending');
    },

    // Get events by organizer
    getEventsByOrganizer(organizerId) {
        return this.getAllEvents().filter(e => e.organizerId === organizerId);
    },

    // Create new event
    createEvent(eventData) {
        const events = this.getAllEvents();
        const newEvent = {
            id: this.generateEventId(),
            ...eventData,
            status: 'pending',
            createdAt: new Date().toISOString(),
            registeredCount: 0
        };
        events.push(newEvent);
        StorageManager.set(StorageManager.KEYS.EVENTS, events);
        return newEvent;
    },

    // Update event
    updateEvent(id, updates) {
        const events = this.getAllEvents();
        const index = events.findIndex(e => e.id === parseInt(id));
        if (index !== -1) {
            events[index] = { ...events[index], ...updates };
            StorageManager.set(StorageManager.KEYS.EVENTS, events);
            return events[index];
        }
        return null;
    },

    // Delete event
    deleteEvent(id) {
        const events = this.getAllEvents();
        const filtered = events.filter(e => e.id !== parseInt(id));
        StorageManager.set(StorageManager.KEYS.EVENTS, filtered);
        return true;
    },

    // Approve event
    approveEvent(id) {
        return this.updateEvent(id, { status: 'approved' });
    },

    // Reject event
    rejectEvent(id, reason) {
        return this.updateEvent(id, { status: 'rejected', rejectionReason: reason });
    },

    // Register for event
    registerForEvent(eventId, userId) {
        const registrations = StorageManager.get(StorageManager.KEYS.REGISTRATIONS) || [];

        // Check if already registered
        const existing = registrations.find(
            r => r.eventId === parseInt(eventId) && r.userId === userId
        );
        if (existing) {
            return { success: false, message: 'Already registered for this event' };
        }

        // Check if event is full
        const event = this.getEventById(eventId);
        if (event.registeredCount >= event.maxParticipants) {
            return { success: false, message: 'Event is full' };
        }

        // Add registration
        const registration = {
            id: this.generateRegistrationId(),
            eventId: parseInt(eventId),
            userId: userId,
            registeredAt: new Date().toISOString()
        };
        registrations.push(registration);
        StorageManager.set(StorageManager.KEYS.REGISTRATIONS, registrations);

        // Update event registered count
        this.updateEvent(eventId, { registeredCount: event.registeredCount + 1 });

        return { success: true, message: 'Successfully registered for event' };
    },

    // Cancel registration
    cancelRegistration(eventId, userId) {
        const registrations = StorageManager.get(StorageManager.KEYS.REGISTRATIONS) || [];
        const filtered = registrations.filter(
            r => !(r.eventId === parseInt(eventId) && r.userId === userId)
        );

        if (filtered.length < registrations.length) {
            StorageManager.set(StorageManager.KEYS.REGISTRATIONS, filtered);

            // Update event registered count
            const event = this.getEventById(eventId);
            this.updateEvent(eventId, { registeredCount: Math.max(0, event.registeredCount - 1) });

            return { success: true, message: 'Registration cancelled' };
        }

        return { success: false, message: 'Registration not found' };
    },

    // Get user registrations
    getUserRegistrations(userId) {
        const registrations = StorageManager.get(StorageManager.KEYS.REGISTRATIONS) || [];
        const userRegs = registrations.filter(r => r.userId === userId);

        // Get event details for each registration
        return userRegs.map(reg => {
            const event = this.getEventById(reg.eventId);
            return {
                ...reg,
                event: event
            };
        });
    },

    // Check if user is registered for event
    isUserRegistered(eventId, userId) {
        const registrations = StorageManager.get(StorageManager.KEYS.REGISTRATIONS) || [];
        return registrations.some(
            r => r.eventId === parseInt(eventId) && r.userId === userId
        );
    },

    // Get event registrations (for faculty/admin)
    getEventRegistrations(eventId) {
        const registrations = StorageManager.get(StorageManager.KEYS.REGISTRATIONS) || [];
        const eventRegs = registrations.filter(r => r.eventId === parseInt(eventId));

        // Get user details for each registration
        const users = StorageManager.get(StorageManager.KEYS.USERS) || [];
        return eventRegs.map(reg => {
            const user = users.find(u => u.id === reg.userId);
            return {
                ...reg,
                user: user
            };
        });
    },

    // Filter events
    filterEvents(events, filters) {
        let filtered = [...events];

        // Filter by category
        if (filters.category && filters.category !== 'all') {
            filtered = filtered.filter(e => e.category === filters.category);
        }

        // Filter by status
        if (filters.status && filters.status !== 'all') {
            filtered = filtered.filter(e => e.status === filters.status);
        }

        // Filter by search query
        if (filters.search) {
            const query = filters.search.toLowerCase();
            filtered = filtered.filter(e =>
                e.title.toLowerCase().includes(query) ||
                e.description.toLowerCase().includes(query)
            );
        }

        // Filter by date range
        if (filters.dateFrom) {
            filtered = filtered.filter(e => new Date(e.date) >= new Date(filters.dateFrom));
        }
        if (filters.dateTo) {
            filtered = filtered.filter(e => new Date(e.date) <= new Date(filters.dateTo));
        }

        return filtered;
    },

    // Sort events
    sortEvents(events, sortBy = 'date') {
        const sorted = [...events];

        switch (sortBy) {
            case 'date':
                return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
            case 'title':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            case 'registrations':
                return sorted.sort((a, b) => b.registeredCount - a.registeredCount);
            default:
                return sorted;
        }
    },

    // Get upcoming events
    getUpcomingEvents(limit = 5) {
        const now = new Date();
        return this.getApprovedEvents()
            .filter(e => new Date(e.date) >= now)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, limit);
    },

    // Generate event ID
    generateEventId() {
        const events = this.getAllEvents();
        return events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
    },

    // Generate registration ID
    generateRegistrationId() {
        const registrations = StorageManager.get(StorageManager.KEYS.REGISTRATIONS) || [];
        return registrations.length > 0 ? Math.max(...registrations.map(r => r.id)) + 1 : 1;
    },

    // Get event categories
    getCategories() {
        return ['Technical', 'Cultural', 'Sports', 'Workshop', 'Seminar', 'Social'];
    },

    // Get statistics
    getStatistics() {
        const events = this.getAllEvents();
        const registrations = StorageManager.get(StorageManager.KEYS.REGISTRATIONS) || [];

        return {
            totalEvents: events.length,
            approvedEvents: events.filter(e => e.status === 'approved').length,
            pendingEvents: events.filter(e => e.status === 'pending').length,
            rejectedEvents: events.filter(e => e.status === 'rejected').length,
            totalRegistrations: registrations.length,
            upcomingEvents: this.getUpcomingEvents().length
        };
    }
};
