import axios from "axios";

type CityData = {
    name: string,
    lat: number,
    lon: number,
    tz: string,
}

type WeatherData = {
    temp: number,
    temp_feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: 1006,
    humidity: 69
}

type SingleWeatherData = {
    data: WeatherData,
    dt: Date,
}

type MultiWeatherData = {
    datas: Array<WeatherData>,
    dt: Date,
}

// type WeatherDataChangedFunc = () => void;
type SetDataFunc = React.Dispatch<any>;

// const cityDatas = [
//     {
//         name: "Москва",
//         // 55°45′21″ с. ш. 37°37′04″ в. д
//         lat: 55.4521,
//         lon: 37.3704,
//         // tz: 3.0, // UTC+3
//         tz: "+03:00",
//     },
//     {
//         name: "Санкт-Петербург",
//         // 59°57′ с. ш. 30°19′ в. д.
//         lat: 59.57,
//         lon: 30.19,
//         // tz: 3.0, // UTC+3
//         tz: "+03:00",
//     },
//     {
//         name: "Екатеринбург",
//         // 56°50′ с. ш. 60°35′ в. д.
//         lat: 56.50,
//         lon: 60.35,
//         // tz: 5.0, // UTC+5
//         tz: "+05:00",
//     },
//     {
//         name: "Пермь",
//         // 58°00′50″ с. ш. 56°14′56″ в. д.
//         lat: 58.0050,
//         lon: 56.1456,
//         // tz: 5.0, // UTC+5
//         tz: "+05:00",
//     }
// ]

// examples
// 
// https://api.openweathermap.org/data/2.5/weather?lat=58.0050&lon=56.1456&units=metric&appid=f4ae72126d5ca78c5dd8fe868451636d
// 
// https://api.openweathermap.org/data/2.5/forecast?lat=58.0050&lon=56.1456&units=metric&cnt=40&appid=f4ae72126d5ca78c5dd8fe868451636d
//
//// paid:
//// https://api.openweathermap.org/data/2.5/forecast/daily?lat=58.0050&lon=56.1456&units=metric&cnt=5&appid=f4ae72126d5ca78c5dd8fe868451636d


class WeatherHelper {

    openWeatherMapAppId = "f4ae72126d5ca78c5dd8fe868451636d";

    cityDatas: Array<CityData> = [
        {
            name: "Москва",
            // 55°45′21″ с. ш. 37°37′04″ в. д
            lat: 55.4521,
            lon: 37.3704,
            tz: "+03:00",
        },
        {
            name: "Санкт-Петербург",
            // 59°57′ с. ш. 30°19′ в. д.
            lat: 59.57,
            lon: 30.19,
            tz: "+03:00",
        },
        {
            name: "Екатеринбург",
            // 56°50′ с. ш. 60°35′ в. д.
            lat: 56.50,
            lon: 60.35,
            tz: "+05:00",
        },
        {
            name: "Пермь",
            // 58°00′50″ с. ш. 56°14′56″ в. д.
            lat: 58.0050,
            lon: 56.1456,
            tz: "+05:00",
        }
    ]

    cachedSingleDatas = [];
    cachedMultiDatas = [];
    setCountryIndex = null;
    setModeIndex = null;
    setWeatherDataFunc = null;

    cacheLifeTime = 60 * 1000;

    constructor(setWeatherDataFunc: SetDataFunc){
        this.setWeatherDataFunc = setWeatherDataFunc;

        this.cityDatas.map((cityData, index) => {
            this.cachedSingleDatas[index] = null;
            this.cachedMultiDatas[index] = null;
        })
    }

    getCityDataByIndex(index: number){
        return this.cityDatas[index];
    }

    getCityDataCount(){
        return this.cityDatas.length;
    }

    isValidDate(dt: Date){
        return (Date.now() - dt.getTime() < this.cacheLifeTime);
    }

    isValidSingleWeatherData(swd: SingleWeatherData): boolean {
        if (swd){
            return this.isValidDate(swd.dt);
        }else{
            return false;
        }
    }

    isValidMultiWeatherData(mwd: MultiWeatherData): boolean {
        if (mwd){
            return this.isValidDate(mwd.dt);
        }else{
            return false;
        }
    }

