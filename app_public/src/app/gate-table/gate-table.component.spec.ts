import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateTableComponent } from './gate-table.component';

describe('GateTableComponent', () => {
  let component: GateTableComponent;
  let fixture: ComponentFixture<GateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateTableComponent ]
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
