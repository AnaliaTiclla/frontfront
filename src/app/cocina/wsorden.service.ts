import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OrdenDetalleModel } from '../mesero/mesas/distribucion-mesas/ordenDetalle-model';

@Injectable({
  providedIn: 'root'
})
export class WSOrdenService {
  private URL_API: string = 'http://localhost:8080';
  private http = inject(HttpClient);

  getWSOrden (): Observable<OrdenDetalleModel[]> {
    return this.http.get<any>(`${this.URL_API}/escuchar/canal1`).pipe(
      map(resp => resp)
    );
  }
}