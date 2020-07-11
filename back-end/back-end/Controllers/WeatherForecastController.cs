using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using back_end.Exceptions;
using back_end.models;
using back_end.models.dto;
using back_end.Utils.Global.Constants;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers {
    [ApiController]
    [Route("api/v1/[controller]")]
    public class WeatherForecastController : ControllerBase {
        private readonly ApiPaths _paths;
        private readonly HttpClient _client;

        public WeatherForecastController(ApiPaths paths) {
            _paths = paths;
            _client = new HttpClient();
        }

        [HttpGet("{city}")]
        public async Task<IActionResult> Get(string city = "belfast") {
            try {
                CityModel cityModel = await TryGetCity(city);
                IEnumerable<WeatherModelDto> dtos = await TryGetWeather(cityModel);

                return Ok(dtos);
            }
            catch (CityNotFound e) {
                return BadRequest(e.Message);
            }
            catch (Exception e) {
                return BadRequest(e.Message);
            }


            return BadRequest("Failed to get weather state of city provided, please ensure city is valid");
        }

        private async Task<IEnumerable<WeatherModelDto>> TryGetWeather(CityModel cityModel) {
            HttpResponseMessage response = await _client.GetAsync(_paths.WeatherApiWeatherForcast + cityModel.Woeid);
            if (response.IsSuccessStatusCode) {
                // Convert json to model
                WeatherModel weatherModel =
                    JsonSerializer.Deserialize<WeatherModel>(await response.Content.ReadAsStringAsync());

                // Map model to dto and take only the next 5 not including today
                IEnumerable<WeatherModelDto> dtos = weatherModel.consolidated_weather.Select(weather =>
                    new WeatherModelDto {
                        Date = DateTime.Parse(weather.applicable_date),
                        WeatherImage = weather.weather_state_abbr,
                        WeatherState = weather.weather_state_name
                    }).Skip(1); // skip today

                return dtos;
            }

            throw new Exception("Failed to get weather by World location id");
        }


        /**
         * Gets the City model by city name
         */
        private async Task<CityModel> TryGetCity(string city) {
            HttpResponseMessage response = await _client.GetAsync(_paths.WeatherApiLocationSearch + city);
            if (response.IsSuccessStatusCode) {
                CityModel cityModel =
                    JsonSerializer.Deserialize<IEnumerable<CityModel>>(
                        await response.Content.ReadAsStringAsync()).First();

                return cityModel;
            }

            throw new CityNotFound();
        }
    }
}