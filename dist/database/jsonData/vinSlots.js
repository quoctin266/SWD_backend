"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlots = void 0;
const lodash_1 = __importDefault(require("lodash"));
const moment_1 = __importDefault(require("moment"));
const addMinutes = (beginTime, minutes) => {
    const date = (0, moment_1.default)(beginTime).add(minutes, 'minutes');
    return date.toISOString();
};
const generateSlots = () => {
    const slots = [];
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 5; j++) {
            const beginAt = (0, moment_1.default)()
                .set('hour', 7)
                .set('minute', 0)
                .set('second', 0)
                .add(i, 'days')
                .add(j * 2, 'hours')
                .toISOString();
            const endAt = addMinutes(beginAt, 120);
            const capacity = lodash_1.default.sample([10, 15, 20]);
            slots.push({
                beginAt,
                endAt,
                capacity,
            });
        }
    }
    return slots;
};
exports.generateSlots = generateSlots;
//# sourceMappingURL=vinSlots.js.map