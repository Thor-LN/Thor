import {useCallback, useEffect, useState} from 'react';

import {useIsSetupCompleted} from '@/hooks/useIsSetupCompleted';
import restUtils from '@/utils/RESTUtils';

export const useCanConnect = () => {
  const [canConnect, setCanConnect] = useState<
    'connecting' | 'connected' | 'not connected'
  >('connecting');
  const isSetupCompleted = useIsSetupCompleted();

  const testConnection = useCallback(async () => {
    if (isSetupCompleted) {
      try {
        await restUtils.testConnection();
        setCanConnect('connected');
      } catch (e) {
        setCanConnect('not connected');
      }
    }
  }, [isSetupCompleted]);

  useEffect(() => {
    testConnection();
  }, [testConnection]);

  return canConnect;
};
