import { createClient } from "redis";
import config from "./config.js";

const redisClient = createClient({
  url: config.REDIS_URL,
});

await redisClient.connect().catch(console.log);

export default redisClient;
