import { connect } from 'react-redux';
import { compose } from 'recompose';
import RemindersView from './RemindersView';
import { remindersSelectors } from '../../modules/reminders';

const mapStateToProps = (state) => {
  return {
    reminders: remindersSelectors.getReminders(state),
  };
};

export default compose(
  connect(
    mapStateToProps,
    null,
  ),
)(RemindersView);
