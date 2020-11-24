import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TusClientesComponent } from './tus-clientes.component';

describe('TusClientesComponent', () => {
  let component: TusClientesComponent;
  let fixture: ComponentFixture<TusClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TusClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TusClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
