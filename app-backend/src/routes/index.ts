import {Router} from "express"

import authRouter from "./auth-route"


const router = Router();

router.use("/auth", authRouter)
router.use("/test", (req, res) => {
    res.json([123, 123, 123,])
})

export default router