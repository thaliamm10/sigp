import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteGeneralUaComponent } from './reporte-general-ua.component';

describe('ReporteGeneralUaComponent', () => {
  let component: ReporteGeneralUaComponent;
  let fixture: ComponentFixture<ReporteGeneralUaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteGeneralUaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteGeneralUaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
