using System;

namespace back_end.Exceptions {
    public class CityNotFound : Exception {
        public CityNotFound() : base("City provided not found, please try with a different city") { }
    }
}