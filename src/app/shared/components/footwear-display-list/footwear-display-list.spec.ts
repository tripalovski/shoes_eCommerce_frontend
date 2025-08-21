import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootwearDisplayList } from './footwear-display-list';

describe('FootwearDisplayList', () => {
  let component: FootwearDisplayList;
  let fixture: ComponentFixture<FootwearDisplayList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootwearDisplayList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootwearDisplayList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
