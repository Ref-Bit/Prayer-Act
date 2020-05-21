import axios from 'axios'

const apiURL = 'http://api.aladhan.com/v1/'

export const getPrayerTimesCalendar = async (city, country, month, year) => {
  let changeURL = `${apiURL}calendarByCity?city=${city}&country=${country}&method=3&month=${month}&year=${year}`

  try {
    const { data: { data } } = await axios.get(changeURL);

    if(data !== null || data.length !== 0){
      return data   
    }else{
      return []
    }
  } catch (error) {
    console.log(error)
  }
}

export const getCityCountry = async () => {
  try {
    const { data } = await axios.get('https://freegeoip.app/json/')

    if(data !== null || data.length !== 0){
      return data   
    }else{
      return []
    }
  } catch (error) {
    console.log(error)
  }
}

export const getRandomAyah = async (random, locale, identifier) => {

  if( locale === 'ar' ){
    try {
      const { data } = await axios(`https://api.alquran.cloud/v1/ayah/${random}/${locale}.${identifier}`)

      return data
    } catch (error) {
        console.log(error)
    }
  }else{
    try {
      const { data } = await axios(`https://api.alquran.cloud/v1/ayah/${random}/${locale}.${identifier}`)

      return data
    } catch (error) {
        console.log(error)    
    }
  }
}

export const getAyahReciters = async (locale) => {
  try {
    const { data } = await axios(`http://api.alquran.cloud/v1/edition?format=audio&language=${locale}&type=versebyverse`)

    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAyahAudio = async (num, identifier) => {
  try {
    const { data } = await axios(`http://api.alquran.cloud/v1/ayah/${num}/${identifier}`)

    return data
  } catch (error) {
    console.log(error)
  }
}