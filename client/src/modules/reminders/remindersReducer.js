import { handleActions } from 'redux-actions';
import * as remindersActions from './remindersActions';

const initialState = {
  ids: [],

  createProduct: {
    isLoading: false,
    isError: false,
    error: null,
  },
};

export default handleActions(
  {
    [remindersActions.createReminderStart]: (
      state,
      { payload: { newReminderId } },
    ) => ({
      ...state,
      createProduct: {
        isLoading: true,
        error: null,
        isError: false,
      },
      ids: state.ids.concat(newReminderId),
    }),
    [remindersActions.createReminderSuccess]: (state, action) => ({
      ...state,
      createProduct: {
        ...state.createProduct,
        isLoading: false,
      },
    }),
    [remindersActions.createReminderError]: (state, action) => ({
      ...state,
      createProduct: {
        ...state.createProduct,
        isLoading: false,
        error: action.payload,
        isError: true,
      },
    }),

    [remindersActions.deleteReminderStart]: (state, action) => ({
      ...state,
      ids: state.ids.filter((i) => i !== action.payload),
    }),
    [remindersActions.deleteReminderSuccess]: (state, action) => ({
      ...state,
    }),
    [remindersActions.deleteReminderError]: (state, action) => ({
      ...state,
    }),

    [remindersActions.editReminderStart]: (state, action) => ({
      ...state,
    }),
    [remindersActions.editReminderSuccess]: (state, action) => ({
      ...state,
    }),
    [remindersActions.editReminderError]: (state, action) => ({
      ...state,
    }),

    [remindersActions.getReminderStart]: (state, action) => ({
      ...state,
    }),
    [remindersActions.getReminderSuccess]: (state, action) => ({
      ...state,
      ids: action.payload.result,
    }),
    [remindersActions.getReminderError]: (state, action) => ({
      ...state,
    }),
  },
  initialState,
);
