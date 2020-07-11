export class WeatherModel {
  constructor(
      public date: Date,
      public weatherState: string,
      public weatherImage: string
  ) {
  }
}
