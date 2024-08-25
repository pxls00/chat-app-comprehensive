"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_validator_1 = __importDefault(require("../validators/auth.validator"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
router.post("/register", ...auth_validator_1.default, auth_controller_1.default.register);
router.post("/login", ...auth_validator_1.default, auth_controller_1.default.login);
router.get("/logout", auth_controller_1.default.logout);
router.get("/refresh", auth_controller_1.default.refresh);
exports.default = router;
//# sourceMappingURL=auth-route.js.map