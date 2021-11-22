import { model, Schema } from "mongoose";

interface User {
  name: string;
  email: string;
  password: string;
}

const schema = new Schema<User>(
  {
    name: { type: String, required: true, minlength: 3, null: false },
    email: { type: String, required: true, unique: true, null: false, },
    password: { type: String, required: true, minlength: 8, null: false },
  },
  {
    timestamps: true
  }
);

const UserModel = model<User>("User", schema);

export default UserModel;
