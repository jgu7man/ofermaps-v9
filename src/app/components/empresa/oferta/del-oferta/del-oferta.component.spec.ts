import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelOfertaComponent } from './del-oferta.component';

describe('DelOfertaComponent', () => {
  let component: DelOfertaComponent;
  let fixture: ComponentFixture<DelOfertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelOfertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
