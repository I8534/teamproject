import React from 'react'
import './WeatherNow.css'
import { useState, useEffect } from "react";


const WeatherNow = () => {
  // 미세먼지 10 정하는 스테이트
  const [airQuality, setAirQuality] = useState(null);
  // 미세먼지 25 정하는 스테이트
  const [airQuality2, setAirQuality2] = useState(null);
  // 날씨상태 알려주는 스테이트
  const [weather, setWeather] = useState(null);
  // 온도 정하는 스테이트
  const [temper, setTemper] = useState(null);

  useEffect(() => {
    const fetchAirQuality = async () => {
      const response = await fetch("https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=69MDcrrkbf0Z3ZW4LFyqSZ%2BLToQPK3vjVrDrzz3qtpGyGG2JezYDMin%2FLsyv3NWBK%2BejgMVU4p879wUSlznU1Q%3D%3D&returnType=json&numOfRows=100&pageNo=1&sidoName=%EB%8C%80%EC%A0%84&ver=1.0");
      const data = await response.json();
      setAirQuality(data.response.body.items[11].pm10Value);
      setAirQuality2(data.response.body.items[11].pm25Value);
    };

    const fetchWeather = async () => {
      const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=36.3617&lon=127.3868&appid=f97e7ef1034e0c950eb56df741876340&units=metric");
      const data = await response.json();
      setWeather(data.weather[0].main);
      setTemper(data.main.temp);
    };

    fetchAirQuality();
    fetchWeather();

    const interval = setInterval(() => {
      fetchAirQuality();
      fetchWeather();
    }, 600000); // 10분마다 API 호출
    return () => clearInterval(interval);
  }, []);

  if (!airQuality || !weather) {
    return <div>Loading...</div>;
  }

  const pm10  = airQuality;
  const pm25 = airQuality2;
  const temp = temper;
  const weath = weather;
  


  let image_dust;
  let txt_dust;
  if (pm10 > 150) {
    image_dust = "./teamproject-img-main/icon/finedust-red.png";
    txt_dust ="매우 나쁨"
  } else if (pm10 > 80) {
    image_dust = "./teamproject-img-main/icon/finedust-orange.png";
    txt_dust ="나쁨"
  } else if (pm10 > 30) {
    image_dust = "./teamproject-img-main/icon/finedust-green.png";
    txt_dust ="보통"
  } else {
    image_dust = "./teamproject-img-main/icon/finedust-blue.png";
    txt_dust ="좋음"
  }

  let image_dust2;
  let txt_dust2;
  if (pm25 > 75) {
    image_dust2 = "./teamproject-img-main/icon/finedust-red.png";
    txt_dust2 ="매우 나쁨"
  } else if (pm25 > 35) {
    image_dust2 = "./teamproject-img-main/icon/finedust-orange.png";
    txt_dust2 ="나쁨"
  } else if (pm25 > 15) {
    image_dust2 = "./teamproject-img-main/icon/finedust-green.png";
    txt_dust2 ="보통"
  } else {
    image_dust2 = "./teamproject-img-main/icon/finedust-blue.png";
    txt_dust2 ="좋음"
  }




  let image_weath;
  if (weath == 'Clear') {
    image_weath = "./teamproject-img-main/icon/weather-sun.png";
  } else if (weath == 'Clouds') {
    image_weath = "./teamproject-img-main/icon/weather-cloud.png";
  } else if (weath == 'Snow') {
    image_weath = "./teamproject-img-main/icon/weather-snow.png";
  } else if (weath == 'Rain') {
    image_weath = "./teamproject-img-main/icon/weather-cloud-rain.png";
  } else if (weath == 'Thunderstorm') {
    image_weath = "./teamproject-img-main/icon/weather-cloud-lighting-rain.png";
  } else if (weath == 'Drizzle') {
    image_weath = "./teamproject-img-main/icon/weather-cloud-rain.png";
  } else {
    image_weath = "./teamproject-img-main/icon/weather-cloud.png";
  } 

  let weath_condition;
  if (weath == 'Clear') {
    weath_condition = "맑음";
  } else if (weath == 'Clouds') {
    weath_condition = "구름";
  } else if (weath == 'Snow') {
    weath_condition = "눈";
  } else if (weath == 'Rain') {
    weath_condition = "비";
  } else if (weath == 'Thunderstorm') {
    weath_condition = "번개";
  } else if (weath == 'Drizzle') {
    weath_condition = "이슬비";
  } else {
    weath_condition = "맑음";
  } 


  return (
    <div>
      <div className='box'>
        <div className='small-box1'>
          <img className='weather-box' src={image_weath} alt="weather condition" />
          <p>{temp}</p>
          <p>{weath_condition}</p>
          <p style={{color : '#227cff'}}>{(temp-20).toFixed(2)}°</p>
          <p style={{color : '#ff1515'}}>{temp+3}°</p>
          <p style={{color : '#9b9b9b'}}>대전광역시</p>
        </div>

        <div className='small-box2'>
          <p>미세</p>
          <img className="dust-box" src={image_dust} alt="Air Pollution" />
          <p style={ txt_dust == "매우 나쁨" ? { color:'red'} : ( txt_dust == "나쁨" ? {color : 'orange'} : ( txt_dust == "보통" ? {color : 'green'} : ( txt_dust == "좋음" ? {color : 'blue'} : {color : 'blue'} ) ) ) }>{txt_dust}</p>
          <p>초미세</p>
          <img className="dust-box2" src={image_dust2} alt="Air Pollution2" />
          <p style={ txt_dust2 == "매우 나쁨" ? { color:'red'} : ( txt_dust2 == "나쁨" ? {color : 'orange'} : ( txt_dust2 == "보통" ? {color : 'green'} : ( txt_dust2 == "좋음" ? {color : 'blue'} : {color : 'blue'} ) ) ) }>{txt_dust2}</p>
          <p style={{color : '#9b9b9b'}}>대전광역시</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherNow;

