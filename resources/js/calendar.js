import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import ruLocale from '@fullcalendar/core/locales/ru';

// Calendar instance
let calendar;
let events = [];
let indicatorIntervalId = null;

// Get timezone offset in GMT format
const getTimezoneOffset = () => {
    const offset = -new Date().getTimezoneOffset() / 60; // Convert minutes to hours
    const sign = offset >= 0 ? '+' : '';
    return `GMT${sign}${String(offset).padStart(2, '0')}`;
};

// Load events from localStorage
const loadEvents = () => {
    const saved = localStorage.getItem('calendarEvents');
    if (saved) {
        events = JSON.parse(saved);
    }
    return events;
};

// Save events to localStorage
const saveEvents = () => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
};

// Format day header content
const formatDayHeader = (arg) => {
    const date = arg.date;
    const dayName = date.toLocaleDateString('ru-RU', {
        weekday: 'short',
    });
    const dayNum = date.getDate().toString().padStart(2, '0');

    return {
        html: `<div class="day-header flex flex-col items-start justify-center gap-[4px]">
                  <span class="day-name capitalize text-[12px]">${dayName}</span>
                  <span class="day-number border border-gray-300 rounded-[5px] px-[4px] py-[2px] text-[16px]">${dayNum}</span>
              </div>`,
    };
};

// Handle dates set callback
const handleDatesSet = () => {
    // Replace title with custom text
    const titleEl = document.querySelector('.fc-toolbar-title');
    if (titleEl) {
        titleEl.textContent = 'Schedule';
    }

    // Add timezone to first cell with multiple attempts
    setTimeout(() => {
        addTimezoneToFirstCell();
    }, 300);
    setTimeout(() => {
        addTimezoneToFirstCell();
    }, 600);

    // Create indicator when dates change (FullCalendar recreates indicator on render)
    setTimeout(() => {
        createFullWidthIndicator();
    }, 200);

    // Also check after a bit more delay in case indicator appears later
    setTimeout(() => {
        createFullWidthIndicator();
    }, 500);
};

// Initialize calendar
const initCalendar = () => {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;

    // Load existing events
    events = loadEvents();

    calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
        initialView: 'timeGridWeek',
        headerToolbar: {
            left: 'title',
            center: '',
            right: 'prev today next createScheduleBtn seeMoreBtn',
        },
        customButtons: {
            createScheduleBtn: {
                text: 'Create schedule',
                click: openScheduleModal,
            },
            seeMoreBtn: {
                text: '⋮',
                click: () => {
                    console.log('see more');
                },
            },
        },
        locale: ruLocale,
        firstDay: 1, // Monday
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        events: events,
        height: 'auto',
        eventDisplay: 'block',
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        },
        slotMinTime: '08:00:00',
        slotMaxTime: '18:00:00',
        slotDuration: '01:00:00',
        slotLabelInterval: '01:00:00',
        allDaySlot: false,
        selectConstraint: null,
        eventConstraint: null,
        businessHours: {
            daysOfWeek: [1, 2, 3, 4, 5, 6], // Monday - Friday
            startTime: '08:00',
            endTime: '18:00',
        },
        selectOverlap: true,
        eventOverlap: true,
        nowIndicator: true,
        nowIndicatorTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        },
        navLinks: true,
        dayMaxEventRows: false,
        moreLinkClick: 'popover',
        displayEventTime: true,
        displayEventEnd: true,
        weekNumbers: false,
        weekNumberCalculation: 'ISO',
        timeZone: 'local',
        slotLabelFormat: {
            hour: 'numeric',
            hour12: true,
        },
        columnHeaderFormat: {
            weekday: 'short',
            day: 'numeric',
        },
        select: handleDateSelect,
        eventClick: handleEventClick,
        eventDrop: handleEventDrop,
        eventResize: handleEventResize,
        eventChange: handleEventChange,
        dayHeaderContent: formatDayHeader,
        datesSet: handleDatesSet,
    });

    calendar.render();

    // Observer for time indicator appearance
    setupNowIndicatorObserver();

    // Create indicator immediately on load
    setTimeout(() => {
        createFullWidthIndicator();
    }, 300);

    // Add timezone to first cell on load with multiple attempts
    setTimeout(() => {
        addTimezoneToFirstCell();
    }, 400);
    setTimeout(() => {
        addTimezoneToFirstCell();
    }, 800);
};

