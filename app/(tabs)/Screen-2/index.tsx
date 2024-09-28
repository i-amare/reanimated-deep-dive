import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const BLOCK_TRANSLATION = 100;

export default function Screen2() {
  useEffect(() => {
    const interval = setInterval(() => {
      xTranslation.value = xTranslation.value >= 0 ? -BLOCK_TRANSLATION : BLOCK_TRANSLATION;
    }, 1000);
    return () => clearInterval(interval);
  });

  const xTranslation = useSharedValue(0);

  return (
    <View className='bg-grey-950 flex-1 items-center justify-evenly'>
      <Block1 xTranslation={xTranslation} />
    </View>
  );
}

interface Block1Props {
  xTranslation: SharedValue<number>;
}

function Block1({xTranslation}: Block1Props) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(xTranslation.value) }],
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className='aspect-square w-[50px] rounded-lg bg-red-400'
    ></Animated.View>
  );
}
