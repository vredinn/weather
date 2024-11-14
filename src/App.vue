<template>
  <h1>{{ $t('title.weather') }}</h1>
  <div class="weather">
    <div class="localization">
      <button class="localization__button" @click="updateLocale('en')">En</button>
      <button class="localization__button" @click="updateLocale('ru')">Ru</button>
    </div>
    <p class="weather__city-label" >{{$t('subtitle.city')}}</p>
    <select class="weather__city-select" v-model="selectedCity" @change="updateCity()">
      <option v-for="option in options" :value="option.value" v-bind:key="option.value">
        {{ option.text }}
      </option>
    </select>    
    <p class="weather__units-label" >{{$t('subtitle.units')}}</p>
    <select class="weather__units-select" v-model="selectedUnits" @change="updateCity()">
      <option v-for="unit in units" :value="unit.value" v-bind:key="unit.value">
        {{ unit.text }}
      </option>
    </select>
    <div v-if="!weather_data">
      <p>{{$t('loading')}}...</p>
      <span class="loader"></span>
    </div>
    <div v-else>
      <div class="weather__main">
        <img class="weather__img" v-bind:src="'https://openweathermap.org/img/wn/' + weather_data.weather[0].icon + '@2x.png'" alt="weather">
        <div>
          <p class="weather__temp">{{ weather_data.main.temp }} {{unitText}}</p>
          <p class="weather__descr">{{ weather_data.weather[0].description }}</p>
        </div>      
      </div>
      <div class="wheather__second">
        <p class="weather__descr">            
          {{ $t('weatherDescr.feels_like') }}: {{ weather_data.main.feels_like }} {{unitText}}
        </p>
        <p class="weather__descr">            
          {{ $t('weatherDescr.humidity') }}: {{ weather_data.main.humidity }}%
        </p>
        <p class="weather__descr">            
          {{ $t('weatherDescr.pressure') }}: {{ weather_data.main.pressure }} {{ $t('units_descr.pressure') }}
        </p>
        <p class="weather__descr">            
            {{ $t('weatherDescr.wind') }}: {{ weather_data.wind.speed }} {{windSpeed}}
        </p>
        <div class="weather__descr">          
          {{ $t('weatherDescr.wind_deg') }}:  {{ weather_data.wind.deg }}°
        </div>
      </div>
    </div>    
  </div>
  
  <div v-if="forecast_data">
    <h2>{{ $t('title.forecast') }}</h2>
    <forecastBlock :forecast="forecast_data" :units="unitText"></forecastBlock>
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
      selectedUnits : null,
      loading : null,
      unitText : "",
      windSpeed : "",
      options : [],
      units : []
    }
  },
  methods: {
    updateLocale(locale){
      this.$i18n.locale = locale;
      this.options = [
        { text: this.$t('city.n_tagil', this.$i18n.locale), value: '520494' },
        { text: this.$t('city.alapayevsk', this.$i18n.locale), value: '1511954' },
        { text: this.$t('city.ekat', this.$i18n.locale), value: '1486209' },
        { text: this.$t('city.moscow', this.$i18n.locale), value: '524901' },
        { text: this.$t('city.spb', this.$i18n.locale), value: '498817' }
      ]
      this.units = [
        { text: this.$t('units.metric', this.$i18n.locale), value: 'metric' },
        { text: this.$t('units.imperial', this.$i18n.locale), value: 'imperial' },
        { text: this.$t('units.standard', this.$i18n.locale), value: 'standard' }
      ]  
      this.updateCity()      
      localStorage.setItem("locale", this.$i18n.locale);
    },
    updateCity() {
      this.weather_data = null;
      this.forecast_data = null;
      fetch("https://api.openweathermap.org/data/2.5/weather?id=" + this.selectedCity + "&appid=ff97a551298bf965a9084ec70876aa54&units="+ this.selectedUnits + "&lang="+this.$i18n.locale)
        .then(resp=>resp.json())
        .then(json=>{
        this.weather_data=json;
      });
      fetch("https://api.openweathermap.org/data/2.5/forecast?id=" + this.selectedCity + "&appid=ff97a551298bf965a9084ec70876aa54&units="+ this.selectedUnits + "&lang="+this.$i18n.locale)
        .then(resp=>resp.json())
        .then(json=>{
        this.forecast_data=json;
      });
      switch (this.selectedUnits){
        case 'metric':
          this.unitText="C°";
          this.windSpeed = this.$t('units_descr.wind_m', this.$i18n.locale);
          break;
        case 'imperial':
          this.unitText="F°";
          this.windSpeed = this.$t('units_descr.wind_miles', this.$i18n.locale);
          break;
        case 'standard':
          this.unitText="K";          
          this.windSpeed = this.$t('units_descr.wind_m', this.$i18n.locale);
          break;
      }
      localStorage.setItem("city", this.selectedCity);
      localStorage.setItem("units", this.selectedUnits);
    },
  },
  mounted(){
    localStorage.getItem('city') ? this.selectedCity = localStorage.getItem('city') : this.selectedCity = '520494',    
    localStorage.getItem('units') ? this.selectedUnits = localStorage.getItem('units') : this.selectedUnits = 'metric',
    localStorage.getItem('locale') ? this.$i18n.locale = localStorage.getItem('locale') : this.$i18n.locale = 'ru',
    this.options = [
        { text: this.$t('city.n_tagil', this.$i18n.locale), value: '520494' },
        { text: this.$t('city.alapayevsk', this.$i18n.locale), value: '1511954' },
        { text: this.$t('city.ekat', this.$i18n.locale), value: '1486209' },
        { text: this.$t('city.moscow', this.$i18n.locale), value: '524901' },
        { text: this.$t('city.spb', this.$i18n.locale), value: '498817' }
      ],
    this.units = [
        { text: this.$t('units.metric', this.$i18n.locale), value: 'metric' },
        { text: this.$t('units.imperial', this.$i18n.locale), value: 'imperial' },
        { text: this.$t('units.standard', this.$i18n.locale), value: 'standard' }
     ]
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
    position: relative;
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
  .weather__units-select{
    padding: 10px;
    margin-top: 10px;
    font-size: 1rem;
    border-radius: 10px;
    text-align: center;
  }
  .localization{
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .localization__button{
    margin-left: 5px;
    background-color: #343446;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
  }
</style>