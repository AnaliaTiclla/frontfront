import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { PagoModel } from './pago-model';
import { PagoDetalleModel } from './pagoDetalle-model';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private URL_API: string = 'https://backfinal-v70.onrender.com/mozo';
  private http = inject(HttpClient);

  getPago(): Observable<PagoModel[]> {
    return this.http.get<PagoModel[]>(`${this.URL_API}/pago/listar`).pipe(
      map(res => res),
      catchError(error => {
        console.error('Error en getPago:', error);
        throw error;
      })
    );
  }

  savePago(request: PagoModel): Observable<any> {
    return this.http.post<any>(`${this.URL_API}/pago/guardar`, request).pipe(
      map(resp => resp)
    );
  }

  updatePago(request: PagoModel): Observable<any> {
    return this.http.post<any>(`${this.URL_API}/pago/actualizar`, request).pipe(
      map(resp => resp)
    );
  }

  saveDetallePago(request: PagoDetalleModel): Observable<any> {
    return this.http.post<any>(`${this.URL_API}/detallePago/guardar`, request).pipe(
      map(resp => resp)
    );
  }

  updateDetallePago(request: PagoDetalleModel): Observable<any> {
    return this.http.post<any>(`${this.URL_API}/detallePago/actualizar`, request).pipe(
      map(resp => resp)
    );
  }

  private data: any = null;

  setData(data: any): void {
    this.data = data;
  }

  getData(): any {
    const temp = this.data;
    this.data = null;
    return temp;
  }
}