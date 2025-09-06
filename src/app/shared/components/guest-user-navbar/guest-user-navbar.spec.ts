import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestUserNavbar } from './guest-user-navbar';

describe('GuestUserNavbar', () => {
  let component: GuestUserNavbar;
  let fixture: ComponentFixture<GuestUserNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestUserNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestUserNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
