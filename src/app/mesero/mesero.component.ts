// mesero.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemPedido, Mesa, Producto } from '../mesa';
import { Comprobante } from '../comprobante';

@Component({
  selector: 'app-mesero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `./mesero.component.html`,
  styleUrl:'./mesero.component.css'
})
export class MeseroComponent implements OnInit {
  mesas: Mesa[] = [];
  mesaSeleccionada: Mesa | null = null;
  categorias: string[] = ['Pollos', 'Complementos', 'Bebidas'];
  categoriaActual: string = 'Pollos';
  pedidoActual: ItemPedido[] = [];
  pedidoPagado: boolean = false;
  mostrarCobro: boolean = false;
  tipoComprobante: 'Boleta' | 'Factura' | 'Ticket' = 'Boleta';
  dniRuc: string = '';

  productos: Producto[] = [
    { id: 1, nombre: '1/4 Pollo', precio: 15.90, categoria: 'Pollos' },
    { id: 2, nombre: '1/2 Pollo', precio: 28.90, categoria: 'Pollos' },
    { id: 3, nombre: '1 Pollo', precio: 54.90, categoria: 'Pollos' },
    { id: 4, nombre: 'Papa Frita', precio: 8.90, categoria: 'Complementos' },
    { id: 5, nombre: 'Ensalada', precio: 6.90, categoria: 'Complementos' },
    { id: 6, nombre: 'Gaseosa', precio: 5.90, categoria: 'Bebidas' },
    { id: 7, nombre: 'Agua', precio: 2.50, categoria: 'Bebidas' },
  ];

  ngOnInit() {
    this.inicializarMesas();
  }

  inicializarMesas() {
    this.mesas = Array(8).fill(null).map((_, i) => ({
      numero: i + 1,
      estado: 'Libre'
    }));
  }

  seleccionarMesa(mesa: Mesa) {
    this.mesaSeleccionada = mesa;
    if (mesa.estado === 'Libre') {
      mesa.estado = 'Ocupada';
    }
  }

  cerrarModal() {
    this.mesaSeleccionada = null;
    this.pedidoActual = [];
    this.pedidoPagado = false;
    this.mostrarCobro = false;
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

  mostrarPago() {
    this.mostrarCobro = true;
  }

  confirmarPago() {
    const comprobante: Comprobante = {
      tipo: this.tipoComprobante,
      dniRuc: this.tipoComprobante === 'Ticket' ? undefined : this.dniRuc,
      items: [...this.pedidoActual],
      total: this.calcularTotal(),
    };

    alert(`Comprobante generado: ${JSON.stringify(comprobante)}`);
    this.pedidoPagado = true;
    this.mesaSeleccionada!.estado = 'Pagada';
    this.mostrarCobro = false;
  }

  enviarPedido() {
    if (this.mesaSeleccionada && this.pedidoActual.length > 0 && this.pedidoPagado) {
      this.mesaSeleccionada.estado = 'Pendiente';
      alert('Pedido enviado a cocina');
      this.cerrarModal();
    }
  }
}


