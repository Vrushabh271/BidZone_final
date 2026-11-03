import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductApproval } from './product-approval';

describe('ProductApproval', () => {
  let component: ProductApproval;
  let fixture: ComponentFixture<ProductApproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductApproval],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductApproval);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
