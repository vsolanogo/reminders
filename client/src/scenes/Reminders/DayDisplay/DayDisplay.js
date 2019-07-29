import { compose, pure, lifecycle } from 'recompose';
import DayDisplayView from './DayDisplayView';

export default compose(
  lifecycle({
    componentDidMount() {
      this.interval = setInterval(
        () => this.setState({ time: Date.now() }),
        1000,
      );
    },
    componentWillUnmount() {
      clearInterval(this.interval);
    },
  }),
  pure,
)(DayDisplayView);
