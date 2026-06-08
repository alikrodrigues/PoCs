/* ==========================================================================
   ATELIER — Grooming & Barber Shop Agenda — APP.JS
   Core state engine, calendar date math, persistence, and interactive views
   ========================================================================== */

// --- 1. CONFIGURATIONS & STATIC DATA ---
const BARBERS = [
    { id: 'alex', name: 'Alex Rivera', initials: 'AR', specialty: 'Modern Fades' },
    { id: 'jordan', name: 'Jordan Kross', initials: 'JK', specialty: 'Classic Scissors' },
    { id: 'taylor', name: 'Taylor Finch', initials: 'TF', specialty: 'Beard Sculpting' },
    { id: 'morgan', name: 'Morgan Sterling', initials: 'MS', specialty: 'Luxury Shaves' }
];

const SERVICES = [
    { id: 'haircut', name: 'Classic Haircut', price: 40.00, theme: 'service-haircut' },
    { id: 'beard', name: 'Beard Grooming & Sculpting', price: 25.00, theme: 'service-beard' },
    { id: 'shave', name: 'Traditional Hot Shave', price: 30.00, theme: 'service-shave' },
    { id: 'deluxe', name: 'The Atelier Deluxe Combo', price: 65.00, theme: 'service-deluxe' }
];

const WORKING_HOURS = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

// --- 2. APPLICATION STATE ---
let state = {
    currentDate: new Date('2026-06-07'), // Anchor date matching the user's date in June 2026
    activeBarberFilter: 'all', // 'all' or specific barber.id
    appointments: [],
    selectedSlot: { dayDateStr: null, time: null, dayIdx: null }
};

