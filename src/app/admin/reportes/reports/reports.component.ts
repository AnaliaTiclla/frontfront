import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ],
  providers: [ReportService]
})
export class ReportsComponent {
  errorMessage: string = '';

  constructor(private reportService: ReportService) {}

  generateProductReport() {
    this.errorMessage = '';
    this.reportService.generarReporteProductos()
      .pipe(
        catchError(error => {
          this.errorMessage = error.message || 'Error al generar el reporte de productos';
          console.error('Error generating product report', error);
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.reportService.abrirNuevaVentanaPDF(response);
        }
      });
  }

  generateEmployeeReport() {
    this.errorMessage = '';
    this.reportService.generarReporteEmpleados()
      .pipe(
        catchError(error => {
          this.errorMessage = error.message || 'Error al generar el reporte de empleados';
          console.error('Error generating employee report', error);
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.reportService.abrirNuevaVentanaPDF(response);
        }
      });
  }

  generateArticulosReport() {
    this.errorMessage = '';
    this.reportService.generarReporteArticulos()
      .pipe(
        catchError(error => {
          this.errorMessage = error.message || 'Error al generar el reporte de articulos';
          console.error('Error generating articulos report', error);
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.reportService.abrirNuevaVentanaPDF(response);
        }
      });
  }

  generateOrdenReport() {
    this.errorMessage = '';
    this.reportService.generarReporteOrdenes()
      .pipe(
        catchError(error => {
          this.errorMessage = error.message || 'Error al generar el reporte de ordenes';
          console.error('Error generating ordenes report', error);
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.reportService.abrirNuevaVentanaPDF(response);
        }
      });
  }

  generateMozoReport() {
    this.errorMessage = '';
    this.reportService.generarReporteMozo()
      .pipe(
        catchError(error => {
          this.errorMessage = error.message || 'Error al generar el reporte de mozos';
          console.error('Error generating mozos report', error);
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.reportService.abrirNuevaVentanaPDF(response);
        }
      });
  }

  generateBoletaReport() {
    this.errorMessage = '';
    this.reportService.generarReporteBoleta()
      .pipe(
        catchError(error => {
          this.errorMessage = error.message || 'Error al generar el reporte de boletas';
          console.error('Error generating boletas report', error);
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.reportService.abrirNuevaVentanaPDF(response);
        }
      });
  }

  generateBoletaSimpleReport() {
    this.errorMessage = '';
    this.reportService.generarReporteBoletaSimple()
      .pipe(
        catchError(error => {
          this.errorMessage = error.message || 'Error al generar el reporte de boletas simple';
          console.error('Error generating boletas simple report', error);
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.reportService.abrirNuevaVentanaPDF(response);
        }
      });
  }

  generateFacturaReport() {
    this.errorMessage = '';
    this.reportService.generarReporteFactura()
      .pipe(
        catchError(error => {
          this.errorMessage = error.message || 'Error al generar el reporte de facturas';
          console.error('Error generating facturas report', error);
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.reportService.abrirNuevaVentanaPDF(response);
        }
      });
  }

  generateSinComprobanteReport() {
    this.errorMessage = '';
    this.reportService.generarReporteSinComprobante()
      .pipe(
        catchError(error => {
          this.errorMessage = error.message || 'Error al generar el reporte de ventas sin comprobante';
          console.error('Error generating ventas sin comprobante report', error);
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.reportService.abrirNuevaVentanaPDF(response);
        }
      });
  }
}