import React from 'react';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation()
    return (
    <div>
      <h1 className="text-center text-4xl">{t('home.title')}</h1>
    </div>
  )
}
