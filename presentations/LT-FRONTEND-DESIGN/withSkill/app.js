/* ==========================================================================
   BARBER SHOP AGENDA CORE LOGIC
   ========================================================================== */

// 1. Operational Configurations & Mock Data Seeding
const OPERATIONAL_HOURS = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

const DAYS_OF_WEEK = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const BARBERS = [
  { id: "evelyn", name: "Evelyn Stone", specialty: "Precision Cuts & Styling", initials: "ES", className: "barber-evelyn" },
  { id: "julian", name: "Julian Reed", specialty: "Classic Fades & Shaving", initials: "JR", className: "barber-julian" },
  { id: "clara", name: "Clara Vance", specialty: "Beard Design & Artistry", initials: "CV", className: "barber-clara" }
];

const SERVICES = [
  { name: "The Classic Haircut", price: 45, duration: "45 mins" },
  { name: "Beard Design & Shave", price: 35, duration: "30 mins" },
  { name: "The Signature Ritual", price: 75, duration: "75 mins" },
  { name: "Scissors Precision Cut", price: 60, duration: "60 mins" },
  { name: "Royal Hot Towel Shave", price: 40, duration: "45 mins" }
];

// Initial mock appointments to seed the schedule immediately
const MOCK_APPOINTMENTS_SEED = [
  { id: "1", client: "Dorian Gray", day: "Monday", time: "10:00", barberId: "evelyn", service: "The Classic Haircut", notes: "Extra attention to sides, low fade." },
  { id: "2", client: "Arthur Pendragon", day: "Monday", time: "14:00", barberId: "julian", service: "Royal Hot Towel Shave", notes: "Prefers cold tonic water." },
  { id: "3", client: "Julian Barnes", day: "Tuesday", time: "11:00", barberId: "clara", service: "Beard Design & Shave", notes: "Keep beard full, sharp neck trim." },
  { id: "4", client: "Winston Smith", day: "Wednesday", time: "09:00", barberId: "evelyn", service: "Scissors Precision Cut", notes: "Classic look." },
  { id: "5", client: "Victor Frankenstein", day: "Wednesday", time: "16:00", barberId: "clara", service: "The Signature Ritual", notes: "Exhausted, needs full relaxation package." },
  { id: "6", client: "Sherlock Holmes", day: "Thursday", time: "11:00", barberId: "julian", service: "The Classic Haircut", notes: "Quiet consultation, please." },
  { id: "7", client: "Fitzgerald Fitzgerald", day: "Thursday", time: "15:00", barberId: "evelyn", service: "The Signature Ritual", notes: "Pre-event grooming." },
  { id: "8", client: "Eyre Jane", day: "Friday", time: "10:00", barberId: "clara", service: "Scissors Precision Cut", notes: "Fringe styling." },
  { id: "9", client: "Atticus Finch", day: "Friday", time: "13:00", barberId: "julian", service: "Beard Design & Shave", notes: "Keep it simple and neat." }
];

// 2. Local State Management
let appointments = [];
let currentWeekOffset = 0; // 0 = current week, -1 = previous, etc.
let selectedBarberId = "all"; // "all" or specific barber id

// Set reference date for simulation (Sunday, June 7, 2026)
const REFERENCE_DATE = new Date(2026, 5, 7); // Month index 5 = June

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  loadAppointments();
  initFormSelectors();
  bindGlobalEvents();
  renderAll();
});

// Load appointments from localStorage or seed initial mock data
function loadAppointments() {
  const localData = localStorage.getItem("elysee_appointments");
  if (localData) {
    appointments = JSON.parse(localData);
  } else {
    appointments = [...MOCK_APPOINTMENTS_SEED];
    saveAppointments();
  }
}

function saveAppointments() {
  localStorage.setItem("elysee_appointments", JSON.stringify(appointments));
}

// 3. Date Arithmetic Helper Functions
function getWeekDates(offsetWeeks) {
  // Find Monday of the week that contains the REFERENCE_DATE
  const baseDate = new Date(REFERENCE_DATE);
  const dayOfWeek = baseDate.getDay(); // 0 is Sunday, 1 is Monday, etc.
  
  // Calculate days to subtract to get to Monday of the reference week
  // If today is Sunday (0), subtract 6 days. If Monday (1), subtract 0. If Tuesday (2), subtract 1.
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(baseDate);
  monday.setDate(baseDate.getDate() - daysToSubtract);
  
  // Apply the week offset
  monday.setDate(monday.getDate() + (offsetWeeks * 7));
  
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(monday);
    dayDate.setDate(monday.getDate() + i);
    dates.push(dayDate);
  }
  return dates;
}

