import {LNDGetInfoResponse} from '@/types/GetInfoResponse';
import parserUtils from '@/utils/ParserUtils';

import restUtils from '../../utils/RESTUtils';
import useFetch from './config/useFetch';

export const useGetInfo = () => {
  const endpoint = restUtils.getInfo();

  const {data, mutate, error, isValidating} =
    useFetch<LNDGetInfoResponse>(endpoint);

  return {
    data: data ? parserUtils.getInfo(data) : undefined,
    mutate,
    error,
    isValidating,
  };
};
