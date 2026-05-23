import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateProductList } from './private-product-list';

describe('PrivateProductList', () => {
  let component: PrivateProductList;
  let fixture: ComponentFixture<PrivateProductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateProductList],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivateProductList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
