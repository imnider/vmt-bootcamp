import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartConfirm } from './cart-confirm';

describe('CartConfirm', () => {
  let component: CartConfirm;
  let fixture: ComponentFixture<CartConfirm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartConfirm],
    }).compileComponents();

    fixture = TestBed.createComponent(CartConfirm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
