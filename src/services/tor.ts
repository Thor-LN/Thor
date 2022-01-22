import Tor from 'react-native-tor';

const tor = Tor({
  stopDaemonOnBackground: true,
  startDaemonOnActive: false,
});

export default tor;
