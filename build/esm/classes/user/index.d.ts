import { AuthenticationProvider } from "../..";
import { Model } from "../model";
export type User = {
    joined: Date | null | string | number;
    lastSeen?: Date | null | string | number;
    id: string;
    naming: {
        first: string;
        last: string;
        middle?: string;
    };
    email: string;
    photoUrl: string | null | undefined;
    eid?: string;
    phone: string | null | undefined;
    security: {
        emailVerified: boolean;
        phoneVerified: boolean;
        authProvider: AuthenticationProvider[];
    };
};
export declare class UserModel extends Model<User> {
    get accountIsValid(): boolean;
    get fullname(): string;
    static createFullName(name: {
        first: string;
        last: string;
        middle?: string;
    }): string;
}
