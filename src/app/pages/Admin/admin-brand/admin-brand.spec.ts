import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBrand } from './admin-brand';

describe('AdminBrand', () => {
  let component: AdminBrand;
  let fixture: ComponentFixture<AdminBrand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBrand]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBrand);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
