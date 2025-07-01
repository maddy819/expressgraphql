import {
  createAPost,
  deleteAPost,
  getAllPosts,
  getPostById,
  resolveEmployee,
} from "../controllers/postController.js";

export const postResolvers = {
  Query: {
    posts: getAllPosts,
    post: getPostById,
  },
  Post: {
    employee: resolveEmployee,
    createdAt: (parent) => parent.createdAt?.toISOString(),
    updatedAt: (parent) => parent.updatedAt?.toISOString(),
  },
  Mutation: {
    createPost: createAPost,
    deletePost: deleteAPost,
  },
};
