let axios = require('axios');
const WEATHER_API = "http://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.API_KEY;

exports.getCurrentWeather = function(city) {
    return axios({
        method: 'get',
        url: WEATHER_API,
        params: {
            q: city,
            APPID: API_KEY
        }
    });
}