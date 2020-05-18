import i18n from "i18next";

export default (locale) => {
  switch (locale){
    case 'ar': i18n.changeLanguage(locale);document.documentElement.dir = i18n.dir();break;
    case 'en': i18n.changeLanguage(locale);document.documentElement.dir = i18n.dir();break;
    default:
      i18n.changeLanguage('en');
  }
}

