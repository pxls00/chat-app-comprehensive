import ApiError from "../utils/api-errors";
import tokenService from "../services/token.service";
import { Socket } from "socket.io";

export function authMiddlewareExpress(req: any, res: any, next: (payload?: any) => void) {
  try {
    console.log(req.headers)
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnathorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnathorizedError());
    }

    const user = tokenService.validateAccessToken(accessToken);
    if (!user) {
      return next(ApiError.UnathorizedError());
    }
    req.user = user;
    next();
  } catch (error) {
    return next(ApiError.UnathorizedError());
  }
}

export function authMiddlewareSocket(socket:Socket, next: (payload?:any) => void) {
  try {
    const accessToken = socket.handshake.auth.token;
    if (!accessToken) {
      return next(ApiError.UnathorizedError());
    }

    const user = tokenService.validateAccessToken(accessToken);
    if (!user) {
      return next(ApiError.UnathorizedError());
    }
    const socketIns = socket as any
    socketIns.user = user;
    next();
  } catch (error) {
    return next(ApiError.UnathorizedError());
  }
}
