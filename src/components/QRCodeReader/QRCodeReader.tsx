import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {runOnJS} from 'react-native-reanimated';
import {
  useCameraDevices,
  useFrameProcessor,
  Camera,
} from 'react-native-vision-camera';

import {useTheme, useToast} from 'native-base';
import {scanQRCodes, QrCode} from 'vision-camera-qrcode-scanner';

interface QRCodeReaderProps {
  onChange: (qrCodes: QrCode[]) => void;
}

export default function QRCodeReader({onChange}: QRCodeReaderProps) {
  const [hasPermission, setHasPermission] = useState(false);
  const theme = useTheme();
  const toast = useToast();
  const devices = useCameraDevices();
  const device = devices.back;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        cameraContainer: {
          borderRadius: 4,
          borderColor: theme.colors.amber['400'],
          borderWidth: 2,
          flex: 1,
          padding: 5,
        },
        cameraComponent: {
          borderRadius: 4,
          flex: 1,
        },
      }),
    [theme],
  );

  const handlePermissions = useCallback(async () => {
    try {
      let newPermission;
      const status = await Camera.getCameraPermissionStatus();

      if (status !== 'authorized') {
        newPermission = await Camera.requestCameraPermission();
      }
      setHasPermission(
        status === 'authorized' || newPermission === 'authorized',
      );
    } catch (e) {
      toast.show({
        title: "We couldn't have access to your camera",
        status: 'error',
      });
    }
  }, [toast]);

  React.useEffect(() => {
    handlePermissions();
  }, [handlePermissions]);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const qrcode = scanQRCodes(frame);
    runOnJS(onChange)(qrcode);
  }, []);

  const canShowComponent = useMemo(
    () => device != null && hasPermission,
    [device, hasPermission],
  );

  if (!canShowComponent) {
    return null;
  }

  return (
    <View style={styles.cameraContainer}>
      <Camera
        style={styles.cameraComponent}
        device={device!}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
    </View>
  );
}
