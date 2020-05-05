import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInspectionLogComponent } from './update-inspection-log.component';

describe('UpdateInspectionLogComponent', () => {
  let component: UpdateInspectionLogComponent;
  let fixture: ComponentFixture<UpdateInspectionLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInspectionLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInspectionLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
