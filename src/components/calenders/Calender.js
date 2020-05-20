import React from 'react'
import { useTranslation } from 'react-i18next';
import { Spinner } from '../index';

export default ({calender, mode, month}) => {
  const { t, i18n } = useTranslation()

  if(calender === null || calender === undefined || calender.length === 0) return <Spinner />
  
  else{
    return (
      <div className="md:px-32 py-8 w-full">
        {mode
          ? <h1 className="text-2xl text-center mb-2">{t('hijri.title')} {t(`hijri.months.${calender[0].date.hijri.month.number}`)}</h1>
          : <h1 className="text-2xl text-center mb-2">{t('gregorian.title')} {t(`gregorian.months.${month+1}`)}</h1>
        }
        <div className="shadow overflow-hidden rounded border-b border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-black text-white">
              <tr>
                <th className="text-start py-3 px-4 uppercase font-semibold text-sm">{t('day')}</th>
                <th className="text-start py-3 px-4 uppercase font-semibold text-sm">{t('date')}</th>
                <th className="text-start py-3 px-4 uppercase font-semibold text-sm">{t('imsak')}</th>
                <th className="text-start py-3 px-4 uppercase font-semibold text-sm">{t('fajr')}</th>
                <th className="text-start py-3 px-4 uppercase font-semibold text-sm">{t('sunrise')}</th>
                <th className="text-start py-3 px-4 uppercase font-semibold text-sm">{t('dhuhr')}</th>
                <th className="text-start py-3 px-4 uppercase font-semibold text-sm">{t('asr')}</th>
                <th className="text-start py-3 px-4 uppercase font-semibold text-sm">{t('maghrib')}</th>
                <th className="text-start py-3 px-4 uppercase font-semibold text-sm">{t('isha')}</th>
                <th className="text-start py-3 px-4 uppercase font-semibold text-sm">{t('midnight')}</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
                {
                  calender.map((item, i) => 
                  <React.Fragment key={i}>
                  <tr className={`row-${i+1} text-center`}>
                    {mode 
                      ? i18n.language === 'ar' 
                        ? <td className="py-3 px-4">{item.date.hijri.weekday.ar}</td>
                        : <td className="py-3 px-4">{item.date.hijri.weekday.en}</td>

                      : i18n.language === 'ar'
                        ? <td className="py-3 px-4">{item.date.hijri.weekday.ar}</td>
                        : <td className="py-3 px-4">{item.date.gregorian.weekday.en}</td>
                    }
                    {mode
                      ? <td className="py-3 px-4">{item.date.hijri.date}</td>
                      : <td className="py-3 px-4">{item.date.gregorian.date}</td>
                    }
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
    )
  }
}