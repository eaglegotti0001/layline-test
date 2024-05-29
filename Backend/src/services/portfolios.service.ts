import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Portfolio } from '@interfaces/portfolios.interface';
import { PortfolioModel } from '@models/portfolio.model';

@Service()

export class PortfoliosService {
  public async findAllPortfolios(userId: string): Promise<Portfolio[]> {
    const portfolios = await PortfolioModel.find({ userId : userId });
    return portfolios;
  }

  public async findUserById(portfolioId: string): Promise<Portfolio> {
    const findUser: Portfolio = await PortfolioModel.findOne({ _id: portfolioId });
    if (!findUser) throw new HttpException(409, "Portfolio doesn't exist");

    return findUser;
  }

  public async createPortfolio(portfolioData: Portfolio): Promise<Portfolio> {
    const createdPortfolio: Portfolio = await PortfolioModel.create(portfolioData);
    return createdPortfolio;
  }

  public async updatePortfolio(portfolioId: string, portfolioData: Portfolio): Promise<Portfolio | null> {

    if (portfolioId) {
      const findUser: Portfolio = await PortfolioModel.findOne({ _id: portfolioId });
      if(findUser) {
        const updatePortfolioById: Portfolio = await PortfolioModel.findByIdAndUpdate(portfolioId,  portfolioData );
        if (!updatePortfolioById) throw new HttpException(409, "Portfolio doesn't exist");
        return updatePortfolioById;  
      }      
    }

    return null;    
  }

  public async deletePortfolio(portfolioId: string): Promise<Portfolio> {
    const deletePortfolioById: Portfolio = await PortfolioModel.findByIdAndDelete(portfolioId);
    if (!deletePortfolioById) throw new HttpException(409, "Portfolio doesn't exist");
    return deletePortfolioById;
  }

}
