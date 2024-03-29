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
    pressure: number,
    humidity: number
}

type SingleWeatherData = {
    data: WeatherData,
    dt: Date,
}

type MultiWeatherData = {
    datas: Array<WeatherData>,
    dt: Date,
}

type SetDataFunc = React.Dispatch<any>;

// examples
// 
// https://api.openweathermap.org/data/2.5/weather?lat=58.0050&lon=56.1456&units=metric&appid=f4ae72126d5ca78c5dd8fe868451636d
// 
// https://api.openweathermap.org/data/2.5/forecast?lat=58.0050&lon=56.1456&units=metric&cnt=40&appid=f4ae72126d5ca78c5dd8fe868451636d

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
    setCityIndex = null;
    setModeIndex = null;
    setWeatherDataFunc = null;

    cacheLifeTime = 60 * 1000;

    constructor(setModeIndex: SetDataFunc, setCityIndex: SetDataFunc, setWeatherDataFunc: SetDataFunc){
        this.setModeIndex = setModeIndex;
        this.setCityIndex = setCityIndex;
        this.setWeatherDataFunc = setWeatherDataFunc;

        this.cityDatas.map((cityData, index) => {
            this.cachedSingleDatas[index] = null;
            this.cachedMultiDatas[index] = null;
        })
    }

    getModeNames(){
        return [
            "Прогноз на сегодня", 
            "Прогноз на 5 дней"
        ];
    }

    getModeOnClickHandlers(cityIndex){
        return Array.from(
            this.getModeNames(), 
            (mode, index) => (() => {
                this.setModeIndex(index); 
                this.setUsedWeatherData(index, cityIndex)
            })
        );
        // weatherHelper.setModeIndex(index); weatherHelper.setUsedWeatherData(index, props.cityIndex); 
    }

    getCityDataByIndex(cityIndex: number){
        return this.cityDatas[cityIndex];
    }

    getCityNames(){
        return Array.from(this.cityDatas, (cityData: CityData) => cityData.name);
    }

    getCityOnClickHandlers(modeIndex){
        return Array.from(
            this.getCityNames(), 
            (cityName, index) => (() => {
                this.setCityIndex(index); 
                this.setUsedWeatherData(modeIndex, index);
            })
        );
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

    refreshCacheSingleWeatherData(cityIndex: number): void {
        const cityData = this.getCityDataByIndex(cityIndex);
        if (!cityData){
            this.setWeatherDataFunc(null);
            return;
        }

        const singleWeatherDataURL = `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&units=metric&appid=${this.openWeatherMapAppId}`;
        // const singleWeatherDataURL = `http://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&units=metric&appid=${this.openWeatherMapAppId}`;
        // const singleWeatherDataURL = `api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&units=metric&appid=${this.openWeatherMapAppId}`;
        axios.get(singleWeatherDataURL, {
            // withCredentials: false,
        }).then(res => {
            // console.log(res);
            let resdata = res.data;
            let data = {
                // dt: res["dt"],
                checkdate: Date.now(),
                data: {
                    dt: resdata["dt"] * 1000,  // s -> ms
                    temp: resdata["main"]["temp"],
                    temp_feels_like: resdata["main"]["feels_like"],
                    temp_min: resdata["main"]["temp_min"],
                    temp_max: resdata["main"]["temp_max"],
                    pressure: resdata["main"]["pressure"],
                    humidity: resdata["main"]["humidity"],
                },
            };

            this.cachedSingleDatas[cityIndex] = data;

            console.log("this.setWeatherDataFunc(data)");
            console.log(data);
            this.setWeatherDataFunc(data);
        }).catch(error => {
            console.log(error);
            this.setWeatherDataFunc(null);
            return;
        });
    }

    // setSingleWeatherDataByIndex(cityIndex: number): SingleWeatherData {
    //     let cached = this.cachedSingleDatas[cityIndex];
    //     if (this.isValidSingleWeatherData(cached)){
    //         return cached;
    //     }else{
    //         this.refreshCacheSingleWeatherData(cityIndex);
    //         return null;
    //     }
    // }

    refreshCacheMultiWeatherData(index: number): void {
        const cityData = this.getCityDataByIndex(index);
        if (!cityData){
            this.setWeatherDataFunc(null);
            return;
        }

        const singleWeatherDataURL = `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&units=metric&appid=${this.openWeatherMapAppId}`;
        const multiWeatherDataURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lon}&units=metric&cnt=40&appid=${this.openWeatherMapAppId}`;
        // const multiWeatherDataURL = `api.openweathermap.org/data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lon}&units=metric&cnt=40&appid=${this.openWeatherMapAppId}`;
        // https://api.openweathermap.org/data/2.5/forecast?lat=58.0050&lon=56.1456&units=metric&cnt=40&appid=f4ae72126d5ca78c5dd8fe868451636d
        axios.get(multiWeatherDataURL, {
            // withCredentials: false,
        }).then(res => {
            let resdata = res.data;
            console.log(resdata);
            let day_datas = [
                resdata["list"][4],
                resdata["list"][12],
                resdata["list"][20],
                resdata["list"][28],
                resdata["list"][36],
            ];
            let data = {
                checkdate: Date.now(),
                datas: [
                    {
                        dt: day_datas[0]["dt"] * 1000,  // s -> ms
                        temp: day_datas[0]["main"]["temp"],
                        temp_feels_like: day_datas[0]["main"]["feels_like"],
                        temp_min: day_datas[0]["main"]["temp_min"],
                        temp_max: day_datas[0]["main"]["temp_max"],
                        pressure: day_datas[0]["main"]["pressure"],
                        humidity: day_datas[0]["main"]["humidity"],
                    },
                    {
                        dt: day_datas[1]["dt"] * 1000,  // s -> ms
                        temp: day_datas[1]["main"]["temp"],
                        temp_feels_like: day_datas[1]["main"]["feels_like"],
                        temp_min: day_datas[1]["main"]["temp_min"],
                        temp_max: day_datas[1]["main"]["temp_max"],
                        pressure: day_datas[1]["main"]["pressure"],
                        humidity: day_datas[1]["main"]["humidity"],
                    },
                    {
                        dt: day_datas[2]["dt"] * 1000,  // s -> ms
                        temp: day_datas[2]["main"]["temp"],
                        temp_feels_like: day_datas[2]["main"]["feels_like"],
                        temp_min: day_datas[2]["main"]["temp_min"],
                        temp_max: day_datas[2]["main"]["temp_max"],
                        pressure: day_datas[2]["main"]["pressure"],
                        humidity: day_datas[2]["main"]["humidity"],
                    },
                    {
                        dt: day_datas[3]["dt"] * 1000, // s -> ms
                        temp: day_datas[3]["main"]["temp"],
                        temp_feels_like: day_datas[3]["main"]["feels_like"],
                        temp_min: day_datas[3]["main"]["temp_min"],
                        temp_max: day_datas[3]["main"]["temp_max"],
                        pressure: day_datas[3]["main"]["pressure"],
                        humidity: day_datas[3]["main"]["humidity"],
                    },
                    {
                        dt: day_datas[4]["dt"] * 1000, // s -> ms
                        temp: day_datas[4]["main"]["temp"],
                        temp_feels_like: day_datas[4]["main"]["feels_like"],
                        temp_min: day_datas[4]["main"]["temp_min"],
                        temp_max: day_datas[4]["main"]["temp_max"],
                        pressure: day_datas[4]["main"]["pressure"],
                        humidity: day_datas[4]["main"]["humidity"],
                    },
                ]
            };

            this.cachedMultiDatas[index] = data;

            this.setWeatherDataFunc(data);
        }).catch(error => {
            console.log(error);
            this.setWeatherDataFunc(null);
            return;            
        });
    }

    setUsedWeatherData(modeIndex: number, cityIndex: number): void{
        console.log(`setUsedWeatherData(modeIndex = ${modeIndex}, cityIndex = ${cityIndex})`);
        if (modeIndex == 0){
            let cached = this.cachedSingleDatas[cityIndex];
            if (this.isValidSingleWeatherData(cached)){
                this.setWeatherDataFunc(cached);
            }else{
                this.refreshCacheSingleWeatherData(cityIndex);
                this.setWeatherDataFunc(null);
            }                
        }else if (modeIndex == 1){
            let cached = this.cachedMultiDatas[cityIndex];
            if (this.isValidMultiWeatherData(cached)){
                this.setWeatherDataFunc(cached);
            }else{
                this.refreshCacheMultiWeatherData(cityIndex);
                this.setWeatherDataFunc(null);
            }
        }else{
            throw new Error("WeatherHelper.setUsedWeatherData: wrong modeIndex!")
        }
    }

    // getSingleWeatherDataByIndex(index: number): SingleWeatherData {
    //     let cached = this.cachedSingleDatas[index];
    //     if (this.isValidSingleWeatherData(cached)){
    //         return cached;
    //     }else{
    //         this.refreshCacheSingleWeatherData(index);
    //         return null;
    //     }
    // }

    // getMultiWeatherDataByIndex(index: number): MultiWeatherData {
    //     let cached = this.cachedMultiDatas[index];
    //     if (this.isValidMultiWeatherData(cached)){
    //         return cached;
    //     }else{
    //         this.refreshCacheMultiWeatherData(index);
    //         return null;
    //     }
    // }
}

// const weatherHelper = new WeatherHelper();

export { CityData, WeatherHelper };