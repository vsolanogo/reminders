import { createSelector } from 'reselect';

const getRemindersEntities = (state) => state.entities.reminders;
const getRemindersIds = (state) => state.reminders.ids;

const getReminderId = (state, props) => props.id;

export const getReminderById = createSelector(
  [getReminderId, getRemindersEntities],
  (id, entities) => entities[id],
);

export const getReminders = createSelector(
  [getRemindersEntities, getRemindersIds],
  (reminders, reminderIds) => reminderIds.map((i) => reminders[i]),
);
