import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
    this.authController.init();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, ValidationMiddleware(CreateUserDto), this.authController.signUp);
    this.router.post(`${this.path}login`, this.authController.logIn);
    this.router.post(`${this.path}logout`, AuthMiddleware, this.authController.logOut);
    this.router.get(`${this.path}check`, AuthMiddleware, this.authController.checkSession);
  }
}
