
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { Auction } from '../../models/auction.model';
import { AuctionService } from '../../services/auction';

@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './auction-list.html',
  styleUrl: './auction-list.css'
})
export class AuctionList implements OnInit, OnDestroy {
  auctions: Auction[] = [];

  private subscription?: Subscription;

  constructor(private auctionService: AuctionService) {}

  ngOnInit(): void {
    this.subscription = this.auctionService.auctions$.subscribe(data => {
      this.auctions = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  isAuctionOpen(endTime: string): boolean {
    return new Date(endTime).getTime() > Date.now();
  }
}
