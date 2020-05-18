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
