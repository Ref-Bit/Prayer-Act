import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import switchLangs from '../../lang/switchLangs'
import { GlobalContext } from '../../context/Global';

export default () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useContext(GlobalContext)

  const onLanguageHandle = e => {
    let locale = e.target.value;
    switchLangs(locale)
    setLanguage(locale)
    const audioElement = document.querySelector('#ayah-player')
    const audioSource = document.querySelector('#ayah-player > source')
    audioElement.autoPlay = false;audioElement.load();audioSource.src = ''
  }
  
  return (
    <React.Fragment>
      <nav className="flex items-baseline justify-between flex-wrap bg-indigo-600 p-6 mb-5">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <NavLink to={'/'}>
            <span className="font-semibold text-4xl tracking-tight" id="logo">Prayer Act</span>
          </NavLink>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-lg lg:flex-grow">
            <NavLink activeStyle={{color: "black"}} to={'/gregorian-calender'} className="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-300 text-white mr-4 transition duration-300 font-semibold">
              {language === 'en' ? t('gregorian.title').slice(0, 9) : t('gregorian.title').slice(0, 16)}
            </NavLink>
            <NavLink activeStyle={{color: "black"}} to={'/hijri-calender'} className="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-300 text-white mr-4 transition duration-300 font-semibold">
              {language === 'en' ? t('hijri.title').slice(0, 6) : t('hijri.title').slice(0, 15)}
            </NavLink>
          </div>
          <div className="group inline-block">
            <button className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32">
              <span className="pr-1 font-semibold flex-1">{t('langs')}</span>
              <span>
                <svg className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-300 ease-in-out" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </span>
            </button>
            <div className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-300 ease-in-out origin-top min-w-32">
              <button className="block w-full rounded-sm px-3 py-1 hover:bg-gray-100" onClick={onLanguageHandle} value="en">{t('en')}</button>
              <button className="block w-full rounded-sm px-3 py-1 hover:bg-gray-100" onClick={onLanguageHandle} value="ar">{t('ar')}</button>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}
