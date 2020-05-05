import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceLogFormComponent } from './maintenance-log-form.component';

describe('MaintenanceLogFormComponent', () => {
  let component: MaintenanceLogFormComponent;
  let fixture: ComponentFixture<MaintenanceLogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceLogFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceLogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
