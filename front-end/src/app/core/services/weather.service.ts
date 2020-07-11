import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherModel } from '../../shared/models/weather.model';
import { PathService } from './path.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public readonly weatherForecast$: Observable<WeatherModel[]>;


  constructor(
      private http: HttpClient,
      private apiPath: PathService
  ) {
    this.weatherForecast$ = new Observable<WeatherModel[]>();
  }


  getWeatherByCityForFiveDays(city: string): Observable<WeatherModel[]> {
    return this.http.get<WeatherModel[]>(`${ this.apiPath.weatherForcastPath }${ city }`);
  }

}
