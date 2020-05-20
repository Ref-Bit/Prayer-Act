import React from 'react';
import { useCalender } from '../../utils'
import Calender from './Calender';

export default () => {
  const [calender, month] = useCalender()
  return <Calender calender={calender} mode={true} month={month} />
}
