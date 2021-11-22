import express from "express";
import user_service from "../services/index";
import jwt from "jsonwebtoken";


async function get_users(req: express.Request, res: express.Response) {
  try {
    const user = await user_service.get_user.get_all_user();
    return res.status(200).json({ users: user });
  } catch (e) {
    console.log(e);
  }
}

async function add_user(req: express.Request, res: express.Response) {
  const { name, email, password } = req.body;
  try {
    const dbuser: any = await user_service.get_user.find_user(email);
    if (dbuser) {
      return res.status(422).json({ message: "user is already register" });
    }

    const add_user = await user_service.save_user.save_user(
      name,
      email,
      password
    );
    const secret: any = process.env.ACCESS_TOKEN;
    const token = jwt.sign(
      { _id: add_user._id, email: add_user.email },
      secret
    );
    return res.status(200).json({ accesstoken: token });
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
    const update_user = await user_service.update_user.update_user(
      id,
      name,
      email,
      password
    );
    return res.status(200).json({ user: update_user });
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
    await user_service.delete_user(id);
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
