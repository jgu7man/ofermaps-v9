import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TusProductosComponent } from './tus-productos.component';

describe('TusProductosComponent', () => {
  let component: TusProductosComponent;
  let fixture: ComponentFixture<TusProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TusProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TusProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
