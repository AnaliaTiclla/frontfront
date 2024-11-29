import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8080/admin/report'; 

  constructor(private http: HttpClient) { }

  generarReporteProductos(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/productos`, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/pdf'
      })
    });
  }

  generarReporteEmpleados(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/empleados`, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/pdf'
      })
    });
  }

  generarReporteArticulos(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/articulos`, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/pdf'
      })
    });
  }

  generarReporteOrdenes(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/ordenes`, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/pdf'
      })
    });
  }

  generarReporteMozo(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/mozo`, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/pdf'
      })
    });
  }

  generarReporteBoleta(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/boleta`, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/pdf'
      })
    });
  }

  generarReporteBoletaSimple(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/boleta-simple`, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/pdf'
      })
    });
  }

  generarReporteFactura(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/factura`, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/pdf'
      })
    });
  }

  generarReporteSinComprobante(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/sin-comprobante`, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/pdf'
      })
    });
  }

  abrirNuevaVentanaPDF(blob: Blob) {
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL, '_blank');
  }
}