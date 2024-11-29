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
    this.reportService.generateProductReport()
      .pipe(
        catchError(error => {
          this.errorMessage = error.message || 'Error al generar el reporte de productos';
          console.error('Error generating product report', error);
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.reportService.openPdfInNewWindow(response);
        }
      });
  }

  generateEmployeeReport() {
    this.errorMessage = '';
    this.reportService.generateEmployeeReport()
      .pipe(
        catchError(error => {
          this.errorMessage = error.message || 'Error al generar el reporte de empleados';
          console.error('Error generating employee report', error);
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.reportService.openPdfInNewWindow(response);
        }
      });
  }
}