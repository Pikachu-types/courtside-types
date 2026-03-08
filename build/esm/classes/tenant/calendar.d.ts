import { TenantModel } from './';
import { Appointment, AppointmentSchedule } from '..';
export interface TimeSlot {
    start: Date;
    end: Date;
}
export interface AvailabilityResult {
    isOpen: boolean;
    message: string;
    nextOpening?: Date;
    nextClosing?: Date;
    currentStatus?: 'open' | 'closed' | 'outside_hours';
}
export interface AvailableSlot {
    start: Date;
    end: Date;
    duration: number;
}
export declare class TenantCalendarManager {
    private tenant;
    private appointments;
    constructor(tenant: TenantModel, appointments?: Appointment[]);
    /**
     * Convert AppointmentSchedule to TimeSlot with proper date handling
     */
    private scheduleToTimeSlot;
    /**
     * Convert Date to AppointmentSchedule format
     */
    private dateToScheduleString;
    /**
     * Get the day name from a Date object
     */
    private getDayName;
    /**
     * Parse time string (e.g., "09:00") and combine with date
     */
    private parseTimeOnDate;
    /**
     * Get business hours for a specific date
     */
    private getBusinessHoursForDate;
    /**
     * Check if tenant is currently open
     */
    checkAvailability(checkTime?: Date): AvailabilityResult;
    /**
     * Find the next opening time from a given date
     */
    private findNextOpening;
    /**
     * Format time for display
     */
    private formatTime;
    /**
     * Format next opening for display
     */
    private formatNextOpening;
    /**
     * Get all available time slots for a specific date and duration
     */
    getAvailableSlots(date: Date, durationMinutes: number, intervalMinutes?: number): AvailableSlot[];
    /**
     * Check if a time slot conflicts with existing appointments
     */
    private hasConflict;
    /**
     * Check if a specific time slot is available
     */
    isSlotAvailable(slot: TimeSlot): {
        available: boolean;
        reason?: string;
    };
    /**
     * Get the business week schedule
     */
    getWeekSchedule(): Record<string, string>;
    /**
     * Add an appointment (for testing/updating the calendar)
     */
    addAppointment(appointment: Appointment): void;
    /**
     * Get appointments for a specific date range
     */
    getAppointments(startDate: Date, endDate: Date): Appointment[];
    /**
     * Get appointments for a specific date (YYYY-MM-DD)
     */
    getAppointmentsByDate(dateStr: string): Appointment[];
    /**
     * Check if a specific appointment can be scheduled
     */
    canScheduleAppointment(schedule: AppointmentSchedule): {
        canSchedule: boolean;
        reason?: string;
        conflicts?: Appointment[];
    };
    /**
     * Find conflicting appointments for a given time slot
     */
    findConflicts(slot: TimeSlot): Appointment[];
    /**
     * Get daily statistics for appointments
     */
    getDailyStats(date: Date): {
        date: string;
        totalAppointments: number;
        confirmedAppointments: number;
        pendingAppointments: number;
        cancelledAppointments: number;
        totalRevenue: number;
        currency: string;
    };
    getAvailableTimeSlotsForDate(date: Date): string[];
    private isTimeSlotAvailable;
}
