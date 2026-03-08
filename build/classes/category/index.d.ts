import { DocumentSchema } from "../..";
import { Model } from "../model";
export declare const EMOJI_POOL: string[];
export type Category = {
    name: string;
    icon: string;
    appointmentColor?: string;
    description?: string;
    createdBy?: string;
    tenantId?: string;
} & DocumentSchema;
export declare class CategoryModel extends Model<Category> {
    static getEmojiForCategory(category: string): string;
    static extractFromNewBrackets(input: string): string | null;
    static generate(category: string, creator: string): CategoryModel;
}