// Function to add timezone to top cell of time column
const addTimezoneToFirstCell = () => {
    // Find all header cells
    const headerSection = document.querySelector(
        '.fc-scrollgrid-section-header'
    );
    if (!headerSection) {
        return;
    }

    // Find first cell - this should be time column
    // Try to find first cell in first header row that is not a day column
    let timeAxisHeader = null;

    // Option 1: Search via fc-timegrid-axis in header
    timeAxisHeader =
        headerSection.querySelector('th.fc-timegrid-axis') ||
        headerSection.querySelector('.fc-timegrid-axis th');

    // Option 2: Find first cell in first header row
    if (!timeAxisHeader) {
        const firstRow = headerSection.querySelector('tr');
        if (firstRow) {
            const allCells = firstRow.querySelectorAll('th, td');
            // First cell that is not a day column
            for (let cell of allCells) {
                if (!cell.classList.contains('fc-col-header-cell')) {
                    timeAxisHeader = cell;
                    break;
                }
            }
        }
    }

    // Option 3: Search via fc-scrollgrid-shrink (this is always time column)
    if (!timeAxisHeader) {
        timeAxisHeader = headerSection.querySelector(
            '.fc-scrollgrid-shrink th'
        );
    }

    // Option 4: Find any cell with fc-timegrid-axis class
    if (!timeAxisHeader) {
        timeAxisHeader = document.querySelector(
            '.fc-timegrid-axis th, .fc-timegrid-axis td'
        );
    }

    if (timeAxisHeader) {
        // Check if timezone is already added
        let timezoneLabel = timeAxisHeader.querySelector('.timezone-label');

        if (!timezoneLabel) {
            timezoneLabel = document.createElement('div');
            timezoneLabel.className = 'timezone-label';
            timezoneLabel.textContent = getTimezoneOffset();

            // Insert into cell
            const existingContent = timeAxisHeader.querySelector(
                '.fc-scrollgrid-sync-inner'
            );

            if (existingContent) {
                // Save existing content (if any) and add timezone at the beginning
                const existingHTML = existingContent.innerHTML;
                existingContent.innerHTML =
                    '<div class="timezone-label">' +
                    getTimezoneOffset() +
                    '</div>' +
                    (existingHTML || '');
            } else {
                // If no wrapper exists, create it
                const wrapper = document.createElement('div');
                wrapper.className = 'fc-scrollgrid-sync-inner';
                wrapper.innerHTML =
                    '<div class="timezone-label">' +
                    getTimezoneOffset() +
                    '</div>';
                timeAxisHeader.appendChild(wrapper);
            }
        } else {
            // Update text if already exists
            timezoneLabel.textContent = getTimezoneOffset();
        }
    }
};

// Function to setup indicator updates
const setupNowIndicatorObserver = () => {
    // Очистить предыдущий интервал, если существует
    if (indicatorIntervalId !== null) {
        clearInterval(indicatorIntervalId);
    }

    // Update indicator position every minute (time changes)
    indicatorIntervalId = setInterval(createFullWidthIndicator, 60000);
};

// Function to create full-width indicator
const createFullWidthIndicator = () => {
    // Remove previous custom line and time tag
    const oldLine = document.querySelector('.custom-now-indicator-line');
    const oldTimeTag = document.querySelector('.custom-now-indicator-time');
    if (oldLine) oldLine.remove();
    if (oldTimeTag) oldTimeTag.remove();

    // Find standard indicator
    const nowIndicator = document.querySelector(
        '.fc-timegrid-now-indicator-line'
    );
    if (!nowIndicator) return;

    // Find container
    const container = document.querySelector('.fc-timegrid-body');
    if (!container) return;

    // Find time column for correct tag positioning
    const timeAxis = document.querySelector('.fc-timegrid-axis');
    const timeAxisWidth = timeAxis
        ? timeAxis.getBoundingClientRect().width
        : 60;

    const containerRect = container.getBoundingClientRect();
    const indicatorRect = nowIndicator.getBoundingClientRect();
    const topPosition = indicatorRect.top - containerRect.top;

    // Get current time in "9:00 PM" format
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    // Create time tag in time column (left)
    const timeTag = document.createElement('div');
    timeTag.className = 'custom-now-indicator-time';
    timeTag.textContent = timeString;
    timeTag.style.top = `${topPosition}px`;

    // Create full-width line
    const line = document.createElement('div');
    line.className = 'custom-now-indicator-line';
    line.style.left = `${timeAxisWidth - 14}px`;
    line.style.top = `${topPosition}px`;

    container.style.position = 'relative';
    container.appendChild(timeTag);
    container.appendChild(line);

    // Hide standard line and time
    nowIndicator.style.visibility = 'hidden';
    const standardTimeLabel = document.querySelector(
        '.fc-timegrid-now-indicator-time'
    );
    if (standardTimeLabel) {
        standardTimeLabel.style.visibility = 'hidden';
    }
};

// Handle date/time selection
const handleDateSelect = (selectInfo) => {
    // Clear any previous selection
    calendar.unselect();

    // If it's a day click in month view, open modal with default times
    if (selectInfo.view.type === 'dayGridMonth') {
        const start = new Date(selectInfo.start);
        start.setHours(9, 0, 0, 0); // Default to 9 AM
        const end = new Date(start);
        end.setHours(10, 0, 0, 0); // Default 1 hour duration

        openEventModal(null, {
            start: start,
            end: end,
            allDay: false,
        });
    } else {
        openEventModal(null, selectInfo);
    }
};

