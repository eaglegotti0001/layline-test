import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Portfolio } from '@interfaces/portfolios.interface';
import { PortfoliosService } from '@services/portfolios.service';

export class PortfoliosController {

  public portfolio = Container.get(PortfoliosService);

  public getPortfoliosForUserId = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { user } = req as any;
      if (user) {
        const findAllPortfoliosData: Portfolio[] = await this.portfolio.findAllPortfolios(user._id.toString());
        res.status(200).json({ portfolios: findAllPortfoliosData, message: 'findAll' });
      }
      else {
        res.status(204).json({ message: 'invalid user' });
      }

    } catch (error) {
      next(error);
    }
  };

  public createPortfolio = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { user } = req as any;

      if (user) {

        const { title, content, imageData } = req.body;

        const portfolioData: Portfolio = {
          title,
          content,
          imageData,
          userId: user._id.toString()
        }

        const createdPortfolio: Portfolio = await this.portfolio.createPortfolio(portfolioData);
        res.status(201).json({ portfolio: createdPortfolio, message: 'created' });
      }
      else {
        res.status(204).json({ message: 'invalid user' });
      }

    }
    catch (error) {
      next(error);
    }

  };

  public updatePortfolio = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { user } = req as any;

      if (user) {
        const portfolioData: Portfolio = req.body;
        const updatedPortfolioData: Portfolio = await this.portfolio.updatePortfolio(portfolioData._id, portfolioData);
        res.status(200).json({ portfolio: updatedPortfolioData, message: 'updated' });
      }
      else {
        res.status(204).json({ message: 'invalid user' });
      }

    }
    catch (error) {
      next(error);
    }
  };

  public deletePorfolio = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const portfolioId = req.query.id as string;
      if (portfolioId) {
        const deletedPortfolioData: Portfolio = await this.portfolio.deletePortfolio(portfolioId);
        res.status(200).json({ portfolio: deletedPortfolioData, message: 'deleted' });
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
