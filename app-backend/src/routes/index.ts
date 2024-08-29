import {Router} from "express"
import clientRedis from "../redis";
import authRouter from "./auth-route"


const router = Router();

router.use("/auth", authRouter)
router.use("/test", async (req, res) => {
    const keyValue = await clientRedis.get("key");
    console.log(keyValue);
    if(keyValue !== null) {
        console.log("it already exists so we are returning it now")
        res.json(keyValue)
        return 
    }else {
        console.log("doesn't exist so we are setting it now")
        clientRedis.set("key", "value")
    }
    res.json([123, 123, 123,])
})

export default router