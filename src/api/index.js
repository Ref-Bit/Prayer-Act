import axios from 'axios'

const apiTimesURL = 'http://api.aladhan.com/v1/'
const apiAyahURL = 'https://api.alquran.cloud/v1/'


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

export const getPrayerTimesCalendar = async (city, country, month, year) => {
  let changeURL = `${apiTimesURL}calendarByCity?city=${city}&country=${country}&method=3&month=${month}&year=${year}`

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

export const getPrayerTimesCalendarDaily = async (city, country) => {
  let changeURL = `${apiTimesURL}timingsByCity?city=${city}&country=${country}&method=3`

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


export const getRandomAyah = async (random, locale, identifier) => {

  if( locale === 'ar' ){
    try {
      const { data } = await axios(`${apiAyahURL}ayah/${random}/${locale}.${identifier}`)

      return data
    } catch (error) {
        console.log(error)
    }
  }else{
    try {
      const { data } = await axios(`${apiAyahURL}ayah/${random}/${locale}.${identifier}`)

      return data
    } catch (error) {
        console.log(error)    
    }
  }
}

export const getAyahReciters = async (locale) => {
  try {
    const { data } = await axios(`${apiAyahURL}edition?format=audio&language=${locale}&type=versebyverse`)

    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAyahAudio = async (num, identifier) => {
  try {
    const { data } = await axios(`${apiAyahURL}ayah/${num}/${identifier}`)

    return data
  } catch (error) {
    console.log(error)
  }
}