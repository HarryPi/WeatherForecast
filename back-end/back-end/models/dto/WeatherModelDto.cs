using System;

namespace back_end.models.dto {
    public class WeatherModelDto {
        public DateTime Date { get; set; }
        public string WeatherState { get; set; }
        public string WeatherImage { get; set; }
    }
}