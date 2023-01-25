import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteGeneralDemandaAdiccionalComponent } from './reporte-general-demanda-adiccional.component';

describe('ReporteGeneralDemandaAdiccionalComponent', () => {
  let component: ReporteGeneralDemandaAdiccionalComponent;
  let fixture: ComponentFixture<ReporteGeneralDemandaAdiccionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteGeneralDemandaAdiccionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteGeneralDemandaAdiccionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
