import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuctionScheduling } from './auction-scheduling';

describe('AuctionScheduling', () => {
  let component: AuctionScheduling;
  let fixture: ComponentFixture<AuctionScheduling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionScheduling],
    }).compileComponents();

    fixture = TestBed.createComponent(AuctionScheduling);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
