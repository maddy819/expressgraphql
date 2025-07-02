import jwt from "jsonwebtoken";
import config from "../config/config.js";

const getTokenFromHeader = (req) => {
  const authHeader = req?.headers?.authorization;

  if (authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1]; // ✅ return the token after 'Bearer'
  }

  return null;
};

const getOperationName = (req) => {
  // Handle different GraphQL request formats
  if (req.body?.operationName) {
    return req.body.operationName;
  }

  if (req.body?.query) {
    // Parse operation name from query (fallback)
    const match = req.body.query.match(/^(query|mutation)\s+(\w+)/);
    return match?.[2] || null;
  }

  return null;
};

const context = ({ req }) => {
  // List of context-free operations (case-sensitive)
  const contextFreeOps = config.CONTEXT_FREE_OPS;
  const operationName = getOperationName(req);

  console.log("endpoints: " + operationName);

  if (operationName && contextFreeOps.includes(operationName)) {
    return {}; // skip auth/context for public operations
  }

  const authorization = getTokenFromHeader(req);

  if (!authorization) {
    throw new Error("Missing or invalid token");
  }

  return jwt.verify(authorization, config.JWT_SECRET);
};

export default context;
