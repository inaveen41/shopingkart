import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreeateEmployeeComponent } from './creeate-employee.component';

describe('CreeateEmployeeComponent', () => {
  let component: CreeateEmployeeComponent;
  let fixture: ComponentFixture<CreeateEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreeateEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreeateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
