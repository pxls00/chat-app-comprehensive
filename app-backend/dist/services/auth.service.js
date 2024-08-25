"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_service_1 = __importDefault(require("./token.service"));
const db_1 = __importDefault(require("../db"));
const api_errors_1 = __importDefault(require("../utils/api-errors"));
const user_dto_1 = __importDefault(require("../dtos/user-dto"));
class AuthService {
    register(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const candidate = yield (0, db_1.default)('SELECT * FROM customer WHERE email = $1', [email]);
            if ((_a = candidate === null || candidate === void 0 ? void 0 : candidate.rows) === null || _a === void 0 ? void 0 : _a[0]) {
                throw api_errors_1.default.BadRequest("User with this email already exists");
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 5);
            const userResponse = yield (0, db_1.default)(`INSER INTO customer (email, password) VALUES ($1, $2) RETURNING uuid, email`, [email, hashPassword]);
            if ((_b = userResponse === null || userResponse === void 0 ? void 0 : userResponse.rows) === null || _b === void 0 ? void 0 : _b[0]) {
                const userInstance = new user_dto_1.default(userResponse.rows[0]);
                const userTokens = token_service_1.default.generateTokens(Object.assign({}, userInstance));
                yield token_service_1.default.saveToken(userInstance.uuid, userTokens.refreshToken);
                return Object.assign(Object.assign({}, userTokens), { user: Object.assign({}, userInstance) });
            }
            else {
                throw api_errors_1.default.ServerError("Internal Server error. Can not create a user");
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userResponse = yield (0, db_1.default)('SELECT * FROM customer WHERE email = $1', [email]);
            if (!((_a = userResponse === null || userResponse === void 0 ? void 0 : userResponse.rows) === null || _a === void 0 ? void 0 : _a[0])) {
                throw api_errors_1.default.BadRequest('User with this email not found');
            }
            const isPasswordMatch = yield bcrypt_1.default.compare(password, userResponse.rows[0].password);
            if (!isPasswordMatch) {
                throw api_errors_1.default.BadRequest("Password is incorrect");
            }
            const userInstance = new user_dto_1.default(userResponse.rows[0]);
            const userTokens = token_service_1.default.generateTokens(Object.assign({}, userInstance));
            yield token_service_1.default.saveToken(userInstance.uuid, userTokens.refreshToken);
            return Object.assign(Object.assign({}, userTokens), { user: Object.assign({}, userInstance) });
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (refreshToken) {
                yield token_service_1.default.removeToken(refreshToken);
            }
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const refreshTokenAndUser = yield token_service_1.default.findRefreshToken(refreshToken);
            const userDBResult = yield (0, db_1.default)("SELECT * FROM customer WHERE uuid = $1", [refreshTokenAndUser.user.uuid]);
            const user = (_a = userDBResult === null || userDBResult === void 0 ? void 0 : userDBResult.rows) === null || _a === void 0 ? void 0 : _a[0];
            if (!user) {
                throw api_errors_1.default.BadRequest("User not found");
            }
            const userInstance = new user_dto_1.default(user);
            const userTokens = token_service_1.default.generateTokens(Object.assign({}, userInstance));
            yield token_service_1.default.saveToken(userInstance.uuid, userTokens.refreshToken);
            return Object.assign(Object.assign({}, userTokens), { user: Object.assign({}, userInstance) });
        });
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map