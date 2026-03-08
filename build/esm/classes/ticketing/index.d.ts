import { DocumentSchema } from "../../types";
import { Model } from "../model";
export type Ticket = {
    owner: string;
    trxID: string;
    metadata: {
        tier: string;
        currency: string;
        price: number;
    };
    domain: 'test' | 'live';
    qrImage?: string;
    assignedTo?: string;
    status: "unused" | "used" | "terminated";
    eventID: string;
    expiration: number | string;
} & DocumentSchema;
export declare class TicketModel extends Model<Ticket> {
}
