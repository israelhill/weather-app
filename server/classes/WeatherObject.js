class WeatherObject {
    constructor(resData, city) {
        /* 
        must use original city name. weather api returns slightly diff names
        which creates issues when trying to use the city name as a key for avgTemps object.
        */
        this.city = city;
        this.temp = resData.main.temp;
        this.description = resData.weather[0].description;
    }

    getTempF() {
        return Math.floor((9/5)*(this.temp - 273) + 32);
    }

    getTempC() {
        return Math.floor(this.temp - 273);
    }

    getDescription() {
        return this.description;
    }

    getCityName() {
        return this.city;
    }

    toString() {
        return this.getCityName() + ": " + Math.floor(this.getTempF()) + "°F, " +
            this.getDescription();
    }
}

module.exports = WeatherObject;