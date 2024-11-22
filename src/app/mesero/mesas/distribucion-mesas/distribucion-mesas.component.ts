import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MesaModelModel } from '../../../admin/mantenedores/mesa/mesa/mesa-model';
import { MesaService } from '../../../admin/mantenedores/mesa/mesa/mesa.service';
import { ProductoModel } from '../../../admin/mantenedores/producto/producto-model';
import { CategoriaModelModel } from '../../../admin/mantenedores/categoria/categoria/categoria-model';
import { SubcategoriaModel } from '../../../admin/mantenedores/subcategorias/subcategoria/subcategoria-model';
import { OrdenDetalleModel } from './ordenDetalle-model';
import { SubcategoriaService } from '../../../admin/mantenedores/subcategorias/subcategoria/subcategoria.service';
import { CategoriaService } from '../../../admin/mantenedores/categoria/categoria/categoria.service';
import { ProductoService } from '../../../admin/mantenedores/producto/producto.service';

@Component({
  selector: 'app-distribucion-mesas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './distribucion-mesas.component.html',
  styleUrls: ['./distribucion-mesas.component.css']
})

export class DistribucionMesasComponent implements OnInit {
  private mesaService = inject(MesaService);
  private subcategoriaService = inject(SubcategoriaService);
  private categoriaService = inject(CategoriaService);
  private productoService = inject(ProductoService);
  
  listMesa: MesaModelModel[] = [];
  listSubcategoria: SubcategoriaModel[] = [];
  listCategoria: CategoriaModelModel[] = [];
  listProductos: ProductoModel[] = [];
  mesaSeleccionada: MesaModelModel | null = null;
  subcategoriaActual: number = 1;
  ordenActual: OrdenDetalleModel[] = [];

  ngOnInit(): void {
    this.list();
    this.loadCategorias();
    this.loadSubcategorias();
    this.loadProductos();
  }

  list(): void {
    this.mesaService.getMesa().subscribe({
      next: (resp: any) => {
        if (resp?.data) {
          this.listMesa = resp.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar mesas:', error);
      }
    });
  }

  seleccionarMesa(mesa: MesaModelModel): void {
    this.mesaSeleccionada = mesa;
    if (mesa.condicion === 'Disponible') {
      mesa.condicion = 'Ocupada';
    }
  }

  cerrarModal(): void {
    this.mesaSeleccionada = null;
    this.ordenActual = [];
  }

  getProductosPorSubcategoria(): ProductoModel[] {
    return this.listProductos.filter(p => p.subcategoriaID === this.subcategoriaActual);
  }

  agregarAOrden(producto: ProductoModel): void {
    const itemExistente = this.ordenActual.find(item => item.productoID === producto.productoID);
    
    if (itemExistente) {
      itemExistente.cantidad++;
      itemExistente.subTotal = itemExistente.cantidad * this.getPrecioProducto(producto.productoID);
    } else {
      const nuevoDetalle: OrdenDetalleModel = {
        ordenDetalleID: 0,
        productoID: producto.productoID,
        cantidad: 1,
        subTotal: this.getPrecioProducto(producto.productoID),
        comentario: '',
        ordenID: 0
      };
      this.ordenActual.push(nuevoDetalle);
    }
  }

  getNombreProducto(productoId: number): string {
    const producto = this.listProductos.find(p => p.productoID === productoId);
    return producto?.nombre || '';
  }

  getPrecioProducto(productoId: number): number {
    const producto = this.listProductos.find(p => p.productoID === productoId);
    return producto?.precio || 0;
  }

  eliminarItem(item: OrdenDetalleModel): void {
    const index = this.ordenActual.findIndex(i => i.productoID === item.productoID);
    if (index !== -1) {
      if (this.ordenActual[index].cantidad > 1) {
        this.ordenActual[index].cantidad--;
        this.ordenActual[index].subTotal = 
          this.ordenActual[index].cantidad * this.getPrecioProducto(this.ordenActual[index].productoID);
      } else {
        this.ordenActual.splice(index, 1);
      }
    }
  }

  calcularTotal(): number {
    return this.ordenActual.reduce((total, item) => total + item.subTotal, 0);
  }

  agregarComentario(item: OrdenDetalleModel, comentario: string): void {
    const detalleItem = this.ordenActual.find(i => i.ordenDetalleID === item.ordenDetalleID);
    if (detalleItem) {
      detalleItem.comentario = comentario;
    }
  }

  enviarOrden(): void {
    if (this.mesaSeleccionada && this.ordenActual.length > 0) {
      const ordenCompleta = {
        mesaID: this.mesaSeleccionada.mesaID,
        detalles: this.ordenActual,
        total: this.calcularTotal()
      };
      
      // Aquí deberías hacer la llamada al servicio para guardar la orden
      console.log('Enviando orden:', ordenCompleta);
      
      this.mesaSeleccionada.condicion = 'Pendiente';
      alert('Pedido enviado a cocina');
      this.cerrarModal();
    }
  }

  mostrarPago(): void {
    if (confirm('¿Desea generar el comprobante de pago?')) {
      if (this.mesaSeleccionada) {
        this.mesaSeleccionada.condicion = 'Disponible';
        this.cerrarModal();
      }
    }
  }

  loadSubcategorias(): void {
    this.subcategoriaService.getSubcategoria().subscribe({
      next: (resp: any) => {
        if (resp?.data) {
          this.listSubcategoria = resp.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar subcategorías:', error);
      }
    });
  }

  getSubcategoryName(subcategoriaID: number): string {
    return this.listSubcategoria.find(sub => sub.subcategoriaID === subcategoriaID)?.nombre || '';
  }

  loadCategorias(): void {
    this.categoriaService.getCategoria().subscribe({
      next: (resp: any) => {
        if (resp?.data) {
          this.listCategoria = resp.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  getCategoryName(categoriaID: number): string {
    return this.listCategoria.find(cat => cat.categoriaID === categoriaID)?.nombre || '';
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