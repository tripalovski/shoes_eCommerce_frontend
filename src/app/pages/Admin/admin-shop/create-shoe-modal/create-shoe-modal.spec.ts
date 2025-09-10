import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShoeModal } from './create-shoe-modal';

describe('CreateShoeModal', () => {
  let component: CreateShoeModal;
  let fixture: ComponentFixture<CreateShoeModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateShoeModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateShoeModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
