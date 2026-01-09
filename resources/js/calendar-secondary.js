import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import enLocale from '@fullcalendar/core/locales/en-gb';

// Calendar instance
let calendarSecondary;
let eventsSecondary = [];

// Load events from localStorage
const loadEventsSecondary = () => {
    try {
        const saved = localStorage.getItem('calendarEventsSecondary');
        if (saved) {
            eventsSecondary = JSON.parse(saved);
        } else {
            // Sample events for demo
            const now = new Date();
            const currentYear = now.getFullYear();
            const currentMonth = now.getMonth();

            eventsSecondary = [
                {
                    id: 'demo1',
                    title: 'D 3',
                    start: new Date(
                        currentYear,
                        currentMonth,
                        1,
                        9,
                        0
                    ).toISOString(),
                    end: new Date(
                        currentYear,
                        currentMonth,
                        1,
                        10,
                        0
                    ).toISOString(),
                    backgroundColor: '#60a5fa',
                    borderColor: '#60a5fa',
                    textColor: '#ffffff',
                },
                {
                    id: 'demo2',
                    title: 'B 2',
                    start: new Date(
                        currentYear,
                        currentMonth,
                        1,
                        14,
                        0
                    ).toISOString(),
                    end: new Date(
                        currentYear,
                        currentMonth,
                        1,
                        15,
                        0
                    ).toISOString(),
                    backgroundColor: '#fbbf24',
                    borderColor: '#fbbf24',
                    textColor: '#ffffff',
                },
                {
                    id: 'demo3',
                    title: 'B 4',
                    start: new Date(
                        currentYear,
                        currentMonth,
                        1,
                        16,
                        0
                    ).toISOString(),
                    end: new Date(
                        currentYear,
                        currentMonth,
                        1,
                        17,
                        0
                    ).toISOString(),
                    backgroundColor: '#a78bfa',
                    borderColor: '#a78bfa',
                    textColor: '#ffffff',
                },
            ];
        }
    } catch (error) {
        console.error('Error loading events:', error);
        eventsSecondary = [];
    }
    return eventsSecondary;
};

// Save events to localStorage
const saveEventsSecondary = () => {
    localStorage.setItem(
        'calendarEventsSecondary',
        JSON.stringify(eventsSecondary)
    );
};

// Format date for datetime-local input
const formatDateTimeLocal = (date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
};

// Format date for date input
const formatDateLocal = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Parse datetime-local value
const parseDateTimeLocal = (value) => {
    if (!value) return null;
    return new Date(value);
};

