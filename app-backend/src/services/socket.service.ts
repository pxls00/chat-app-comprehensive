import { IUser } from "../dtos/user-dto/user-dto.types";
import redisClient from "../redis";

export interface SocketUser {
  email: string,
  userid: string,
  connected: string
}

export interface IMessageItem {
  from: string,
  to: string,
  content: string,
} 

class SocketService {
  async setUser(user: IUser, connected:boolean) {
    const payload = {
      email: user.email,
      userid: user.uuid,
      connected: `${connected}`,
    } as object
    const operations = Object.entries(payload).map(([field, value]) => {
      return redisClient.hSet(`user:${user.email}`, field, value)
    }
    );
  
    try {
      const results = await Promise.allSettled(operations);
      
      console.log('user setted successfuly');
      return results;
    } catch (error) {
      console.error('Error user setting:', error);
      throw error;
    }
  };

  async getUserIdByEmail(email: string) {
    return await redisClient.hGetAll(`user:${email}`);
  }

  // async addFriend(payload: IUser) {

  // }

  async setMessage(user: IUser, payload: IMessageItem) {
    const messageValue = JSON.stringify(payload);

    const promises = [
      redisClient.lPush(`chat:${payload.to}`, messageValue),
      redisClient.lPush(`chat:${payload.from}`, messageValue)
    ];
    return await Promise.allSettled(promises)
  }

  async getUserMessages(user: IUser) {
    const messagesList = await redisClient.lRange(`chat:${user.uuid}`, 0, -1);
    const messagesParsedList = messagesList.map(item => JSON.parse(item));
    return messagesParsedList;
  }

  async getUserFriendList(email: string) {
    const friendsList =  await redisClient.lRange(`friends:${email}`, 0, -1);
    const friendWithOnlyEmail = friendsList.map(item => JSON.parse(item).email)
    return friendWithOnlyEmail
  }

  async addUserFriendList(user: IUser, friend: SocketUser) {
    const payload = {
      email: friend.email,
      userid: friend.userid
    }
    const userPayload = {
      email: user.email,
      userid: user.uuid
    }
    await redisClient.lPush(`friends:${user.email}`, JSON.stringify(payload));
    await redisClient.lPush(`friends:${friend.email}`, JSON.stringify(userPayload));
  }

  async parseFriendList(friendList: string[]) {
    const newFriendList = [] as SocketUser[];
    for(let friend of friendList) {
      const friendConnected = await this.getUserIdByEmail(friend)
      // await redisClient.hGet(`userid:${parsedFriend[0]}`, "connected")
      newFriendList.push(friendConnected as object as SocketUser)
    }
    return newFriendList;
  }
}

export default new SocketService();