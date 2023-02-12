import { createToken, encryptPassword } from "../helpers/helpers.js";
import { userModel } from "../mongodb_models/userModel.js";
import { validatePassword } from "./../helpers/helpers.js";

export class UsersRepository {
  #Model = userModel;

  // Singleton Pattern
  static getInstance() {
    if (!UsersRepository.instance) {
      UsersRepository.instance = new UsersRepository();
    }
    return UsersRepository.instance;
  }

  async createNewUser(data) {
    // if (!data.email || !data.password) {
    //   return "You must provide an email and a password";
    // }
    console.log("Repository - Users - createNewUser");
    data.password = await encryptPassword(data.password);
    const result = await this.#Model.create(data);
    return result;
  }

  async login(data) {
    const user = await this.#Model.findOne({
      email: data.email,
    });

    if (!user) {
      return "User not found with that email";
    }

    const isPasswordValid = await validatePassword(
      data.password,
      user.password
    );

    if (!isPasswordValid) {
      return "Incorrect password";
    }

    const token = createToken({
      id: user.id.toString(),
      email: user.email,
      password: user.password,
    });
    return token;
  }
}
