import { DocumentSchema, PaymentStatus, PayoutType, TransactionType } from "../..";
import { Model } from "../model";

export interface TransactionRelationship {
  balance_after?: number;
  merchant: string;
  staff?: string;
  venue?: string;
  fee: number;
}

export interface LineItem { currency: string, amount: number, quantity: number, item: string, reference?: string };

export type Transaction = {
  reference: string;
  provider?: string;
  relationship: TransactionRelationship;
  amount: number;
  tax: {
    percentage: number,
    behaviour: 'inclusive' | 'excluded'
  };
  paid_at?: number;
  currency: string;
  customer?: string;
  type: TransactionType;
  provider_fee?: number;
  redirect_url?: string;
  domain: 'test' | 'live';
  status: PaymentStatus,
  payment?: {
    method: string;
    card?: {
      card_type: string;
      first_six: string;
      last_four: string;
      expiry: string;
    },
  };
  link_expiration?: Date;
  metadata?: {
    line_items?: LineItem[] | null, // Changed to optional and removed undefined as null covers it
    related_to?: string; // if was a retry of an older transaction that failed
    [key: string]: any, // Fixed: Removed '...' as it's not valid syntax for an index signature in a type literal
  },
} & DocumentSchema;

export class TransactionModel extends Model<Transaction> {

  public static calculateTotal(lineItems: LineItem[]): number {
    // Validate all items have the same currency if there are multiple items
    if (lineItems.length > 1) {
      const firstCurrency = lineItems[0].currency;
      if (!lineItems.every(item => item.currency === firstCurrency)) {
        throw new Error("All line items must have the same currency to calculate total");
      }
    }

    // Calculate total amount
    const total = lineItems.reduce((sum, item) => {
      return sum + (item.amount * item.quantity);
    }, 0);

    // Return as number (caller can format as needed)
    return total;
  }

  public static calculateFee(total: number, percentage: number) {
    return (total * percentage) / 100;
  }

  public static copyWith(transaction: Transaction, updates: Partial<Transaction>): Transaction {
    return {
      ...transaction,
      ...updates,
      // Handle nested objects that need deep merging
      relationship: updates.relationship
        ? { ...transaction.relationship, ...updates.relationship }
        : transaction.relationship,
      tax: updates.tax
        ? { ...transaction.tax, ...updates.tax }
        : transaction.tax,
      metadata: updates.metadata
        ? { ...transaction.metadata, ...updates.metadata }
        : transaction.metadata,
    };
  }

  static calculateAkubFee(amount: number, payout: PayoutType): number {
    let percent = 0;
    const base = 100;

    if (payout === 'standard') {
      if (amount <= 9999) percent = 0.025;
      else if (amount <= 499999) percent = 0.03;
      else if (amount <= 2000000) percent = 0.04;
      else percent = 0.05;
    } else {
      if (amount <= 9999) percent = 0.08;
      else if (amount <= 499999) percent = 0.09;
      else percent = 0.10;
    }

    return base + amount * percent;
  }

}

export type BalanceLedgerEntry = {
  orgId: string;
  env: 'live' | 'test';
  change: number; // positive for credit, negative for debit
  previousBalance: number;
  newBalance: number;
  sourceType: 'transaction' | 'payout' | 'manual';
  referenceId?: string; // transaction.reference or payout.id
  referenceDocument?: string; // path to original doc
  note?: string;
  metadata?: Record<string, any>;
} & DocumentSchema;


/**
 * Utility to build ledger doc id to ensure idempotency
 */
export function ledgerDocIdForTransaction(tx: Transaction) {
  return tx.type === 'credit' ? `tx_${tx.domain}_${tx.reference}` : `payout_${tx.domain}_${tx.id}`;
}