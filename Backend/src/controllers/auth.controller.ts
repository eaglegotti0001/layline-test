import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class AuthController {
  public authService = Container.get(AuthService);

  public init() {
    this.authService.init();
  }

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const { token, user } = await this.authService.login(userData);
      res.status(200).json({ token, user});
    } 
    catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  public checkSession = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = JSON.parse(JSON.stringify(req.user));
      delete userData['password'];
      res.status(200).json({ isValid: userData ? true : false, user: userData});
    } catch (error) {
      next(error);
    }
  }
  
}
