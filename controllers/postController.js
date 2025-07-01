import { Post } from "../models/Post.js";
import { Employee } from "../models/Employee.js";
import {
  CheckAuthorization,
  throwErrors,
  getProjections,
} from "../common/Functions.js";

export const getAllPosts = async (
  parent,
  { page = 1, pageSize = 10, search = "", sortBy = "createdAt" },
  { employeeId },
  info
) => {
  try {
    CheckAuthorization(employeeId);

    //Pagination, Searching and Sorting
    const skip = (page - 1) * pageSize;

    // Optional search filter
    const filter = search
      ? { title: { $regex: search, $options: "i" } } // case-insensitive
      : {};

    // Optional sorting
    const sort = {};
    sort[sortBy] = -1; // descending
    const [posts, totalCount] = await Promise.all([
      Post.find(filter).sort(sort).skip(skip).limit(pageSize), // latest first
      Post.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(pageSize)
        .countDocuments(filter),
    ]);

    return { posts, pageNumber: page, maxRecords: pageSize, totalCount };
  } catch (err) {
    throwErrors(err);
  }
};

export const getPostById = async (_, { _id }, { employeeId }, info) => {
  try {
    CheckAuthorization(employeeId);

    const projection = getProjections(info);
    const post = await Post.findById(_id).select(projection);

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  } catch (err) {
    throwErrors(error);
  }
};

export const resolveEmployee = async (Post, args, { employeeId }, info) => {
  try {
    CheckAuthorization(employeeId);

    const projection = getProjections(info);
    return await Employee.findById(Post.author).select(projection);
  } catch (error) {
    throwErrors(error);
  }
};

export const createAPost = async (
  _,
  { title, content, author },
  { employeeId }
) => {
  try {
    CheckAuthorization(employeeId);
    const newPost = new Post({ title, content, author });
    return await newPost.save();
  } catch (err) {
    throwErrors(error);
  }
};

export const deleteAPost = async (_, { _id }, { employeeId }) => {
  try {
    CheckAuthorization(employeeId);
    const result = await Post.findByIdAndDelete(_id);
    if (!result) return "Post not found";
    return "Post deleted";
  } catch (err) {
    throwErrors(error);
  }
};
