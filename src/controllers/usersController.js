import { userModel } from "../mongodb_models/userModel.js";
import { UsersRepository } from "../repositories/usersRepository.js";

export class UsersController {
  constructor() {
    this.repository = new UsersRepository();
  }

  #Model = userModel;

  // Singleton Pattern
  static getInstance() {
    if (!UsersController.instance) {
      UsersController.instance = new UsersController();
    }
    return UsersRepository.instance;
  }

  async register(req, res, next) {
    try {
      console.log("Controller - Users - Register");
      if (!req.body.email || !req.body.password) {
        next("You must provide both and email and a password");
      }

      const user = await this.repository.createNewUser({
        ...req.body,
      });
      res.status(201).json({ user });
    } catch (_error) {
      return {
        error: "Server error while trying to register",
      };
    }
  }

  async login(req, res, next) {
    try {
      console.log("Controller - Users - Login");
      if (!req.body.email || !req.body.password) {
        next("You must provide both and email and a password");
      }

      const user = await this.repository.login({
        ...req.body,
      });
      res.status(200).json({ user });
    } catch (_error) {
      return {
        error: "Server error while trying to register",
      };
    }
  }
}
