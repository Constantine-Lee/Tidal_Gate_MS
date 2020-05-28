import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInspectionLogComponent } from './update-inspection-log.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

describe('UpdateInspectionLogComponent', () => {
  let component: UpdateInspectionLogComponent;
  let fixture: ComponentFixture<UpdateInspectionLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientModule, AppRoutingModule],
      declarations: [ UpdateInspectionLogComponent ],
      providers: [Router]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInspectionLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
