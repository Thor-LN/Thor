import useFetch from '@/hooks/api/config/useFetch';
import {LNDGetChannelsBalanceResponse} from '@/types/GetChannelsBalanceResponse';
import parserUtils from '@/utils/ParserUtils';
import restUtils from '@/utils/RESTUtils';

export const useGetChannelsBalance = () => {
  const endpoint = restUtils.getChannelsBalance();

  const {data, mutate, error, isValidating} =
    useFetch<LNDGetChannelsBalanceResponse>(endpoint);

  return {
    data: data ? parserUtils.getChannelsBalance(data) : undefined,
    mutate,
    error,
    isValidating,
  };
};
