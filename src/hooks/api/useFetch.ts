import useSWR, {SWRConfiguration, SWRResponse} from 'swr';

import http from '../../services/http';
import tor from '../../services/tor';

const httpFetcher = (url: string) => http.get(url).then(res => res.data);

const torFetcher = async (url: string) => {
  await tor.startIfNotStarted();

  return tor.get(url).then(res => res.json);
};

const useFetch = <T>(
  url: string | null | (() => string | null),
  options?: SWRConfiguration,
): SWRResponse<T> => {
  const fetcher = torFetcher || httpFetcher;

  return useSWR<T>(url, fetcher, {
    ...options,
  });
};

export default useFetch;