// Handle dates set callback
const handleDatesSetSecondary = (dateInfo) => {
    // Update header title
    const titleEl = document.querySelector('.calendar-secondary-header-title');
    if (titleEl && dateInfo.view.type === 'dayGridMonth') {
        const date = dateInfo.start;
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        titleEl.textContent = `${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
    }
};

// Handle date/time selection
const handleDateSelectSecondary = (selectInfo) => {
    calendarSecondary.unselect();

    const start = new Date(selectInfo.start);
    start.setHours(9, 0, 0, 0);
    const end = new Date(start);
    end.setHours(10, 0, 0, 0);

    openEventModalSecondary(null, {
        start: start,
        end: end,
        allDay: selectInfo.allDay || false,
    });
};

// Handle event click
const handleEventClickSecondary = (clickInfo) => {
    openEventModalSecondary(clickInfo.event, null);
};

// Handle event drop
const handleEventDropSecondary = (dropInfo) => {
    updateEventSecondary(dropInfo.event);
};

// Open event modal
const openEventModalSecondary = (event, selectInfo) => {
    const modal = document.getElementById('event-modal-secondary');
    const form = document.getElementById('event-form-secondary');
    const deleteBtn = document.getElementById('delete-event-btn-secondary');
    const modalTitle = document.getElementById('modal-title-secondary');

    if (!modal || !form) return;

    form.reset();

    if (event) {
        modalTitle.textContent = 'Edit appointment';
        const eventId = document.getElementById('event-id-secondary');
        const eventTitle = document.getElementById('event-title-secondary');
        const eventStart = document.getElementById('event-start-secondary');
        const eventEnd = document.getElementById('event-end-secondary');
        const eventColor = document.getElementById('event-color-secondary');

        if (eventId) eventId.value = event.id;
        if (eventTitle) eventTitle.value = event.title || '';
        if (eventStart) {
            eventStart.value = event.start
                ? formatDateTimeLocal(event.start)
                : '';
        }
        if (eventEnd) {
            eventEnd.value = event.end ? formatDateTimeLocal(event.end) : '';
        }
        if (eventColor) {
            eventColor.value = event.backgroundColor || '#3b82f6';
        }
        if (deleteBtn) deleteBtn.style.display = 'block';
    } else if (selectInfo) {
        modalTitle.textContent = 'Create appointment';
        const eventId = document.getElementById('event-id-secondary');
        const eventTitle = document.getElementById('event-title-secondary');
        const eventStart = document.getElementById('event-start-secondary');
        const eventEnd = document.getElementById('event-end-secondary');
        const eventColor = document.getElementById('event-color-secondary');

        if (eventId) eventId.value = '';
        if (eventTitle) eventTitle.value = '';
        if (eventStart) {
            eventStart.value = formatDateTimeLocal(selectInfo.start);
        }
        if (eventEnd) {
            const endDate =
                selectInfo.end ||
                new Date(selectInfo.start.getTime() + 60 * 60 * 1000);
            eventEnd.value = formatDateTimeLocal(endDate);
        }
        if (eventColor) eventColor.value = '#3b82f6';
        if (deleteBtn) deleteBtn.style.display = 'none';
    }

    if (modal) modal.showModal();
};

// Save event
const saveEventSecondary = (eventData) => {
    const id = eventData.id || 'event_' + Date.now();
    const start = parseDateTimeLocal(eventData.start);
    const end =
        parseDateTimeLocal(eventData.end) ||
        new Date(start.getTime() + 60 * 60 * 1000);

    const event = {
        id: id,
        title: eventData.title,
        start: start.toISOString(),
        end: end.toISOString(),
        backgroundColor: eventData.color,
        borderColor: eventData.color,
        textColor: '#ffffff',
    };

    const index = eventsSecondary.findIndex((e) => e.id === id);
    if (index >= 0) {
        eventsSecondary[index] = event;
    } else {
        eventsSecondary.push(event);
    }

    saveEventsSecondary();
    calendarSecondary.removeAllEvents();
    calendarSecondary.addEventSource(eventsSecondary);
};

// Update event
const updateEventSecondary = (event) => {
    const index = eventsSecondary.findIndex((e) => e.id === event.id);
    if (index >= 0) {
        eventsSecondary[index] = {
            id: event.id,
            title: event.title,
            start: event.start.toISOString(),
            end: event.end ? event.end.toISOString() : null,
            backgroundColor: event.backgroundColor,
            borderColor: event.borderColor,
        };
        saveEventsSecondary();
    }
};

// Delete event
const deleteEventSecondary = (eventId) => {
    eventsSecondary = eventsSecondary.filter((e) => e.id !== eventId);
    saveEventsSecondary();
    calendarSecondary.removeAllEvents();
    calendarSecondary.addEventSource(eventsSecondary);
};

// Handle form submission
const handleFormSubmitSecondary = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const eventId = formData.get('event-id');
    const title = formData.get('event-title');
    const start = formData.get('event-start');
    const end = formData.get('event-end');
    const color = formData.get('event-color');

    if (!title || !start) {
        alert('Please fill in title and start date');
        return;
    }

    saveEventSecondary({
        id: eventId,
        title: title,
        start: start,
        end: end,
        color: color,
    });

    const modal = document.getElementById('event-modal-secondary');
    if (modal) {
        modal.close();
    }
};

// Initialize calendar
const initCalendarSecondary = () => {
    const calendarEl = document.getElementById('calendar-secondary');
    if (!calendarEl) return;

    eventsSecondary = loadEventsSecondary();

    calendarSecondary = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: false,
        locale: enLocale,
        firstDay: 1,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        events: eventsSecondary,
        height: 'auto',
        eventDisplay: 'block',
        navLinks: false,
        dayMaxEventRows: 3,
        moreLinkClick: 'popover',
        displayEventTime: false,
        businessHours: {
            daysOfWeek: [1, 2, 3, 4, 5, 6], // Monday - Friday
            startTime: '08:00',
            endTime: '18:00',
        },
        select: handleDateSelectSecondary,
        eventClick: handleEventClickSecondary,
        eventDrop: handleEventDropSecondary,
        datesSet: handleDatesSetSecondary,
    });

    calendarSecondary.render();
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initCalendarSecondary();

    // Setup form handler
    const form = document.getElementById('event-form-secondary');
    if (form) {
        form.addEventListener('submit', handleFormSubmitSecondary);
    }

    // Setup navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const todayBtn = document.getElementById('today-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            calendarSecondary.prev();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            calendarSecondary.next();
        });
    }

    if (todayBtn) {
        todayBtn.addEventListener('click', () => {
            calendarSecondary.today();
        });
    }

    // Setup view toggle buttons
    const dayViewBtn = document.getElementById('day-view-btn');
    const weekViewBtn = document.getElementById('week-view-btn');
    const monthViewBtn = document.getElementById('month-view-btn');

    if (dayViewBtn) {
        dayViewBtn.addEventListener('click', () => {
            calendarSecondary.changeView('timeGridDay');
            dayViewBtn.classList.add('btn-active');
            weekViewBtn.classList.remove('btn-active');
            monthViewBtn.classList.remove('btn-active');
        });
    }

    if (weekViewBtn) {
        weekViewBtn.addEventListener('click', () => {
            calendarSecondary.changeView('timeGridWeek');
            dayViewBtn.classList.remove('btn-active');
            weekViewBtn.classList.add('btn-active');
            monthViewBtn.classList.remove('btn-active');
        });
    }

    if (monthViewBtn) {
        monthViewBtn.addEventListener('click', () => {
            calendarSecondary.changeView('dayGridMonth');
            dayViewBtn.classList.remove('btn-active');
            weekViewBtn.classList.remove('btn-active');
            monthViewBtn.classList.add('btn-active');
        });
    }

    // Setup delete button
    const deleteBtn = document.getElementById('delete-event-btn-secondary');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            const eventId = document.getElementById('event-id-secondary').value;
            if (
                eventId &&
                confirm('Are you sure you want to delete this appointment?')
            ) {
                deleteEventSecondary(eventId);
                const modal = document.getElementById('event-modal-secondary');
                if (modal) {
                    modal.close();
                }
            }
        });
    }

    // Setup close button
    const closeBtn = document.getElementById('close-modal-btn-secondary');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            const modal = document.getElementById('event-modal-secondary');
            if (modal) {
                modal.close();
            }
        });
    }

    // Update header title on initial load
    setTimeout(() => {
        handleDatesSetSecondary({
            view: calendarSecondary.view,
            start: calendarSecondary.view.activeStart,
            end: calendarSecondary.view.activeEnd,
        });
    }, 100);
});
