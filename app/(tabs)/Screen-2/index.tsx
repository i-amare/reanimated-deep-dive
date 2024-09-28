import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
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
      <Block2 xTranslation={xTranslation} />
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


interface Block2Props {
  xTranslation: SharedValue<number>;
}

function Block2({xTranslation}: Block2Props) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(xTranslation.value, {
      duration: 900,
      easing: Easing.bounce
    }) }],
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className='aspect-square w-[50px] rounded-lg bg-purple-400'
    ></Animated.View>
  );
}