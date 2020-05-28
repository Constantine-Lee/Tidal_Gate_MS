import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionLogFormComponent } from './inspection-log-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';

describe('InspectionLogFormComponent', () => {
  let component: InspectionLogFormComponent;
  let fixture: ComponentFixture<InspectionLogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientModule, AppRoutingModule],
      declarations: [ InspectionLogFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionLogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
