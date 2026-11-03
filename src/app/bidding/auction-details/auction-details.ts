import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Auction } from '../../models/auction.model';
import { AuctionService } from '../../services/auction';

@Component({
  selector: 'app-auction-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './auction-details.html',
  styleUrl: './auction-details.css'
})
export class AuctionDetails implements OnInit, OnDestroy {

  auction?: Auction;
  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.subscription = this.auctionService.auctions$.subscribe(() => {
      this.auction = this.auctionService.getAuctionById(id);
    });
  }

  get isAuctionLive(): boolean {
    return !!this.auction &&
      this.auction.status === 'Live' &&
      Date.now() < new Date(this.auction.endTime).getTime();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}