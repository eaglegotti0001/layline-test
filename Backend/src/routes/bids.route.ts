import { Router } from 'express';
import { BidsController } from '@controllers/bids.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';

export class BidRoute implements Routes {
  public path = '/bids';
  public router = Router();
  public bids = new BidsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.bids.getBidsForUser);
    this.router.get(`${this.path}/my/:id`, AuthMiddleware, this.bids.getBidsForProjectIdOfUser);    
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.bids.getBidsForProjectId);    
    this.router.post(`${this.path}`, AuthMiddleware, this.bids.createBidForProject);
    this.router.put(`${this.path}/:id`, AuthMiddleware, this.bids.updateBid);
    this.router.post(`${this.path}/price`, AuthMiddleware, this.bids.updateBidPrice);
    this.router.post(`${this.path}/allowPriceUpdate/`, AuthMiddleware, this.bids.allowPriceUpdate);
    this.router.delete(`${this.path}`, AuthMiddleware, this.bids.deleteBid);
  }
}
