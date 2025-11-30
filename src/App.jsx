import { useState,useEffect } from 'react';
import './App.css'
import './index.css';
import searchicon from './assets/search.png'
import cloudicon from './assets/cloudy.png'
import drizzleicon from './assets/drizzle.png'
import humiditylogo from './assets/humidity logo.png'
import humidityicon from './assets/humidity.png'
import rainicon from './assets/rain.png'
import searchlogo from './assets/search.png'
import snowicon from './assets/snow.png'
import sunicon from './assets/sun.png'
import windicon from './assets/wind.png'
import windspeedlogo from './assets/windspeed logo.png'

const Weatherdetails=({icon,temp,city,country,lat,log,humidity,wind,notfound})=>{
  if(notfound){
    return(
      <div className="notfound">
        <h2>city not found</h2>
      </div>
          );
    }
    
  return( 
  <>
  <div>
    <div>
     

    <div className="image">
      <img src={icon} alt="sun" className="images"/>
    </div>
    <div className="temp">{temp}°C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    </div>
    <div>

    </div>
  </div>

    <div className="cord">
      <div>
        <span className="lat">latitude-</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className="log">longitude-</span>
        <span>{log}</span>
      </div>
    </div>
    <div className="data-container">
      <div className="element">
        <img src={humiditylogo} alt="humidity" className="search"/>
        <div className="data">
          <div className="humidity-percent">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={windspeedlogo} alt="windspeedlogo" className="search"/>
        <div className="data">
          <div className="wind-percent">{wind}Km/h</div>
          <div className="text">WindSpeed</div>
        </div>
      </div>
    </div>
  </>
  );
};

function App() {
  let apikey="6ab3da6b09b77a319f69f52787ab5bef";
  const[text,setText]=useState("chennai");
  const[icon,seticon]=useState(sunicon);
  const[temp,settemp]=useState(0);
  const[city,setcity]=useState("Chennai");
  const[country,setcountry]=useState("India");
  const[lat,setlat]=useState(0);
  const[log,setlog]=useState(0);
  const[humidity,sethumidity]=useState(0);
  const[wind,setwind]=useState(0);
  const[citynotfound,setcitynotfound]=useState(false);
  const[loading,setloading]=useState(false);
  const[notfound,setnotfound]=useState(false);
  
const weathericonmap = {
  "01d": sunicon,
  "01n": sunicon,
  "02d": humidityicon,
  "02n": humidityicon,
  "03d": drizzleicon,
  "03n": drizzleicon,
  "04d": drizzleicon,
  "04n": windicon,
  "09d": windicon,
  "09n": windicon,
  "10d": rainicon,
  "10n": rainicon,
  "13d": snowicon,
  "13n": snowicon,
};

  const search = async()=>{
    setloading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=Metric`;
    try{
      let res=await fetch(url);
      let data=await res.json();
      if(data.cod==="404"){
        setnotfound(true);
        /*setTimeout(()=>{
          setnotfound(false);
        },3000);*/
        console.log("citynotfound");
        setcitynotfound(true);
        setloading(false);
        return;
      }
      sethumidity(data.main.humidity);
      setwind(data.wind.speed);
      settemp(Math.floor(data.main.temp));
      setcity(data.name);
      setcountry(data.sys.country);
      setlat(data.coord.lat);
      setlog(data.coord.lon);
      const weathericoncode=data.weather[0].icon;
      seticon(weathericonmap[weathericoncode] || sunicon);
      setcitynotfound(false);
      setnotfound(false);
      
    }
    catch(error){
    console.error("An error occured:",error.message);
    setInterval(()=>{
      setnotfound(true)
    },3000)
    setnotfound(false);
    }
    finally{
    setloading(false);
  }
}
const handlecity=(e)=>{
  setText(e.target.value)
}
const handlekeydown=(e)=>{
  if(e.key==="Enter"){
    search();
  }
}
useEffect(()=>{
  search()
},[]);
  return (
    <>
    <div className="container">
      <div className="input-container">
        <input type="text"
        className="cityinput"
        placeholder="search city"
        onChange={handlecity}
        value={text}
        onKeyDown={handlekeydown}
        />
        
        <div className="search-icon">
          <img src={searchlogo} className="search" onClick={()=>search()}/>
        </div>
        
      </div>
      <Weatherdetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind} notfound={notfound}/>
      <p className="copyright">
        Designed by <span>Madeshwaran</span>
      </p>
    </div>
    </>
  )
}

export default App
