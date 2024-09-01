import type { Socket } from "socket.io";
import socketService, { IMessageItem, SocketUser } from "../services/socket.service";
import { IUser } from "../dtos/user-dto/user-dto.types";
import ApiError from "../utils/api-errors";

export interface SocketInstance extends Socket {
  user?: IUser
}

class SocketController {
  async setUserAndConnect(user: IUser) {
    try {
      await socketService.setUser(user, true)
    } catch (error) {
      console.log("error set user", error)
    }
  }
  async getUserFriendList(user: IUser) {
    try {
      return await socketService.getUserFriendList(user.email)
    } catch (error) {
      console.log("error get users friends list", error);
    }
  }
  async addFriend(socket: SocketInstance, email: string, cb: (payload: any) => void) {
    try {
      if(!socket.user) {
        console.log("user unauthorized"); 
        return 
      }
      const friend = await socketService.getUserIdByEmail(email);

      if(socket.user.email === email) {
        cb({error: "Can not add self!", done: false});
        return
      }

      if(!Object.keys(friend).length || friend === null) {
        cb({error: "User doesn't exist!", done: false});
        return
      }

      const currentFriendList = await socketService.getUserFriendList(socket.user.email)

      if(currentFriendList && currentFriendList.indexOf((email)) !== -1) {
        cb({error: "Friend already added", done: false});
        return 
      }

      await socketService.addUserFriendList(socket.user as IUser, friend as object as SocketUser);
      cb({done: true, friendItem: friend})
      const userForFriend = await socketService.getUserIdByEmail(socket.user.email);
      socket.to(friend.userid).emit("add_friend", userForFriend)
    } catch (error) {
      console.log("error caused when tried to add friend");
    }
  }

  async getFriendParsedList(user: IUser) {
    try {
      const friendList = await socketService.getUserFriendList(user.email)
      const friendsParsed = await socketService.parseFriendList(friendList);
      return friendsParsed
    } catch (error) {
      console.log(error);      
    }
  }

  async sendFriendList(socket: SocketInstance, connectedStatus: 'true' | 'false') {
    if(!socket.user) {
      console.log('user doesnt exist when send friend list')
        throw ApiError.UnathorizedError()
    }
    const parsedFriendList = await this.getFriendParsedList(socket.user)
    if(parsedFriendList?.length as number > 0) {
      const friendRooms = parsedFriendList?.map(item => item.userid);
      socket.to(friendRooms as any).emit("connected", connectedStatus, socket.user.email)
    }
    socket.emit("friend_list", parsedFriendList)
  }

  async dm(socket: SocketInstance, message: IMessageItem, cb: (payload: any) => void) {
    try {
      message.from = socket.user?.uuid as string;
      await socketService.setMessage(socket.user as IUser, message)
      cb({done: true, messageItem: message})
      console.log("emiting from", message.from);
      socket.to(message.to).emit("dm", message);
    } catch (error) {
      console.log("error has caused on dm message item", error)
    }
  }

  async getUserMessages(user: IUser) {
    try {
      const messagesList = await socketService.getUserMessages(user) as IMessageItem[];
      return messagesList
    } catch (error) {
      console.log("error has caused on get user messages list", error)
    }
  }

  async disconnect(user: IUser) {
    try {
      return await socketService.setUser(user, false);
    } catch (error) {
      console.log(error)
    }
  }
}

export default new SocketController()