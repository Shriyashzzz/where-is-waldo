/** @type {import('jest').Config} */
export default {
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.tsx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: { syntax: "typescript" },
          target: "es2022",
        },
        module: { type: "es6" }, // keep ESM output — required since @prisma/client v7 is ESM-only
      },
    ],
  },
};
