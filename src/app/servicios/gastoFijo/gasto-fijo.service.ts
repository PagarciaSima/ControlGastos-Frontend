import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GastoFijoDto } from '../../interface/gasto-fijo-dto';
import { environment } from '../../../environments/environment.development';
import { ComunService } from '../comunService/comun.service';
import { GastoFijoModel } from '../../interface/gasto-fijo-model';

@Injectable({
  providedIn: 'root'
})
export class GastoFijoService {

  constructor(
    private _http: HttpClient,
    private _comunService: ComunService
  ) { }

  getGastosFijos(token: string): Observable<GastoFijoModel[]> {
    const headers = this._comunService.getHeaders(token);
    return this._http.get<GastoFijoModel[]>(`${environment.api}/v1/gastos-fijos`, { headers });
  }

  addGastoFijo(gasto:GastoFijoDto, token: string): Observable<string> {
    const headers = this._comunService.getHeaders(token);
    return this._http.post<string>(`${environment.api}/v1/gastos-fijos`, gasto, { headers });
  }

 editGastoFijo(gasto:GastoFijoDto, token: string, id:number): Observable<string> {
    const headers = this._comunService.getHeaders(token);
    return this._http.put<string>(`${environment.api}/v1/gastos-fijos/${id}`, gasto, { headers });
  }

  deleteGastoFijo(token: string, id: number): Observable<string> {
    const headers = this._comunService.getHeaders(token);
    return this._http.delete<string>(`${environment.api}/v1/gastos-fijos/${id}`, { headers });
  }
}
