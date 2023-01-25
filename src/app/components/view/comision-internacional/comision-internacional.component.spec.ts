import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionInternacionalComponent } from './comision-internacional.component';

describe('ComisionInternacionalComponent', () => {
  let component: ComisionInternacionalComponent;
  let fixture: ComponentFixture<ComisionInternacionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComisionInternacionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComisionInternacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
