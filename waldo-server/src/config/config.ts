import dontenv from "dotenv";

dontenv.config();

interface ConfigProp {
  port: number;
  DATABASE_URL: string;
}

const config: ConfigProp = {
  port: Number(process.env.PORT || 4000),
  DATABASE_URL: process.env.DATABASE_URL!,
};

export default config;
