//Today Variables
let today_name           = document.getElementById("today_name")
let today_number         = document.getElementById("today_number")
let today_month          = document.getElementById("today_month")
let today_city           = document.getElementById("today_city")
let today_degree         = document.getElementById("today_degree")
let today_condition      = document.getElementById("today_condition")
let todayConditionImg    = document.getElementById("todayConditionImg")
let humidity             = document.getElementById("humidity")
let wind                 = document.getElementById("wind")
let wind_direction       = document.getElementById("wind_direction")
let searchInput          = document.getElementById("searchInput")
let buttonSearch         = document.getElementById("buttonSearch")

//Tomorrow Variables
let nextDay_name                = document.getElementsByClassName("nextDay_name")
let nextdayConditionImg         = document.getElementsByClassName("nextdayConditionImg")
let next_max_temp               = document.getElementsByClassName("next_max_temp")
let next_min_temp               = document.getElementsByClassName("next_min_temp")
let next_conditionText          = document.getElementsByClassName("next_condition_text")

//fetch API 

async function getWeatherData(cityName)
{
    let weatherResponces = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=afee0db9ed8446cdb91123008232508&q=${cityName}&days=3`)
    let weatherData = await weatherResponces.json()
    return weatherData
    
}

async function getUserIp(){
    fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    getIpInfo (data.ip)
  })
  .catch((error) => {
    console.error('Error fetching IP address:', error)
    startApp()
});
}
getUserIp()

async function getIpInfo (data){
    const ip = `${data}`;
    const accessKey = '6a758302-852b-432a-ba4b-e5fedd90efc7';
    const url = 'https://apiip.net/api/check?ip='+ ip +'&accessKey='+ accessKey; 
    const response = await fetch(url);
    const result = await response.json();
    console.log(result.city);
    startApp(result.city)
  };

function displayTodayData(data) {
    let todayData = new Date()
    today_name.innerHTML = todayData.toLocaleDateString("en-US",{weekday:"long"})
    today_month.innerHTML = todayData.toLocaleDateString("en-US",{month:"long"})
    today_number.innerHTML = todayData.getDate()
    today_city.innerHTML = data.location.name
    today_degree.innerHTML = data.current.feelslike_c
    todayConditionImg.setAttribute("src","https:" + data.current.condition.icon)
    today_condition.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity + "%"
    wind.innerHTML = data.current.wind_kph + "km/h"
    wind_direction.innerHTML = data.current.wind_dir
    
}

function displayNextDay(data)
{
    let nextDayData = data.forecast.forecastday
    for(let i = 0 ; i < 2 ; i++)
    {
        let nextData = new Date(nextDayData[i+1].date)
        nextDay_name[i].innerHTML  = nextData.toLocaleDateString("en-US",{weekday:"long"})
        next_max_temp[i].innerHTML = nextDayData[i+1].day.maxtemp_c
        next_min_temp[i].innerHTML = nextDayData[i+1].day.mintemp_c
        next_conditionText[i].innerHTML = nextDayData[i+1].day.condition.text
        nextdayConditionImg[i].setAttribute("src","https:" + nextDayData[i+1].day.condition.icon) 
    }
}

async function startApp(city="cairo")
{
    let weatherData = await getWeatherData(city)
    if(!weatherData.error){
        displayTodayData(weatherData)
        displayNextDay(weatherData)
    }
    
}

startApp()

searchInput.addEventListener("input" , function() {
    startApp(searchInput.value)
})

buttonSearch.addEventListener("click" , function() {
    startApp(searchInput.value)
})

