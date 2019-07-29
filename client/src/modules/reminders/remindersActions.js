import { createAction } from 'redux-actions';

export const createReminderStart = createAction(
  'reminders/CREATE_REMINDER_START',
);
export const createReminderSuccess = createAction(
  'reminders/CREATE_REMINDER_SUCCESS',
);
export const createReminderError = createAction(
  'reminders/CREATE_REMINDER_ERROR',
);

export const deleteReminderStart = createAction(
  'reminders/DELETE_REMINDER_START',
);
export const deleteReminderSuccess = createAction(
  'reminders/DELETE_REMINDER_SUCCESS',
);
export const deleteReminderError = createAction(
  'reminders/DELETE_REMINDER_ERROR',
);

export const editReminderStart = createAction(
  'reminders/EDIT_REMINDER_START',
);
export const editReminderSuccess = createAction(
  'reminders/EDIT_REMINDER_SUCCESS',
);
export const editReminderError = createAction(
  'reminders/EDIT_REMINDER_ERROR',
);

export const getReminderStart = createAction(
  'reminders/GET_REMINDER_START',
);
export const getReminderSuccess = createAction(
  'reminders/GET_REMINDER_SUCCESS',
);
export const getReminderError = createAction(
  'reminders/GET_REMINDER_ERROR',
);
