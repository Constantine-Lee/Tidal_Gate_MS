import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceLogTableComponent } from './maintenance-log-table.component';

describe('MaintenanceLogTableComponent', () => {
  let component: MaintenanceLogTableComponent;
  let fixture: ComponentFixture<MaintenanceLogTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceLogTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceLogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
