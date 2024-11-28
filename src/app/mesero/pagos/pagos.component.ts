import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PagosService } from './pagos.service';
import { OrdenDetalleModel } from '../mesas/distribucion-mesas/ordenDetalle-model';
import { OrdenService } from '../mesas/orden.service';
import { OrdenModel } from '../mesas/distribucion-mesas/orden-model';
import { Router } from '@angular/router';
import { PagoModel } from './pago-model';
import { PagoDetalleModel } from './pagoDetalle-model';
import { TipocomprobanteService } from '../../admin/mantenedores/tipocomprobante/tipocomprobante.service';
import { TipocomprobanteModel } from '../../admin/mantenedores/tipocomprobante/tipocomprobante-model';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [ 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  private router = inject(Router);
  private detalleOrdenService = inject(OrdenService);
  private tipoComprobanteService = inject(TipocomprobanteService);
  private pagosService = inject(PagosService);

  orden: OrdenModel | null = null;
  detallesOrden: OrdenDetalleModel[] = [];
  tiposComprobante: TipocomprobanteModel[] = [];
  
  pagoForm = new FormGroup({
    metodoPago: new FormControl('', Validators.required),
    tipoComprobante: new FormControl('', Validators.required),
    tipoDocumento: new FormControl(''),
    numeroDocumento: new FormControl(''),
    izipayComprobante: new FormControl('')
  });

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.orden = navigation.extras.state['orden'];
      
      if (this.orden?.ordenID !== undefined) {
        this.cargarDetallesOrden(this.orden.ordenID);
      }

      this.cargarTiposComprobante();
    }
  }

  cargarDetallesOrden(ordenId: number): void {
    this.detalleOrdenService.getDetalleOrden(ordenId).subscribe({
      next: (detalles) => {
        this.detallesOrden = detalles;
      },
      error: (error) => {
        console.error('Error al cargar detalles de orden', error);
      }
    });
  }

  cargarTiposComprobante(): void {
    this.tipoComprobanteService.getTipocomprobante().subscribe({
      next: (tipos) => {
        this.tiposComprobante = tipos;
      },
      error: (error) => {
        console.error('Error al cargar tipos de comprobante', error);
      }
    });
  }

  abrirModalPago(): void {
    const modal = document.getElementById('pagoModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  cerrarModalPago(): void {
    const modal = document.getElementById('pagoModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  generarPago(): void {
    if (this.pagoForm.invalid || !this.orden) {
      return;
    }

    const datosPago: PagoModel = {
      fecha: new Date(),
      metodoPago: this.pagoForm.get('metodoPago')?.value || '',
      estadoPago: 'COMPLETADO',
      ordenID: this.orden.ordenID!,
      tipocomprobanteID: Number(this.pagoForm.get('tipoComprobante')?.value)
    };

    const detallesPago: PagoDetalleModel = {
      tipoDoc: this.pagoForm.get('tipoDocumento')?.value || '',
      numeroDoc: this.pagoForm.get('numeroDocumento')?.value || '',
      iziPay: this.pagoForm.get('izipayComprobante')?.value || '',
      subTotal: this.orden.montoTotal * 0.82,
      IGV: this.orden.montoTotal * 0.18,
      total: this.orden.montoTotal,
      pagoID: 1 // Se asignará en el backend
    };

    this.pagosService.savePago(datosPago).subscribe({
      next: (respPago) => {
        if (respPago.status === 'success') {
          detallesPago.pagoID = respPago.data.pagoID;
          
          this.pagosService.saveDetallePago(detallesPago).subscribe({
            next: () => {
              this.cerrarModalPago();
              this.router.navigate(['/mesero/mesas']);
            },
            error: (error) => {
              console.error('Error al guardar detalle de pago', error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error al guardar pago', error);
      }
    });
  }
}