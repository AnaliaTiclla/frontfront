

import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './usuario.service';
import { UsuarioModelModel } from './usuario-model';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  private usuarioService = inject(UsuarioService);

  listUsuarios: UsuarioModelModel[] = [];
  formUsuario: FormGroup = new FormGroup({});
  isUpdate: boolean = false;

  ngOnInit(): void {
    this.list();
    this.formUsuario = new FormGroup({
      usuarioID: new FormControl(),
      username: new FormControl(''),
      password: new FormControl(''),
      estado: new FormControl(true),
      empleadoID: new FormControl(''),
      rol: new FormControl(''),
    });
  }


  list() {
    this.usuarioService.getUsuario().subscribe({
      next: (resp: any) => {
        // Asumiendo que la respuesta tiene la estructura { status: 'success', data: [...] }
        if (resp && resp.data) {
          this.listUsuarios = resp.data;
          console.log("Lista de usuario:", this.listUsuarios);
        }
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

 

  save() {
    this.usuarioService.saveUsuario(this.formUsuario.value).subscribe({
      next: (resp: any) => {
        if (resp && resp.status === 'success') {
          this.list();
          this.formUsuario.reset();
        }
      },
      error: (error) => {
        console.error('Error al guardar usuario:', error);
      }
    });
  }

  update() {
    this.usuarioService.updateUsuario(this.formUsuario.value).subscribe({
      next: (resp: any) => {
        if (resp && resp.status === 'success') {
          this.list();
          this.formUsuario.reset();
        }
      },
      error: (error) => {
        console.error('Error al actualizar usuario:', error);
      }
    });
  }

  delete(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe({
      next: (resp: any) => {
        if (resp && resp.status === 'success') {
          this.list();
        }
      },
      error: (error) => {
        console.error('Error al eliminar usuario:', error);
      }
    });
  }

  newEmpleado() {
    this.isUpdate = false;
    this.formUsuario.reset();
  }

  selectItem(item: UsuarioModelModel) {
    this.isUpdate = true;
    this.formUsuario.patchValue({
      usuarioID: item.usuarioID,
      username: item.username,
      password: item.password,
      estado: item.estado,
      empleadoID: item.empleadoID,
      rol: item.rol,

    });
  }
}
