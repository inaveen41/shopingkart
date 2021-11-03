import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KartUploadComponent } from './kart-upload.component';

describe('KartUploadComponent', () => {
  let component: KartUploadComponent;
  let fixture: ComponentFixture<KartUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KartUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KartUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
