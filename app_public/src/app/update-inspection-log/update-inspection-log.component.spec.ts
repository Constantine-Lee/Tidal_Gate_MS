import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInspectionLogComponent } from './update-inspection-log.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

describe('UpdateInspectionLogComponent', () => {
  let component: UpdateInspectionLogComponent;
  let fixture: ComponentFixture<UpdateInspectionLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientTestingModule, AppRoutingModule],
      declarations: [ UpdateInspectionLogComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInspectionLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
