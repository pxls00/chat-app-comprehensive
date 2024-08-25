import {Router, Request, Response} from "express";

const router = Router();

// validators
import AuthValidator from "../validators/auth.validator"

// controllers
import authController from "../controllers/auth.controller"

router.post("/register",
    ...AuthValidator,
    authController.register
);

router.post("/login", 
    ...AuthValidator,
    authController.login
)

router.get("/logout", authController.logout)

router.get("/refresh", authController.refresh)

export default router