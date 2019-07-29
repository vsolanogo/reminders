import { handleActions } from 'redux-actions';
import * as datePickerActions from './datePickerActions';

const initialState = {
  date: null,
};

export default handleActions(
  {
    [datePickerActions.datePicked]: (state, action) => ({
      date: action.payload,
    }),
  },
  initialState,
);
