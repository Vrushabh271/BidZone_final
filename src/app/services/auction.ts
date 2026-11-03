
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auction, Bid } from '../models/auction.model';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  private auctions: Auction[] = [

    // 1. MacBook Pro M3
    {
      id: 1,
      title: 'MacBook Pro M3',
      description: 'Apple MacBook Pro with M3 chip, 16GB RAM and 512GB SSD.',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700',
      category: 'Electronics',
      seller: 'Tech Store',
      startingPrice: 80000,
      currentBid: 85000,
      minimumIncrement: 1000,
      endTime: new Date(Date.now() + 3600000).toISOString(),
      status: 'Live'
    },

    // 2. Canon DSLR Camera
    {
      id: 2,
      title: 'Canon DSLR Camera',
      description: 'Professional DSLR camera for photography enthusiasts.',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700',
      category: 'Photography',
      seller: 'Camera World',
      startingPrice: 35000,
      currentBid: 38000,
      minimumIncrement: 500,
      endTime: new Date(Date.now() + 7200000).toISOString(),
      status: 'Live'
    },

    // 3. Gaming Headphones
    {
      id: 3,
      title: 'Gaming Headphones',
      description: 'Premium wireless gaming headphones with surround sound.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700',
      category: 'Accessories',
      seller: 'Gaming Hub',
      startingPrice: 3000,
      currentBid: 3500,
      minimumIncrement: 100,
      endTime: new Date(Date.now() + 5400000).toISOString(),
      status: 'Live'
    },

    // 4. Smart Watch
    {
      id: 4,
      title: 'Smart Watch',
      description: 'Modern smartwatch with fitness tracking features.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700',
      category: 'Wearables',
      seller: 'Smart Deals',
      startingPrice: 5000,
      currentBid: 5500,
      minimumIncrement: 200,
      endTime: new Date(Date.now() + 10800000).toISOString(),
      status: 'Live'
    },

    // 5. iPhone 16 Pro
    {
      id: 5,
      title: 'iPhone 16 Pro',
      description: 'Premium smartphone with advanced camera and powerful performance.',
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=700',
      category: 'Electronics',
      seller: 'Mobile World',
      startingPrice: 75000,
      currentBid: 78000,
      minimumIncrement: 1000,
      endTime: new Date(Date.now() + 14400000).toISOString(),
      status: 'Live'
    },

    // 6. Sony PlayStation 5
    {
      id: 6,
      title: 'Sony PlayStation 5',
      description: 'Next-generation gaming console with immersive gaming experience.',
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=700',
      category: 'Gaming',
      seller: 'Game Zone',
      startingPrice: 40000,
      currentBid: 42000,
      minimumIncrement: 500,
      endTime: new Date(Date.now() + 18000000).toISOString(),
      status: 'Live'
    },

    // 7. Canon Mirrorless Camera
    {
      id: 7,
      title: 'Canon Mirrorless Camera',
      description: 'High-quality mirrorless camera for professional photography.',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=700',
      category: 'Photography',
      seller: 'Digital Store',
      startingPrice: 55000,
      currentBid: 57000,
      minimumIncrement: 1000,
      endTime: new Date(Date.now() + 21600000).toISOString(),
      status: 'Live'
    },

    // 8. Premium Sports Shoes
    {
      id: 8,
      title: 'Premium Sports Shoes',
      description: 'Comfortable premium sports shoes for running and training.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700',
      category: 'Fashion',
      seller: 'Fashion Hub',
      startingPrice: 2500,
      currentBid: 2800,
      minimumIncrement: 100,
      endTime: new Date(Date.now() + 25200000).toISOString(),
      status: 'Live'
    },

    // 9. Gaming Laptop
    {
      id: 9,
      title: 'Gaming Laptop',
      description: 'High-performance laptop for gaming and professional work.',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=700',
      category: 'Electronics',
      seller: 'Laptop Store',
      startingPrice: 65000,
      currentBid: 68000,
      minimumIncrement: 1000,
      endTime: new Date(Date.now() + 28800000).toISOString(),
      status: 'Live'
    },

    // 10. Luxury Wrist Watch
    {
      id: 10,
      title: 'Luxury Wrist Watch',
      description: 'Elegant luxury wristwatch with a premium design.',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=700',
      category: 'Accessories',
      seller: 'Time Gallery',
      startingPrice: 12000,
      currentBid: 13500,
      minimumIncrement: 500,
      endTime: new Date(Date.now() + 32400000).toISOString(),
      status: 'Live'
    },

    // 11. Professional Drone
    {
      id: 11,
      title: 'Professional Drone',
      description: 'Advanced camera drone for aerial photography and video.',
      image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=700',
      category: 'Technology',
      seller: 'Drone World',
      startingPrice: 30000,
      currentBid: 32000,
      minimumIncrement: 500,
      endTime: new Date(Date.now() + 36000000).toISOString(),
      status: 'Live'
    },

    // 12. Bluetooth Speaker
    {
      id: 12,
      title: 'Bluetooth Speaker',
      description: 'Portable wireless speaker with powerful sound quality.',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=700',
      category: 'Electronics',
      seller: 'Audio House',
      startingPrice: 2000,
      currentBid: 2300,
      minimumIncrement: 100,
      endTime: new Date(Date.now() + 39600000).toISOString(),
      status: 'Live'
    },

    // 13. Professional Keyboard
    {
      id: 13,
      title: 'Professional Keyboard',
      description: 'Mechanical RGB keyboard designed for gaming and productivity.',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700',
      category: 'Accessories',
      seller: 'Keyboard World',
      startingPrice: 4000,
      currentBid: 4500,
      minimumIncrement: 200,
      endTime: new Date(Date.now() + 43200000).toISOString(),
      status: 'Live'
    },

    // 14. Premium Sunglasses
    {
      id: 14,
      title: 'Premium Sunglasses',
      description: 'Stylish premium sunglasses with a modern design.',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700',
      category: 'Fashion',
      seller: 'Style Store',
      startingPrice: 1500,
      currentBid: 1800,
      minimumIncrement: 100,
      endTime: new Date(Date.now() + 46800000).toISOString(),
      status: 'Live'
    },

    // 15. Tablet Pro
    {
      id: 15,
      title: 'Tablet Pro',
      description: 'Powerful tablet for entertainment, creativity and productivity.',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=700',
      category: 'Electronics',
      seller: 'Digital World',
      startingPrice: 25000,
      currentBid: 27000,
      minimumIncrement: 500,
      endTime: new Date(Date.now() + 50400000).toISOString(),
      status: 'Live'
    }

  ];

  private bids: Bid[] = [
    {
      id: 1,
      auctionId: 1,
      bidderName: 'Rahul',
      amount: 85000,
      bidTime: new Date()
    },
    {
      id: 2,
      auctionId: 2,
      bidderName: 'Amit',
      amount: 38000,
      bidTime: new Date()
    }
  ];

  private auctionSubject =
    new BehaviorSubject<Auction[]>(this.auctions);

  auctions$ = this.auctionSubject.asObservable();

  private bidSubject =
    new BehaviorSubject<Bid[]>(this.bids);

  bids$ = this.bidSubject.asObservable();

  getAuctions(): Auction[] {
    return this.auctions;
  }

  getAuctionById(id: number): Auction | undefined {
    return this.auctions.find(a => a.id === id);
  }

  getBidsByAuction(id: number): Bid[] {
    return this.bids
      .filter(b => b.auctionId === id)
      .sort((a, b) =>
        b.bidTime.getTime() - a.bidTime.getTime()
      );
  }

  getAllBids(): Bid[] {
    return [...this.bids].sort(
      (a, b) => b.bidTime.getTime() - a.bidTime.getTime()
    );
  }

  placeBid(
    auctionId: number,
    bidderName: string,
    amount: number
  ): string {

    const auction = this.getAuctionById(auctionId);

    if (!auction) {
      return 'Auction not found!';
    }

    if (
      auction.status !== 'Live' ||
      Date.now() >= new Date(auction.endTime).getTime()
    ) {
      return 'Auction has ended!';
    }

    if (!bidderName.trim()) {
      return 'Please enter your name!';
    }

    if (
      !Number.isFinite(amount) ||
      amount < auction.currentBid + auction.minimumIncrement
    ) {
      return `Minimum bid is ₹${auction.currentBid + auction.minimumIncrement}`;
    }

    auction.currentBid = amount;

    this.bids.push({
      id: Date.now(),
      auctionId,
      bidderName: bidderName.trim(),
      amount,
      bidTime: new Date()
    });

    this.auctionSubject.next([...this.auctions]);
    this.bidSubject.next([...this.bids]);

    return 'SUCCESS';
  }
}
