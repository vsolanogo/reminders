import React from 'react';
import * as moment from 'moment';
import styled from 'styled-components';

const DayDisplay = styled.div`
  font-size: 30px;
  font-family: 'Helvetica Neue', Helvetica, Arial;
  color: #4285f4;
  border-top: 1px solid #e7e9ed;
`;

const convertIfTodayOrTomorrow = (day) => {
  const todayDay = moment(new Date()).format('DD MM YYYY');
  const tomorrowDay = moment(new Date())
    .add(1, 'days')
    .format('DD MM YYYY');

  if (todayDay === day) {
    return 'Today';
  }

  if (tomorrowDay === day) {
    return 'Tomorrow';
  }

  return day;
};

export default function({ day }) {
  const mewDay = convertIfTodayOrTomorrow(day);
  return <DayDisplay>{mewDay}</DayDisplay>;
}
