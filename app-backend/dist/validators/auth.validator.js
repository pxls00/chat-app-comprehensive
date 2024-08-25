"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = [
    (0, express_validator_1.check)('password', 'Password of user should be more 5').isLength({ min: 5 }),
    (0, express_validator_1.check)('email', 'Email must contain @').isEmail(),
];
//# sourceMappingURL=auth.validator.js.map