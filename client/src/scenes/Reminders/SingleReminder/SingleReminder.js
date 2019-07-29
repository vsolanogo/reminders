import { connect } from 'react-redux';
import {
  compose,
  pure,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import SingleReminderView from './SingleReminderView';

import {
  remindersOperations,
  remindersSelectors,
} from '../../../modules/reminders';

const mapStateToProps = (state, ownProps) => ({
  reminder: remindersSelectors.getReminderById(state, ownProps),
});

export default compose(
  connect(
    mapStateToProps,
    {
      onDeleteThisReminder: remindersOperations.deleteReminder,
      onEditThisReminder: remindersOperations.editReminder,
    },
  ),
  withHandlers({
    deleteThisReminderHandler: (state, props) => () => {
      state.onDeleteThisReminder(state.reminder.id);
    },
  }),

  withStateHandlers(
    { hovered: false, editedText: '', reminderClicked: false },
    {
      handleEditText: (state, props) => (e) => ({
        editedText: e.target.value,
      }),
      handleToggleText: (state, props) => () => ({
        reminderClicked: true,
        editedText: props.reminder.text,
      }),
      // handleMouseEnter: (state, props) => () => ({ hovered: true }),
      // handleMouseLeave: (state, props) => () => ({ hovered: false }),

      editReminderHandler: (state, props) => () => {
        const regexp = /([a-zA-Zа-яА-Я\d]+ ){2}[a-zA-Zа-яА-Я\d]+/;

        if (regexp.test(state.editedText)) {
          props.onEditThisReminder({
            id: props.reminder.id,
            text: state.editedText,
            reminderExpiration: props.reminder.reminderExpiration,
            createdAt: props.reminder.createdAt,
          });
        }

        return { reminderClicked: false };
      },
    },
  ),

  pure,
)(SingleReminderView);
