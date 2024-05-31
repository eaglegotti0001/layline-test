import { Bid } from '@/interfaces/bids.interface';
import { model, Schema, Document } from 'mongoose';

const BidSchema: Schema = new Schema({

  userId: {
    type: String,
    required: true    
  },

  userEmail: {
    type: String,
    required: true    
  },
  userName: {
    type: String,
    required: true    
  },

  projectId: {
    type: String,
    required: true    
  },
  coverletter: {
    type: String,
  },  
  price: {
    type: Number
  },
  isAbleToUpdatePrice: {
    type: Boolean
  }
});

export const BidModel = model<Bid & Document>('Bid', BidSchema);
