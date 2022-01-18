import RNFetchBlob from 'rn-fetch-blob-v2';

class HTTPFetcher {
  httpFetcher = () => {
    return RNFetchBlob.config({
      trusty: true,
    });
  };
}

const HTTPService = new HTTPFetcher().httpFetcher();
export default HTTPService;
