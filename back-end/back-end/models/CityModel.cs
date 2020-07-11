using System.Text.Json.Serialization;

namespace back_end.models {
    public class CityModel {
        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("location_type")]
        public string LocationType { get; set; }

        [JsonPropertyName("woeid")]
        public int Woeid { get; set; }

        [JsonPropertyName("latt_long")]
        public string LattLong { get; set; }
    }
}