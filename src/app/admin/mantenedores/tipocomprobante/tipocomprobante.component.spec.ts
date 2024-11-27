import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipocomprobanteComponent } from './tipocomprobante.component';

describe('TipocomprobanteComponent', () => {
  let component: TipocomprobanteComponent;
  let fixture: ComponentFixture<TipocomprobanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipocomprobanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipocomprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
