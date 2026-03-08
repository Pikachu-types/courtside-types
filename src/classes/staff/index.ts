import { DocumentSchema, StaffRoles, StaffStatus } from "../..";
import { Model } from "../model";

export type StaffAvailabilityDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type StaffAvailabilitySlot = {
  day: StaffAvailabilityDay;
  start: string; // HH:mm
  end: string; // HH:mm
};

export type Staff = {
  org: string; // org id
  tenantId?: string; // alias for org when used in appointments product
  createdBy: string; // user id
  whatsapp?: string;
  shortCode: string;
  domain: "test" | "live";
  name: string;
  email?: string;
  phone?: string;
  venues: string[]; // venues this inventory apply to
  pin: string;
  role: StaffRoles;
  status: StaffStatus;
  services?: string[]; // service IDs staff can perform
  color?: string; // calendar color
  bio?: string;
  hourlyRate?: number;
  availability?: StaffAvailabilitySlot[];
  imageUrl?: string;
} & DocumentSchema;

export class StaffModel extends Model<Staff> { 
  public static generateShortCode(orgShortCode: string, staffData: { fullName: string; email?: string; phone?: string }): string {
    const baseString = `${staffData.fullName}${staffData.email || ''}${staffData.phone || ''}`;

    // Simple hash to number
    let hash = 0;
    for (let i = 0; i < baseString.length; i++) {
      hash = (hash << 5) - hash + baseString.charCodeAt(i);
      hash |= 0; // Convert to 32bit int
    }

    // Convert hash to uppercase alphanumeric
    const suffix = Math.abs(hash).toString(36).toUpperCase().slice(-4);

    return `${orgShortCode}-${suffix}`;
  }
}