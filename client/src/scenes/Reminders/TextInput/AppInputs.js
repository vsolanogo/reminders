import { connect } from 'react-redux';
import { compose } from 'recompose';
import AppInputsView from './AppInputsView';
import { remindersOperations } from '../../../modules/reminders';

const mapStateToProps = (state) => ({
  dateIsMissing: state.datePicker.date === null,
  choosenDate: state.datePicker.date,
});

export default compose(
  connect(
    mapStateToProps,
    { onReminderCreate: remindersOperations.createReminder },
  ),
)(AppInputsView);
