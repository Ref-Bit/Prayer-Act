import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { getRandomAyah, getAyahReciters, getAyahAudio } from '../../api'
import { GlobalContext } from '../../context/Global';
import { Spinner } from '..';

export default () => {
  const { t } = useTranslation()
  const { language } = useContext(GlobalContext)
  const [ random, setRandom ] = useState(262)
  const [ identifier, setIdentifier ] = language === 'ar' ? useState('') : useState('asad')
  const [ reciter, setReciter ] = useState([])
  const [ audio, setAudio ] = useState([])
  const [ ayah, setAyah ] = useState([])

  useEffect(() => {
    getRandomAyah(random, language, identifier).then(({data}) => {
      setAyah(data)
    }).catch( err => console.log(err))

    getAyahReciters(language).then(({data}) => {
      setReciter(data)
    }).catch( err => console.log(err) )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  const getNewAyah = () =>{
    let num = Math.floor(Math.random() * 6236) + 1
    const resetSelect = document.querySelector('select')
    setRandom(num)
    
    getRandomAyah(num, language, identifier).then(({data}) => {
      setAyah(data)
      resetSelect.selectedIndex = 0
    }).catch( err => console.log(err))

    const audioElement = document.querySelector('#ayah-player')
    const audioSource = document.querySelector('#ayah-player > source')
    audioElement.autoPlay = false;audioElement.load();audioSource.src = '' ;
    
  }

  const handleChange = e => {
    const audioElement = document.querySelector('#ayah-player')

    getAyahAudio(random, e.target.value).then(({data}) => {
      setAudio(data)
      audioElement.load();
      audioElement.play();
    }).catch( err => console.log(err) )
  }

  if(ayah === null || ayah === undefined || ayah.length === 0) return <Spinner />
  else{
    return (
      <div className="text-center">
        <h1 className="text-4xl ayah-font mb-4">{t('home.title')}</h1>
        {language === 'ar'
          ? <p className="text-xl ayah-font px-64 text-gray-700 tracking-wide"><span className="text-2xl">{ayah.text}</span><br /> {ayah.surah.name}: [{ayah.numberInSurah}]</p>
          : <p className="text-lg px-64 text-gray-700">{ayah.text} <br /> {ayah.surah.englishName}: [{ayah.numberInSurah}]</p>
        }

        <div className="block my-4">
          <div className="inline-block relative w-64">
            <select onChange={handleChange} className={`${language === 'ar' ? 'text-sm ' : ''}block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none transition duration-500`}>
              <optgroup>
                <option>{t('home.reciter')}</option>
                {
                  reciter.map((item, i)=> (
                    <option key={i} value={item.identifier}>{item.name}</option>
                    ))
                }
              </optgroup>
            </select>
            <div className={`pointer-events-none absolute inset-y-0 ${ language === 'ar' ? 'left-0' : 'right-0'} flex items-center px-2 text-gray-700`}>
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        <audio id="ayah-player" className="mx-auto" controls>
          {audio.length !== 0
            ? <source src={audio.audio} type="audio/mpeg" />
            : <source src="" type="audio/mpeg" />
          }
        </audio>
        <button className="mt-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow transition duration-500" onClick={getNewAyah}>{t('home.new_ayah')}</button>
      </div>
    )
  }
}
