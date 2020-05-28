import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateFormComponent } from './gate-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';

describe('GateFormComponent', () => {
  let component: GateFormComponent;
  let fixture: ComponentFixture<GateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, HttpClientModule, AppRoutingModule],
      declarations: [ GateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
