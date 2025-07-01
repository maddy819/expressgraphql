import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Employee } from "../models/Employee.js";
import { Post } from "../models/Post.js";
import config from "../config/config.js";
import {
  CheckAuthorization,
  getProjections,
  throwErrors,
} from "../common/Functions.js";

export const getAllEmployee = async (
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
      ? { name: { $regex: search, $options: "i" } } // case-insensitive
      : {};

    // Optional sorting
    const sort = {};
    sort[sortBy] = -1; // descending

    const [employees, totalCount] = await Promise.all([
      Employee.find(filter).sort(sort).skip(skip).limit(pageSize),
      Employee.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(pageSize)
        .countDocuments(filter),
    ]);

    return { employees, pageNumber: page, maxRecords: pageSize, totalCount };
  } catch (error) {
    throwErrors(error);
  }
};

export const getEmployeeById = async (_, { _id }, { employeeId }, info) => {
  try {
    CheckAuthorization(employeeId);

    const projection = getProjections(info);
    const employee = await Employee.findById(_id).select(projection);

    if (!employee) {
      throw new Error("Employee not found");
    }

    return employee;
  } catch (error) {
    throwErrors(error);
  }
};

export const createAnEmployee = async (_, args) => {
  try {
    const employee = await Employee.findOne({ email: args.email });

    if (employee) {
      throw new Error("Employee already registered with this email");
    }

    const hashedPassword = await bcrypt.hash(args.password, 10);

    const newEmployee = new Employee({
      ...args,
      password: hashedPassword,
    });

    return await newEmployee.save();
  } catch (error) {
    throwErrors(error);
  }
};

export const updateAnEmployee = async (
  _,
  { _id, ...updates },
  { employeeId }
) => {
  try {
    CheckAuthorization(employeeId);
    return await Employee.findByIdAndUpdate(_id, updates, { new: true });
  } catch (error) {
    throwErrors(error);
  }
};

export const deleteAnEmployee = async (_, { _id }, { employeeId }) => {
  try {
    CheckAuthorization(employeeId);

    const result = await Employee.findByIdAndDelete(_id);

    if (!result) throw new Error("Employee not found");

    return "Employee deleted";
  } catch (error) {
    throwErrors(error);
  }
};

export const signInEmployee = async (_, args) => {
  try {
    const employee = await Employee.findOne({
      email: args.email,
    });

    if (!employee) {
      throw new Error("Employee not found with this email!");
    }

    const isMatched = await bcrypt.compare(args.password, employee.password);

    if (!isMatched) {
      throw new Error("Email or Password is invalid!");
    }

    // Payload with custom claims
    const payload = {
      employeeId: employee._id,
      email: employee.email,
    };

    // Token options
    const options = {
      expiresIn: "1h", // or '15m', '7d', etc.
      issuer: "my-app", // optional: identify who issued it
      audience: "my-users", // optional: who the token is intended for
    };

    const token = jwt.sign(payload, config.JWT_SECRET, options);
    return { token: token };
  } catch (error) {
    throwErrors(error);
  }
};

export const getEmployeePosts = async (
  Employee,
  args,
  { employeeId },
  info
) => {
  try {
    CheckAuthorization(employeeId);

    const projection = getProjections(info);
    return await Post.find({ author: Employee._id }).select(projection);
  } catch (error) {
    throwErrors(error);
  }
};
