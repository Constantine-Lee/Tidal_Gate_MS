import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionLogTableComponent } from './inspection-log-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

describe('InspectionLogTableComponent', () => {
  let component: InspectionLogTableComponent;
  let fixture: ComponentFixture<InspectionLogTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientModule],
      declarations: [ InspectionLogTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionLogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
