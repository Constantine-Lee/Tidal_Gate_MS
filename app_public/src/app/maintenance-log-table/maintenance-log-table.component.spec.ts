import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceLogTableComponent } from './maintenance-log-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { NGXLogger, LoggerModule, NGXMapperService, LoggerConfig } from 'ngx-logger';
import { FormsModule } from '@angular/forms';

describe('MaintenanceLogTableComponent', () => {
  let component: MaintenanceLogTableComponent;
  let fixture: ComponentFixture<MaintenanceLogTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientTestingModule, LoggerModule, FormsModule],
      declarations: [ MaintenanceLogTableComponent ], 
      providers: [LoggerConfig, NGXLogger]
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
