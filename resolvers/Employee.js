import {
  createAnEmployee,
  deleteAnEmployee,
  getAllEmployee,
  getEmployeeById,
  getEmployeePosts,
  signInEmployee,
  updateAnEmployee,
} from "../controllers/EmployeeController.js";

export const employeeResolvers = {
  Query: {
    employees: getAllEmployee,
    employee: getEmployeeById,
  },
  Employee: {
    posts: getEmployeePosts,
    createdAt: (parent) => parent.createdAt?.toISOString(),
    updatedAt: (parent) => parent.updatedAt?.toISOString(),
  },
  Mutation: {
    createEmployee: createAnEmployee,
    updateEmployee: updateAnEmployee,
    deleteEmployee: deleteAnEmployee,
    signInEmployee: signInEmployee,
  },
};
