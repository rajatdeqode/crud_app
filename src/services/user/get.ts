import User from "../../../models/user_model";

const get_all_user = async () => {
  try {
    const user = User.find();
    return user;
  } catch (e) {
    console.log(e);
  }
};
const find_user = async (email: string) => {
  try {
    const user = User.findOne({ email });
    return user;
  } catch (e) {
    console.log(e);
  }
};
export default { get_all_user, find_user };
