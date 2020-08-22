import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionLogTableComponent } from './inspection-log-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('InspectionLogTableComponent', () => {
  let component: InspectionLogTableComponent;
  let fixture: ComponentFixture<InspectionLogTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientTestingModule,FormsModule],
      declarations: [ InspectionLogTableComponent ],
      providers: []
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
