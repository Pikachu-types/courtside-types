"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigTicketingModel = void 0;
const model_1 = require("../model");
const system_1 = require("../../utils/system");
class ConfigTicketingModel extends model_1.Model {
    get id() { return (0, system_1.createSlug)(this.schema.name); }
    isDisabled() {
        const now = new Date();
        // Check if quantity is 0 or less
        if (this.data.quantity !== undefined && this.data.quantity !== null && this.data.quantity <= 0) {
            return true;
        }
        // Check if sales have not started yet
        if (this.data.salesStartDate !== undefined) {
            const startDate = (0, system_1.normalizeDate)(this.data.salesStartDate);
            if (now < startDate) {
                return true;
            }
        }
        // Check if sales have ended
        if (this.data.salesEndDate !== undefined) {
            const endDate = (0, system_1.normalizeDate)(this.data.salesEndDate);
            if (now > endDate) {
                return true;
            }
        }
        return false;
    }
    getDisabledReason() {
        const now = new Date();
        // Check if quantity is 0 or less
        if (this.data.quantity !== undefined && this.data.quantity !== null && this.data.quantity <= 0) {
            return "No tickets available";
        }
        // Check if sales have not started yet
        if (this.data.salesStartDate !== undefined) {
            const startDate = (0, system_1.normalizeDate)(this.data.salesStartDate);
            if (now < startDate) {
                return "Sales have not started yet";
            }
        }
        // Check if sales have ended
        if (this.data.salesEndDate !== undefined) {
            const endDate = (0, system_1.normalizeDate)(this.data.salesEndDate);
            if (now > endDate) {
                return "Sales have ended";
            }
        }
        return null;
    }
}
exports.ConfigTicketingModel = ConfigTicketingModel;
//# sourceMappingURL=island-pulse.js.map