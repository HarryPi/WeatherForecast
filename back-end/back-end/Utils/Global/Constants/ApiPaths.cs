namespace back_end.Utils.Global.Constants {
    public class ApiPaths {
        public string WeatherApi { get; set; }
        public string WeatherApiLocationSearch => $"{WeatherApi}/location/search/?query=";
        public string WeatherApiWeatherForcast => $"{WeatherApi}/location/";
    }
}