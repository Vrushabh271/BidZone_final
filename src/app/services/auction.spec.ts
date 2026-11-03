import { TestBed } from '@angular/core/testing';
import { AuctionService } from './auction';

describe('AuctionService', () => {
  let service: AuctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should contain 15 sample auctions', () => {
    expect(service.getAuctions().length).toBe(15);
  });
});