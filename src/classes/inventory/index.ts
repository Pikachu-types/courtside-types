import { DocumentSchema } from "../..";
import { Model } from "../model";

export type Inventory = {
  org: string; // org id
  venues: string[]; // venues this inventory apply to
  price: number;
  quantity: number;
  currency: string;
  description?: string;
  image?: string | null;
  name: string;
  threshold?: {
    alertAt: number; // when to alert for low stock
  }; // when to alert for low stock
  isAvailable: boolean;
  category: string; // Free-form user input, normalized as needed
  imageUrl?: string;
} & DocumentSchema;

export class InventoryItemModel extends Model<Inventory> {}
