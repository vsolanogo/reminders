import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { connect } from 'react-redux';

import { compose, lifecycle } from 'recompose';
import Reminders from './scenes/Reminders/Reminders';
import AppInputs from './scenes/Reminders/TextInput/AppInputs';
import { remindersOperations } from './modules/reminders';

const App = () => (
  <div style={{ width: '500px' }}>
    <AppInputs />
    <Reminders />
  </div>
);

const AppEnhanced = compose(
  connect(
    null,
    { onStart: remindersOperations.getReminders },
  ),
  lifecycle({
    componentDidMount() {
      this.props.onStart();
    },
  }),
)(App);

ReactDOM.render(
  <Provider store={store}>
    <AppEnhanced />
  </Provider>,
  document.getElementById('root'),
);
