import dotenv from "dotenv";

dotenv.config();

interface ConfigProp {
  port: number;
  DATABASE_URL: string;
  ENV: string;
  REDIS_URL: string;
}

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error(
    `Missing database URL for ENV="${process.env.ENV}". Check DATABASE_URL in your .env.`,
  );
}
const REDIS_URL = process.env.REDIS_URL;
if (!REDIS_URL) {
  throw new Error(
    `Missing Redis DB URL for ENV="${process.env.ENV}". Check REDIS_URL in your .env.`,
  );
}
const config: ConfigProp = {
  port: Number(process.env.PORT || 4000),
  ENV: process.env.ENV || "",
  DATABASE_URL,
  REDIS_URL,
};

export default config;
