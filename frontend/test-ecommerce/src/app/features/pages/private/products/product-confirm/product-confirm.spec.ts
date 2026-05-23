import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConfirm } from './product-confirm';

describe('ProductConfirm', () => {
  let component: ProductConfirm;
  let fixture: ComponentFixture<ProductConfirm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductConfirm],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductConfirm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
