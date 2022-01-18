import restUtils from '../../utils/RESTUtils';
import useFetch from './config/useFetch';

export const useGetInfo = () => {
  const endpoint = restUtils.getInfo();

  const {data} = useFetch(endpoint);

  return {data};
};
