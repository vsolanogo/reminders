import * as datePickerActions from './datePickerActions';

export function datePicked(date) {
  return (dispatch) => {
    dispatch(datePickerActions.datePicked(date));
  };
}
