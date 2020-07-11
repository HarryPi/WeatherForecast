import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';
import { PathService } from '../../../../core/services/path.service';
import { WeatherService } from '../../../../core/services/weather.service';
import { WeatherModel } from '../../../../shared/models/weather.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  weather: WeatherModel[];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private swipeCoord?: [number, number];
  private swipeTime?: number;
  private sub: Subscription;

  constructor(
      private weatherService: WeatherService,
      public pathService: PathService
  ) {
    this.sub = new Subscription();
  }

  ngOnInit(): void {
    this.updateWeatherForecast();
  }

  ngOnDestroy(): void {
    // Clear memory to avoid memory leaks
    this.sub.unsubscribe();
  }

  updateWeatherForecast(): void {
    this.sub.add(
        this.weatherService.getWeatherByCityForFiveDays('belfast').pipe(share()).subscribe(weatherModel => {
          this.weather = weatherModel;
          this.setLoading(false);
        })
    );
  }

  setLoading(isLoading): void {
    this.isLoading$.next(isLoading);
  }


  /**
   *  This is bind to a mobile only event thus will not trigger when on desktop
   *  To test this switch to mobile view on chrome / firefox
   *  this could also be achieved with a library or with hammerjs but this approach was chosen to demonstrate understanding of the task
   * @param {TouchEvent} e
   * @param {string} when
   */
  swipe(e: TouchEvent, when: string): void {
    // Store the initial coordinates
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    // Store the time the click was registed
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;
      // We can tweak the sensitivities here
      if (duration > 1000
          && Math.abs(direction[1]) > 30 // Long enough
          && Math.abs(direction[1] * 3) > Math.abs(direction[0])) { // Horizontal enough
        console.log('refreshing...');
        this.setLoading(true);
        this.updateWeatherForecast();
      }
    }
  }
}