// --- 3. DOM ELEMENTS ---
const elements = {
    currentWeekLabel: document.getElementById('current-week-label'),
    prevWeekBtn: document.getElementById('prev-week'),
    nextWeekBtn: document.getElementById('next-week'),
    todayBtn: document.getElementById('today-btn'),
    
    barbersTabsContainer: document.getElementById('barbers-tabs-container'),
    gridDayHeaders: document.getElementById('grid-day-headers'),
    gridBody: document.getElementById('grid-body'),
    
    // Booking Modal
    bookingModal: document.getElementById('booking-modal'),
    bookingForm: document.getElementById('booking-form'),
    formDate: document.getElementById('form-date'),
    formTime: document.getElementById('form-time'),
    formClientName: document.getElementById('form-client-name'),
    formClientPhone: document.getElementById('form-client-phone'),
    formService: document.getElementById('form-service'),
    formBarber: document.getElementById('form-barber'),
    formDayIdx: document.getElementById('form-day-idx'),
    btnCancelBooking: document.getElementById('btn-cancel-booking'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    quickBookBtn: document.getElementById('quick-book-btn'),
    
    // Detail Modal
    detailModal: document.getElementById('detail-modal'),
    detailCloseBtn: document.getElementById('detail-close-btn'),
    detailCloseBtnBottom: document.getElementById('detail-close-btn-bottom'),
    detailBadgeService: document.getElementById('detail-badge-service'),
    detailClientName: document.getElementById('detail-client-name'),
    detailTimeVal: document.getElementById('detail-time-val'),
    detailBarberAvatar: document.getElementById('detail-barber-avatar'),
    detailBarberName: document.getElementById('detail-barber-name'),
    detailCostVal: document.getElementById('detail-cost-val'),
    detailPhoneVal: document.getElementById('detail-phone-val'),
    btnDeleteAppointment: document.getElementById('btn-delete-appointment'),
    
    // Stats elements
    occupancyFill: document.getElementById('occupancy-fill'),
    occupancyValue: document.getElementById('occupancy-value'),
    bookedCount: document.getElementById('booked-count'),
    bookedHours: document.getElementById('booked-hours'),
    serviceStatsList: document.getElementById('service-stats-list'),
    
    toastContainer: document.getElementById('toast-container')
};

// --- 4. DATE HELPER FUNCTIONS ---
// Get Monday of the week for a given date
function getStartOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

// Format Date as YYYY-MM-DD (local time-zone safe format)
function formatDateISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Display Date as human-readable (e.g., "Monday, June 8")
function formatFriendlyDate(date) {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
}

// Get array of 7 dates starting from a given Monday
function getWeekDays(startOfWeek) {
    const days = [];
    for (let i = 0; i < 7; i++) {
        const nextDay = new Date(startOfWeek);
        nextDay.setDate(startOfWeek.getDate() + i);
        days.push(nextDay);
    }
    return days;
}


// --- 5. DATA INGESTION & LOCAL STORAGE ---
// Realistic initial data to make the app look lively immediately on first load
function getMockAppointments() {
    return [
        { id: 'mock-1', clientName: 'Liam Henderson', clientPhone: '(555) 019-2834', barberId: 'alex', serviceId: 'haircut', date: '2026-06-08', time: '10:00', duration: 60 },
        { id: 'mock-2', clientName: 'Sebastian Cole', clientPhone: '(555) 014-9912', barberId: 'alex', serviceId: 'deluxe', date: '2026-06-08', time: '14:00', duration: 60 },
        { id: 'mock-3', clientName: 'Julian Black', clientPhone: '(555) 012-4412', barberId: 'jordan', serviceId: 'shave', date: '2026-06-08', time: '11:00', duration: 60 },
        { id: 'mock-4', clientName: 'Arthur Pendelton', clientPhone: '(555) 015-8823', barberId: 'taylor', serviceId: 'beard', date: '2026-06-09', time: '09:00', duration: 60 },
        { id: 'mock-5', clientName: 'Marcus Aurelius', clientPhone: '(555) 017-7744', barberId: 'morgan', serviceId: 'haircut', date: '2026-06-09', time: '13:00', duration: 60 },
        { id: 'mock-6', clientName: 'Dorian Gray', clientPhone: '(555) 018-4411', barberId: 'alex', serviceId: 'shave', date: '2026-06-10', time: '15:00', duration: 60 },
        { id: 'mock-7', clientName: 'James Joyce', clientPhone: '(555) 016-1234', barberId: 'taylor', serviceId: 'beard', date: '2026-06-10', time: '16:00', duration: 60 },
        { id: 'mock-8', clientName: 'Vincent Price', clientPhone: '(555) 013-4455', barberId: 'jordan', serviceId: 'deluxe', date: '2026-06-11', time: '10:00', duration: 60 },
        { id: 'mock-9', clientName: 'Oscar Wilde', clientPhone: '(555) 011-9988', barberId: 'morgan', serviceId: 'haircut', date: '2026-06-11', time: '11:00', duration: 60 },
        { id: 'mock-10', clientName: 'Alastair Vance', clientPhone: '(555) 019-3322', barberId: 'alex', serviceId: 'haircut', date: '2026-06-12', time: '11:00', duration: 60 },
        { id: 'mock-11', clientName: 'Thomas Shelby', clientPhone: '(555) 012-7711', barberId: 'morgan', serviceId: 'deluxe', date: '2026-06-12', time: '14:00', duration: 60 }
    ];
}

function loadAppointments() {
    const saved = localStorage.getItem('atelier_appointments');
    if (saved) {
        state.appointments = JSON.parse(saved);
    } else {
        state.appointments = getMockAppointments();
        saveAppointments();
    }
}

function saveAppointments() {
    localStorage.setItem('atelier_appointments', JSON.stringify(state.appointments));
}


// --- 6. TOAST NOTIFICATION SYSTEM ---
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '';
    if (type === 'success') {
        icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
    } else if (type === 'danger') {
        icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 9-6 6"/><path d="m9 9 6 6"/><circle cx="12" cy="12" r="10"/></svg>`;
    } else {
        icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`;
    }
    
    toast.innerHTML = `${icon} <span>${message}</span>`;
    elements.toastContainer.appendChild(toast);
    
    // Trigger transition
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Autoremove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}


// --- 7. SIDEBAR INSIGHTS & STATS ENGINE ---
function updateWeeklyInsights() {
    const startOfWeek = getStartOfWeek(state.currentDate);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const startStr = formatDateISO(startOfWeek);
    const endStr = formatDateISO(endOfWeek);
    
    // Filter appointments inside current visible week and active barber
    const weekAppointments = state.appointments.filter(app => {
        const isInDateRange = app.date >= startStr && app.date <= endStr;
        if (!isInDateRange) return false;
        
        if (state.activeBarberFilter !== 'all') {
            return app.barberId === state.activeBarberFilter;
        }
        return true;
    });
    
    // Calculate Stats
    const totalBookings = weekAppointments.length;
    const totalHours = totalBookings; // Each booking is exactly 1 hour
    
    // Compute Occupancy Rate
    // Total slots in a week: 7 days * 9 working hours = 63 slots per barber
    const activeBarbersCount = state.activeBarberFilter === 'all' ? BARBERS.length : 1;
    const totalAvailableSlots = activeBarbersCount * 7 * WORKING_HOURS.length;
    const occupancyPercentage = totalAvailableSlots > 0 
        ? Math.round((totalBookings / totalAvailableSlots) * 100) 
        : 0;
    
    // Update Stats UI
    elements.bookedCount.textContent = totalBookings;
    elements.bookedHours.textContent = `${totalHours}h`;
    elements.occupancyValue.textContent = `${occupancyPercentage}%`;
    elements.occupancyFill.style.width = `${occupancyPercentage}%`;
    
    // Services Popularity Stats
    const serviceCounts = {};
    SERVICES.forEach(s => serviceCounts[s.id] = { name: s.name, count: 0 });
    
    weekAppointments.forEach(app => {
        if (serviceCounts[app.serviceId]) {
            serviceCounts[app.serviceId].count++;
        }
    });
    
    // Sort and render top services
    const sortedServices = Object.values(serviceCounts)
        .sort((a, b) => b.count - a.count);
        
    elements.serviceStatsList.innerHTML = '';
    sortedServices.forEach(srv => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${srv.name}</span>
            <span class="count">${srv.count} booked</span>
        `;
        elements.serviceStatsList.appendChild(li);
    });
}


