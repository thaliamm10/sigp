import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepMetasServidoresComponent } from './rep-metas-servidores.component';

describe('RepMetasServidoresComponent', () => {
  let component: RepMetasServidoresComponent;
  let fixture: ComponentFixture<RepMetasServidoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepMetasServidoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepMetasServidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
