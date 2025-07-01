import { employeeTypeDefs } from "../typedefs/Employee.js";
import { employeeResolvers } from "../resolvers/Employee.js";
import { postTypeDefs } from "../typedefs/Post.js";
import { postResolvers } from "../resolvers/Post.js";

// Merge typeDefs using an array
export const typeDefs = [employeeTypeDefs, postTypeDefs];

// Merge resolvers using spread
export const resolvers = {
  Query: {
    ...employeeResolvers.Query,
    ...postResolvers.Query,
  },
  Mutation: {
    ...employeeResolvers.Mutation,
    ...postResolvers.Mutation,
  },
  Post: {
    ...postResolvers.Post, // ✅ important!
  },
  Employee: {
    ...employeeResolvers.Employee,
  },
};
