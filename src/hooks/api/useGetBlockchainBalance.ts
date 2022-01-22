import useFetch from '@/hooks/api/config/useFetch';
import {LNDGetBlockchainBalanceResponse} from '@/types/GetBlockchainBalanceResponse';
import parserUtils from '@/utils/ParserUtils';
import restUtils from '@/utils/RESTUtils';

export const useGetBlockchainBalance = () => {
  const endpoint = restUtils.getBlockchainBalance();

  const {data, mutate, error, isValidating} =
    useFetch<LNDGetBlockchainBalanceResponse>(endpoint);

  return {
    data: data ? parserUtils.getBlockchainBalance(data) : undefined,
    mutate,
    error,
    isValidating,
  };
};
