<template>
  <h1>Приложение погоды</h1>
  <div class="weather">
    <p class="weather__city-label" >Город</p>
    <select class="weather__city-select" v-model="selectedCity" @change="updateCity()">
      <option v-for="option in options" :value="option.value" v-bind:key="option.value">
        {{ option.text }}
      </option>
    </select>
    <div v-if="!weather_data">
      <p>Загрузка...</p>
      <span class="loader"></span>
    </div>
    <div v-else>
      <div class="weather__main">
        <img class="weather__img" v-bind:src="'https://openweathermap.org/img/wn/' + weather_data.weather[0].icon + '@2x.png'" alt="weather">
        <div>
          <p class="weather__temp">{{ weather_data.main.temp }} C°</p>
          <p class="weather__descr">{{ weather_data.weather[0].description }}</p>
        </div>      
      </div>
      <div class="wheather__second">
        <p class="weather__descr">            
          Ощущается как: {{ weather_data.main.feels_like }} C°
        </p>
        <p class="weather__descr">            
            Влажность: {{ weather_data.main.humidity }}%
        </p>
        <p class="weather__descr">            
            Давление: {{ weather_data.main.pressure }} мм рт.ст.
        </p>
        <p class="weather__descr">            
            Ветер: {{ weather_data.wind.speed }} м/с
        </p>
        <div class="weather__descr">          
          Направление:  {{ weather_data.wind.deg }}°
        </div>
      </div>
    </div>    
  </div>
  
  <div v-if="forecast_data">
    <h2>Прогноз на 5 дней</h2>
    <forecastBlock :forecast="forecast_data"></forecastBlock>
  </div>
</template>

<script>

import forecastBlock from './components/forecastBlock.vue';

export default {
  name: 'App',
  data(){
    return{
      weather_data : null,
      forecast_data : null,
      selectedCity : null,
      loading : null,
      options : [
        { text: 'Нижний Тагил', value: '520494' },
        { text: 'Алапаевск', value: '1511954' },
        { text: 'Екатеринбург', value: '1486209' },
        { text: 'Москва', value: '524901' },
        { text: 'Санкт Петербург', value: '498817' }
      ]
    }
  },
  methods: {
    updateCity() {
      this.weather_data = null;
      this.forecast_data = null;
      fetch("https://api.openweathermap.org/data/2.5/weather?id=" + this.selectedCity + "&appid=ff97a551298bf965a9084ec70876aa54&units=metric&lang=ru")
        .then(resp=>resp.json())
        .then(json=>{
        this.weather_data=json;
      });
      fetch("https://api.openweathermap.org/data/2.5/forecast?id=" + this.selectedCity + "&appid=ff97a551298bf965a9084ec70876aa54&units=metric&lang=ru")
        .then(resp=>resp.json())
        .then(json=>{
        this.forecast_data=json;
      });
    },
  },
  mounted(){
    this.selectedCity = '520494',
    this.updateCity();
  },
  components: {
    forecastBlock
  }
}
</script>

<style>
  body{  
    background-color: #24243c;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #d2d6d9;
    margin-top: 60px;
  }
  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  @keyframes rotation {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
  } 
  .weather__city-select{
    padding: 10px;
    margin-top: 10px;
    font-size: 1rem;
    border-radius: 10px;
    text-align: center;
  }
  .weather__city-label{
    font-size: 1.5rem;
    margin: 0;
  }
  .weather{  
    border-radius: 10px;
    box-shadow: 0px 0px 5px black ;
    background-color: #0d112e;
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
  }
  .weather__main{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .weather__img{
    width: 100px;
    filter: drop-shadow(0 0 0.4rem rgba(130, 130, 130, 0.5));
  }
  .weather__temp{
    font-size: 1.5rem;
    margin: 0;
  }
  .weather__descr{
    word-wrap:normal;
    margin: 0;
    margin-top: 5px;
  }
</style>