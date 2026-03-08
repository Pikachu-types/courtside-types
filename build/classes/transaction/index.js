"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
exports.ledgerDocIdForTransaction = ledgerDocIdForTransaction;
const model_1 = require("../model");
;
class TransactionModel extends model_1.Model {
    static calculateTotal(lineItems) {
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
    static calculateFee(total, percentage) {
        return (total * percentage) / 100;
    }
    static copyWith(transaction, updates) {
        return Object.assign(Object.assign(Object.assign({}, transaction), updates), { 
            // Handle nested objects that need deep merging
            relationship: updates.relationship
                ? Object.assign(Object.assign({}, transaction.relationship), updates.relationship) : transaction.relationship, tax: updates.tax
                ? Object.assign(Object.assign({}, transaction.tax), updates.tax) : transaction.tax, metadata: updates.metadata
                ? Object.assign(Object.assign({}, transaction.metadata), updates.metadata) : transaction.metadata });
    }
    static calculateAkubFee(amount, payout) {
        let percent = 0;
        const base = 100;
        if (payout === 'standard') {
            if (amount <= 9999)
                percent = 0.025;
            else if (amount <= 499999)
                percent = 0.03;
            else if (amount <= 2000000)
                percent = 0.04;
            else
                percent = 0.05;
        }
        else {
            if (amount <= 9999)
                percent = 0.08;
            else if (amount <= 499999)
                percent = 0.09;
            else
                percent = 0.10;
        }
        return base + amount * percent;
    }
}
exports.TransactionModel = TransactionModel;
/**
 * Utility to build ledger doc id to ensure idempotency
 */
function ledgerDocIdForTransaction(tx) {
    return tx.type === 'credit' ? `tx_${tx.domain}_${tx.reference}` : `payout_${tx.domain}_${tx.id}`;
}
//# sourceMappingURL=index.js.map