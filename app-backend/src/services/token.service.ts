import jwt from "jsonwebtoken"

import config from "../config";
import dbQuery from "../db";
import ApiError from "../utils/api-errors";

class TokenService {
    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_TOKEN, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_TOKEN, {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        }
    }
    
    validateAccessToken(token: string) {
        try {
            return jwt.verify(token, config.JWT_ACCESS_TOKEN)
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            return jwt.verify(token, config.JWT_REFRESH_TOKEN)
        } catch (error) {
            return null;
        }
    }

    async saveToken(userUuid: string, refreshToken:string) {
        try {
            let token = await dbQuery('SELECT * FROM token WHERE user_uuid = $1', [userUuid])

            if(token?.rows?.[0]) {
                token = await dbQuery('UPDATE token SET refresh_token = $1 where uuid = $2 RETURNING *', [
                    refreshToken,
                    token.rows[0].uuid,
                ])

            } else {
                token = await dbQuery('INSERT INTO token (user_uuid, refresh_token) VALUES ($1, $2) RETURNING *', [userUuid, refreshToken])
            }
            
            if(token?.rows?.[0]) {
                return token.rows[0]
            } else {
                throw ApiError.ServerError("Internal Server error. Can not create a token")
            }
        } catch (error:any) {
            throw ApiError.ServerError(error.message)
        }
    }

    async findRefreshToken(refreshToken: string) {
        const user = this.validateRefreshToken(refreshToken) as {uuid: string, email: string};

        if(!user?.uuid) {
            throw ApiError.BadRequest("Invalid token");
        }

        const tokenFromDBResponse = await dbQuery("SELECT * FROM token WHERE user_uuid = $1", [user.uuid]);
        const tokenFromDB = tokenFromDBResponse?.rows?.[0];

        if(!tokenFromDB) {
            throw ApiError.UnathorizedError()
        }

        return {
            user,
            refreshToken: tokenFromDB,
        }
    }

    async removeToken(refreshToken: string) {
        const { user } = await this.findRefreshToken(refreshToken);
        await dbQuery('DELETE FROM token WHERE user_uuid = $1', [user.uuid]) 
    }
    
}

export default new TokenService();