// --- 8. UI COMPONENT INITIALIZATIONS ---
function initFormDropdowns() {
    // Populate Services Dropdown
    elements.formService.innerHTML = SERVICES.map(s => `
        <option value="${s.id}">${s.name} ($${s.price.toFixed(2)})</option>
    `).join('');
    
    // Populate Barbers Dropdown
    elements.formBarber.innerHTML = BARBERS.map(b => `
        <option value="${b.id}">${b.name} — ${b.specialty}</option>
    `).join('');
    
    // Populate Times Dropdown
    elements.formTime.innerHTML = WORKING_HOURS.map(t => {
        const hour = parseInt(t.split(':')[0]);
        const suffix = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        return `<option value="${t}">${displayHour}:00 ${suffix}</option>`;
    }).join('');
}

function renderBarbersFilter() {
    // Keep 'All Team' tab static in HTML, generate the others
    const html = BARBERS.map(b => `
        <button class="barber-tab ${state.activeBarberFilter === b.id ? 'active' : ''}" data-barber-id="${b.id}">
            <div class="avatar-placeholder">${b.initials}</div>
            <div style="display:flex; flex-direction:column;">
                <span>${b.name}</span>
                <small style="font-size: 0.65rem; color: var(--text-secondary); font-weight:400;">${b.specialty}</small>
            </div>
        </button>
    `).join('');
    
    // Clear and re-insert after the "All" button
    const allBtn = elements.barbersTabsContainer.querySelector('[data-barber-id="all"]');
    // Set active class on ALL button if applicable
    if (state.activeBarberFilter === 'all') {
        allBtn.classList.add('active');
    } else {
        allBtn.classList.remove('active');
    }
    
    // Remove old specific barber buttons
    const oldSpecificTabs = elements.barbersTabsContainer.querySelectorAll('.barber-tab:not([data-barber-id="all"])');
    oldSpecificTabs.forEach(tab => tab.remove());
    
    // Append newly compiled buttons
    allBtn.insertAdjacentHTML('afterend', html);
    
    // Attach event listeners to all tabs
    const allTabs = elements.barbersTabsContainer.querySelectorAll('.barber-tab');
    allTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            allTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            state.activeBarberFilter = tab.getAttribute('data-barber-id');
            renderAgendaGrid();
            updateWeeklyInsights();
        });
    });
}


