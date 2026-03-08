"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueModel = exports.OrganizationModel = void 0;
const model_1 = require("../model");
const system_1 = require("../../utils/system");
class OrganizationModel extends model_1.Model {
    static generateShortCode(name) {
        return (0, system_1.generateShortCodeFromName)(name);
    }
    userRole(uid) {
        return this.schema.roles[uid];
    }
    calculateFee(amount) {
        if (this.schema.settlement.mode === 'instant') {
            return (amount * 5) / 100;
        }
        else {
            return (amount * 1) / 100;
        }
    }
}
exports.OrganizationModel = OrganizationModel;
class VenueModel extends model_1.Model {
    getAddressAsText() {
        const address = this.schema.address;
        if (!address) {
            return '';
        }
        const addressParts = [
            address.place,
            address.city,
            address.state,
            address.country
        ].filter(part => part && part.trim() !== '');
        return addressParts.join(', ');
    }
}
exports.VenueModel = VenueModel;
//# sourceMappingURL=index.js.map