import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGateComponent } from './update-gate.component';

describe('UpdateGateComponent', () => {
  let component: UpdateGateComponent;
  let fixture: ComponentFixture<UpdateGateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateGateComponent ]
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
