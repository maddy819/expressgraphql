import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { typeDefs, resolvers } from "./graphql/index.js";
import context from "./middleware/Context.js";
import config from "./config/config.js";

const app = express();
app.use(cors());

await connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  csrfPrevention: true,
  context,
});
await server.start();
server.applyMiddleware({ app });

const PORT = config.PORT || 4000;
app.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
});
