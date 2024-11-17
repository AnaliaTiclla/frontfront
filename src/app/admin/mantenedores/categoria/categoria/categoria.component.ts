import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoriaModelModel } from './categoria-model';
import { CategoriaService } from './categoria.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  private categoriaService = inject(CategoriaService);

  listCategorias: CategoriaModelModel[] = [];
  formCategoria: FormGroup = new FormGroup({});
  isUpdate: boolean = false;

  ngOnInit(): void {
    this.list();
    this.formCategoria = new FormGroup({
      categoriaid: new FormControl(''),
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      estado: new FormControl(true),
    });
  }

  list() {
    this.categoriaService.getCategoria().subscribe({
      next: (resp: any) => {
        // Asumiendo que la respuesta tiene la estructura { status: 'success', data: [...] }
        if (resp && resp.data) {
          this.listCategorias = resp.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  save() {
    this.categoriaService.saveCategoria(this.formCategoria.value).subscribe({
      next: (resp: any) => {
        if (resp && resp.status === 'success') {
          this.list();
          this.formCategoria.reset();
        }
      },
      error: (error) => {
        console.error('Error al guardar categoría:', error);
      }
    });
  }

  update() {
    this.categoriaService.updateCategoria(this.formCategoria.value).subscribe({
      next: (resp: any) => {
        if (resp && resp.status === 'success') {
          this.list();
          this.formCategoria.reset();
        }
      },
      error: (error) => {
        console.error('Error al actualizar categoría:', error);
      }
    });
  }

  delete(id: number) {
    this.categoriaService.deleteCategoria(id).subscribe({
      next: (resp: any) => {
        if (resp && resp.status === 'success') {
          this.list();
        }
      },
      error: (error) => {
        console.error('Error al eliminar categoría:', error);
      }
    });
  }

  newCategoria() {
    this.isUpdate = false;
    this.formCategoria.reset();
  }

  selectItem(item: CategoriaModelModel) {
    this.isUpdate = true;
    this.formCategoria.patchValue({
      categoriaid: item.categoriaid,
      nombre: item.nombre,
      descripcion: item.descripcion,
      estado: item.estado
    });
  }
}