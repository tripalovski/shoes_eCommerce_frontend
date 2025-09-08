import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShop } from './admin-shop';

describe('AdminShop', () => {
  let component: AdminShop;
  let fixture: ComponentFixture<AdminShop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminShop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminShop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
