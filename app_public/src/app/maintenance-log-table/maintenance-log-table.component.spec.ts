import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceLogTableComponent } from './maintenance-log-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('MaintenanceLogTableComponent', () => {
  let component: MaintenanceLogTableComponent;
  let fixture: ComponentFixture<MaintenanceLogTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientTestingModule, FormsModule],
      declarations: [ MaintenanceLogTableComponent ], 
      providers: []
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
