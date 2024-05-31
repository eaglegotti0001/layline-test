import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { BidsService } from '@services/bids.service';
import { ProjectService } from '@services/projects.service';
import { Bid } from '@/interfaces/bids.interface';
import moment from 'moment-timezone';
import { AuthService } from '@/services/auth.service';
import { BidModel } from '@/models/bid.model';
import { ProjectModel } from '@/models/project.model';

export class BidsController {

  public bidService = Container.get(BidsService);
  public projectService = Container.get(ProjectService);
  public authService = Container.get(AuthService);

  public getBidsForUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { user } = req as any;
      if (user) {
        const findAllBids: Bid[] = await this.bidService.findAllBidsForUser(user._id.toString());
        res.status(200).json({ bids: findAllBids, message: 'success' });
      }
      else {
        res.status(204).json({ message: 'invalid user' });
      }

    } catch (error) {
      next(error);
    }
  };

  public createBidForProject = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { user } = req as any;

      if (user) {

        const { coverletter, projectId, price } = req.body;

        const bidData: Bid = {
          coverletter,
          projectId,
          userId: user._id.toString(),
          userEmail: user.email,
          userName: `${user.firstName} ${user.lastName}`,
          price,
          isAbleToUpdatePrice: true,
          strTime: moment().format("YYYY-MM-DDTHH:mm:ss")
        }

        const createdBid: Bid = await this.bidService.createBid(bidData);
        await this.projectService.addBidToProject(projectId, createdBid);
        const bids: Bid[] = await this.bidService.findAllBidsForUserAndProjectId(user._id, projectId);
        res.status(201).json({ createdId: createdBid._id.toString(), allBids: bids, message: 'success' });

      }
      else {
        res.status(204).json({ message: 'invalid user' });
      }

    }
    catch (error) {
      next(error);
    }

  };

  public getBidsForProjectIdOfUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req as any;
      if (user) {
        const projectId = req.params.id;
        const findAllBids: Bid[] = await this.bidService.findAllBidsForUserAndProjectId(user._id.toString(), projectId);
        res.status(200).json({ bids: findAllBids, message: 'success' });
      }
      else {
        res.status(204).json({ message: 'invalid user' });
      }

    } catch (error) {
      next(error);
    }
  };


  public getBidsForProjectId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req as any;
      if (user) {
        const projectId = req.params.id;
        const findAllBids: Bid[] = await this.bidService.findAllBidForProjectId(projectId);
        res.status(200).json({ bids: findAllBids, message: 'success' });
      }
      else {
        res.status(204).json({ message: 'invalid user' });
      }

    } catch (error) {
      next(error);
    }
  };


  public updateBid = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { user } = req as any;

      if (user) {
        const bidData: Bid = req.body;
        const updatedBidData: Bid = await this.bidService.updateBid(bidData._id, bidData);

        res.status(200).json({ bid: updatedBidData, message: 'success' });
      }
      else {
        res.status(204).json({ message: 'invalid user' });
      }

    }
    catch (error) {
      next(error);
    }
  };

  public updateBidPrice = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { user } = req as any;

      if (user) {
        const { bid_id, price } = req.body;
        const find = await this.bidService.findBidById(bid_id);
        if (find) {
          find.price = price;
          await BidModel.findByIdAndUpdate(bid_id, find);
          const project = await ProjectModel.findOne({ _id: find.projectId});
          const socket = this.authService.getUISocket(project.userId);
          if(socket) {
            socket.userChannel.emit("my_message", price);
          }          
          res.status(200).json({ bid: find, message: 'success' });
        }
        else {
          res.status(204).json({ message: 'Not found' });
        }
      }
      else {
        res.status(204).json({ message: 'invalid user' });
      }

    }
    catch (error) {
      next(error);
    }
  };

  public allowPriceUpdate = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { user } = req as any;
      if (user) {
        const { bid_id, allow } = req.body;
        const find: Bid = await this.bidService.findBidById(bid_id);
        if (find) {
          find.isAbleToUpdatePrice = allow;
          await this.bidService.updateBid(bid_id, find);
          res.status(200).json({ bid: find, message: 'success' });
        }
        else {
          res.status(204).json({ message: 'not found' });
        }
      }
      else {
        res.status(204).json({ message: 'invalid user' });
      }

    }
    catch (error) {
      next(error);
    }
  };

  public deleteBid = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const bidId = req.query.id as string;
      if (bidId) {
        const deletedBidData: Bid = await this.bidService.deleteBid(bidId);
        res.status(200).json({ bid: deletedBidData, message: 'success' });
      }
      else {
        res.status(404).json({ message: 'invalid request' });
      }

    }
    catch (error) {
      next(error);
    }
  };
}
