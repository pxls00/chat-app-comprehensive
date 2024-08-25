"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth-route"));
const router = (0, express_1.Router)();
router.use("/auth", auth_route_1.default);
router.use("/test", (req, res) => {
    res.json([123, 123, 123,]);
});
exports.default = router;
//# sourceMappingURL=index.js.map