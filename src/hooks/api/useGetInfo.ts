import {GetInfoResponse} from '@/types/GetInfoResponse';

import restUtils from '../../utils/RESTUtils';
import useFetch from './config/useFetch';

export const useGetInfo = () => {
  const endpoint = restUtils.getInfo();

  const {data} = useFetch<GetInfoResponse>(endpoint);

  return {data};
};
