import { Model } from "../model";
export interface CoverImagePosition {
    x: number;
    y: number;
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
};
export type TicketType = {
    name: string;
    price: number;
    quantity?: number | null;
    requiresApproval?: boolean;
    salesStartDate?: number | Date | string;
    salesEndDate?: number | Date | string;
};
export declare class ConfigTicketingModel extends Model<TicketType> {
    get id(): string;
    isDisabled(): boolean;
    getDisabledReason(): string | null;
}
