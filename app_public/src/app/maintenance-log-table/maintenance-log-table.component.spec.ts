import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceLogTableComponent } from './maintenance-log-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NGXLogger, LoggerModule, NGXMapperService, LoggerConfig } from 'ngx-logger';

describe('MaintenanceLogTableComponent', () => {
  let component: MaintenanceLogTableComponent;
  let fixture: ComponentFixture<MaintenanceLogTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientModule, LoggerModule],
      declarations: [ MaintenanceLogTableComponent ], 
      providers: [LoggerConfig,NGXMapperService,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceLogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
