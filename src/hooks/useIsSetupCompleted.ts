import {useTypedSelector} from '@/hooks/useTypedSelector';

export const useIsSetupCompleted = () => {
  const {storage} = useTypedSelector(state => state);

  return !!storage?.setupCompleted;
};
