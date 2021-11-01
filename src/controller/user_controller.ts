import express from "express";
import bcrypt from "bcryptjs";
import User from '../../models/user_model';
const { validationResult } = require('express-validator');

function get_user(req: express.Request, res: express.Response) {}

async function add_user(req: express.Request, res: express.Response) {
  const { name, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  console.log(hash);

  const user = new User({
    name,
    email,
    password: hash,
  });
  try {
    await user.save();
    return res.status(200).json({ Message: "User added succesfully" });
  } catch (e) {
    console.log(e);
  }
}

function update_user(req: express.Request, res: express.Response) {

}

function delete_user(req: express.Request, res: express.Response) {}

module.exports = {
  get_user,
  add_user,
  update_user,
  delete_user,
};
