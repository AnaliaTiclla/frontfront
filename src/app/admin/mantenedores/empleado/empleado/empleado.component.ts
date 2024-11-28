
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmpleadoService } from './empleado.service';
import { EmpleadoModelModel } from './empleado-model';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  private empleadoService = inject(EmpleadoService);

  listEmpleados: EmpleadoModelModel[] = [];
  formEmpleado: FormGroup = new FormGroup({});
  isUpdate: boolean = false;

  ngOnInit(): void {
    this.list();
    this.formEmpleado = new FormGroup({
      empleadoID: new FormControl(),
      apellido: new FormControl(''),
      cargo: new FormControl(''),
      dni: new FormControl(''),
      estado: new FormControl(true),
      nombre: new FormControl(''),
    });
  }


  list() {
    this.empleadoService.getEmpleado().subscribe({
      next: (resp: any) => {
        if (resp && resp.data) {
          this.listEmpleados = resp.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar empleados:', error);
      }
    });
  }

 

  save() {
    this.empleadoService.saveEmpleado(this.formEmpleado.value).subscribe({
      next: (resp: any) => {
        if (resp && resp.status === 'success') {
          this.list();
          this.formEmpleado.reset();
        }
      },
      error: (error) => {
        console.error('Error al guardar empleado:', error);
      }
    });
  }

  update() {
    this.empleadoService.updateEmpleado(this.formEmpleado.value).subscribe({
      next: (resp: any) => {
        if (resp && resp.status === 'success') {
          this.list();
          this.formEmpleado.reset();
        }
      },
      error: (error) => {
        console.error('Error al actualizar empleado:', error);
      }
    });
  }

  delete(id: number) {
    this.empleadoService.deleteEmpleado(id).subscribe({
      next: (resp: any) => {
        if (resp && resp.status === 'success') {
          this.list();
        }
      },
      error: (error) => {
        console.error('Error al eliminar empleado:', error);
      }
    });
  }

  newEmpleado() {
    this.isUpdate = false;
    this.formEmpleado.reset();
  }

  selectItem(item: EmpleadoModelModel) {
    this.isUpdate = true;
    this.formEmpleado.patchValue({
      empleadoID: item.empleadoID,
      apellido: item.apellido,
      cargo: item.cargo,
      dni: item.dni,
      estado: item.estado,
      nombre: item.nombre,
    
    });
  }
}
