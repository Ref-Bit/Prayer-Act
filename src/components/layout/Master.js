import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { getRandomAyah, getAyahReciters, getAyahAudio, getPrayerTimesCalendarDaily, getTranslations, getAsmaa } from '../../api';
import { muezzins, methods, latitudes, schools, midnight } from '../../data/data.json';
import asmaa from '../../data/asmaa_al_husna.json';
import { GlobalContext } from '../../context/Global';
import { Spinner } from '..';

export default () => {
  const { t } = useTranslation()
  const { language, city, country } = useContext(GlobalContext)
  const [ random, setRandom ] = useState(262)
  const [ identifier, setIdentifier ] = useState('en.asad')
  const [ reciter, setReciter ] = useState('')
  const [ reciters, setReciters ] = useState([])
  const [ audio, setAudio ] = useState([])
  const [ ayah, setAyah ] = useState([])
  const [ translations, setTranslations ] = useState([])
  const [ calender, setCalender ] = useState([])
  const [ muezzin, setMuezzin ] = useState('')
  const [ method, setMethod ] = useState(3)
  const [ lat, setLat] = useState(3)
  const [ school, setSchool ] = useState(0)
  const [ midnightMode, setMidnightMode ] = useState(0)
  const [ visible, setVisible ] = useState(12)
  
  useEffect(() => {
    getRandomAyah(random, identifier, language).then(({data}) => {
      setAyah(data)
    }).catch( err => console.log(err))

    getAyahReciters(language).then(({data}) => {
      setReciters(data)
    }).catch( err => console.log(err) )

    getTranslations(language).then(({data}) => {
      setTranslations(data)
    }).catch( err => console.log(err) )

    getPrayerTimesCalendarDaily(city, country, method, lat, school, midnightMode).then((data) => {
      setCalender(data)
    }).catch( err => console.log(err) )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, city, country, identifier, method, lat, school, midnightMode])

  const getNewAyah = () =>{
    let num = Math.floor(Math.random() * 6236) + 1
    const resetSelect = document.querySelector('#reciters')
    setRandom(num)
    
    getRandomAyah(num, identifier, language).then(({data}) => {
      setAyah(data)
      resetSelect.selectedIndex = 0
    }).catch( err => console.log(err))

    const audioElement = document.querySelector('#ayah-player')
    const audioSource = document.querySelector('#ayah-player > source')
    audioElement.autoPlay = false;audioElement.load();audioSource.src = '' ;
    setReciter('initial');
  }

  const reciteAyah = e => {
    const audioElement = document.querySelector('#ayah-player')
    setReciter(e.target.value);

    getAyahAudio(random, e.target.value).then(({data}) => {
      setAudio(data)
      audioElement.load();
      audioElement.play();
    }).catch( err => console.log(err) )
  }

  const translateAyah = e => e.target.value === 'initial' ? setIdentifier('en.asad') : setIdentifier(e.target.value)
  
  const playAzan = e => {
    const azanElement = document.querySelector('#azan-player')

    setMuezzin(e.target.value)
    azanElement.load();
    azanElement.play();
  }

  /* Prayer Times Calculator Selects */
  const handleMethod = e => setMethod(e.target.value)
  const handleLatitude = e => setLat(e.target.value) 
  const handleSchool = e => setSchool(e.target.value)
  const handleMidnight = e => setMidnightMode((e.target.value))

  const RenderSelect = ({ options, selected, handleChange, initial, id }) => {
    if (options.length === 0) {
      return null;
    }
  
    return (
      <select id={id} value={selected} onChange={handleChange} className={`${language === 'ar' ? 'text-sm ' : ''}block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none transition duration-500`}>
        <optgroup>
          <option value="initial">{initial}</option>
          {
            options.map((item, i) => (
              <option key={i} value={item.identifier}>{item.name}</option>
            ))
         }
        </optgroup>
      </select>
    );
  };

  const loadMore = () => {
    setTimeout(() => {
      setVisible(() => {
        return visible + 8;
      });
    }, 1000)
  }

  if(ayah === null || ayah === undefined || ayah.length === 0 ||
    asmaa === null || asmaa === undefined || asmaa.length === 0 ||
    calender === null || calender === undefined || calender.length === 0) return <Spinner />
  else{
    return (
      <div>
        <div className="text-center">
          <h1 className="text-4xl ayah-font mb-4">{t('home.title')}</h1>
          {language === 'ar'
            ? <p className="text-xl ayah-font px-64 text-gray-700 tracking-wide"><span className="text-2xl">{ayah.text}</span><br /> {ayah.surah.name}: [{ayah.numberInSurah}]</p>
            : <p className="text-lg px-64 text-gray-700">{ayah.text} <br /> {ayah.surah.englishName}: [{ayah.numberInSurah}]</p>
          }

          <div className={`block ${language === 'ar' ? 'my-4' : 'mt-6 mb-12'}`}>
            <div className="inline-block relative w-64 -m-16">
              <RenderSelect options={reciters} selected={reciter} handleChange={reciteAyah} initial={t('home.reciter.title')} id="reciters"/>
              <div className={`pointer-events-none absolute inset-y-0 ${ language === 'ar' ? 'left-0' : 'right-0'} flex items-center px-2 text-gray-700`}>
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            {language !== 'ar' ? <small className="reciter-warning">{t('home.reciter.warning', 'en')}</small> : ''}
            {language !== 'ar'    
              ? <div className="inline-block relative w-64 -m-16">
                  <RenderSelect options={translations} selected={identifier} handleChange={translateAyah} initial={t('home.translation')} id="translations"/>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              : ''
            }

          </div>
          <audio id="ayah-player" className="mx-auto" controls>
            {audio.length !== 0
              ? <source src={audio.audio} type="audio/mpeg" />
              : <source src="" type="audio/mpeg" />
            }
          </audio>
          <button className="mt-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow transition duration-500" onClick={getNewAyah}>{t('home.new_ayah')}</button>
        </div>
        <div className="text-center my-16">
          <h1 className="text-4xl">{t('home.asmaa.title')}</h1>
          <div className="flex flex-wrap -mx-1 lg:-mx-4">
            {
              asmaa.slice(0, visible).map((item, i) => (
              <div key={i} className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
                <article className="overflow-hidden rounded-lg shadow hover:shadow-2xl transform hover:-translate-y-5 transition duration-500">
                  <img alt="Placeholder" className="asmaa-img block h-auto w-full" src={`${process.env.PUBLIC_URL}/asmaa.jpg`}/>
                  <h1 className={language === 'ar' ? 'font-80 asmaa-font' : 'asmaa-font'}>{language === 'ar' ? item.name : item.transliteration}</h1>
                  <div className="flex items-center justify-between leading-tight px-2 h-0 bg-red-600 ltr">
                    <h1 className="asmaa-meaning">{item.en.meaning}</h1>
                    <p className="asmaa-num">{item.number}</p>  
                  </div>
                </article>
              </div>
              ))
            }
          </div>
          {visible < asmaa.length &&
            <button onClick={loadMore} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow transition duration-500">{t('home.asmaa.load_more')}</button>
          }
        </div>
        <div className="flex flex-wrap items-baseline mt-16">
          <div className={`w-full min-h-600 lg:w-2/6 md:px-4 lg:px-6 py-5 shadow hover:shadow-xl transform ${language === 'ar' ? 'hover:translate-x-6': 'hover:-translate-x-6' } transition duration-500 ${ language === 'ar' ? 'border-r-4' : 'border-l-4'} hover:border-red-500 rounded`}>
            <h1 className="text-2xl font-medium">{t('home.prayer_times')}</h1>
            <small className="font-medium text-gray-700">{city}, {country}</small>
            <ul className="text-lg">
              <li className="my-2">{calender.date.gregorian.day} {t(`gregorian.months.${calender.date.gregorian.month.number}`)} {calender.date.gregorian.year} {language === 'ar' ? 'م' :calender.date.gregorian.designation.abbreviated}</li>
              <li className="my-2">{calender.date.hijri.day} {calender.date.hijri.month[language]} {calender.date.hijri.year} {language === 'ar' ? 'هـ' : calender.date.hijri.designation.abbreviated}</li>
              <li className="font-medium my-2 border-b border-gray-500 hover:border-b-2 hover:border-red-500">{t('fajr')}: {calender.timings.Fajr}</li>
              <li className="font-medium my-2 border-b border-gray-500 hover:border-b-2 hover:border-red-500">{t('sunrise')}: {calender.timings.Sunrise}</li>
              <li className="font-medium my-2 border-b border-gray-500 hover:border-b-2 hover:border-red-500">{t('dhuhr')}: {calender.timings.Dhuhr}</li>
              <li className="font-medium my-2 border-b border-gray-500 hover:border-b-2 hover:border-red-500">{t('asr')}: {calender.timings.Asr}</li>
              <li className="font-medium my-2 border-b border-gray-500 hover:border-b-2 hover:border-red-500">{t('maghrib')}: {calender.timings.Maghrib}</li>
              <li className="font-medium my-2 border-b border-gray-500 hover:border-b-2 hover:border-red-500">{t('isha')}: {calender.timings.Isha}</li>
              <li className="font-medium my-2 border-b border-gray-500 hover:border-b-2 hover:border-red-500">{t('midnight')}: {calender.timings.Midnight}</li>
            </ul>
            <h1 className="mt-4 mb-2 text-lg font-medium">{t('home.listen_azan')}</h1>
            <div className="inline-block relative w-64">
              <select onChange={playAzan} className={`${language === 'ar' ? 'text-sm ' : ''}block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 p-2 rounded shadow leading-tight focus:outline-none transition duration-500`}>
                <optgroup>
                  <option>{t('home.muezzin')}</option>
                  {
                    muezzins[language].map((item, i) => (
                      <option key={i} value={item.id}>{item.name}</option>
                    ))
                  }
                </optgroup>
              </select>
              <div className={`pointer-events-none absolute inset-y-0 ${ language === 'ar' ? 'left-0' : 'right-0'} flex items-center px-2 text-gray-700`}>
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            <audio id="azan-player" className="my-4" controls>
              {muezzin !== ''
                ? <source src={process.env.PUBLIC_URL + '/tracks/' + muezzin + '.mp3'} type="audio/mpeg" />
                : <source src="" type="audio/mpeg" />
              }
            </audio>
          </div>
          <div className={`w-full min-h-600 lg:w-4/6 md:px-4 lg:px-6 py-5 shadow hover:shadow-xl transform ${language === 'ar' ? 'hover:-translate-x-6': 'hover:translate-x-6' } transition duration-500 ${ language === 'ar' ? 'border-r-4' : 'border-l-4'} hover:border-red-500 rounded`}>
            <h1 className="text-center text-2xl font-medium">{t('home.prayer_cal')}</h1>
            <div className="mt-6">
              <div className="my-4 py-3">
                <label htmlFor="methods" className={`block text-gray-700 ${language === 'ar' ? 'text-md' : 'text-lg'} font-semibold mb-2`}>{t('home.label.method.title')} 
                  {language === 'ar'
                    ? <a href="https://www.prayer-now.com/calculations" target="_blank" rel="noopener noreferrer" className="text-indigo-800 hover:text-black transition duration-500"> {t('home.label.method.link', 'ar')}</a>
                    : <a href="http://praytimes.org/wiki/Prayer_Times_Calculation" target="_blank" rel="noopener noreferrer" className="text-indigo-800 hover:text-black transition duration-500"> {t('home.label.method.link', 'en')}</a>
                  }
                </label>
                <select onChange={handleMethod} id="methods" className={`${language === 'ar' ? 'text-sm ' : ''}block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 p-2 rounded shadow leading-tight focus:outline-none transition duration-500`}>
                  <optgroup>
                    <option >{t('home.method')}</option>
                    {
                      methods[language].map((method, i) => (
                        <option key={i} value={method.id}>{method.name}</option>
                      ))
                    }
                  </optgroup>
                </select>
                <div className={`pointer-events-none flex items-center -my-7 mx-6 absolute ${language === 'ar' ? 'left-0' : 'right-0'} px-2 text-gray-700`}>
                  <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              <div className="my-4 py-3">
                <label htmlFor="latitude" className={`block text-gray-700 ${language === 'ar' ? 'text-md' : 'text-lg'} font-semibold mb-2`}>{t('home.label.lat.title')}</label>
                <select onChange={handleLatitude} id="latitude" className={`${language === 'ar' ? 'text-sm ' : ''}block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 p-2 rounded shadow leading-tight focus:outline-none transition duration-500`}>
                  <optgroup>
                    <option >{t('home.lat_method')}</option>
                    {
                      latitudes[language].map((latitude, i) => (
                        <option key={i} value={latitude.id}>{latitude.name}</option>
                      ))
                    }
                  </optgroup>
                </select>
                <div className={`pointer-events-none flex items-center -my-7 mx-6 absolute ${language === 'ar' ? 'left-0' : 'right-0'} px-2 text-gray-700`}>
                  <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              <div className="my-4 py-3">
                <label htmlFor="school" className={`block text-gray-700 ${language === 'ar' ? 'text-md' : 'text-lg'} font-semibold mb-2`}>{t('home.label.school.title')}</label>
                <select onChange={handleSchool} id="school" className={`${language === 'ar' ? 'text-sm ' : ''}block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 p-2 rounded shadow leading-tight focus:outline-none transition duration-500`}>
                  <optgroup>
                    <option >{t('home.school')}</option>
                    {
                      schools[language].map((school, i) => (
                        <option key={i} value={school.id}>{school.name}</option>
                      ))
                    }
                  </optgroup>
                </select>
                <div className={`pointer-events-none flex items-center -my-7 mx-6 absolute ${language === 'ar' ? 'left-0' : 'right-0'} px-2 text-gray-700`}>
                  <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              <div className={`my-4 pt-3 ${language === 'ar' ? 'pb-10' : 'pb-5'}`}>
                <label htmlFor="midnight" className={`block text-gray-700 ${language === 'ar' ? 'text-md' : 'text-lg'} font-semibold mb-2`}>{t('home.label.midnight.title')}</label>
                <select onChange={handleMidnight} id="midnight" className={`${language === 'ar' ? 'text-sm ' : ''}block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 p-2 rounded shadow leading-tight focus:outline-none transition duration-500`}>
                  <optgroup>
                    <option >{t('home.midnight')}</option>
                    {
                      midnight[language].map((midnight, i) => (
                        <option key={i} value={midnight.id}>{midnight.name}</option>
                      ))
                    }
                  </optgroup>
                </select>
                <div className={`pointer-events-none flex items-center -my-7 mx-6 absolute ${language === 'ar' ? 'left-0' : 'right-0'} px-2 text-gray-700`}>
                  <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
