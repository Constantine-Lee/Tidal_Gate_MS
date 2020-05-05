import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionLogFormComponent } from './inspection-log-form.component';

describe('InspectionLogFormComponent', () => {
  let component: InspectionLogFormComponent;
  let fixture: ComponentFixture<InspectionLogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionLogFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionLogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
