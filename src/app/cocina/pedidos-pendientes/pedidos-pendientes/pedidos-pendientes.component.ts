import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WSOrdenService } from '../../wsorden.service';
import { OrdenDetalleModel } from '../../../mesero/mesas/distribucion-mesas/ordenDetalle-model';
import { ProductoService } from '../../../admin/mantenedores/producto/producto.service';
import { ProductoModel } from '../../../admin/mantenedores/producto/producto-model';

@Component({
  selector: 'app-pedidos-pendientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos-pendientes.component.html',
  styleUrl: './pedidos-pendientes.component.css'
})
export class PedidosPendientesComponent implements OnInit {
  listOrdenes: OrdenDetalleModel[] = [];
  filteredOrdenes: OrdenDetalleModel[] = [];
  productos: ProductoModel[] = [];

  constructor(
    private wsOrdenService: WSOrdenService,
    private productoService: ProductoService
  ) {}

  ngOnInit() {
    this.list();
    this.wsOrdenService.ordenes$.subscribe(
      ordenes => {
        this.listOrdenes = ordenes.map(orden => ({
          ...orden,
          condicion: 'PENDIENTE',
          nombreProducto: this.getNombreProducto(orden.productoID)
        }));
        this.filteredOrdenes = [...this.listOrdenes];
      }
    );
  }

  list() {
    this.productoService.getProducto().subscribe({
      next: (resp: any) => {
        if (resp && resp.data) {
          this.productos = resp.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }

  filterPendingOrders() {
    this.filteredOrdenes = this.listOrdenes.filter(orden => orden.condicion === 'PENDIENTE');
  }

  filterProcessingOrders() {
    this.filteredOrdenes = this.listOrdenes.filter(orden => orden.condicion === 'PROCESANDO');
  }

  filterAllOrders() {
    this.filteredOrdenes = [...this.listOrdenes];
  }

  iniciarPreparacion(orden: OrdenDetalleModel) {
    orden.condicion = 'PROCESANDO';
  }

  marcarCompletado(orden: OrdenDetalleModel) {
    orden.condicion = 'COMPLETADO';
  }

  getNombreProducto(productoId: number): string {
    const producto = this.productos.find(p => p.productoID === productoId);
    return producto?.nombre || 'Producto Desconocido';
  }
}