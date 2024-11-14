import { createI18n } from  'vue-i18n'

const messages = { 
  en: { 
    title: { 
        weather: 'Weather app',
        forecast: 'Forecast for 5 days'
    },
    subtitle:{
        city: 'City',
        units: 'Units'
    },
    weatherDescr:{
        feels_like: 'Feels like',
        humidity: 'Humidity',
        pressure: 'Pressure',
        wind: 'Wind',
        wind_deg: 'Wind direction'
    },
    city:{
        alapayevsk: 'Alapayevsk',
        n_tagil: 'Nyzhniy Tagil',
        ekat: 'Ekaterinburg',
        moscow: 'Moscow',
        spb: 'Saint Petersburg'
    },
    units:{
        metric:'Celsius',
        imperial:'Fahrenheit',
        standard:'Kelvin'
    },
    units_descr:{
        pressure: 'mmHG',
        wind_m: 'm/s',
        wind_miles: 'miles/h'
    },
    loading: 'Loading'
  }, 
  ru: { 
    title: { 
        weather: 'Приложение погоды',
        forecast: 'Прогноз на 5 дней'
    },
    subtitle:{
        city: 'Город',
        units: 'Единицы измерения'
    },
    weatherDescr:{
        feels_like: 'Ощущается как',
        humidity: 'Влажность',
        pressure: 'Давление',
        wind: 'Ветер',
        wind_deg: 'Направление ветра'
    },
    city:{
        alapayevsk: 'Алапаевск',
        n_tagil: 'Нижний Тагил',
        ekat: 'Екатеринбург',
        moscow: 'Москва',
        spb: 'Санкт-Петербург'
    },
    units:{
        metric:'Цельсий',
        imperial:'Фарегнейт',
        standard:'Кельвин'
    },
    units_descr:{
        pressure: 'мм рт.ст.',
        wind_m: 'м/с',
        wind_miles: 'миль/ч'
    },
    loading: 'Загрузка'
  } 
}

const i18n = createI18n({ 
locale: 'ru', // set locale 
fallbackLocale: 'ru', // set fallback locale 
messages, // set locale messages 
})

export  default i18n
