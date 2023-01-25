import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepMetasDirectivosComponent } from './rep-metas-directivos.component';

describe('RepMetasDirectivosComponent', () => {
  let component: RepMetasDirectivosComponent;
  let fixture: ComponentFixture<RepMetasDirectivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepMetasDirectivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepMetasDirectivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
