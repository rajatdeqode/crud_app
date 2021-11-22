import User from "../../../models/user_model";
import bcrypt from "bcryptjs";



const save_user = async (name: string, email: string, password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const user = new User({
    name,
    email,
    password: hash,
  });
  const add_user = user.save();
  return add_user;
};

export default {

  save_user,
};
