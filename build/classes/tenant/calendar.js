"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantCalendarManager = void 0;
class TenantCalendarManager {
    constructor(tenant, appointments = []) {
        this.tenant = tenant;
        this.appointments = appointments;
    }
    /**
     * Convert AppointmentSchedule to TimeSlot with proper date handling
     */
    scheduleToTimeSlot(schedule) {
        const [year, month, day] = schedule.date.split('-').map(Number);
        const [startHour, startMinute] = schedule.start.split(':').map(Number);
        const [endHour, endMinute] = schedule.end.split(':').map(Number);
        const start = new Date(year, month - 1, day, startHour, startMinute, 0, 0);
        const end = new Date(year, month - 1, day, endHour, endMinute, 0, 0);
        return { start, end };
    }
    /**
     * Convert Date to AppointmentSchedule format
     */
    dateToScheduleString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return {
            date: `${year}-${month}-${day}`,
            time: `${hours}:${minutes}`
        };
    }
    /**
     * Get the day name from a Date object
     */
    getDayName(date) {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        return days[date.getDay()];
    }
    /**
     * Parse time string (e.g., "09:00") and combine with date
     */
    parseTimeOnDate(date, timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const result = new Date(date);
        result.setHours(hours, minutes, 0, 0);
        return result;
    }
    /**
     * Get business hours for a specific date
     */
    getBusinessHoursForDate(date) {
        var _a;
        const hours = (_a = this.tenant.schema.appointments) === null || _a === void 0 ? void 0 : _a.hours;
        if (!hours)
            return [];
        const dayName = this.getDayName(date);
        const dayHours = hours[dayName];
        if (!dayHours || dayHours.length === 0)
            return [];
        return dayHours.map(slot => ({
            open: this.parseTimeOnDate(date, slot.open),
            close: this.parseTimeOnDate(date, slot.close)
        }));
    }
    /**
     * Check if tenant is currently open
     */
    checkAvailability(checkTime = new Date()) {
        var _a;
        const hours = (_a = this.tenant.schema.appointments) === null || _a === void 0 ? void 0 : _a.hours;
        if (!hours) {
            return {
                isOpen: false,
                message: 'Business hours not configured',
                currentStatus: 'closed'
            };
        }
        const businessHours = this.getBusinessHoursForDate(checkTime);
        if (businessHours.length === 0) {
            const nextOpening = this.findNextOpening(checkTime);
            return {
                isOpen: false,
                message: 'Closed today',
                nextOpening,
                currentStatus: 'closed'
            };
        }
        // Check if currently within any business hour slot
        for (const slot of businessHours) {
            if (checkTime >= slot.open && checkTime < slot.close) {
                return {
                    isOpen: true,
                    message: `Open until ${this.formatTime(slot.close)}`,
                    nextClosing: slot.close,
                    currentStatus: 'open'
                };
            }
        }
        // Check if before opening or after closing
        const firstSlot = businessHours[0];
        const lastSlot = businessHours[businessHours.length - 1];
        if (checkTime < firstSlot.open) {
            return {
                isOpen: false,
                message: `Opens at ${this.formatTime(firstSlot.open)}`,
                nextOpening: firstSlot.open,
                currentStatus: 'closed'
            };
        }
        if (checkTime >= lastSlot.close) {
            const nextOpening = this.findNextOpening(checkTime);
            return {
                isOpen: false,
                message: nextOpening
                    ? `Closed. Opens ${this.formatNextOpening(nextOpening)}`
                    : 'Closed',
                nextOpening,
                currentStatus: 'closed'
            };
        }
        // Between slots (e.g., lunch break)
        const nextSlot = businessHours.find(slot => checkTime < slot.open);
        if (nextSlot) {
            return {
                isOpen: false,
                message: `Closed. Opens at ${this.formatTime(nextSlot.open)}`,
                nextOpening: nextSlot.open,
                currentStatus: 'outside_hours'
            };
        }
        return {
            isOpen: false,
            message: 'Closed',
            currentStatus: 'closed'
        };
    }
    /**
     * Find the next opening time from a given date
     */
    findNextOpening(fromDate) {
        const maxDaysToCheck = 14; // Check up to 2 weeks ahead
        for (let i = 1; i <= maxDaysToCheck; i++) {
            const checkDate = new Date(fromDate);
            checkDate.setDate(checkDate.getDate() + i);
            checkDate.setHours(0, 0, 0, 0);
            const businessHours = this.getBusinessHoursForDate(checkDate);
            if (businessHours.length > 0) {
                return businessHours[0].open;
            }
        }
        return undefined;
    }
    /**
     * Format time for display
     */
    formatTime(date) {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }
    /**
     * Format next opening for display
     */
    formatNextOpening(date) {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const checkDate = new Date(date);
        checkDate.setHours(0, 0, 0, 0);
        if (checkDate.getTime() === tomorrow.getTime()) {
            return `tomorrow at ${this.formatTime(date)}`;
        }
        const dayName = this.getDayName(date);
        return `${dayName} at ${this.formatTime(date)}`;
    }
    /**
     * Get all available time slots for a specific date and duration
     */
    getAvailableSlots(date, durationMinutes, intervalMinutes = 30) {
        const businessHours = this.getBusinessHoursForDate(date);
        if (businessHours.length === 0)
            return [];
        const availableSlots = [];
        for (const hours of businessHours) {
            let currentTime = new Date(hours.open);
            const endTime = new Date(hours.close);
            while (currentTime.getTime() + durationMinutes * 60 * 1000 <= endTime.getTime()) {
                const slotEnd = new Date(currentTime.getTime() + durationMinutes * 60 * 1000);
                const slot = { start: currentTime, end: slotEnd };
                // Check if slot conflicts with existing appointments
                if (!this.hasConflict(slot)) {
                    availableSlots.push({
                        start: new Date(currentTime),
                        end: slotEnd,
                        duration: durationMinutes
                    });
                }
                // Move to next interval
                currentTime = new Date(currentTime.getTime() + intervalMinutes * 60 * 1000);
            }
        }
        return availableSlots;
    }
    /**
     * Check if a time slot conflicts with existing appointments
     */
    hasConflict(slot) {
        return this.appointments.some(apt => {
            // Skip cancelled or completed appointments
            if (apt.status === 'cancelled' || apt.status === 'completed') {
                return false;
            }
            const aptSlot = this.scheduleToTimeSlot(apt.schedule);
            const aptStart = aptSlot.start.getTime();
            const aptEnd = aptSlot.end.getTime();
            const slotStart = slot.start.getTime();
            const slotEnd = slot.end.getTime();
            // Check for overlap
            return (slotStart < aptEnd && slotEnd > aptStart);
        });
    }
    /**
     * Check if a specific time slot is available
     */
    isSlotAvailable(slot) {
        // Check if within business hours
        const businessHours = this.getBusinessHoursForDate(slot.start);
        if (businessHours.length === 0) {
            return { available: false, reason: 'Business is closed on this day' };
        }
        const isWithinHours = businessHours.some(hours => slot.start >= hours.open && slot.end <= hours.close);
        if (!isWithinHours) {
            return { available: false, reason: 'Outside business hours' };
        }
        // Check for conflicts
        if (this.hasConflict(slot)) {
            return { available: false, reason: 'Time slot already booked' };
        }
        return { available: true };
    }
    /**
     * Get the business week schedule
     */
    getWeekSchedule() {
        var _a;
        const hours = (_a = this.tenant.schema.appointments) === null || _a === void 0 ? void 0 : _a.hours;
        if (!hours)
            return {};
        const schedule = {};
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        for (const day of days) {
            const dayHours = hours[day];
            if (!dayHours || dayHours.length === 0) {
                schedule[day] = 'Closed';
            }
            else {
                schedule[day] = dayHours
                    .map(slot => `${slot.open} - ${slot.close}`)
                    .join(', ');
            }
        }
        return schedule;
    }
    /**
     * Add an appointment (for testing/updating the calendar)
     */
    addAppointment(appointment) {
        this.appointments.push(appointment);
    }
    /**
     * Get appointments for a specific date range
     */
    getAppointments(startDate, endDate) {
        return this.appointments.filter(apt => {
            const aptSlot = this.scheduleToTimeSlot(apt.schedule);
            return aptSlot.start >= startDate && aptSlot.start <= endDate;
        });
    }
    /**
     * Get appointments for a specific date (YYYY-MM-DD)
     */
    getAppointmentsByDate(dateStr) {
        return this.appointments.filter(apt => apt.schedule.date === dateStr);
    }
    /**
     * Check if a specific appointment can be scheduled
     */
    canScheduleAppointment(schedule) {
        const slot = this.scheduleToTimeSlot(schedule);
        const availability = this.isSlotAvailable(slot);
        if (!availability.available) {
            return {
                canSchedule: false,
                reason: availability.reason
            };
        }
        return { canSchedule: true };
    }
    /**
     * Find conflicting appointments for a given time slot
     */
    findConflicts(slot) {
        return this.appointments.filter(apt => {
            if (apt.status === 'cancelled' || apt.status === 'completed') {
                return false;
            }
            const aptSlot = this.scheduleToTimeSlot(apt.schedule);
            const aptStart = aptSlot.start.getTime();
            const aptEnd = aptSlot.end.getTime();
            const slotStart = slot.start.getTime();
            const slotEnd = slot.end.getTime();
            return (slotStart < aptEnd && slotEnd > aptStart);
        });
    }
    /**
     * Get daily statistics for appointments
     */
    getDailyStats(date) {
        var _a;
        const dateStr = this.dateToScheduleString(date).date;
        const dayAppointments = this.getAppointmentsByDate(dateStr);
        const stats = {
            date: dateStr,
            totalAppointments: dayAppointments.length,
            confirmedAppointments: 0,
            pendingAppointments: 0,
            cancelledAppointments: 0,
            totalRevenue: 0,
            currency: ((_a = dayAppointments[0]) === null || _a === void 0 ? void 0 : _a.totals.currency) || 'USD'
        };
        dayAppointments.forEach(apt => {
            if (apt.status === 'confirmed')
                stats.confirmedAppointments++;
            if (apt.status === 'pending')
                stats.pendingAppointments++;
            if (apt.status === 'cancelled')
                stats.cancelledAppointments++;
            if (apt.status !== 'cancelled' && apt.paymentStatus === 'paid') {
                stats.totalRevenue += apt.totals.grandTotal;
            }
        });
        return stats;
    }
    getAvailableTimeSlotsForDate(date) {
        var _a, _b;
        // Get the day of week for the selected date (0 = Sunday, 1 = Monday, etc.)
        const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][date.getDay()];
        // Get opening hours for this day
        const dayHours = ((_b = (_a = this.tenant.schema.appointments) === null || _a === void 0 ? void 0 : _a.hours) === null || _b === void 0 ? void 0 : _b[dayOfWeek]) || [];
        if (!dayHours || dayHours.length === 0) {
            // If no hours defined for this day, return empty array (closed)
            return [];
        }
        // Generate time slots for each opening period
        const timeSlots = [];
        for (const timeSlot of dayHours) {
            // Parse open and close times
            const [openHour, openMinute] = timeSlot.open.split(':').map(Number);
            const [closeHour, closeMinute] = timeSlot.close.split(':').map(Number);
            // Generate time slots in 30-minute increments between open and close times
            let currentHour = openHour;
            let currentMinute = openMinute;
            // Continue until we reach or exceed the closing time
            while (currentHour < closeHour || (currentHour === closeHour && currentMinute < closeMinute)) {
                // Format time as HH:MM
                const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
                // Check if this time slot is not already booked
                // (This would require checking against existing appointments)
                const isAvailable = this.isTimeSlotAvailable(date, timeString);
                if (isAvailable) {
                    timeSlots.push(timeString);
                }
                // Move to next time slot (30 minutes)
                currentMinute += 30;
                if (currentMinute >= 60) {
                    currentMinute = currentMinute % 60;
                    currentHour++;
                }
                // If we've exceeded the close time, break
                if (currentHour > closeHour || (currentHour === closeHour && currentMinute >= closeMinute)) {
                    break;
                }
            }
        }
        return timeSlots;
    }
    isTimeSlotAvailable(date, timeString) {
        // This would check against existing appointments to see if this time is already booked
        // For now, returning true to indicate all slots are available
        // In a real implementation, this would check against scheduled appointments
        return true;
    }
}
exports.TenantCalendarManager = TenantCalendarManager;
// Example usage:
/*
const tenantModel = new TenantModel({
  // ... tenant data with hours configured
  appointments: {
    hours: {
      monday: [{ open: "09:00", close: "17:00" }],
      tuesday: [{ open: "09:00", close: "17:00" }],
      wednesday: [{ open: "09:00", close: "12:00" }, { open: "13:00", close: "17:00" }],
      thursday: [{ open: "09:00", close: "17:00" }],
      friday: [{ open: "09:00", close: "15:00" }],
      saturday: [],
      sunday: []
    }
  }
});

// Load existing appointments from database
const existingAppointments: Appointment[] = [...];

const calendar = new TenantCalendarManager(tenantModel, existingAppointments);

// Check if currently open
const availability = calendar.checkAvailability();
console.log(availability.message); // "Open until 5:00 PM"

// Get available slots for a date with 60-minute duration
const slots = calendar.getAvailableSlots(new Date('2024-12-05'), 60, 30);
console.log(`Found ${slots.length} available slots`);

// Check if a specific schedule can be booked
const result = calendar.canScheduleAppointment({
  date: '2024-12-05',
  start: '10:00',
  end: '11:00',
  timezone: 'America/New_York'
});

// Get daily statistics
const stats = calendar.getDailyStats(new Date());
console.log(`Revenue: ${stats.totalRevenue} ${stats.currency}`);

// Check week schedule
const schedule = calendar.getWeekSchedule();
console.log(schedule);
*/ 
//# sourceMappingURL=calendar.js.map