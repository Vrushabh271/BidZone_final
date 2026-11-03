export interface Auction {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  seller: string;
  startingPrice: number;
  currentBid: number;
  minimumIncrement: number;
  endTime: string;
  status: 'Live' | 'Upcoming' | 'Completed';
}

export interface Bid {
  id: number;
  auctionId: number;
  bidderName: string;
  amount: number;
  bidTime: Date;
}