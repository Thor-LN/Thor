import useSWR, {SWRConfiguration, SWRResponse} from 'swr';

import fetcherUtils from '../../../utils/FetcherUtils';

const useFetch = <T>(
  url: string | null | (() => string | null),
  options?: SWRConfiguration,
): SWRResponse<T> => {
  const fetcher = fetcherUtils.fetcher;

  return useSWR<T>(url, fetcher, {
    ...options,
  });
};

export default useFetch;
