import useFetch from '@/hooks/api/config/useFetch';
import {LNDGetTransactionsResponse} from '@/types/GetTransactionsResponse';
import parserUtils from '@/utils/ParserUtils';
import restUtils from '@/utils/RESTUtils';

export const useGetTransactions = () => {
  const endpoint = restUtils.getTransactions();

  const {data, mutate, error, isValidating} =
    useFetch<LNDGetTransactionsResponse>(endpoint);

  return {
    data: data ? parserUtils.getTransactions(data) : undefined,
    mutate,
    error,
    isValidating,
  };
};
