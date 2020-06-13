import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateTableComponent } from './gate-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NGXLogger, LoggerModule, LoggerConfig } from 'ngx-logger';

describe('GateTableComponent', () => {
  let component: GateTableComponent;
  let fixture: ComponentFixture<GateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientTestingModule, FormsModule, LoggerModule],
      declarations: [ GateTableComponent],
      providers: [LoggerConfig]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
