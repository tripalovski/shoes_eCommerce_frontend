import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBrandModal } from './form-brand-modal';

describe('FormBrandModal', () => {
  let component: FormBrandModal;
  let fixture: ComponentFixture<FormBrandModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBrandModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBrandModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
