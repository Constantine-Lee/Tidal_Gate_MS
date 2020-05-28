import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceLogFormComponent } from './maintenance-log-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { LoggerModule, NGXLogger, LoggerConfig } from 'ngx-logger';

describe('MaintenanceLogFormComponent', () => {
  let component: MaintenanceLogFormComponent;
  let fixture: ComponentFixture<MaintenanceLogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientModule, AppRoutingModule, LoggerModule],
      declarations: [ MaintenanceLogFormComponent ],
      providers: [LoggerConfig]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceLogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
