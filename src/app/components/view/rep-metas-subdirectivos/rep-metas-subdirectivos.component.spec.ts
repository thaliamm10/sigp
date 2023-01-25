import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepMetasSubdirectivosComponent } from './rep-metas-subdirectivos.component';

describe('RepMetasSubdirectivosComponent', () => {
  let component: RepMetasSubdirectivosComponent;
  let fixture: ComponentFixture<RepMetasSubdirectivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepMetasSubdirectivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepMetasSubdirectivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
