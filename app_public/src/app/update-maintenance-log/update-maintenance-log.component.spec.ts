import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMaintenanceLogComponent } from './update-maintenance-log.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuestionControlService } from '../question/questionControl.service';
import { MaintenanceLogService } from '../_services/maintenanceLog.service';

describe('UpdateMaintenanceLogComponent', () => {
  let component: UpdateMaintenanceLogComponent;
  let fixture: ComponentFixture<UpdateMaintenanceLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientTestingModule, AppRoutingModule],
      declarations: [ UpdateMaintenanceLogComponent ],
      providers: [QuestionControlService, MaintenanceLogService]
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
