import React, { useState, useEffect } from 'react';
import { getPrayerTimesCalendar, getCityCountry } from '../../api'
import { Spinner } from '..';
import months from '../../data/months.json'

export default () => {
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
          console.log(data)
          setCalender(data)

          let row = document.querySelector(`.row-${today}`)
          today === date.getDate() ? row.className = 'today' : row.className = ''
          row.scrollIntoView({ behavior: 'smooth', block: 'center'})

        }).catch( err => console.log(err) )
      }else{
        return
      }
    }).catch( err => console.log(err) )

  }, [city, country, today, month, year])

  if(calender === null || calender === undefined || calender.length === 0) return <Spinner />
  
  else{
    return (
      <div>
        <div className="md:px-32 py-8 w-full">
          <h1 className="text-2xl text-center mb-2">Gregorian Calender For {months[month]}</h1>
          <div className="shadow overflow-hidden rounded border-b border-gray-200">
            <table className="min-w-full bg-white">
              <thead className="bg-indigo-800 text-white">
                <tr>
                  <th className="text-start py-3 px-4 uppercase font-semibold text-sm">Day</th>
                  <th className="text-start py-3 px-4 uppercase font-semibold text-sm">Date</th>
                  <th className="text-start py-3 px-4 uppercase font-semibold text-sm">Imsak</th>
                  <th className="text-start py-3 px-4 uppercase font-semibold text-sm">Fajr</th>
                  <th className="text-start py-3 px-4 uppercase font-semibold text-sm">Sunrise</th>
                  <th className="text-start py-3 px-4 uppercase font-semibold text-sm">Dhuhr</th>
                  <th className="text-start py-3 px-4 uppercase font-semibold text-sm">Asr</th>
                  <th className="text-start py-3 px-4 uppercase font-semibold text-sm">Maghrib</th>
                  <th className="text-start py-3 px-4 uppercase font-semibold text-sm">Isha</th>
                  <th className="text-start py-3 px-4 uppercase font-semibold text-sm">Midnight</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                  {
                    calender.map((item, i) => 
                    <React.Fragment key={i}>
                    <tr className={`row-${i+1} text-center`}>
                      <td className="py-3 px-4">{item.date.gregorian.weekday.en} <br /> ({item.date.hijri.weekday.en})</td>
                      <td className="py-3 px-4">{item.date.readable}</td>
                      <td className="py-3 px-4">{item.timings.Imsak.slice(0, 5)}</td>
                      <td className="py-3 px-4">{item.timings.Fajr.slice(0, 5)}</td>
                      <td className="py-3 px-4">{item.timings.Sunrise.slice(0, 5)}</td>
                      <td className="py-3 px-4">{item.timings.Dhuhr.slice(0, 5)}</td>
                      <td className="py-3 px-4">{item.timings.Asr.slice(0, 5)}</td>
                      <td className="py-3 px-4">{item.timings.Maghrib.slice(0, 5)}</td>
                      <td className="py-3 px-4">{item.timings.Isha.slice(0, 5)}</td>
                      <td className="py-3 px-4">{item.timings.Midnight.slice(0, 5)}</td>
                    </tr>
                    </React.Fragment>
                  )
                  }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}