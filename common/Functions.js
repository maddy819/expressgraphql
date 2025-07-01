import graphqlFields from "graphql-fields";

export const getProjections = (info) => {
  const requestedFields = Object.keys(graphqlFields(info));
  return requestedFields.join(" "); // for Mongoose select
};

export const CheckAuthorization = (employeeId) => {
  if (!employeeId) {
    throw new Error("Unauthorized");
  }
};

export const throwErrors = (error) => {
  console.error("Error:", error.message);
  throw new Error("Request failed: " + error.message);
};
