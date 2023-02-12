import jwt from "jsonwebtoken";
import bc from "bcryptjs";
import { SECRET } from "../config/config.js";

export const getSecret = (secret = SECRET) => {
  if (typeof secret !== "string" || secret === "") {
    throw new Error("Incorrect secret for token creation");
  }
  return secret;
};

export const createToken = (payload) => {
  return jwt.sign(payload, getSecret());
};

export const readToken = (token) => {
  const payload = jwt.verify(token, getSecret());
  return payload;
};

export const encryptPassword = (password) => {
  return bc.hash(password, 10);
};

export const validatePassword = (newPassword, hash) => {
  return bc.compare(newPassword, hash);
};
