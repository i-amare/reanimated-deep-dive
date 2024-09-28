import { useState } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export default function Screen4() {
  const [shape, setShape] = useState<'square' | 'circle'>('square');

  const tap = Gesture.Tap().onBegin(onTapStart).onFinalize(onTapEnd);

  function onTapStart() {
    if (shape == 'square') {
      borderRadius.value = 50;
      scale.value = 1.5;
      rotation.value = 180;
      setShape('circle');
    } else {
      borderRadius.value = 8;
      scale.value = 1;
      rotation.value = 0;
      setShape('square');
    }
    console.log('Tap Started');
  }

  function onTapEnd() {
    console.log('Tap Ended');
  }

  const borderRadius = useSharedValue(8);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    borderRadius: withTiming(borderRadius.value, { duration: 2000 }),
    transform: [
      {
        scale: withSequence(
          withTiming(2, { duration: 750 }),
          withSpring(1, { duration: 1250 }),
        ),
      },
      {
        rotate: withSequence(withTiming(`180deg`), withTiming('0deg')),
      },
    ],
  }));

  return (
    <View className='flex-1 scale-90 items-center justify-evenly bg-gray-950'>
      <GestureDetector gesture={tap}>
        <Animated.View
          style={animatedStyle}
          className='aspect-square w-[100px] rounded-lg bg-green-400'
        ></Animated.View>
      </GestureDetector>
    </View>
  );
}
