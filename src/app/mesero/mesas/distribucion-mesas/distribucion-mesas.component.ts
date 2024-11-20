import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemPedido, Mesa, Producto } from './mesa.interface';
import { MesaModelModel } from '../../../admin/mantenedores/mesa/mesa/mesa-model';
import { MesaService } from '../../../admin/mantenedores/mesa/mesa/mesa.service';

@Component({
  selector: 'app-distribucion-mesas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './distribucion-mesas.component.html',
  styleUrls: ['./distribucion-mesas.component.css']
})
export class DistribucionMesasComponent implements OnInit {
  private mesaService = inject(MesaService);
  listMesa: MesaModelModel[] = [];
  mesaSeleccionada: MesaModelModel | null = null;
  categorias: string[] = ['Pollos', 'Complementos', 'Bebidas'];
  categoriaActual: string = 'Pollos';
  pedidoActual: ItemPedido[] = [];

  productos: Producto[] = [
    { id: 1, nombre: '1/4 Pollo', precio: 15.90, categoria: 'Pollos' },
    { id: 2, nombre: '1/2 Pollo', precio: 28.90, categoria: 'Pollos' },
    { id: 3, nombre: '1 Pollo', precio: 54.90, categoria: 'Pollos' },
    { id: 4, nombre: 'Papa Frita', precio: 8.90, categoria: 'Complementos' },
    { id: 5, nombre: 'Ensalada', precio: 6.90, categoria: 'Complementos' },
    { id: 6, nombre: 'Gaseosa', precio: 5.90, categoria: 'Bebidas' },
    { id: 7, nombre: 'Agua', precio: 2.50, categoria: 'Bebidas' },
  ];
mesa: Mesa | undefined;

ngOnInit(): void {
  this.list();
}


list() {
  this.mesaService.getMesa().subscribe({
    next: (resp: any) => {
      if (resp && resp.data) {
        this.listMesa = resp.data;
        console.log("Lista de mesas:", this.listMesa);
      }
    },
    error: (error) => {
      console.error('Error al cargar mesas:', error);
    }
  });
}

  seleccionarMesa(mesa: MesaModelModel) {
    this.mesaSeleccionada = mesa;
    if (mesa.condicion === 'Disponbible') {
      mesa.condicion = 'Ocupada';
    }
  }

  cerrarModal() {
    this.mesaSeleccionada = null;
    this.pedidoActual = [];
  }

  getProductosPorCategoria(): Producto[] {
    return this.productos.filter(p => p.categoria === this.categoriaActual);
  }

  agregarAlPedido(producto: Producto) {
    const itemExistente = this.pedidoActual.find(item => item.id === producto.id);
    
    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      this.pedidoActual.push({
        ...producto,
        cantidad: 1
      });
    }
  }

  eliminarItem(item: ItemPedido) {
    const index = this.pedidoActual.findIndex(i => i.id === item.id);
    if (index !== -1) {
      if (this.pedidoActual[index].cantidad > 1) {
        this.pedidoActual[index].cantidad--;
      } else {
        this.pedidoActual.splice(index, 1);
      }
    }
  }

  calcularTotal(): number {
    return this.pedidoActual.reduce(
      (total, item) => total + (item.precio * item.cantidad), 
      0
    );
  }

  enviarPedido() {
    if (this.mesaSeleccionada && this.pedidoActual.length > 0) {
      this.mesaSeleccionada.condicion = 'Pendiente';
      // Aquí irían las llamadas al servicio
      alert('Pedido enviado a cocina');
      this.cerrarModal();
    }
  }

  mostrarPago() {
    if (confirm('¿Desea generar el comprobante de pago?')) {
      if (this.mesaSeleccionada) {
        this.mesaSeleccionada.condicion = 'Disponible';
        this.cerrarModal();
      }
    }
  }
}