// Handle event click
const handleEventClick = (clickInfo) => {
    openEventModal(clickInfo.event, null);
};

// Handle event drop (drag and drop)
const handleEventDrop = (dropInfo) => {
    updateEvent(dropInfo.event);
};

// Handle event resize
const handleEventResize = (resizeInfo) => {
    updateEvent(resizeInfo.event);
};

// Handle event change
const handleEventChange = (changeInfo) => {
    updateEvent(changeInfo.event);
};

// Handle all-day toggle change
const handleAllDayToggle = function () {
    const startInput = document.getElementById('event-start');
    const endInput = document.getElementById('event-end');

    if (this.checked) {
        // Switch to date inputs
        if (startInput) {
            startInput.type = 'date';
            if (startInput.value) {
                const date = new Date(startInput.value);
                startInput.value = formatDateLocal(date);
            }
        }
        if (endInput) {
            endInput.type = 'date';
            if (endInput.value) {
                const date = new Date(endInput.value);
                endInput.value = formatDateLocal(date);
            }
        }
    } else {
        // Switch to datetime-local inputs
        if (startInput) {
            startInput.type = 'datetime-local';
            if (startInput.value) {
                const date = new Date(startInput.value);
                if (isNaN(date.getTime())) {
                    date.setHours(9, 0, 0, 0);
                }
                startInput.value = formatDateTimeLocal(date);
            }
        }
        if (endInput) {
            endInput.type = 'datetime-local';
            if (endInput.value) {
                const date = new Date(endInput.value);
                if (isNaN(date.getTime())) {
                    date.setHours(10, 0, 0, 0);
                }
                endInput.value = formatDateTimeLocal(date);
            }
        }
    }
};

