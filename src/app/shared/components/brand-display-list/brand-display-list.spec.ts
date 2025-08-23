import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandDisplayList } from './brand-display-list';

describe('BrandDisplayList', () => {
  let component: BrandDisplayList;
  let fixture: ComponentFixture<BrandDisplayList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandDisplayList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandDisplayList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
