import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidaUnidadComponent } from './medida-unidad.component';

describe('MedidaUnidadComponent', () => {
  let component: MedidaUnidadComponent;
  let fixture: ComponentFixture<MedidaUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedidaUnidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedidaUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
