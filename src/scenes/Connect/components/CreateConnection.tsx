import React, {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {QRCodeReader} from '@/components/QRCodeReader';
import {useWizard} from '@/components/Wizard';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  useToast,
  VStack,
} from 'native-base';
import {QrCode} from 'vision-camera-qrcode-scanner';

import {ConnectProps} from '../Connect.props';
import {urlStringTest} from '../validationSchema';

const CreateConnection = () => {
  const {t} = useTranslation();

  const {values} = useWizard<ConnectProps>();

  const connectionValue = useMemo(() => {
    if (values.urlString) {
      return <QRValue />;
    }
    return <QRReader />;
  }, [values.urlString]);

  return (
    <VStack space="md">
      <Heading textAlign="center">
        {t("Let's connect to your node now")}
      </Heading>
      {connectionValue}
    </VStack>
  );
};

const QRReader = () => {
  const {t} = useTranslation();
  const {setFieldValue} = useWizard<ConnectProps>();
  const {show} = useToast();

  const handleChangeQrCode = useCallback(
    async (qrCodes: QrCode[]) => {
      const code = qrCodes[0]?.displayValue;
      setFieldValue('urlString', code);

      const isValid = await urlStringTest.isValid(code);

      if (!isValid) {
        show({
          title: t('It appears the URL you scanned is not valid'),
          status: 'error',
        });
      }
    },
    [setFieldValue, show, t],
  );

  const handlePasteClipboard = useCallback(async () => {
    const string = await Clipboard.getString();
    setFieldValue('urlString', string);
    const isValid = await urlStringTest.isValid(string);

    if (!isValid) {
      show({
        title: t('It appears the URL you pasted is not valid'),
        status: 'error',
      });
    }
  }, [setFieldValue, show, t]);

  return (
    <VStack space="md" justifyContent="center">
      <Box maxH={300} height="100%">
        <QRCodeReader onChange={handleChangeQrCode} />
      </Box>
      <Heading textAlign="center">
        {t('Scan the QR code generated by the lndconnect command')}
      </Heading>
      <Center>
        <Button onPress={handlePasteClipboard}>{t('Paste')}</Button>
      </Center>
    </VStack>
  );
};

const QRValue = () => {
  const {values, setFieldValue} = useWizard<ConnectProps>();
  const {t} = useTranslation();

  const handleDelete = useCallback(() => {
    setFieldValue('urlString', '');
  }, [setFieldValue]);

  return (
    <VStack space="xl">
      <Text textAlign="center" numberOfLines={2}>
        {values.urlString}
      </Text>
      <Heading textAlign="center">
        {t('Verify that the URL matches your node info')}
      </Heading>
      <Center>
        <Button onPress={handleDelete}>{t('Retry')}</Button>
      </Center>
    </VStack>
  );
};

export default CreateConnection;
