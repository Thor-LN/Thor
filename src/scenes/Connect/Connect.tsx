import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {Box, Center} from 'native-base';

import {setStorage} from '../../actions/storageActions';
import {Wizard, WizardStep} from '../../components/Wizard';
import lndConnectUtils from '../../utils/LNDConnectUtils';
import restUtils from '../../utils/RESTUtils';
import CreateConnection from './components/CreateConnection';
import NodeInfo from './components/NodeInfo';
import Welcome from './components/Welcome';
import {ConnectProps} from './Connect.props';
import {nodeInfoValidationSchema} from './validationSchema';

const initialValues: ConnectProps = {
  urlString: '',
};

const Connect = () => {
  const dispatch = useDispatch();

  const handleNodeConnection = useCallback(
    async (values: ConnectProps) => {
      try {
        const {urlString} = values;
        const {host, port, macaroonHex, enableTor} =
          lndConnectUtils.processLndConnectUrl(urlString);

        dispatch(setStorage({tor: enableTor, host, port, macaroonHex}));

        await restUtils.testConnection();
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch],
  );

  return (
    <Box flex={1}>
      <Center flex={1} px={2}>
        <Wizard initialValues={initialValues} onSubmit={() => {}}>
          <WizardStep>
            <Welcome />
          </WizardStep>
          <WizardStep>
            <NodeInfo />
          </WizardStep>
          <WizardStep
            validationSchema={nodeInfoValidationSchema}
            onSubmit={handleNodeConnection}>
            <CreateConnection />
          </WizardStep>
        </Wizard>
      </Center>
    </Box>
  );
};

export default Connect;
