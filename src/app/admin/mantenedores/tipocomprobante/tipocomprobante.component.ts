import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TipocomprobanteService } from './tipocomprobante.service';
import { TipocomprobanteModel } from './tipocomprobante-model';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tipocomprobante.component.html',
  styleUrls: ['./tipocomprobante.component.css']
})
export class TipocomprobanteComponent implements OnInit {
  private tipocomprobanteService = inject(TipocomprobanteService);

  listTipocomprobante: TipocomprobanteModel[] = [];
  formTipocomprobante: FormGroup = new FormGroup({});
  isUpdate: boolean = false;

  ngOnInit(): void {
    this.list();
    this.formTipocomprobante = new FormGroup({
      tipoComprobanteId: new FormControl(),
      nombre: new FormControl(''),
      requiereId: new FormControl(true),
      estado: new FormControl(true),
    });
  }
 

  list() {
    this.tipocomprobanteService.getTipocomprobante().subscribe({
      next: (resp: any) => {
        if (resp && resp.data) {
          this.listTipocomprobante = resp.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar tipo de comprobante:', error);
      }
    });
  }

 

  save() {
    this.tipocomprobanteService.saveTipocomprobante(this.formTipocomprobante.value).subscribe({
      next: (resp: any) => {
        if (resp && resp.status === 'success') {
          this.list();
          this.formTipocomprobante.reset();
        }
      },
      error: (error) => {
        console.error('Error al guardar el tipo de comprobante:', error);
      }
    });
  }

  update() {
    this.tipocomprobanteService.updateTipocomprobante(this.formTipocomprobante.value).subscribe({
      next: (resp: any) => {
        if (resp && resp.status === 'success') {
          this.list();
          this.formTipocomprobante.reset();
        }
      },
      error: (error) => {
        console.error('Error al actualizar el tipo de comprobante:', error);
      }
    });
  }

    delete(id: number) {
      if (confirm('¿Está seguro que desea eliminar esta subcategoría?')) {
        this.tipocomprobanteService.deleteTipocomprobante(id).subscribe({
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

  newTipocomprobante() {
    this.isUpdate = false;
    this.formTipocomprobante.reset();
  }

  selectItem(item: TipocomprobanteModel) {
    this.isUpdate = true;
    this.formTipocomprobante.patchValue({
      tipoComprobanteId: item.tipoComprobanteId,
      nombre: item.nombre,
      requiereId: item.requiereId,
      estado: item.estado
    });
  }
}