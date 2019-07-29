import { connect } from 'react-redux';
import * as moment from 'moment';
import {
  compose,
  withStateHandlers,
  withState,
  withHandlers,
} from 'recompose';
import DatePickerView from './DatePickerView';
import { datePickerOperations } from '../../modules/datePicker';

const mapStateToProps = (state) => {
  return {
    date: state.datePicker.date,
  };
};

const calculateMinTime = (date) => {
  const isToday = moment(date).isSame(moment(), 'day');
  if (isToday) {
    const addOneMinute = moment(new Date())
      .add({ minutes: 1 })
      .toDate();
    return addOneMinute;
  }
  return moment()
    .startOf('day')
    .toDate(); // set to 12:00 am today
};

export default compose(
  connect(
    mapStateToProps,
    { onDatePick: datePickerOperations.datePicked },
  ),
  withState('currentTime', null, new Date()),

  withStateHandlers(
    {
      minTime: calculateMinTime(new Date()),
    },
    {
      handleRecalculatingMinTime: (state, props) => (date) => {
        state.minTime = calculateMinTime(date);
      },
    },
  ),
  withHandlers({
    handleDateChange: (state, props) => (date) => {
      state.handleRecalculatingMinTime(date);
      state.onDatePick(date);
    },
  }),
)(DatePickerView);
