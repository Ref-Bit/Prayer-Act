export default (state, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE': return {...state, language: action.payload};
    case 'SET_CITY': return {...state, city: action.payload};
    case 'SET_COUNTRY': return {...state, country: action.payload};
    default: return state;
  }
}