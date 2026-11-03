import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Auction } from '../../models/auction.model';
import { AuctionService } from '../../services/auction';

@Component({
  selector: 'app-live-bidding',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './live-bidding.html',
  styleUrl: './live-bidding.css'
})
export class LiveBidding implements OnInit, OnDestroy {

  auction?: Auction;

  bidderName = '';
  bidAmount: number | null = null;

  message = '';
  messageType = '';

  timeLeft = '00:00:00';
  expired = false;

  private timer?: ReturnType<typeof setInterval>;
  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.subscription = this.auctionService.auctions$.subscribe(() => {
      this.auction = this.auctionService.getAuctionById(id);
      this.checkTimer();
    });

    this.timer = setInterval(() => this.checkTimer(), 1000);
  }

  checkTimer(): void {
    if (!this.auction) return;

    const difference =
      new Date(this.auction.endTime).getTime() - Date.now();

    if (difference <= 0) {
      this.timeLeft = '00:00:00';
      this.expired = true;
      return;
    }

    this.expired = false;

    const hours = Math.floor(difference / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);

    this.timeLeft =
      `${String(hours).padStart(2, '0')}:` +
      `${String(minutes).padStart(2, '0')}:` +
      `${String(seconds).padStart(2, '0')}`;
  }

  placeBid(): void {
    if (!this.auction) return;

    if (this.expired) {
      this.message = 'Auction has expired!';
      this.messageType = 'error';
      return;
    }

    if (this.bidAmount === null) {
      this.message = 'Please enter a bid amount!';
      this.messageType = 'error';
      return;
    }

    const result = this.auctionService.placeBid(
      this.auction.id,
      this.bidderName,
      this.bidAmount
    );

    if (result === 'SUCCESS') {
      this.message = 'Congratulations! Your bid was successful.';
      this.messageType = 'success';
      this.bidAmount = null;
    } else {
      this.message = result;
      this.messageType = 'error';
    }
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
    this.subscription?.unsubscribe();
  }
}