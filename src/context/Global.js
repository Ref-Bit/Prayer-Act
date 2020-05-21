import React, {useEffect, createContext, useReducer} from 'react'
import Reducer from './Reducer'
import { getCityCountry } from '../api'

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    // Initial State
    const initialState = {
      language: 'en',
      city: 'London',
      country: 'UK'
    }

    
  const [state, dispatch] = useReducer(Reducer, initialState);
  
    // Actions
    function setLanguage(language){
      dispatch({
        type: 'SET_LANGUAGE',
        payload: language
      });
    }

    function setCity(city){
      dispatch({
        type: 'SET_CITY',
        payload: city
      });
    }

    function setCountry(country){
      dispatch({
        type: 'SET_COUNTRY',
        payload: country
      });
    }

    useEffect(() => {
      /* GET CITY NAMES */
      getCityCountry()
      .then(data => {
        setCity(data.city)
      })
      .catch( err => console.log(err))

      /* GET RECIPE AREAS NAMES */
      getCityCountry()
      .then(data => {
        setCountry(data.country_code)
      })
      .catch( err => console.log(err))
    }, [])


  return (
    <GlobalContext.Provider value={{
      language: state.language,
      city: state.city,
      country: state.country,
      setLanguage
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
