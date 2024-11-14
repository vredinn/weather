<template>
  <div class="forecast">
    <div v-for="date in forecast.list" :key="date.dt" class="forecast__card">
      <div class="forecast__date">
        {{formatDate(date.dt)}}
      </div>
      <div class="forecast__info">
        <img class="forecast__icon" v-bind:src = "`https://openweathermap.org/img/wn/${date.weather[0].icon}@2x.png`" alt="weather">

        <div class="forecast__temp">
          {{ date.main.temp }} {{ units }}
        </div>
      </div>
      <div class="forecast__descr">
        {{ date.weather[0].description }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['forecast','units'],
    methods:{
      formatDate(timestamp) {
        let date = new  Date(timestamp * 1000);
        return date.toLocaleDateString() + ' ' + ("0" + date.getHours()).substr(-2) + ':' + "0" + date.getMinutes();
      }
    }
  }   
</script>

<style>
.forecast{
  width: 100%;
  display: flex;
  overflow: auto;
  gap: 10px;
}
.forecast__card{  
  border-radius: 10px;
  box-shadow: 0px 0px 5px black ;
  background-color: #0d112e;
  margin: 0 auto;
  padding: 20px;
}

.forecast__temp{
  text-wrap:nowrap;
}
.forecast__info{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>