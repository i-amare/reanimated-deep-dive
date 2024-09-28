import { useState } from 'react';
import { Easing, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export default function Screen4() {
  return (
    <View className='flex-1 items-center justify-evenly bg-gray-950'>
      <Block1 />
      <Block2 />
    </View>
  );
}

function Block1() {
  const [shape, setShape] = useState<'square' | 'circle'>('square');

  const tap = Gesture.Tap().onBegin(onTapStart).onFinalize(onTapEnd);

  function onTapStart() {
    if (shape == 'square') {
      borderRadius.value = 50;
      scale.value = 1.5;
      setShape('circle');
    } else {
      borderRadius.value = 8;
      scale.value = 1;
      setShape('square');
    }
    console.log('Tap Started');
  }

  function onTapEnd() {
    console.log('Tap Ended');
  }

  const borderRadius = useSharedValue(8);
  const scale = useSharedValue(1);

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
    <GestureDetector gesture={tap}>
      <Animated.View
        style={animatedStyle}
        className='aspect-square w-[100px] rounded-lg bg-green-400'
      ></Animated.View>
    </GestureDetector>
  );
}

const SCALE_INCREMENT_VALUE = 1.1;

function Block2() {
  const scale = useSharedValue(1);

  let timer: NodeJS.Timeout;
  const hold = Gesture.LongPress()
    .onBegin(() => {
      timer = setInterval(increaseScale, 100);
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
      clearInterval(timer);
    });

  function increaseScale() {
    if (scale.value >= 4) return;
    scale.value = withTiming(scale.value * SCALE_INCREMENT_VALUE, {
      duration: 100,
      easing: Easing.linear,
    });
  }

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <GestureDetector gesture={hold}>
      <Animated.View
        style={animatedStyles}
        className='aspect-square w-[100px] rounded-full bg-orange-400'
      ></Animated.View>
    </GestureDetector>
  );
}
