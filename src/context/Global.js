import React, {createContext, useReducer} from 'react'
import Reducer from './Reducer'

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    // Initial State
    const initialState = {
      language: 'en',
    }

    
  const [state, dispatch] = useReducer(Reducer, initialState);
  
    // Actions
    function setLanguage(language){
      dispatch({
        type: 'SET_LANGUAGE',
        payload: language
      });
    }


  return (
    <GlobalContext.Provider value={{
      language: state.language,
      setLanguage
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
