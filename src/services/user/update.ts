import User from "../../../models/user_model";
import bcrypt from "bcryptjs";

const update_user = async (
  id: any,
  name: string,
  email: string,
  password: string
) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const updated_user = User.findByIdAndUpdate(
    id,
    { name, email, password: hash },
    {
      new: true,
    }
  ).select("-__v");

  return updated_user;
};

export default {
  update_user,
};
