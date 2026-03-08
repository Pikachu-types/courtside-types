import { DocumentSchema, PaymentStatus, PayoutType, TransactionType } from "../..";
import { Model } from "../model";
export interface TransactionRelationship {
    balance_after?: number;
    merchant: string;
    staff?: string;
    venue?: string;
    fee: number;
}
export interface LineItem {
    currency: string;
    amount: number;
    quantity: number;
    item: string;
    reference?: string;
}
export type Transaction = {
    reference: string;
    provider?: string;
    relationship: TransactionRelationship;
    amount: number;
    tax: {
        percentage: number;
        behaviour: 'inclusive' | 'excluded';
    };
    paid_at?: number;
    currency: string;
    customer?: string;
    type: TransactionType;
    provider_fee?: number;
    redirect_url?: string;
    domain: 'test' | 'live';
    status: PaymentStatus;
    payment?: {
        method: string;
        card?: {
            card_type: string;
            first_six: string;
            last_four: string;
            expiry: string;
        };
    };
    link_expiration?: Date;
    metadata?: {
        line_items?: LineItem[] | null;
        related_to?: string;
        [key: string]: any;
    };
} & DocumentSchema;
export declare class TransactionModel extends Model<Transaction> {
    static calculateTotal(lineItems: LineItem[]): number;
    static calculateFee(total: number, percentage: number): number;
    static copyWith(transaction: Transaction, updates: Partial<Transaction>): Transaction;
    static calculateAkubFee(amount: number, payout: PayoutType): number;
}
export type BalanceLedgerEntry = {
    orgId: string;
    env: 'live' | 'test';
    change: number;
    previousBalance: number;
    newBalance: number;
    sourceType: 'transaction' | 'payout' | 'manual';
    referenceId?: string;
    referenceDocument?: string;
    note?: string;
    metadata?: Record<string, any>;
} & DocumentSchema;
/**
 * Utility to build ledger doc id to ensure idempotency
 */
export declare function ledgerDocIdForTransaction(tx: Transaction): string;
