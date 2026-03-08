"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentModel = void 0;
const system_1 = require("../../utils/system");
const model_1 = require("../model");
class AppointmentModel extends model_1.Model {
    static create(tenantId, customer, schedule, service, totals, options) {
        var _a, _b, _c, _d, _e, _f;
        const now = (0, system_1.unixTimeStampNow)();
        return AppointmentModel.fromJson({
            id: `apt_${service.serviceId}_${now}`,
            tenantId,
            customer,
            schedule,
            service,
            totals,
            notes: options === null || options === void 0 ? void 0 : options.notes,
            status: (_a = options === null || options === void 0 ? void 0 : options.status) !== null && _a !== void 0 ? _a : 'pending',
            paymentStatus: (_b = options === null || options === void 0 ? void 0 : options.paymentStatus) !== null && _b !== void 0 ? _b : 'unpaid',
            channel: (_c = options === null || options === void 0 ? void 0 : options.channel) !== null && _c !== void 0 ? _c : 'web',
            source: (_d = options === null || options === void 0 ? void 0 : options.source) !== null && _d !== void 0 ? _d : 'online',
            assignments: (_e = options === null || options === void 0 ? void 0 : options.assignments) !== null && _e !== void 0 ? _e : [],
            metadata: options === null || options === void 0 ? void 0 : options.metadata,
            timeline: [
                {
                    type: 'status_change',
                    at: now,
                    payload: { status: (_f = options === null || options === void 0 ? void 0 : options.status) !== null && _f !== void 0 ? _f : 'pending' },
                },
            ],
            iat: now,
            updatedAt: now,
        });
    }
    addTimelineEntry(entry) {
        if (!this.schema.timeline) {
            this.schema.timeline = [];
        }
        this.schema.timeline.push(entry);
        this.schema.updatedAt = (0, system_1.unixTimeStampNow)();
    }
    static reservationAmount(logic, checkout) {
        if (logic === 'fixed') {
        }
    }
}
exports.AppointmentModel = AppointmentModel;
//# sourceMappingURL=index.js.map