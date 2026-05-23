import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCartList } from './private-cart-list';

describe('PrivateCartList', () => {
  let component: PrivateCartList;
  let fixture: ComponentFixture<PrivateCartList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateCartList],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivateCartList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
