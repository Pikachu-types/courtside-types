import { Model } from "../model";
import { createSlug, normalizeDate } from "../../utils/system";

export interface CoverImagePosition {
  x: number; // Percentage from left (0-100)
  y: number; // Percentage from top (0-100)
}

export interface Timing {
  date: string;
  start: string;
  end: string;
  timezone: string;
}

export type IslandPulseConfig = {
  id: string;
  images?: {
    cover?: string;
    flyer?: string;
  };
  coverImagePosition?: CoverImagePosition;
  updatedAt?: number;
  name: string;
  location: {
    place: string;
    venue: string;
  };
  timing: Timing;
  currency: string;
  description: string;
  expired?: boolean | null;
  tickets: TicketType[];
  capacity?: number | null;
}

export type TicketType = {
  name: string;
  price: number;
  quantity?: number | null;
  requiresApproval?: boolean;
  salesStartDate?: number | Date | string;
  salesEndDate?: number | Date | string;
};

export class ConfigTicketingModel extends Model<TicketType> { 

  get id() { return createSlug(this.schema.name); }

  public isDisabled() {
    const now = new Date();
    // Check if quantity is 0 or less
    if (this.data.quantity !== undefined && this.data.quantity !== null && this.data.quantity <= 0) {
      return true;
    }
    
    // Check if sales have not started yet
    if (this.data.salesStartDate !== undefined) {
      const startDate = normalizeDate(this.data.salesStartDate);
      if (now < startDate) {
        return true;
      }
    }
    
    // Check if sales have ended
    if (this.data.salesEndDate !== undefined) {
      const endDate = normalizeDate(this.data.salesEndDate);
      if (now > endDate) {
        return true;
      }
    }
    
    return false;
  }

  public getDisabledReason(): string | null {
    const now = new Date();
    
    // Check if quantity is 0 or less
    if (this.data.quantity !== undefined && this.data.quantity !== null && this.data.quantity <= 0) {
      return "No tickets available";
    }
    
    // Check if sales have not started yet
    if (this.data.salesStartDate !== undefined) {
      const startDate = normalizeDate(this.data.salesStartDate);
      if (now < startDate) {
        return "Sales have not started yet";
      }
    }
    
    // Check if sales have ended
    if (this.data.salesEndDate !== undefined) {
      const endDate = normalizeDate(this.data.salesEndDate);
      if (now > endDate) {
        return "Sales have ended";
      }
    }
    
    return null;
  }
}