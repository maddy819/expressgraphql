import dotenv from "dotenv";
dotenv.config();

const config = {
  MONGO_URL: process.env.MONGO_URL,
  APOLLO_KEY: process.env.APOLLO_KEY,
  APOLLO_GRAPH_REF: process.env.APOLLO_GRAPH_REF,
  APOLLO_SCHEMA_REPORTING: process.env.APOLLO_SCHEMA_REPORTING,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  CONTEXT_FREE_OPS: ["createEmployee", "signInEmployee"],
};

export default config;
