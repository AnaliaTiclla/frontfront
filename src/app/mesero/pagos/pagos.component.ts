import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PagosService } from './pagos.service';
import { OrdenDetalleModel } from '../mesas/distribucion-mesas/ordenDetalle-model';
import { OrdenService } from '../mesas/orden.service';
import { OrdenModel } from '../mesas/distribucion-mesas/orden-model';
import { RouterModule, Router } from '@angular/router';
import { PagoModel } from './pago-model';
import { PagoDetalleModel } from './pagoDetalle-model';
import { TipocomprobanteService } from '../../admin/mantenedores/tipocomprobante/tipocomprobante.service';
import { TipocomprobanteModel } from '../../admin/mantenedores/tipocomprobante/tipocomprobante-model';
import { ProductoModel } from '../../admin/mantenedores/producto/producto-model';
import { ProductoService } from '../../admin/mantenedores/producto/producto.service';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [ 
    RouterModule,
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
  private productoService = inject(ProductoService);   

  
  orden: OrdenModel | null = null;
  detallesOrden: OrdenDetalleModel[] = [];
  tiposComprobante: TipocomprobanteModel[] = [];
  listProductos: ProductoModel[] = [];

  
  pagoForm = new FormGroup({
    metodoPago: new FormControl('', Validators.required),
    tipoComprobante: new FormControl('', Validators.required),
    tipoDocumento: new FormControl(''),
    numeroDocumento: new FormControl(''),
    izipayComprobante: new FormControl('')
  });

  ngOnInit(): void {
    const data = this.pagosService.getData();
    if (data) {
      this.orden = data.orden;
      this.cargarDetallesOrden(this.orden?.ordenID!);
    } else {
      console.log('No se encontraron datos compartidos.');
    }
    this.cargarTiposComprobante();
    this.loadProductos();
  }

  cargarDetallesOrden(ordenId: number): void {
    this.detalleOrdenService.getDetalleOrden(ordenId).subscribe({
      next: (resp: any) => {
        if (resp && resp.data) {
        this.detallesOrden = resp.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar detalles de orden', error);
      }
    });
  }

  cargarTiposComprobante(): void {
    this.tipoComprobanteService.getTipocomprobante().subscribe({
      next: (resp: any) => {
        if (resp && resp.data) {
        this.tiposComprobante = resp.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar tipos de comprobante', error);
      }
    });
  }

  generarPago(): void {
    if (this.pagoForm.invalid || !this.orden) {
      return;
    }

    const datosPago: PagoModel = {
      fecha: new Date(),
      metodoPago: this.pagoForm.get('metodoPago')?.value || '',
      estadoPago: 'Completado',
      ordenID: this.orden.ordenID!,
      tipocomprobanteID: Number(this.pagoForm.get('tipoComprobante')?.value)
    };
    console.log('Pago: ', datosPago)

    const detallesPago: PagoDetalleModel = {
      tipoDoc: this.pagoForm.get('tipoDocumento')?.value || '',
      numeroDoc: this.pagoForm.get('numeroDocumento')?.value || '',
      iziPay: this.pagoForm.get('izipayComprobante')?.value || '',
      subTotal: parseFloat((this.orden.montoTotal * 0.82).toFixed(2)),
      igv: parseFloat((this.orden.montoTotal * 0.18).toFixed(2)),
      total: parseFloat(this.orden.montoTotal.toFixed(2)),
      pagoID: 0
    };    

    this.pagosService.savePago(datosPago).subscribe({
      next: (respPago) => {
        if (respPago.status === 'success') {
          detallesPago.pagoID = respPago.data.pagoId;
          console.log('Detalle Pago: ', detallesPago)
          this.pagosService.saveDetallePago(detallesPago).subscribe({
            next: () => {
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

  getNombreProducto(productoId: number): string {
    const producto = this.listProductos.find(p => p.productoID === productoId);
    return producto?.nombre || '';
  }

  loadProductos(): void {
    this.productoService.getProducto().subscribe({
      next: (resp: any) => {
        if (resp?.data) {
          this.listProductos = resp.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }

}