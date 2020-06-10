import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionLogTableComponent } from './inspection-log-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { NGXLogger, LoggerConfig, LoggerModule } from 'ngx-logger';
import { FormsModule } from '@angular/forms';

describe('InspectionLogTableComponent', () => {
  let component: InspectionLogTableComponent;
  let fixture: ComponentFixture<InspectionLogTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientTestingModule, LoggerModule, FormsModule],
      declarations: [ InspectionLogTableComponent ],
      providers: [NGXLogger, LoggerConfig ]
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