// --- 9. CALENDAR RENDERING ENGINE ---
function renderAgendaGrid() {
    const startOfWeek = getStartOfWeek(state.currentDate);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    // 1. Update Header week text
    const weekStartLabel = startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const weekEndLabel = endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    elements.currentWeekLabel.textContent = `${weekStartLabel} — ${weekEndLabel}`;
    
    // 2. Render Day Column Headers
    const weekDays = getWeekDays(startOfWeek);
    const today = new Date();
    const todayISO = formatDateISO(today);
    
    elements.gridDayHeaders.innerHTML = weekDays.map((dayDate, idx) => {
        const dayName = dayDate.toLocaleDateString('en-US', { weekday: 'short' });
        const dayNum = dayDate.getDate();
        const dateISO = formatDateISO(dayDate);
        const isToday = dateISO === todayISO;
        
        return `
            <div class="grid-header-cell ${isToday ? 'active-day-header' : ''}" style="${isToday ? 'background-color: var(--border-light); border-bottom: 2px solid var(--accent-color);' : ''}">
                <span class="day-name">${dayName}</span>
                <span class="day-date">${dayNum}</span>
            </div>
        `;
    }).join('');
    
    // 3. Render Grid rows (Hour-by-hour)
    elements.gridBody.innerHTML = '';
    
    WORKING_HOURS.forEach(time => {
        // Create the Time Row wrapper
        const timeRow = document.createElement('div');
        timeRow.className = 'time-row';
        
        // Render the Hour Label cell (e.g. "09:00 AM")
        const hour = parseInt(time.split(':')[0]);
        const suffix = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        
        const hourCell = document.createElement('div');
        hourCell.className = 'hour-cell';
        hourCell.textContent = `${displayHour}:00 ${suffix}`;
        timeRow.appendChild(hourCell);
        
        // Render Row slots container
        const slotsContainer = document.createElement('div');
        slotsContainer.className = 'row-slots';
        
        // Render 7 columns (one for each day of the week)
        weekDays.forEach((dayDate, dayIdx) => {
            const dateISO = formatDateISO(dayDate);
            
            const slotCell = document.createElement('div');
            slotCell.className = 'grid-slot';
            slotCell.setAttribute('data-date', dateISO);
            slotCell.setAttribute('data-time', time);
            slotCell.setAttribute('data-day-idx', dayIdx);
            
            // Query appointments in this specific cell
            const cellAppointments = state.appointments.filter(app => app.date === dateISO && app.time === time);
            
            // Apply filtering logic based on active barber
            let displayAppointments = cellAppointments;
            if (state.activeBarberFilter !== 'all') {
                displayAppointments = cellAppointments.filter(app => app.barberId === state.activeBarberFilter);
            }
            
            if (displayAppointments.length > 0) {
                slotCell.classList.add('has-appointment');
                
                // Render appointment cards stacked inside the cell
                displayAppointments.forEach(app => {
                    const barber = BARBERS.find(b => b.id === app.barberId);
                    const service = SERVICES.find(s => s.id === app.serviceId);
                    
                    const card = document.createElement('div');
                    card.className = `appointment-card ${service ? service.theme : 'service-haircut'}`;
                    card.innerHTML = `
                        <div class="app-client" title="${app.clientName}">${app.clientName}</div>
                        <div class="app-service">${service ? service.name : 'Service'}</div>
                        <div class="app-barber-badge" title="${barber ? barber.name : 'Team'}">${barber ? barber.initials : 'Staff'}</div>
                    `;
                    
                    // Clicking on a booked card displays appointment details
                    card.addEventListener('click', (e) => {
                        e.stopPropagation(); // Prevent opening booking form for empty slot
                        openDetailModal(app);
                    });
                    
                    slotCell.appendChild(card);
                });
            } else {
                // Clicking an empty slot opens the booking modal
                slotCell.addEventListener('click', () => {
                    // Check if we are viewing a specific barber or all
                    const targetBarberId = state.activeBarberFilter === 'all' ? BARBERS[0].id : state.activeBarberFilter;
                    openBookingModal(dateISO, time, dayIdx, targetBarberId);
                });
            }
            
            slotsContainer.appendChild(slotCell);
        });
        
        timeRow.appendChild(slotsContainer);
        elements.gridBody.appendChild(timeRow);
    });
}