    refreshCacheSingleWeatherData(index: number): void {
        const cityData = this.getCityDataByIndex(index);

        const singleWeatherDataURL = `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&units=metric&appid=${this.openWeatherMapAppId}`;
        axios.get(singleWeatherDataURL).then(res => {
            let data = {
                // dt: res["dt"],
                dt: Date.now(),
                data: {
                    temp: res["main"]["temp"],
                    temp_feels_like: res["main"]["feels_like"],
                    temp_min: res["main"]["temp_min"],
                    temp_max: res["main"]["temp_max"],
                    pressure: res["main"]["pressure"],
                    humidity: res["main"]["humidity"],
                },
            };

            this.cachedSingleDatas[index] = data;

            this.setWeatherDataFunc();
        });
    }

    refreshCacheMultiWeatherData(index: number): void {
        const cityData = this.getCityDataByIndex(index);

        const singleWeatherDataURL = `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&units=metric&appid=${this.openWeatherMapAppId}`;
        const multiWeatherDataURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lon}&units=metric&cnt=40&appid=${this.openWeatherMapAppId}`;
        // https://api.openweathermap.org/data/2.5/forecast?lat=58.0050&lon=56.1456&units=metric&cnt=40&appid=f4ae72126d5ca78c5dd8fe868451636d
        axios.get(multiWeatherDataURL).then(res => {
            let day_datas = [
                res["list"][4]["main"],
                res["list"][12]["main"],
                res["list"][20]["main"],
                res["list"][28]["main"],
                res["list"][36]["main"],
            ];
            let data = {
                dt: Date.now(),
                data: [
                    {
                        temp: day_datas[0]["temp"],
                        temp_feels_like: day_datas[0]["feels_like"],
                        temp_min: day_datas[0]["temp_min"],
                        temp_max: day_datas[0]["temp_max"],
                        pressure: day_datas[0]["pressure"],
                        humidity: day_datas[0]["humidity"],
                    },
                    {
                        temp: day_datas[1]["temp"],
                        temp_feels_like: day_datas[1]["feels_like"],
                        temp_min: day_datas[1]["temp_min"],
                        temp_max: day_datas[1]["temp_max"],
                        pressure: day_datas[1]["pressure"],
                        humidity: day_datas[1]["humidity"],
                    },
                    {
                        temp: day_datas[2]["temp"],
                        temp_feels_like: day_datas[2]["feels_like"],
                        temp_min: day_datas[2]["temp_min"],
                        temp_max: day_datas[2]["temp_max"],
                        pressure: day_datas[2]["pressure"],
                        humidity: day_datas[2]["humidity"],
                    },
                    {
                        temp: day_datas[3]["temp"],
                        temp_feels_like: day_datas[3]["feels_like"],
                        temp_min: day_datas[3]["temp_min"],
                        temp_max: day_datas[3]["temp_max"],
                        pressure: day_datas[3]["pressure"],
                        humidity: day_datas[3]["humidity"],
                    },
                    {
                        temp: day_datas[4]["temp"],
                        temp_feels_like: day_datas[4]["feels_like"],
                        temp_min: day_datas[4]["temp_min"],
                        temp_max: day_datas[4]["temp_max"],
                        pressure: day_datas[4]["pressure"],
                        humidity: day_datas[4]["humidity"],
                    },
                ]
            };

            this.cachedMultiDatas[index] = data;

            this.setWeatherDataFunc();
        });
    }

    getSingleWeatherDataByIndex(index: number): SingleWeatherData {
        let cached = this.cachedSingleDatas[index];
        if (this.isValidSingleWeatherData(cached)){
            return cached;
        }else{
            this.refreshCacheSingleWeatherData(index);
            return null;
        }
    }

    getMultiWeatherDataByIndex(index: number): MultiWeatherData {
        let cached = this.cachedMultiDatas[index];
        if (this.isValidMultiWeatherData(cached)){
            return cached;
        }else{
            this.refreshCacheMultiWeatherData(index);
            return null;
        }
    }
}

// const weatherHelper = new WeatherHelper();

export { CityData, WeatherHelper };