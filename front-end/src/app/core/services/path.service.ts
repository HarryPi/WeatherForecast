import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  constructor() {
  }

  weatherImagePathByAbbr(abbr: string): string {
    return `${ environment.shared.weatherImagePath }/${ abbr }.png`;
  }

  get weatherForcastPath(): string {
    return `${ environment.shared.weatherApi }/weatherforecast/`;
  }
}
