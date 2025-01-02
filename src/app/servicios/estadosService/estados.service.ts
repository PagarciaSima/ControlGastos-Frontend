import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { EstadoDto } from '../../interface/estado-dto';
import { ComunService } from '../comunService/comun.service';


@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  constructor(
    private _http: HttpClient,
    private _comunService: ComunService
  ) { }

  getEstadosGastos(token: string): Observable<EstadoDto[]> {
    const headers = this._comunService.getHeaders(token);
    return this._http.get<EstadoDto[]>(`${environment.api}/v1/estados`, {headers})
  }
}
