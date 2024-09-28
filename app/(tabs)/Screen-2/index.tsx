import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function Screen2() {
  return (
    <View className='bg-grey-950 flex-1 items-center justify-evenly'>
      <Block1 />
    </View>
  );
}

function Block1() {
  useEffect(() => {
    const timer = setInterval(() => {
      if (xTranslation.value >= 0) xTranslation.value = -100;
      else xTranslation.value = 100;
      console.log('triggered');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const xTranslation = useSharedValue(0);

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
