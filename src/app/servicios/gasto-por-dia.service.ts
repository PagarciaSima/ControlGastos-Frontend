import { Injectable } from '@angular/core';
import { ComunService } from './comun.service';
import { HttpClient } from '@angular/common/http';
import { GastoDiaModel } from '../interface/gasto-dia-model';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment.development';
import { GastoDiaDto } from '../interface/gasto-dia-dto';

@Injectable({
  providedIn: 'root'
})
export class GastoPorDiaService {

  constructor(
    private _http: HttpClient,
    private _comunService: ComunService
  ) { }

  getGastosPorDia(token: string): Observable<GastoDiaModel[]> {
    const headers = this._comunService.getHeaders(token);
    return this._http.get<GastoDiaModel[]>(`${environment.api}/v1/gastos-por-dia`, {headers})
  }

  addGastoPorDia(gasto: GastoDiaDto, token: string): Observable<string> {
    const headers = this._comunService.getHeaders(token);
    return this._http.post<string>(`${environment.api}/v1/gastos-por-dia`, { headers })
  }

  editGastoPorDia(gasto: GastoDiaDto, token: string, id:number): Observable<string> {
    const headers = this._comunService.getHeaders(token);
    return this._http.post<string>(`${environment.api}/v1/gastos-por-dia/${id}`, { headers })
  }

  deleteGastoPorDia(token: string, id:number): Observable<string> {
    const headers = this._comunService.getHeaders(token);
    return this._http.delete<string>(`${environment.api}/v1/gastos-por-dia/${id}`, { headers })
  }
}
