import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { BidModel } from '@/models/bid.model';
import { Bid } from '@/interfaces/bids.interface';

@Service()

export class BidsService {

  public async findAllBidForProjectId(projectId: string): Promise<Bid[]> {
    const bid = await BidModel.find({ projectId });
    return bid;
  }

  public async findAllBidsForUser(userId: string): Promise<Bid[]> {
    const findAll: Bid[] = await BidModel.find({ userId });
    if (!findAll) throw new HttpException(409, "Bid doesn't exist");
    return findAll;
  }

  public async findAllForBidIds(ids : string[]): Promise<Bid[]> {
    const findAll: Bid[] = await BidModel.find({ _id: { $in: ids } });
    if (!findAll) throw new HttpException(409, "Bid doesn't exist");
    return findAll;
  }

  public async findAllBidsForUserAndProjectId(userId: string, projectId: string): Promise<Bid[]> {
    const findAll: Bid[] = await BidModel.find({ userId, projectId });
    if (!findAll) throw new HttpException(409, "Bid doesn't exist");
    return findAll;
  }

  public async findBidById(bid_id: string): Promise<Bid> {
    const find: Bid = await BidModel.findOne( { _id: bid_id});
    return find;
  }

  public async createBid(body: Bid): Promise<Bid> {
    const createdBid: Bid = await BidModel.create(body);
    return createdBid;
  }

  public async updateBid(bidId: string, body: Bid): Promise<Bid | null> {

    if (bidId) {
      const find: Bid = await BidModel.findOne({ _id: bidId });
      if(find) {
        const updateBidById: Bid = await BidModel.findByIdAndUpdate(bidId,  body );
        if (!updateBidById) throw new HttpException(409, "Bid doesn't exist");
        return updateBidById;  
      }      
    }

    return null;    
  }

  public async deleteBid(id: string): Promise<Bid> {
    const deleteBidById: Bid = await BidModel.findByIdAndDelete(id);
    if (!deleteBidById) throw new HttpException(409, "Bid doesn't exist");
    return deleteBidById;
  }

}
