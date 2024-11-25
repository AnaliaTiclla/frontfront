import { Component, inject } from '@angular/core';
import { WSOrdenService } from '../../wsorden.service';
import { OrdenDetalleModel } from '../../../mesero/mesas/distribucion-mesas/ordenDetalle-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedidos-pendientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos-pendientes.component.html',
  styleUrl: './pedidos-pendientes.component.css'
})
export class PedidosPendientesComponent {

  private wsOrdenService = inject(WSOrdenService);
  listOrdenes: OrdenDetalleModel[] = [];

  ngOnInit(): void {
    this.list();
  }
 

  list() {
    this.wsOrdenService.getWSOrden().subscribe({
      next: (resp: any) => {
        if (resp && resp.data) {
          this.listOrdenes = resp.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar las ordenes:', error);
      }
    });
  }
}
