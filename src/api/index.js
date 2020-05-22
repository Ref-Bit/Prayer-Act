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

export const getPrayerTimesCalendarDaily = async (city, country, method, lat, school, midnight) => {
  let changeURL = `${apiTimesURL}timingsByCity?city=${city}&country=${country}&method=${method}&latitudeAdjustmentMethod=${lat}&school=${school}&midnightMode=${midnight}`

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


export const getRandomAyah = async (random, identifier, language) => {
  try {
    if(language !=='ar'){
      const { data } = await axios(`${apiAyahURL}ayah/${random}/${identifier}`)
  
      return data
    }else{
      const { data } = await axios(`${apiAyahURL}ayah/${random}`)
  
      return data
    }
  } catch (error) {
      console.log(error)
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

export const getTranslations = async (locale) => {
  try{
    const { data } = await axios(`${apiAyahURL}edition?format=text&language=${locale}&type=translation`)
    
    return data
  } catch (error) {
    console.log(error)
  }
}