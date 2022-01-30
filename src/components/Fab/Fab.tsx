import React, {useCallback} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  AddIcon,
  Box,
  Center,
  Icon,
  IconButton,
  Stagger,
  useDisclose,
} from 'native-base';

MaterialIcons.loadFont();
Feather.loadFont();

const Fab = () => {
  const {isOpen, onToggle} = useDisclose();

  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });

  const handleToggle = useCallback(() => {
    onToggle();
    rotation.value = withSpring(isOpen ? 0 : 180);
  }, [isOpen, onToggle, rotation]);

  return (
    <Box position="absolute" bottom={20} right={5}>
      <Center>
        <Stagger
          visible={isOpen}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 34,
          }}
          animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: 'spring',
              mass: 0.8,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
          exit={{
            translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}>
          <IconButton
            mb="4"
            variant="solid"
            bg="green.500"
            colorScheme="indigo"
            borderRadius="full"
            icon={<Icon as={Feather} size="6" name="arrow-down" />}
          />
          <IconButton
            mb="4"
            variant="solid"
            bg="blue.500"
            colorScheme="red"
            borderRadius="full"
            icon={<Icon as={Feather} size="6" name="send" />}
          />
        </Stagger>
        <Animated.View style={animatedStyle}>
          <IconButton
            rounded="full"
            icon={<AddIcon size="md" />}
            onPress={handleToggle}
            bg="pink.500"
          />
        </Animated.View>
      </Center>
    </Box>
  );
};

export default Fab;
