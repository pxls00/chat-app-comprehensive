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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const db_1 = __importDefault(require("../db"));
const api_errors_1 = __importDefault(require("../utils/api-errors"));
class TokenService {
    generateTokens(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, config_1.default.JWT_ACCESS_TOKEN, { expiresIn: '30m' });
        const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.default.JWT_REFRESH_TOKEN, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        };
    }
    validateAccessToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, config_1.default.JWT_ACCESS_TOKEN);
        }
        catch (error) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, config_1.default.JWT_REFRESH_TOKEN);
        }
        catch (error) {
            return null;
        }
    }
    saveToken(userUuid, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                let token = yield (0, db_1.default)('SELECT * FROM token WHERE user_uuid = $1', [userUuid]);
                if ((_a = token === null || token === void 0 ? void 0 : token.rows) === null || _a === void 0 ? void 0 : _a[0]) {
                    token = yield (0, db_1.default)('UPDATE token SET refresh_token = $1 where uuid = $2 RETURNING *', [
                        refreshToken,
                        token.rows[0].uuid,
                    ]);
                }
                else {
                    token = yield (0, db_1.default)('INSERT INTO token (user_uuid, refresh_token) VALUES ($1, $2) RETURNING *', [userUuid, refreshToken]);
                }
                if ((_b = token === null || token === void 0 ? void 0 : token.rows) === null || _b === void 0 ? void 0 : _b[0]) {
                    return token.rows[0];
                }
                else {
                    throw api_errors_1.default.ServerError("Internal Server error. Can not create a token");
                }
            }
            catch (error) {
                throw api_errors_1.default.ServerError(error.message);
            }
        });
    }
    findRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = this.validateRefreshToken(refreshToken);
            if (!(user === null || user === void 0 ? void 0 : user.uuid)) {
                throw api_errors_1.default.BadRequest("Invalid token");
            }
            const tokenFromDBResponse = yield (0, db_1.default)("SELECT * FROM token WHERE user_uuid = $1", [user.uuid]);
            const tokenFromDB = (_a = tokenFromDBResponse === null || tokenFromDBResponse === void 0 ? void 0 : tokenFromDBResponse.rows) === null || _a === void 0 ? void 0 : _a[0];
            if (!tokenFromDB) {
                throw api_errors_1.default.UnathorizedError();
            }
            return {
                user,
                refreshToken: tokenFromDB,
            };
        });
    }
    removeToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = yield this.findRefreshToken(refreshToken);
            yield (0, db_1.default)('DELETE FROM token WHERE user_uuid = $1', [user.uuid]);
        });
    }
}
exports.default = new TokenService();
//# sourceMappingURL=token.service.js.map