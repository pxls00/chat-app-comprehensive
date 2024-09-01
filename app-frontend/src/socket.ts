import {io} from "socket.io-client";
const VITE_API_URL = "http://localhost:3000";


const socket = io(VITE_API_URL, {
  transports: ['websocket', 'polling', 'flashsocket'],
  autoConnect: false,
  withCredentials: true,
  auth: {
    token: localStorage.getItem("token")
  }
});

export default socket

