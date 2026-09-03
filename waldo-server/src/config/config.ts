import dontenv from "dotenv";

dontenv.config();

interface ConfigProp {
  port: number;
}

const config: ConfigProp = {
  port: Number(process.env.PORT || 4000),
};

export default config;
