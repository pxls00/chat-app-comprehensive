import jwt from "jsonwebtoken"

import config from "../config";
import dbQuery from "../db";
import redisClient from "../redis";

import ApiError from "../utils/api-errors";

const EXPIRE_REFRESH_TIME = 30 * 24 * 60 * 60

class TokenService {
    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_TOKEN, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_TOKEN, {expiresIn: EXPIRE_REFRESH_TIME});

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
            // let token = await dbQuery('SELECT * FROM token WHERE user_uuid = $1', [userUuid])
            await redisClient.set(`${userUuid}`, refreshToken, { EX: EXPIRE_REFRESH_TIME, GET: true })
            let token = await redisClient.get(`${userUuid}`);

            // token = 
            // if(!!token) {
                // token = await dbQuery('UPDATE token SET refresh_token = $1 where uuid = $2 RETURNING *', [
                //     refreshToken,
                //     token.rows[0].uuid,
                // ])

            // } else {
                // token = await dbQuery('INSERT INTO token (user_uuid, refresh_token) VALUES ($1, $2) RETURNING *', [userUuid, refreshToken])
            // }
            console.log(token)
            if(token) {
                return token
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

        // const tokenFromDBResponse = await dbQuery("SELECT * FROM token WHERE user_uuid = $1", [user.uuid]);
        // const tokenFromDB = tokenFromDBResponse
        const tokenFromDB = await redisClient.get(`${user.uuid}`);
        
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
        // await dbQuery('DELETE FROM token WHERE user_uuid = $1', [user.uuid])
        await redisClient.del(`${user.uuid}`) 
    }
    
}

export default new TokenService();