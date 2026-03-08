import { DocumentSchema } from "../..";
import { Model } from "../model";
export type Inventory = {
    org: string;
    venues: string[];
    price: number;
    quantity: number;
    currency: string;
    description?: string;
    image?: string | null;
    name: string;
    threshold?: {
        alertAt: number;
    };
    isAvailable: boolean;
    category: string;
    imageUrl?: string;
} & DocumentSchema;
export declare class InventoryItemModel extends Model<Inventory> {
}
