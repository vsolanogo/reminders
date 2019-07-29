import React from 'react';
import * as moment from 'moment';

import SingleReminder from './SingleReminder/SingleReminder';
import DayDisplay from './DayDisplay/DayDisplay';

export default function({ reminders }) {
  const sortedReminders = reminders.sort((a, b) => {
    if (a.reminderExpiration - b.reminderExpiration === 0) {
      return a.createdAt - b.createdAt;
    }

    return a.reminderExpiration - b.reminderExpiration;
  });

  const groupedReminders = {};

  sortedReminders.forEach((i) => {
    const { reminderExpiration } = i;
    // const reminderExpirationDay = moment(reminderExpiration).format(
    //   'DD MM YYYY',
    // );

    const reminderExpirationDay = moment
      .unix(reminderExpiration / 1000)
      .format('DD MM YYYY');

    if (reminderExpirationDay in groupedReminders) {
      groupedReminders[reminderExpirationDay] = groupedReminders[
        reminderExpirationDay
      ].concat(i.id);
    } else {
      groupedReminders[reminderExpirationDay] = [i.id];
    }
  });

  const remindersList = Object.keys(groupedReminders).map((i) => {
    const remindersOfTheDay = groupedReminders[i];
    const remindersOfTheDayComponents = remindersOfTheDay.map((j) => (
      <SingleReminder id={j} key={j} />
    ));

    return (
      <div key={i}>
        <DayDisplay day={i} />
        {remindersOfTheDayComponents}
      </div>
    );
  });

  return <>{remindersList}</>;
}
