import { defineConfig } from "prisma/config";
import config from "./src/config/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx ./src/modals/seed.ts",
  },
  datasource: {
    url: config.DATABASE_URL,
  },
});
