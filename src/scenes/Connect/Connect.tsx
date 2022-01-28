import React, {useCallback, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import {setStorage} from '@/actions/storageActions';
import {Wizard, WizardStep} from '@/components/Wizard';
import ConnectionSuccess from '@/scenes/Connect/components/ConnectionSuccess';
import fetcherUtils from '@/utils/FetcherUtils';
import lndConnectUtils from '@/utils/LNDConnectUtils';
import restUtils from '@/utils/RESTUtils';
import {FormikProps} from 'formik';
import {Box, Center, useToast} from 'native-base';

import CreateConnection from './components/CreateConnection';
import NodeInfo from './components/NodeInfo';
import Welcome from './components/Welcome';
import {ConnectProps} from './Connect.props';
import {nodeInfoValidationSchema} from './validationSchema';

const initialValues: ConnectProps = {
  urlString: '',
};

const Connect = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {show} = useToast();
  const formRef = useRef<FormikProps<ConnectProps>>(null);

  const handleNodeConnection = useCallback(
    async (values: ConnectProps) => {
      try {
        const {urlString} = values;
        const {host, port, macaroonHex, enableTor} =
          lndConnectUtils.processLndConnectUrl(urlString);

        const storage = {
          tor: enableTor,
          host,
          port,
          macaroonHex,
          implementation: 'lnd',
        };

        dispatch(setStorage(storage));

        restUtils.setState(storage);
        fetcherUtils.setState(storage, storage.tor);

        await restUtils.testConnection();
      } catch (e) {
        dispatch(
          setStorage({
            tor: undefined,
            host: undefined,
            port: undefined,
            macaroonHex: undefined,
          }),
        );
        show({
          title: t("We couldn't connect to your node. Let's try again?"),
          status: 'error',
        });
        if (formRef.current) {
          formRef.current.setFieldValue('urlString', '');
        }
        throw new Error('Connection error');
      }
    },
    [dispatch, show, t],
  );

  const handleCompleteSetup = useCallback(() => {
    dispatch(
      setStorage({
        setupCompleted: true,
      }),
    );
  }, [dispatch]);

  return (
    <Box flex={1}>
      <Center flex={1} px={2}>
        <Wizard
          initialValues={initialValues}
          onSubmit={() => {}}
          innerRef={formRef}
          finishButton="Finish setup">
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

          <WizardStep requireIsValid={false} onSubmit={handleCompleteSetup}>
            <ConnectionSuccess />
          </WizardStep>
        </Wizard>
      </Center>
    </Box>
  );
};

export default Connect;
