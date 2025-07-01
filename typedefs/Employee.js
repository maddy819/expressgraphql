import { gql } from "apollo-server-express";

export const employeeTypeDefs = gql`
  type Employee {
    _id: ID!
    name: String!
    department: String!
    email: String!
    password: String
    salary: Float!
    createdAt: String
    updatedAt: String
    posts: [Post]
  }

  type EmployeePage {
    employees: [Employee]
    pageNumber: Int
    maxRecords: Int
    totalCount: Int
  }

  type Token {
    token: String
  }

  type Query {
    employees(
      page: Int = 1
      pageSize: Int = 10
      search: String
      sortBy: String = "createdAt"
    ): EmployeePage
    employee(_id: ID!): Employee
  }

  type Mutation {
    createEmployee(
      name: String!
      department: String!
      email: String!
      password: String!
      salary: Float!
    ): Employee

    updateEmployee(
      _id: ID!
      name: String!
      department: String!
      email: String!
      password: String!
      salary: Float!
    ): Employee

    deleteEmployee(_id: ID!): String

    signInEmployee(email: String!, password: String!): Token
  }
`;
