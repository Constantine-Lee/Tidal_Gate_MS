import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionLogTableComponent } from './inspection-log-table.component';

describe('InspectionLogTableComponent', () => {
  let component: InspectionLogTableComponent;
  let fixture: ComponentFixture<InspectionLogTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionLogTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionLogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
