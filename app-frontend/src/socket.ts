import {io} from "socket.io-client";
export const VITE_API_URL = import.meta.env.VITE_API_URL;


const socket = io(VITE_API_URL, {
  transports: ['websocket', 'polling', 'flashsocket'],
  autoConnect: false,
  withCredentials: true,
  auth: {
    token: localStorage.getItem("token")
  }
});

export default socket

