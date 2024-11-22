import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubcategoriaModel } from './subcategoria-model';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../categoria/categoria/categoria.service';
import { CategoriaModelModel } from '../../categoria/categoria/categoria-model';
import { SubcategoriaService } from './subcategoria.service';

@Component({
  selector: 'app-subcategoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit {
  private subcategoriaService = inject(SubcategoriaService);
  private categoriaService = inject(CategoriaService);

  listSubcategorias: SubcategoriaModel[] = [];
  listCategorias: CategoriaModelModel[] = [];
  formSubcategoria: FormGroup = new FormGroup({});
  isUpdate: boolean = false;

  ngOnInit(): void {
    this.list();
    this.loadCategorias();
    this.formSubcategoria = new FormGroup({
      subcategoriaID: new FormControl(),
      categoriaID: new FormControl(''),
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      estado: new FormControl(true),
    });
  }

  list() {
    this.subcategoriaService.getSubcategoria().subscribe({
      next: (resp: any) => {
        if (resp && resp.data) {
          this.listSubcategorias = resp.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar subcategorías:', error);
      }
    });
  }

  loadCategorias() {
    this.categoriaService.getCategoria().subscribe({
      next: (resp: any) => {
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
    if (this.formSubcategoria.valid) {
      const subcategoria = this.formSubcategoria.value;
      
      subcategoria.categoriaID = Number(subcategoria.categoriaID);

      this.subcategoriaService.saveSubcategoria(subcategoria).subscribe({
        next: (response) => {
          console.log('Respuesta exitosa:', response);
          this.list();
          this.formSubcategoria.reset();
          document.getElementById('subcategoriaModal')?.click();
        },
        error: (error) => {
          console.error('Error al guardar:', error);
          alert('Error al guardar la subcategoría');
        }
      });
    } else {
      console.log('Errores del formulario:', this.formSubcategoria.errors);
      alert('Por favor complete todos los campos requeridos');
    }
  }

  update() {
    if (this.formSubcategoria.valid) {
      const subcategoria = this.formSubcategoria.value;
      
      // Asegurarse que categoriaID sea un número
      subcategoria.categoriaID = Number(subcategoria.categoriaID);
      
      this.subcategoriaService.updateSubcategoria(subcategoria).subscribe({
        next: () => {
          this.list();
          document.getElementById('subcategoriaModal')?.click();
          this.formSubcategoria.reset();
        },
        error: (err: Error) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar la subcategoría');
        }
      });
    }
  }

  delete(id: number) {
    if (confirm('¿Está seguro que desea eliminar esta subcategoría?')) {
      this.subcategoriaService.deleteSubcategoria(id).subscribe({
        next: () => {
          this.list();
          alert('Subcategoría eliminada con éxito');
        },
        error: (err: Error) => {
          console.error('Error al eliminar:', err);
          alert('Error al eliminar la subcategoría');
        }
      });
    }
  }

  newSubcategoria() {
    this.isUpdate = false;
    this.formSubcategoria.reset();
  }

  selectItem(item: SubcategoriaModel) {
    this.isUpdate = true;
    this.formSubcategoria.patchValue({
      subcategoriaID: item.subcategoriaID,
      categoriaID: item.categoriaID,
      nombre: item.nombre,
      descripcion: item.descripcion,
      estado: item.estado
    });
  }

  getCategoryName(categoriaID: number): string {
    return this.listCategorias.find(cat => cat.categoriaID === categoriaID)?.nombre || '';
  }
}