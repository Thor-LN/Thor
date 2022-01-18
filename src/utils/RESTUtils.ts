import Lnd from '../backends/Lnd';
import {store} from '../store/Store';

class RESTUtils {
  lnd: Lnd;
  storage: Record<string, any>;

  constructor() {
    this.lnd = new Lnd();
    this.storage = store.getState().storage;
  }

  setState = (storage: Record<string, any>) => {
    this.storage = storage;
  };

  getClass = () => {
    switch (this.storage.implementation) {
      case 'lnd':
        return this.lnd;
      default:
        return this.lnd;
    }
  };

  getHeaders = () => {
    const {macaroonHex} = this.storage;
    switch (this.storage.implementation) {
      case 'lnd':
        return {'Grpc-Metadata-macaroon': macaroonHex};
      default:
        return {'Grpc-Metadata-macaroon': macaroonHex};
    }
  };

  getInfo = () => this.getClass().getInfo();

  testConnection = () => this.getClass().testConnection();
}

const restUtils = new RESTUtils();

store.subscribe(() => {
  const storage = store.getState().storage;
  restUtils.setState(storage);
});

export default restUtils;
