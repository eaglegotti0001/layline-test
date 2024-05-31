import { Bid } from "./bids.interface";

export interface Project {
  _id?: string;
  userId: string;
  title: string;
  content: string;
  price: number;
  strTimeCreated: string;
  bid_ids: string[];  
}

export interface ProjectItem {
  _id?: string;
  userId: string;
  title: string;
  content: string;
  price: number;
  strTimeCreated: string;
  bids: Bid[];  
}
