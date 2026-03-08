import { DocumentSchema, StaffRoles, StaffStatus } from "../..";
import { Model } from "../model";
export type StaffAvailabilityDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type StaffAvailabilitySlot = {
    day: StaffAvailabilityDay;
    start: string;
    end: string;
};
export type Staff = {
    org: string;
    tenantId?: string;
    createdBy: string;
    whatsapp?: string;
    shortCode: string;
    domain: "test" | "live";
    name: string;
    email?: string;
    phone?: string;
    venues: string[];
    pin: string;
    role: StaffRoles;
    status: StaffStatus;
    services?: string[];
    color?: string;
    bio?: string;
    hourlyRate?: number;
    availability?: StaffAvailabilitySlot[];
    imageUrl?: string;
} & DocumentSchema;
export declare class StaffModel extends Model<Staff> {
    static generateShortCode(orgShortCode: string, staffData: {
        fullName: string;
        email?: string;
        phone?: string;
    }): string;
}
