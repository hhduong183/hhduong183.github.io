const getData=fetch('https://api.openweathermap.org/data/2.5/forecast?q=Hanoi&appid=09a71427c59d38d6a34f89b47d75975c&units=metric')
.then(res=>res.json())
.then(data=>{
   const listWeather= document.getElementById('weather-list');
   const itemWeather= data.list.map(item=>{
    return `
    <div>
      <p>Thời gian: ${item.dt_txt}</p>
      <p>Nhiệt độ: ${item.main.temp}°C</p>
      <p>Thời tiết: ${item.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="">
    </div>
  `;
   })
   listWeather.innerHTML=itemWeather.join('');
})