// Open event modal
const openEventModal = (event, selectInfo) => {
    const modal = document.getElementById('event-modal');
    const form = document.getElementById('event-form');
    const deleteBtn = document.getElementById('delete-event-btn');
    const modalTitle = document.getElementById('modal-title');
    const allDayCheckbox = document.getElementById('event-allday');

    if (!modal || !form) return;

    // Reset form
    form.reset();

    if (event) {
        // Edit existing event
        modalTitle.textContent = 'Редактировать событие';
        const eventId = document.getElementById('event-id');
        const eventTitle = document.getElementById('event-title');
        const eventStart = document.getElementById('event-start');
        const eventEnd = document.getElementById('event-end');
        const eventDescription = document.getElementById('event-description');
        const eventColor = document.getElementById('event-color');

        if (eventId) eventId.value = event.id;
        if (eventTitle) eventTitle.value = event.title || '';

        const isAllDay = event.allDay || !event.startStr.includes('T');
        if (allDayCheckbox) allDayCheckbox.checked = isAllDay;

        if (eventStart) {
            eventStart.type = isAllDay ? 'date' : 'datetime-local';
            eventStart.value = event.start
                ? isAllDay
                    ? formatDateLocal(event.start)
                    : formatDateTimeLocal(event.start)
                : '';
        }
        if (eventEnd) {
            eventEnd.type = isAllDay ? 'date' : 'datetime-local';
            eventEnd.value = event.end
                ? isAllDay
                    ? formatDateLocal(event.end)
                    : formatDateTimeLocal(event.end)
                : '';
        }
        if (eventDescription) {
            eventDescription.value = event.extendedProps?.description || '';
        }
        if (eventColor) {
            eventColor.value = event.backgroundColor || '#3b82f6';
        }
        if (deleteBtn) deleteBtn.style.display = 'block';
    } else if (selectInfo) {
        // Create new event
        modalTitle.textContent = 'Создать событие';
        const eventId = document.getElementById('event-id');
        const eventTitle = document.getElementById('event-title');
        const eventStart = document.getElementById('event-start');
        const eventEnd = document.getElementById('event-end');
        const eventDescription = document.getElementById('event-description');
        const eventColor = document.getElementById('event-color');

        if (eventId) eventId.value = '';
        if (eventTitle) eventTitle.value = '';

        const isAllDay = selectInfo.allDay || false;
        if (allDayCheckbox) allDayCheckbox.checked = isAllDay;

        if (eventStart) {
            eventStart.type = isAllDay ? 'date' : 'datetime-local';
            eventStart.value = formatDateTimeLocal(selectInfo.start);
            if (isAllDay) {
                eventStart.value = formatDateLocal(selectInfo.start);
            }
        }
        if (eventEnd) {
            eventEnd.type = isAllDay ? 'date' : 'datetime-local';
            const endDate =
                selectInfo.end ||
                new Date(selectInfo.start.getTime() + 60 * 60 * 1000);
            eventEnd.value = isAllDay
                ? formatDateLocal(endDate)
                : formatDateTimeLocal(endDate);
        }
        if (eventDescription) eventDescription.value = '';
        if (eventColor) eventColor.value = '#3b82f6';
        if (deleteBtn) deleteBtn.style.display = 'none';
    }

    if (modal) modal.showModal();
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

// Save event
const saveEvent = (eventData) => {
    const id = eventData.id || 'event_' + Date.now();
    const isAllDay = eventData.allDay || false;

    let start, end;
    if (isAllDay) {
        start = new Date(eventData.start);
        start.setHours(0, 0, 0, 0);
        end = eventData.end ? new Date(eventData.end) : new Date(start);
        end.setHours(23, 59, 59, 999);
    } else {
        start = parseDateTimeLocal(eventData.start);
        end =
            parseDateTimeLocal(eventData.end) ||
            new Date(start.getTime() + 60 * 60 * 1000);
    }

    const event = {
        id: id,
        title: eventData.title,
        start: start.toISOString(),
        end: end.toISOString(),
        backgroundColor: eventData.color,
        borderColor: eventData.color,
        textColor: '#ffffff',
        extendedProps: {
            description: eventData.description || '',
            notes: eventData.description || '',
        },
        allDay: isAllDay,
    };

    // Update or add event
    const index = events.findIndex((e) => e.id === id);
    if (index >= 0) {
        events[index] = event;
    } else {
        events.push(event);
    }

    saveEvents();
    calendar.removeAllEvents();
    calendar.addEventSource(events);
};

// Update event
const updateEvent = (event) => {
    const index = events.findIndex((e) => e.id === event.id);
    if (index >= 0) {
        events[index] = {
            id: event.id,
            title: event.title,
            start: event.start.toISOString(),
            end: event.end ? event.end.toISOString() : null,
            backgroundColor: event.backgroundColor,
            borderColor: event.borderColor,
            extendedProps: event.extendedProps || {},
        };
        saveEvents();
    }
};

// Delete event
const deleteEvent = (eventId) => {
    events = events.filter((e) => e.id !== eventId);
    saveEvents();
    calendar.removeAllEvents();
    calendar.addEventSource(events);
};

// Handle form submission
const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const eventId = formData.get('event-id');
    const title = formData.get('event-title');
    const start = formData.get('event-start');
    const end = formData.get('event-end');
    const description = formData.get('event-description');
    const color = formData.get('event-color');
    const allDayCheckbox = document.getElementById('event-allday');
    const isAllDay = allDayCheckbox ? allDayCheckbox.checked : false;

    if (!title || !start) {
        alert('Пожалуйста, заполните название и дату начала');
        return;
    }

    saveEvent({
        id: eventId,
        title: title,
        start: start,
        end: end,
        description: description,
        color: color,
        allDay: isAllDay,
    });

    const modal = document.getElementById('event-modal');
    if (modal) {
        modal.close();
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initCalendar();

    // Setup form handler
    const form = document.getElementById('event-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Setup delete button
    const deleteBtn = document.getElementById('delete-event-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            const eventId = document.getElementById('event-id').value;
            if (
                eventId &&
                confirm('Вы уверены, что хотите удалить это событие?')
            ) {
                deleteEvent(eventId);
                const modal = document.getElementById('event-modal');
                if (modal) {
                    modal.close();
                }
            }
        });
    }

    // Setup close button
    const closeBtn = document.getElementById('close-modal-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            const modal = document.getElementById('event-modal');
            if (modal) {
                modal.close();
            }
        });
    }

    // Setup all-day checkbox handler
    const allDayCheckbox = document.getElementById('event-allday');
    if (allDayCheckbox) {
        allDayCheckbox.addEventListener('change', handleAllDayToggle);
    }

    // Setup schedule form submit
    const scheduleForm = document.getElementById('schedule-form');
    if (scheduleForm) {
        scheduleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you can handle the schedule form submission
            console.log('Schedule form submitted');
            closeScheduleDrawer();
        });
    }
});

// Open schedule drawer
const openScheduleModal = () => {
    const drawer = document.getElementById('schedule-drawer');
    if (drawer) {
        drawer.checked = true;
    }
};

// Close schedule drawer
const closeScheduleDrawer = () => {
    const drawer = document.getElementById('schedule-drawer');
    if (drawer) {
        drawer.checked = false;
    }
};

// Function to cleanup calendar resources
const destroyCalendar = () => {
    // Очистить интервал
    if (indicatorIntervalId !== null) {
        clearInterval(indicatorIntervalId);
        indicatorIntervalId = null;
    }

    // Уничтожить календарь
    if (calendar) {
        calendar.destroy();
        calendar = null;
    }
};

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    destroyCalendar();
});
