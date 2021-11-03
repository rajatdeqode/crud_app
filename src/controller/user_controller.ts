import express from "express";
import bcrypt from "bcryptjs";
import User from "../../models/user_model";
const { validationResult } = require("express-validator");

async function get_users(req: express.Request, res: express.Response) {
  try {
    const user = await User.find();
    return res.status(200).json({ users: user });
  } catch (e) {
    console.log(e);
  }
}

async function add_user(req: express.Request, res: express.Response) {
  const { name, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);


  const user = new User({
    name,
    email,
    password: hash,
  });
  try {
    await user.save();
    return res.status(200).json({ message: "User created succesfully" });
  } catch (e) {
    console.log(e);
  }
}

async function update_user(req: express.Request, res: express.Response) {
  
  const id = req.params.id;
  
  if (!id) {
    return res.status(422).json({ message: "user id not found" });
  }
  const { name, email, password } = req.body;
  try {
    const updated_user = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      {
        new: true,
      }
    ).select("-__v");
    return res.status(200).json({ user: updated_user });
  } catch (e) {
    console.log(e);
  }
}

async function delete_user(req: express.Request, res: express.Response) {
  const id = req.params.id;
  if (!id) {
    return res.status(422).json({ message: "user id not found" });
  }
  try {
    await User.findByIdAndDelete(id);
    return res.status(200).json({ mesage: "user deleted succesfully" });
  } catch (e) {
    console.log(e);
  }
}
module.exports = {
  get_users,
  add_user,
  update_user,
  delete_user,
};
