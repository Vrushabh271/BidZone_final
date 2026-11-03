import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WinnerDetails } from './winner-details';

describe('WinnerDetails', () => {
  let component: WinnerDetails;
  let fixture: ComponentFixture<WinnerDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinnerDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(WinnerDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
