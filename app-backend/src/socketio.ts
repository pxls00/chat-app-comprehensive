import {Server} from "socket.io";
import config from "./config";
import http from "http";
import ApiError from "./utils/api-errors";


import {authMiddlewareSocket} from "./middleware/auth-middleware"
import socketController from "./controllers/socket.controller"; 

import type { SocketInstance } from "./controllers/socket.controller";
import { IUser } from "./dtos/user-dto/user-dto.types";
import { IMessageItem } from "./services/socket.service";
export default function(server:http.Server) {
  const io = new Server(server, {
    cors: config.CORS_CONF,
  });

  io.use(authMiddlewareSocket)
   
  io.on("connect", async (socket:SocketInstance) => {
    if(!socket.user) {
      console.log("user doesn't exist");
      throw ApiError.UnathorizedError()
    }
    // init
    socket.join(socket.user.uuid)
    await socketController.setUserAndConnect(socket.user)
    await socketController.sendFriendList(socket, 'true')

    const userMessages = await socketController.getUserMessages(socket.user) as IMessageItem[];
    if(!!userMessages.length) {
      socket.emit("messages", userMessages)
    }


    // add friend
    socket.on("add_friend", async (email, cb) => { await socketController.addFriend(socket, email, cb)})

    // send message
    socket.on("dm", async (message:IMessageItem, cb) => {
      console.log("on dm")
      await socketController.dm(socket, message, cb);
    })

    // when dissconnects
    socket.on('disconnecting', async () => {
      console.log("disconnecting", socket.user?.email)
      // if(socket.user) {
      await socketController.disconnect(socket.user as IUser)
      await socketController.sendFriendList(socket, 'false')
    })
  })
}