// --- 10. MODAL INTERACTIVE LOGIC ---
// Open Modal to book a new appointment
function openBookingModal(dateISO, time, dayIdx, barberId) {
    state.selectedSlot = { dateISO, time, dayIdx };
    
    // Set field values
    const dateObj = new Date(dateISO + 'T00:00:00'); // Locale safe date parsing
    elements.formDate.value = formatFriendlyDate(dateObj);
    elements.formTime.value = time;
    elements.formDayIdx.value = dayIdx;
    elements.formBarber.value = barberId;
    
    // Clear old validation errors and reset fields
    elements.formClientName.value = '';
    elements.formClientPhone.value = '';
    
    elements.bookingForm.querySelectorAll('.form-group').forEach(group => group.classList.remove('has-error'));
    
    // Show modal
    elements.bookingModal.classList.add('active');
    // Autofocus client name
    setTimeout(() => elements.formClientName.focus(), 100);
}

function closeBookingModal() {
    elements.bookingModal.classList.remove('active');
}

// Open Details Card Modal
let selectedAppForDetail = null;

function openDetailModal(appointment) {
    selectedAppForDetail = appointment;
    const barber = BARBERS.find(b => b.id === appointment.barberId);
    const service = SERVICES.find(s => s.id === appointment.serviceId);
    const dateObj = new Date(appointment.date + 'T00:00:00');
    
    // Hours suffix math for standard display
    const hour = parseInt(appointment.time.split(':')[0]);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    
    // Inject values
    elements.detailBadgeService.textContent = service ? service.name.toUpperCase() : 'HAIRCUT';
    // Style badges based on service theme color
    elements.detailBadgeService.className = `modal-badge-info ${service ? service.theme : 'service-haircut'}`;
    elements.detailClientName.textContent = appointment.clientName;
    elements.detailTimeVal.textContent = `${formatFriendlyDate(dateObj)} @ ${displayHour}:00 ${suffix}`;
    
    elements.detailBarberAvatar.textContent = barber ? barber.initials : 'B';
    elements.detailBarberName.textContent = barber ? barber.name : 'Unknown Barber';
    
    elements.detailCostVal.textContent = `$${service ? service.price.toFixed(2) : '0.00'}`;
    elements.detailPhoneVal.textContent = appointment.clientPhone || 'No phone provided';
    
    elements.detailModal.classList.add('active');
}

function closeDetailModal() {
    elements.detailModal.classList.remove('active');
    selectedAppForDetail = null;
}


// --- 11. BOOKING ENGINE: CONFLICT CHECKS & VALIDATION ---
function validateBookingForm() {
    let isValid = true;
    
    // Validate Client Name
    const nameVal = elements.formClientName.value.trim();
    const nameGroup = elements.formClientName.closest('.form-group');
    if (!nameVal) {
        nameGroup.classList.add('has-error');
        isValid = false;
    } else {
        nameGroup.classList.remove('has-error');
    }
    
    // Validate Phone (must be at least 7 digits to prevent keyboard mashing)
    const phoneVal = elements.formClientPhone.value.trim();
    const phoneGroup = elements.formClientPhone.closest('.form-group');
    const phoneClean = phoneVal.replace(/\D/g, '');
    if (phoneClean.length < 7) {
        phoneGroup.classList.add('has-error');
        isValid = false;
    } else {
        phoneGroup.classList.remove('has-error');
    }
    
    return isValid;
}

function checkBookingConflict(date, time, barberId) {
    // A barber is double-booked if they have an active appointment on the same date and time
    return state.appointments.some(app => 
        app.date === date && 
        app.time === time && 
        app.barberId === barberId
    );
}

