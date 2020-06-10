import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGateComponent } from './update-gate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

describe('UpdateGateComponent', () => {
  let component: UpdateGateComponent;
  let fixture: ComponentFixture<UpdateGateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientTestingModule, AppRoutingModule],
      declarations: [ UpdateGateComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
