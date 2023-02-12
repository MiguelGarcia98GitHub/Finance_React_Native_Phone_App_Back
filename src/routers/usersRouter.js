import { Router } from "express";
import { UsersRepository } from "../repositories/usersRepository.js";
import { UsersController } from "./../controllers/usersController.js";

export const usersRouter = Router();

const controller = new UsersController(UsersRepository.getInstance());

usersRouter.post("/register", controller.register.bind(controller));
usersRouter.post("/login", controller.login.bind(controller));
