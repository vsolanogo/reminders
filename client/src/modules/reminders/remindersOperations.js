import { normalize, schema } from 'normalizr';
import axios from 'axios';
import * as remindersActions from './remindersActions';
import { reminderCreator } from './reminderCreator';

const reminderSchema = new schema.Entity('reminders');

export function createReminder({ text, reminderExpiration }) {
  return async (dispatch) => {
    const newReminder = reminderCreator({ text, reminderExpiration });

    const newReminderNormalized = normalize(
      newReminder,
      reminderSchema,
    );

    try {
      dispatch(
        remindersActions.createReminderStart({
          newReminderId: newReminderNormalized.result,
          entities: newReminderNormalized.entities,
        }),
      );

      await axios.post('/reminders', newReminder);

      dispatch(remindersActions.createReminderSuccess());
    } catch (err) {
      dispatch(remindersActions.createReminderError(err.message));
    }
  };
}

export function getReminders() {
  return async (dispatch) => {
    try {
      dispatch(remindersActions.getReminderStart());

      const { data } = await axios.get('/reminders');

      const normalized = normalize(data, [reminderSchema]);

      dispatch(remindersActions.getReminderSuccess(normalized));
    } catch (err) {
      dispatch(remindersActions.getReminderError(err.message));
    }
  };
}

export function editReminder({
  id,
  text,
  reminderExpiration,
  createdAt,
}) {
  return async (dispatch) => {
    const newReminder = reminderCreator({
      id,
      text,
      reminderExpiration,
      createdAt,
    });

    const newReminderNormalized = normalize(
      newReminder,
      reminderSchema,
    );

    try {
      dispatch(remindersActions.editReminderStart());

      dispatch(remindersActions.deleteReminderStart(id));

      dispatch(
        remindersActions.createReminderStart({
          newReminderId: newReminderNormalized.result,
          entities: newReminderNormalized.entities,
        }),
      );

      await axios.put('/reminders', newReminder);

      dispatch(remindersActions.editReminderSuccess());
    } catch (err) {
      dispatch(remindersActions.editReminderError(err.message));
    }
  };
}

export function deleteReminder(id) {
  return async (dispatch) => {
    try {
      dispatch(remindersActions.deleteReminderStart(id));

      await axios.delete('/reminders', { data: { id } });

      dispatch(remindersActions.deleteReminderSuccess());
    } catch (err) {
      dispatch(remindersActions.deleteReminderError(err.message));
    }
  };
}
