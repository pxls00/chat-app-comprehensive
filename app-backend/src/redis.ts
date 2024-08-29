import config from "./config";
import * as redis from 'redis';

const REDIS_PORT = config.REDIS_PORT
const REDIS_HOST = config.REDIS_HOST
const url = `redis://${REDIS_HOST}:${REDIS_PORT}`;
const client = redis.createClient({
  url,
  password: "",
});

client.on('error', err => console.log('Redis Client Error', err));

client.connect()

client.on('connect', () => {
  console.log("Redis client connected")
});


export default client