import { model, Schema, Document } from 'mongoose';
import { Portfolio } from '@interfaces/portfolios.interface';

const PortfolioSchema: Schema = new Schema({

  userId: {
    type: String,
    required: true    
  },
  title: {
    type: String,
    //required: true    
  },
  content: {
    type: String,
    //required : true,
  },
  imageData: {
    type: String,
    //required: true,
  },
});

export const PortfolioModel = model<Portfolio & Document>('Portfolio', PortfolioSchema);
