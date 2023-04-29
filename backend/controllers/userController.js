import asyncHandler from "express-async-handler";
import generateToken from "../Utils/generateToken.js";
import User from "../models/userModel.js";

// @desc  Auth user & get token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email))) {
    res.status(400);
    throw new Error("Invalid Email");
  }


  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // If the user is found and the password matches, return a JSON object with the user's info and token generated using the user's ID
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc  Register a new User
// @route POST /api/users/
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password length must be more than 6 characters");
  }

  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email))) {
    res.status(400);
    throw new Error("Invalid Email");
  }

  
  if (!name) {
    res.status(400);
    throw new Error("Name Can not be empty!");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // If the user is successfully created, return a 201 status code and a JSON object with the user's ID, name, email, role, isAdmin status, and a new token generated using the user's ID
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc  Get user profile
// @route GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc  update user profile
// @route PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email))) {
    res.status(400);
    throw new Error("Invalid Email");
  }

  if (!req.body.name) {
    res.status(400);
    throw new Error("Name can not be empty!");
  }

  if (req.body.password && req.body.password.length < 6) {
    res.status(400);
    throw new Error("Password length must be more than 6 characters");
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc  Get all users
// @route GET /api/users
// @access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// @desc  delete user
// @route DELETE /api/users/:id
// @access Private/Admin

const deleteUsers = asyncHandler(async (req, res) => {
  const ids = req.headers.data.split(",");

  if (ids.length > 0) {
    console.log(ids);
    await User.deleteMany({
      _id: {
        $in: ids,
      },
    });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }

  // if(user) {
  //     await user.remove()
  //     res.json({message:'User removed'})
  // }else{
  //     res.status(404)
  //     throw new Error('User not found')
  // }
});

// @desc  Get user by ID
// @route GET /api/users/:id
// @access Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc  update user
// @route PUT /api/users/:id
// @access Private/Admin

//function to update user role
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.role = req.body.role || user.role;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUsers,
  getUserById,
  updateUser,
};
