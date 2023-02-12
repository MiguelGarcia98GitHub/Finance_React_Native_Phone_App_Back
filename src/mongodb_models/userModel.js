import { Schema, model } from "mongoose";

export const UserSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

UserSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.password;
  },
});

export const userModel = model("User", UserSchema, "users");
