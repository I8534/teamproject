import React from 'react'
import './WeatherNow.css'
import { useState, useEffect } from "react";

const WeatherNow = () => {

  const [airQuality, setAirQuality] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchAirQuality = async () => {
      const response = await fetch("https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=69MDcrrkbf0Z3ZW4LFyqSZ%2BLToQPK3vjVrDrzz3qtpGyGG2JezYDMin%2FLsyv3NWBK%2BejgMVU4p879wUSlznU1Q%3D%3D&returnType=json&numOfRows=100&pageNo=1&sidoName=%EB%8C%80%EC%A0%84&ver=1.0");
      const data = await response.json();
      setAirQuality(data.response.body.items[11].pm10Value);
    };

    const fetchWeather = async () => {
      const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=36.3617&lon=127.3868&appid=f97e7ef1034e0c950eb56df741876340&units=metric");
      const data = await response.json();
      setWeather(data);
    };

    fetchAirQuality();
    fetchWeather();

    const interval = setInterval(() => {
      fetchAirQuality();
      fetchWeather();
    }, 60000); // 1분마다 API 호출
    return () => clearInterval(interval);
  }, []);

  if (!airQuality || !weather) {
    return <div>Loading...</div>;
  }

  const { pm10, pm25 } = airQuality;
  const { temp, weather: weatherInfo } = weather;

  let image;
  if (pm10 > 150 || pm25 > 75) {
    image = "";
  } else if (pm10 > 80 || pm25 > 35) {
    image = "";
  } else if (pm10 > 30 || pm25 > 15) {
    image = "";
  } else {
    image = "";
  }

  return (
    <div>
      <div className='white-box'>
        <div>
          <img src={image} alt="Air Pollution" />
          <p>PM10: {pm10}</p>
          <p>PM2.5: {pm25}</p>
          <p>온도: {temp}℃</p>
          <p>날씨: {weatherInfo[0].main}</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherNow;




// setAirQuality25(data.response.body.items[11].pm25Value);