function handleBookingSubmit(e) {
    e.preventDefault();
    
    if (!validateBookingForm()) return;
    
    const clientName = elements.formClientName.value.trim();
    const clientPhone = elements.formClientPhone.value.trim();
    const barberId = elements.formBarber.value;
    const serviceId = elements.formService.value;
    const time = elements.formTime.value;
    const dateISO = state.selectedSlot.dateISO || formatDateISO(getWeekDays(getStartOfWeek(state.currentDate))[elements.formDayIdx.value]);
    
    // Double Booking Conflict Check!
    if (checkBookingConflict(dateISO, time, barberId)) {
        const barber = BARBERS.find(b => b.id === barberId);
        showToast(`${barber ? barber.name : 'Selected barber'} is already booked at ${time}!`, 'danger');
        return;
    }
    
    // Save new appointment
    const newApp = {
        id: 'app-' + Date.now(),
        clientName,
        clientPhone,
        barberId,
        serviceId,
        date: dateISO,
        time,
        duration: 60
    };
    
    state.appointments.push(newApp);
    saveAppointments();
    
    // Refresh App
    renderAgendaGrid();
    updateWeeklyInsights();
    closeBookingModal();
    
    showToast(`Appointment scheduled successfully for ${clientName}!`, 'success');
}

function handleCancelAppointment() {
    if (!selectedAppForDetail) return;
    
    const appToDelete = selectedAppForDetail;
    
    if (confirm(`Are you sure you want to cancel the appointment for ${appToDelete.clientName}?`)) {
        state.appointments = state.appointments.filter(app => app.id !== appToDelete.id);
        saveAppointments();
        
        renderAgendaGrid();
        updateWeeklyInsights();
        closeDetailModal();
        
        showToast(`Appointment for ${appToDelete.clientName} has been cancelled.`, 'success');
    }
}


// --- 12. EVENT LISTENERS ---
function attachEventListeners() {
    // Navigation
    elements.prevWeekBtn.addEventListener('click', () => {
        state.currentDate.setDate(state.currentDate.getDate() - 7);
        renderAgendaGrid();
        updateWeeklyInsights();
    });
    
    elements.nextWeekBtn.addEventListener('click', () => {
        state.currentDate.setDate(state.currentDate.getDate() + 7);
        renderAgendaGrid();
        updateWeeklyInsights();
    });
    
    elements.todayBtn.addEventListener('click', () => {
        state.currentDate = new Date('2026-06-07'); // Set back to our default anchor date in the mock week
        renderAgendaGrid();
        updateWeeklyInsights();
    });
    
    // Booking Form buttons
    elements.bookingForm.addEventListener('submit', handleBookingSubmit);
    elements.btnCancelBooking.addEventListener('click', closeBookingModal);
    elements.modalCloseBtn.addEventListener('click', closeBookingModal);
    
    // Close modal on escape or background click
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeBookingModal();
            closeDetailModal();
        }
    });
    
    elements.bookingModal.addEventListener('click', (e) => {
        if (e.target === elements.bookingModal) closeBookingModal();
    });
    
    elements.detailModal.addEventListener('click', (e) => {
        if (e.target === elements.detailModal) closeDetailModal();
    });
    
    // Detail Modal buttons
    elements.detailCloseBtn.addEventListener('click', closeDetailModal);
    elements.detailCloseBtnBottom.addEventListener('click', closeDetailModal);
    elements.btnDeleteAppointment.addEventListener('click', handleCancelAppointment);
    
    // Quick book button opens the modal for the current date's 09:00 AM slot
    elements.quickBookBtn.addEventListener('click', () => {
        const todayISO = formatDateISO(new Date('2026-06-08')); // Mock Monday
        openBookingModal(todayISO, '09:00', 0, BARBERS[0].id);
    });
    
    // Input-specific instant error clearing
    elements.formClientName.addEventListener('input', () => {
        elements.formClientName.closest('.form-group').classList.remove('has-error');
    });
    elements.formClientPhone.addEventListener('input', () => {
        elements.formClientPhone.closest('.form-group').classList.remove('has-error');
    });
}


// --- 13. BOOTSTRAP INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
    loadAppointments();
    initFormDropdowns();
    renderBarbersFilter();
    renderAgendaGrid();
    updateWeeklyInsights();
    attachEventListeners();
    
    showToast('Agenda loaded. Welcome to Atelier Studio.', 'success');
});