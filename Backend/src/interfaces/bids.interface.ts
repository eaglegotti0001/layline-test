export interface Bid {
  _id?: string;
  userId: string;
  userEmail: string;
  userName: string;
  projectId: string;
  coverletter: string;  
  price: number;
  isAbleToUpdatePrice: boolean;
  strTime: string;
}
