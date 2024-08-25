import {Request, Response} from "express"
import {validationResult} from "express-validator"

import ApiError from "../utils/api-errors"
import authService from "../services/auth.service"

interface IRegisterReqBody {
    password: string,
    email: string,
}

class AuthController {
    async register(req: Request<any, any, IRegisterReqBody>, res: Response, next: (payload?:any) => void) {
        try {
            const errors = validationResult(req)

            // check errors of body validation
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation error", errors.array()))
            }
            
            const {email, password} = req.body       
            const userWithTokens = await authService.register(email, password);

            res.cookie(
                "refreshToken", 
                userWithTokens.refreshToken, 
                {
                    maxAge: 30 * 24 * 60 * 60 * 1000, 
                    httpOnly: true,
                    // secure: true
                }
            )
            res.status(200).json(userWithTokens);
            
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request<any, any, IRegisterReqBody>, res:Response, next: (payload?:any) => void) {
        try {
            const errors = validationResult(req)

            // check errors of body validation
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation error", errors.array()))
            }

            const {password, email} = req.body; 

            const userWithTokens = await authService.login(password, email);

            res.cookie("refreshToken", userWithTokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, 
                httpOnly: true,
                // secure: true
            });
            res.json(userWithTokens);
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: (payload?:any) => void) {
        try {
            const { refreshToken } = req.cookies
            await authService.logout(refreshToken)

            res.clearCookie("refreshToken");

            return res.json({message: "You have exited the system successfully"})
        } catch (error) {
            next(error)
        }
    }

    async refresh(req: Request, res: Response, next: (payload?:any) => void) {
        try {
            const {refreshToken} = req.cookies;

            const userWithTokens = await authService.refresh(refreshToken);

            res.cookie("refreshToken", userWithTokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, 
                httpOnly: true,
                // secure: true
            })
            res.json(userWithTokens);
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController()