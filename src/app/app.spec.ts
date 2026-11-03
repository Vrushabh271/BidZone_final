
import { TestBed } from '@angular/core/testing';
import { AuctionService } from './services/auction';

describe('AuctionService', () => {
  let service: AuctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain sample auctions', () => {
    expect(service.getAuctions().length).toBe(15);
  });
});
