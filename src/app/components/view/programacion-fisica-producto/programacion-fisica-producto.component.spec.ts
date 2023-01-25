import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacionFisicaProductoComponent } from './programacion-fisica-producto.component';

describe('ProgramacionFisicaProductoComponent', () => {
  let component: ProgramacionFisicaProductoComponent;
  let fixture: ComponentFixture<ProgramacionFisicaProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramacionFisicaProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramacionFisicaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
