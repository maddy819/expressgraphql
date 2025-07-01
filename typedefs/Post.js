import { gql } from "apollo-server-express";

export const postTypeDefs = gql`
  type Post {
    _id: ID!
    title: String!
    content: String
    author: ID!
    createdAt: String
    updatedAt: String
    employee: Employee
  }

  type PostPage {
    posts: [Post]
    pageNumber: Int
    maxRecords: Int
    totalCount: Int
  }

  type Query {
    posts(
      page: Int = 1
      pageSize: Int = 10
      search: String
      sortBy: String = "createdAt"
    ): PostPage
    post(_id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String, author: String): Post
    deletePost(_id: ID!): String
  }
`;
