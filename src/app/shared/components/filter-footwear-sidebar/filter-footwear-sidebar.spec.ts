import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFootwearSidebar } from './filter-footwear-sidebar';

describe('FilterFootwearSidebar', () => {
  let component: FilterFootwearSidebar;
  let fixture: ComponentFixture<FilterFootwearSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterFootwearSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterFootwearSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
