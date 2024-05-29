import { Router } from 'express';
import { PortfoliosController } from '@controllers/portfolios.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
export class PortfolioRoute implements Routes {
  public path = '/portfolios';
  public router = Router();
  public portfolios = new PortfoliosController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.portfolios.getPortfoliosForUserId);
    this.router.post(`${this.path}`, AuthMiddleware, this.portfolios.createPortfolio);
    this.router.put(`${this.path}`, AuthMiddleware, this.portfolios.updatePortfolio);
    this.router.delete(`${this.path}`, AuthMiddleware, this.portfolios.deletePorfolio);
  }
}
