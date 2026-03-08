import { AppointmentChannel, AppointmentPaymentStatus, AppointmentSource, AppointmentStatus, DocumentSchema, PaymentLogicType, PriceType } from "../..";
import { Model } from "../model";
export type AppointmentCustomer = {
    id?: string;
    name: string;
    email?: string;
    phone?: string;
    notes?: string;
};
export type AppointmentSchedule = {
    date: string;
    start: string;
    end: string;
    timezone: string;
};
export type AppointmentServiceSnapshot = {
    serviceId: string;
    serviceName: string;
    categoryId?: string;
    duration: string;
    priceType: PriceType;
    currency: string;
    price?: number;
};
export type AppointmentStaffAssignment = {
    staffId: string;
    role: 'primary' | 'assistant';
    assignedAt: number;
    confirmed: boolean;
};
export type AppointmentTimelineEntry = {
    type: 'status_change' | 'note' | 'assignment' | 'reminder';
    at: number;
    actorId?: string;
    payload?: Record<string, unknown>;
};
export type AppointmentTotals = {
    subtotal: number;
    tax?: number;
    paid?: number;
    discount?: number;
    grandTotal: number;
    currency: string;
};
export type Appointment = {
    tenantId: string;
    reservation?: string | undefined;
    customer: AppointmentCustomer;
    schedule: AppointmentSchedule;
    service: AppointmentServiceSnapshot;
    notes?: string;
    status: AppointmentStatus;
    paymentStatus: AppointmentPaymentStatus;
    channel: AppointmentChannel;
    source: AppointmentSource;
    totals: AppointmentTotals;
    assignments: AppointmentStaffAssignment[];
    timeline?: AppointmentTimelineEntry[];
    metadata?: Record<string, unknown>;
} & DocumentSchema;
export declare class AppointmentModel extends Model<Appointment> {
    static create(tenantId: string, customer: AppointmentCustomer, schedule: AppointmentSchedule, service: AppointmentServiceSnapshot, totals: AppointmentTotals, options?: {
        source?: AppointmentSource;
        channel?: AppointmentChannel;
        status?: AppointmentStatus;
        paymentStatus?: AppointmentPaymentStatus;
        notes?: string;
        assignments?: AppointmentStaffAssignment[];
        metadata?: Record<string, unknown>;
    }): AppointmentModel;
    addTimelineEntry(entry: AppointmentTimelineEntry): void;
    static reservationAmount(logic: PaymentLogicType, checkout: number): void;
}
