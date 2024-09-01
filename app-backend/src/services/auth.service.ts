import bcrypt from "bcrypt"

import tokenService from "./token.service"
import dbQuery from "../db"
import ApiError from "../utils/api-errors"
import UserDTO from "../dtos/user-dto";

import { IUser } from "../dtos/user-dto/user-dto.types";

class AuthService {
    async register(email: string, password: string, name: string) {
        const candidate = await dbQuery('SELECT * FROM users WHERE email = $1', [email]);
        if(candidate?.rows?.[0]) {
            throw ApiError.BadRequest("User with this email already exists");
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const userResponse = await dbQuery(
            `INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING uuid, email, name`,
            [email, hashPassword, name]
        )

        if (userResponse?.rows?.[0]) {
            const userInstance = new UserDTO(userResponse.rows[0])

            const userTokens = tokenService.generateTokens({...userInstance} as IUser);

            await tokenService.saveToken(userInstance.uuid, userTokens.refreshToken);

            return {
                ...userTokens,
                user: {...userInstance},
            }
        } else {
            throw ApiError.ServerError("Internal Server error. Can not create a user")
        }
    }

    async login(password: string, email: string) {
        const userResponse = await dbQuery('SELECT * FROM users WHERE email = $1', [email]);

        if(!userResponse?.rows?.[0]) {
            throw ApiError.BadRequest('User with this email not found')
        }

        const isPasswordMatch = await bcrypt.compare(password, userResponse.rows[0].password);
        if(!isPasswordMatch) {
            throw ApiError.BadRequest("Password is incorrect")
        }

        const userInstance = new UserDTO(userResponse.rows[0]);
        
        const userTokens = tokenService.generateTokens({ ...userInstance } as IUser);

        await tokenService.saveToken(userInstance.uuid, userTokens.refreshToken);

        return {
            ...userTokens,
            user: {...userInstance},
        }
    }

    async logout (refreshToken: string) {
        if(refreshToken) {
            await tokenService.removeToken(refreshToken);
        }
    }

    async refresh (refreshToken: string) {
        const refreshTokenAndUser = await tokenService.findRefreshToken(refreshToken);
        
        const userDBResult = await dbQuery("SELECT * FROM users WHERE uuid = $1", [refreshTokenAndUser.user.uuid]);
        const user = userDBResult?.rows?.[0];
        if(!user) {
            throw ApiError.BadRequest("User not found");
        }

        const userInstance = new UserDTO(user);
        const userTokens = tokenService.generateTokens({...userInstance} as IUser);

        await tokenService.saveToken(userInstance.uuid, userTokens.refreshToken);

        return {
            ...userTokens,
            user: {...userInstance}
        }
    }
}

export default new AuthService()