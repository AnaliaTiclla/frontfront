import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WSOrdenService } from '../../wsorden.service';
import { OrdenDetalleModel } from '../../../mesero/mesas/distribucion-mesas/ordenDetalle-model';
import { ProductoService } from '../../../admin/mantenedores/producto/producto.service';
import { ProductoModel } from '../../../admin/mantenedores/producto/producto-model';
import { OrdenService } from '../../../mesero/mesas/orden.service';

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
    private productoService: ProductoService,
    private ordenService: OrdenService
  ) {}

  ngOnInit() {
    this.list();
  this.wsOrdenService.ordenes$.subscribe(
    ordenes => {
      this.listOrdenes = ordenes.map(orden => ({
        ...orden,
        nombreProducto: this.getNombreProducto(orden.productoID)
      }));
      // Aplicar el filtro actual después de actualizar las órdenes
      this.filterPendingOrders(); // Por defecto mostrar pendientes
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
    this.currentFilter = 'pending';
    this.filteredOrdenes = this.listOrdenes.filter(orden => 
      orden.condicion === 'Pendiente'
    );
  }
  
  filterProcessingOrders() {
    this.currentFilter = 'processing';
    this.filteredOrdenes = this.listOrdenes.filter(orden => 
      orden.condicion === 'Procesando'
    );
  }
  
  filterAllOrders() {
    this.currentFilter = 'all';
    this.filteredOrdenes = [...this.listOrdenes];
  }

  iniciarPreparacion(orden: OrdenDetalleModel) {
    orden.condicion = 'Procesando';
    this.ordenService.updateDetalleOrden(orden).subscribe({
      next: (respuesta) => {
        console.log('Orden actualizada exitosamente:', respuesta);
        // Reaplica el filtro actual
        this.filterCurrentState();
      },
      error: (error) => {
        console.error('Error al actualizar condición:', error);
      },
    });
  }
  



  marcarCompletado(orden: OrdenDetalleModel) {
    orden.condicion = 'Completado';
    this.ordenService.updateDetalleOrden(orden).subscribe({
      next: (respuesta) => {
        console.log('Orden actualizada exitosamente:', respuesta);
        // Reaplica el filtro actual
        this.filterCurrentState();
      },
      error: (error) => {
        console.error('Error al actualizar condición:', error);
      },
    });
  }

  getNombreProducto(productoId: number): string {
    const producto = this.productos.find(p => p.productoID === productoId);
    return producto?.nombre || 'Producto Desconocido';
  }


  // Añade una propiedad para rastrear el filtro actual
currentFilter: 'all' | 'pending' | 'processing' = 'pending';

// Método para mantener el estado del filtro actual
filterCurrentState() {
  switch (this.currentFilter) {
    case 'pending':
      this.filterPendingOrders();
      break;
    case 'processing':
      this.filterProcessingOrders();
      break;
    case 'all':
      this.filterAllOrders();
      break;
  }
}
}