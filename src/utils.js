import { useState, useEffect } from 'react';
import { getPrayerTimesCalendar, getCityCountry } from './api'

export const useCalender = () => {
  const [ city, setCity] = useState('')
  const [ country, setCountry ] = useState('')
  const [ today, setToday ] = useState(0)
  const [ month, setMonth ] = useState(0)
  const [ year, setYear ] = useState(0)
  const [ calender, setCalender ] = useState([])

  useEffect(() => {
    let date = new Date()
    
    setMonth(date.getUTCMonth())
    setYear(date.getUTCFullYear())      
    setToday(date.getDate())

    getCityCountry().then(( data ) => {
      setCity(data.city)
      setCountry(data.country_name)
      
      if(city !== '' && country !== ''){
        getPrayerTimesCalendar(city, country, month+1, year).then((data) => {
          setCalender(data)

          const row = document.querySelector(`.row-${today}`)
          today === date.getDate() ? row.className = 'today' : row.className = ''
          row.scrollIntoView({ behavior: 'smooth', block: 'center'})

        }).catch( err => console.log(err) )
      }else{
        return
      }
    }).catch( err => console.log(err) )

  }, [city, country, today, month, year])

  return [calender, month]
}

export const shuffle = (array) => {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
