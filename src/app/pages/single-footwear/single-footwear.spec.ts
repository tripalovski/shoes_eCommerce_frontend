import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFootwear } from './single-footwear';

describe('SingleFootwear', () => {
  let component: SingleFootwear;
  let fixture: ComponentFixture<SingleFootwear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleFootwear]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleFootwear);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
