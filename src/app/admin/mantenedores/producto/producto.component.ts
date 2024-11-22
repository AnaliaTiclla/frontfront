import { Component, inject, OnInit } from '@angular/core';
import { ProductoModel } from './producto-model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ProductoService } from './producto.service';
import { SubcategoriaService } from '../subcategorias/subcategoria/subcategoria.service';
import { SubcategoriaModel } from '../subcategorias/subcategoria/subcategoria-model';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  private productoService = inject(ProductoService);
  private subcategoriaService = inject(SubcategoriaService);

  listProductos: ProductoModel[] = [];
  listSubcategoria: SubcategoriaModel[] = [];
  formProducto: FormGroup = new FormGroup({});
  isUpdate: boolean = false;

  ngOnInit(): void {
    this.list();
    this.loadSubcategorias();
    this.formProducto = new FormGroup({
      productoID: new FormControl(),
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      precio: new FormControl(''),
      subcategoriaID: new FormControl(''),
      estado: new FormControl(true),
    });
  }
 

  list() {
    this.productoService.getProducto().subscribe({
      next: (resp: any) => {
        if (resp && resp.data) {
          this.listProductos = resp.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }

 

  save() {
    this.productoService.saveProducto(this.formProducto.value).subscribe({
      next: (resp: any) => {
        if (resp && resp.status === 'success') {
          this.list();
          this.formProducto.reset();
        }
      },
      error: (error) => {
        console.error('Error al guardar producto:', error);
      }
    });
  }

  update() {
    this.productoService.updateProducto(this.formProducto.value).subscribe({
      next: (resp: any) => {
        if (resp && resp.status === 'success') {
          this.list();
          this.formProducto.reset();
        }
      },
      error: (error) => {
        console.error('Error al actualizar producto:', error);
      }
    });
  }

  delete(id: number) {
    this.productoService.deleteProducto(id).subscribe({
      next: (resp: any) => {
        if (resp && resp.status === 'success') {
          this.list();
        }
      },
      error: (error) => {
        console.error('Error al eliminar producto:', error);
      }
    });
  }

  newProducto() {
    this.isUpdate = false;
    this.formProducto.reset();
  }

  selectItem(item: ProductoModel) {
    this.isUpdate = true;
    this.formProducto.patchValue({
      productoID: item.productoID,
      nombre: item.nombre,
      descripcion: item.descripcion,
      precio: item.precio,
      subcategoriaID: item.subcategoriaID,
      estado: item.estado
    });
  }

  loadSubcategorias() {
    this.subcategoriaService.getSubcategoria().subscribe({
      next: (resp: any) => {
        if (resp && resp.data) {
          this.listSubcategoria = resp.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }

  getSubcategoryName(subcategoriaID: number): string {
    const subcategory = this.listSubcategoria.find(sub => sub.subCategoriaId === subcategoriaID);
    return subcategory?.nombre || 'Sin subcategoría';
  }
}
