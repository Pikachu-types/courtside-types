import { AppointmentPaymentStatus, AppointmentSource, DocumentSchema, EnvironmentType } from "../..";
import { Model } from "../model";
export type Reservation = {
    tenant: string;
    domain: EnvironmentType;
    reservation: {
        paid: number;
        total: number;
        fee: number;
    };
    customer: {
        name: string;
        email: string;
        phone: string;
    };
    services: Array<{
        service: string;
        pricingOptionIndex: number;
        quantity: number;
    }>;
    currency: string;
    source: AppointmentSource;
    notes?: string;
    trxID: string;
    status: AppointmentPaymentStatus;
    details: {
        date: string;
        time: string;
    };
    method: 'online' | 'on_arrival';
} & DocumentSchema;
export declare class ReservationModel extends Model<Reservation> {
}
