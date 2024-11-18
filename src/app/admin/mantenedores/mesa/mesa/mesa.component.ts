
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MesaModelModel } from './mesa-model';
import { MesaService } from './mesa.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mesa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {
  private mesaService = inject(MesaService);

  listMesa: MesaModelModel[] = [];
  formMesa: FormGroup = new FormGroup({});
  isUpdate: boolean = false;

  ngOnInit(): void {
    this.list();
    this.formMesa = new FormGroup({
      mesaID: new FormControl(),
      numero: new FormControl(),
      capacidad: new FormControl(),
      condicion: new FormControl(''),
      estado: new FormControl(true),

    });
  }


  list() {
    this.mesaService.getMesa().subscribe({
      next: (resp: any) => {
        // Asumiendo que la respuesta tiene la estructura { status: 'success', data: [...] }
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

 

  save() {
    this.mesaService.saveMesa(this.formMesa.value).subscribe({
      next: (resp: any) => {
        if (resp && resp.status === 'success') {
          this.list();
          this.formMesa.reset();
        }
      },
      error: (error) => {
        console.error('Error al guardar mesa:', error);
      }
    });
  }

  update() {
    this.mesaService.updateMesa(this.formMesa.value).subscribe({
      next: (resp: any) => {
        if (resp && resp.status === 'success') {
          this.list();
          this.formMesa.reset();
        }
      },
      error: (error) => {
        console.error('Error al actualizar mesa:', error);
      }
    });
  }


  condicion() {
    this.mesaService.condicionMesa(this.formMesa.value).subscribe({
      next: (resp: any) => {
        if (resp && resp.status === 'success') {
          this.list();
          this.formMesa.reset();
        }
      },
      error: (error) => {
        console.error('Error de condicion de mesa:', error);
      }
    });
  }

  delete(id: number) {
    this.mesaService.deleteMesa(id).subscribe({
      next: (resp: any) => {
        if (resp && resp.status === 'success') {
          this.list();
        }
      },
      error: (error) => {
        console.error('Error al eliminar mesa:', error);
      }
    });
  }

  newMesa() {
    this.isUpdate = false;
    this.formMesa.reset();
  }

  selectItem(item: MesaModelModel) {
    this.isUpdate = true;
    this.formMesa.patchValue({
      mesaID: item.mesaID,
      numero: item.numero,
      capacidad: item.capacidad,
      condicion: item.condicion,
      estado: item.estado
    });
  }
}
