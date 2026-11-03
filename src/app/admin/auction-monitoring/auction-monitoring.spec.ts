import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuctionMonitoring } from './auction-monitoring';

describe('AuctionMonitoring', () => {
  let component: AuctionMonitoring;
  let fixture: ComponentFixture<AuctionMonitoring>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionMonitoring],
    }).compileComponents();

    fixture = TestBed.createComponent(AuctionMonitoring);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
