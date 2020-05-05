import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMaintenanceLogComponent } from './update-maintenance-log.component';

describe('UpdateMaintenanceLogComponent', () => {
  let component: UpdateMaintenanceLogComponent;
  let fixture: ComponentFixture<UpdateMaintenanceLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMaintenanceLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMaintenanceLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