// 4. Dom Generation & Rendering
function renderAll() {
  renderWeekLabel();
  renderDaysHeader();
  renderBarbersList();
  renderHoursScale();
  renderScheduleGrid();
  updateStats();
}

function renderWeekLabel() {
  const dates = getWeekDates(currentWeekOffset);
  const start = dates[0];
  const end = dates[6];
  
  const options = { month: 'short', day: 'numeric' };
  const startStr = start.toLocaleDateString('en-US', options);
  
  // If month changes during the week, show month name on both sides
  let endStr = "";
  if (start.getMonth() === end.getMonth()) {
    endStr = end.toLocaleDateString('en-US', { day: 'numeric', year: 'numeric' });
  } else {
    endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  
  document.getElementById("week-range-display").innerText = `${startStr} – ${endStr}`;
}

function renderDaysHeader() {
  const dates = getWeekDates(currentWeekOffset);
  const container = document.getElementById("days-header-row");
  container.innerHTML = "";
  
  const today = new Date(REFERENCE_DATE);
  
  DAYS_OF_WEEK.forEach((day, index) => {
    const cellDate = dates[index];
    const isToday = cellDate.getDate() === today.getDate() && 
                    cellDate.getMonth() === today.getMonth() && 
                    cellDate.getFullYear() === today.getFullYear();
    
    const cell = document.createElement("div");
    cell.className = `day-header-cell ${isToday ? "today" : ""}`;
    cell.innerHTML = `
      <span class="day-name">${day.substring(0, 3)}</span>
      <span class="day-date">${cellDate.getDate()}</span>
    `;
    container.appendChild(cell);
  });
}

function renderBarbersList() {
  const container = document.getElementById("barbers-list-container");
  container.innerHTML = "";
  
  // Create "All Artisans" Card
  const allCard = document.createElement("div");
  allCard.className = `barber-card ${selectedBarberId === "all" ? "active" : ""}`;
  allCard.setAttribute("data-barber-id", "all");
  allCard.innerHTML = `
    <div class="barber-avatar">All</div>
    <div class="barber-info">
      <span class="barber-name">All Artisans</span>
      <span class="barber-specialty">Full Collective</span>
    </div>
  `;
  allCard.addEventListener("click", () => {
    selectedBarberId = "all";
    renderAll();
  });
  container.appendChild(allCard);
  
  // Create Individual Barber Cards
  BARBERS.forEach(barber => {
    const card = document.createElement("div");
    card.className = `barber-card ${selectedBarberId === barber.id ? "active" : ""}`;
    card.setAttribute("data-barber-id", barber.id);
    card.innerHTML = `
      <div class="barber-avatar" style="border-color: ${barber.id === "evelyn" ? "#5D6C5E" : barber.id === "julian" ? "#C29A72" : "#8C7B9E"}">
        ${barber.initials}
      </div>
      <div class="barber-info">
        <span class="barber-name">${barber.name}</span>
        <span class="barber-specialty">${barber.specialty}</span>
      </div>
    `;
    card.addEventListener("click", () => {
      selectedBarberId = barber.id;
      renderAll();
    });
    container.appendChild(card);
  });
}

function renderHoursScale() {
  const container = document.getElementById("scale-hours-container");
  container.innerHTML = "";
  
  OPERATIONAL_HOURS.forEach(hour => {
    const item = document.createElement("div");
    item.className = "scale-hour-item";
    item.innerText = hour;
    container.appendChild(item);
  });
}

function renderScheduleGrid() {
  const container = document.getElementById("agenda-grid-body");
  container.innerHTML = "";
  
  // Create 7 columns (one for each day)
  DAYS_OF_WEEK.forEach((dayName) => {
    const column = document.createElement("div");
    column.className = "day-column";
    column.setAttribute("data-day", dayName);
    
    // Create operational hours cells inside this column
    OPERATIONAL_HOURS.forEach((hour) => {
      const cell = document.createElement("div");
      cell.className = "hour-cell";
      cell.setAttribute("data-hour", hour);
      
      // Find matching appointment
      const matchedApp = appointments.find(app => {
        const matchesDay = app.day === dayName;
        const matchesHour = app.time === hour;
        const matchesBarber = selectedBarberId === "all" ? true : app.barberId === selectedBarberId;
        return matchesDay && matchesHour && matchesBarber;
      });
      
      if (matchedApp) {
        cell.classList.add("booked");
        
        // Find barber's aesthetic class name
        const barberInfo = BARBERS.find(b => b.id === matchedApp.barberId);
        const barberClass = barberInfo ? barberInfo.className : "";
        const barberInitials = barberInfo ? barberInfo.initials : "??";
        
        // Render Appointment Card
        const card = document.createElement("div");
        card.className = `appointment-card ${barberClass}`;
        card.innerHTML = `
          <div class="card-top">
            <span class="card-client">${matchedApp.client}</span>
            <span class="card-service">${matchedApp.service}</span>
          </div>
          <div class="card-bottom">
            <span class="card-time-badge">${matchedApp.time}</span>
            <span class="card-barber-badge">${barberInitials}</span>
          </div>
        `;
        
        // Event: Edit appointment on click
        card.addEventListener("click", (e) => {
          e.stopPropagation(); // Avoid triggering empty cell booking
          openBookingModal(matchedApp);
        });
        
        cell.appendChild(card);
      } else {
        // Event: Book empty slot on click
        cell.addEventListener("click", () => {
          openBookingModal({ day: dayName, time: hour });
        });
      }
      
      column.appendChild(cell);
    });
    
    container.appendChild(column);
  });
}

// Update digest cards (occupancy, hours booked, total unique clients)
function updateStats() {
  // Filter appointments relevant to current barber view
  const currentWeekAppointments = appointments.filter(app => {
    return selectedBarberId === "all" ? true : app.barberId === selectedBarberId;
  });
  
  const totalBookedCount = currentWeekAppointments.length;
  
  // Total booked hours
  const hoursValue = totalBookedCount * 1; // assume 1 hour duration per slot for statistics simplification
  document.getElementById("stat-booked-hours").innerText = `${hoursValue}h`;
  
  // Total clients
  const uniqueClients = new Set(currentWeekAppointments.map(app => app.client.trim().toLowerCase()));
  document.getElementById("stat-services-count").innerText = uniqueClients.size;
  
  // Occupancy rate calculation
  // There are 7 days, 10 hours = 70 slots per week per barber
  // If selectedBarberId is "all", we have 3 barbers = 210 slots total
  const maxSlots = selectedBarberId === "all" ? (7 * 10 * BARBERS.length) : (7 * 10);
  const occupancyPercentage = Math.round((totalBookedCount / maxSlots) * 100);
  document.getElementById("stat-occupancy").innerText = `${occupancyPercentage}%`;
}

// 5. Modal and Form Functionality
function initFormSelectors() {
  // Populate Barber Dropdown in form
  const barberSelect = document.getElementById("booking-barber");
  barberSelect.innerHTML = "";
  BARBERS.forEach(barber => {
    const opt = document.createElement("option");
    opt.value = barber.id;
    opt.innerText = barber.name;
    barberSelect.appendChild(opt);
  });
  
  // Populate Service Dropdown in form
  const serviceSelect = document.getElementById("booking-service");
  serviceSelect.innerHTML = "";
  SERVICES.forEach(svc => {
    const opt = document.createElement("option");
    opt.value = svc.name;
    opt.innerText = `${svc.name} (${svc.duration} — $${svc.price})`;
    serviceSelect.appendChild(opt);
  });
  
  // Populate Time Dropdown in form
  const timeSelect = document.getElementById("booking-time");
  timeSelect.innerHTML = "";
  OPERATIONAL_HOURS.forEach(hour => {
    const opt = document.createElement("option");
    opt.value = hour;
    opt.innerText = hour;
    timeSelect.appendChild(opt);
  });
}

function openBookingModal(data = {}) {
  const modal = document.getElementById("booking-modal");
  const modalTitle = document.getElementById("modal-title-text");
  const form = document.getElementById("booking-form");
  const actionsContainer = document.getElementById("modal-actions-container");
  
  // Reset form
  form.reset();
  
  // Populate hidden id
  document.getElementById("booking-id").value = data.id || "";
  
  if (data.id) {
    // EDIT MODE
    modalTitle.innerText = "Review Reservation";
    document.getElementById("booking-client").value = data.client;
    document.getElementById("booking-day").value = data.day;
    document.getElementById("booking-time").value = data.time;
    document.getElementById("booking-barber").value = data.barberId;
    document.getElementById("booking-service").value = data.service;
    document.getElementById("booking-notes").value = data.notes || "";
    
    // Add delete button dynamically
    actionsContainer.innerHTML = `
      <button type="button" class="btn btn-secondary" id="btn-delete-booking" style="background-color: var(--error-light); color: var(--error); border-color: rgba(210, 132, 113, 0.2);">Cancel Booking</button>
      <button type="submit" class="btn btn-primary" style="flex: 1;">Save Changes</button>
    `;
    
    document.getElementById("btn-delete-booking").addEventListener("click", () => {
      deleteBooking(data.id);
    });
  } else {
    // NEW MODE
    modalTitle.innerText = "Schedule Ritual";
    
    // Autofill day and time if clicked from empty slot
    if (data.day) document.getElementById("booking-day").value = data.day;
    if (data.time) document.getElementById("booking-time").value = data.time;
    if (selectedBarberId !== "all") {
      document.getElementById("booking-barber").value = selectedBarberId;
    }
    
    actionsContainer.innerHTML = `
      <button type="submit" class="btn btn-primary btn-block">Confirm Reservation</button>
    `;
  }
  
  modal.classList.add("open");
}

function closeBookingModal() {
  const modal = document.getElementById("booking-modal");
  modal.classList.remove("open");
}

function deleteBooking(id) {
  appointments = appointments.filter(app => app.id !== id);
  saveAppointments();
  closeBookingModal();
  renderAll();
  showToast("Reservation cancelled successfully.", "success");
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const id = document.getElementById("booking-id").value;
  const client = document.getElementById("booking-client").value.trim();
  const day = document.getElementById("booking-day").value;
  const time = document.getElementById("booking-time").value;
  const barberId = document.getElementById("booking-barber").value;
  const service = document.getElementById("booking-service").value;
  const notes = document.getElementById("booking-notes").value.trim();
  
  // Validation: Check for double booking
  const collision = appointments.find(app => {
    // Check if another appointment matches same barber, day and time
    return app.id !== id && app.barberId === barberId && app.day === day && app.time === time;
  });
  
  if (collision) {
    const barberInfo = BARBERS.find(b => b.id === barberId);
    showToast(`Double Booking Alert: ${barberInfo.name} is already booked at ${time} on ${day}.`, "error");
    return;
  }
  
  if (id) {
    // Update existing
    const appIndex = appointments.findIndex(app => app.id === id);
    if (appIndex !== -1) {
      appointments[appIndex] = { id, client, day, time, barberId, service, notes };
      showToast("Reservation updated successfully.", "success");
    }
  } else {
    // Create new
    const newId = Date.now().toString();
    appointments.push({ id: newId, client, day, time, barberId, service, notes });
    showToast("Reservation scheduled successfully.", "success");
  }
  
  saveAppointments();
  closeBookingModal();
  renderAll();
}

// 6. Navigation and Bindings
function bindGlobalEvents() {
  // Next/Prev Week triggers
  document.getElementById("prev-week").addEventListener("click", () => {
    currentWeekOffset--;
    renderAll();
  });
  
  document.getElementById("next-week").addEventListener("click", () => {
    currentWeekOffset++;
    renderAll();
  });
  
  // Quick booking button
  document.getElementById("btn-quick-book").addEventListener("click", () => {
    openBookingModal();
  });
  
  // Modal close trigger
  document.getElementById("modal-close-btn").addEventListener("click", closeBookingModal);
  
  // Close modal when clicking backdrop
  document.getElementById("booking-modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("booking-modal")) {
      closeBookingModal();
    }
  });
  
  // Form submission
  document.getElementById("booking-form").addEventListener("submit", handleFormSubmit);
}

// 7. Dynamic Notification Toast
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  
  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "toast-error" : ""}`;
  
  // Beautiful minimal styling icons in inline SVG
  const checkIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 1.25rem; height: 1.25rem; color: var(--accent);"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>`;
  const errorIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 1.25rem; height: 1.25rem; color: var(--error);"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" /></svg>`;
  
  toast.innerHTML = `
    ${type === "error" ? errorIcon : checkIcon}
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Smoothly trigger transition
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);
  
  // Clean up element after fade out
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 400); // match transition duration
  }, 3500);
}
