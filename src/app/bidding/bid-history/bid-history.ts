import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bid } from '../../models/auction.model';
import { AuctionService } from '../../services/auction';

@Component({
  selector: 'app-bid-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bid-history.html',
  styleUrl: './bid-history.css'
})
export class BidHistory implements OnInit, OnDestroy {

  bids: Bid[] = [];
  auctionId = 0;

  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
  ) {}

  ngOnInit(): void {
    this.auctionId =
      Number(this.route.snapshot.paramMap.get('id'));

    this.subscription = this.auctionService.bids$.subscribe(() => {
      this.bids = this.auctionService.getBidsByAuction(this.auctionId);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}