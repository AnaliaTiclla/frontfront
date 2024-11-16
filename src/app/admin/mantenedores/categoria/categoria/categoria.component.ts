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
    this.categoriaService.getCategoria().subscribe(resp => {
      if (resp) {
        this.listCategorias = resp;
      }
    });
  }

  save() {
    this.categoriaService.saveCategoria(this.formCategoria.value).subscribe(resp => {
      if (resp) {
        this.list();
        this.formCategoria.reset();
      }
    });
  }

  update() {
    this.categoriaService.updateCategoria(this.formCategoria.value).subscribe(resp => {
      if (resp) {
        this.list();
        this.formCategoria.reset();
      }
    });
  }

  delete(id: number) {
    this.categoriaService.deleteCategoria(id).subscribe(resp => {
      if (resp) {
        this.list();
      }
    });
  }

  newCategoria() {
    this.isUpdate = false;
    this.formCategoria.reset();
  }

  selectItem(item: CategoriaModelModel) {
    this.isUpdate = true;
    this.formCategoria.patchValue(item);
  }
}
