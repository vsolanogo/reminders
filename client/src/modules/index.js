import { combineReducers } from 'redux';

import reminders from './reminders';
import entities from './entities';
import datePicker from './datePicker';

export default combineReducers({
  entities,
  reminders,
  datePicker,
});
