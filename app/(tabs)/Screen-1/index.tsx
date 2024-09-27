import React, { forwardRef } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedBlock3 = Animated.createAnimatedComponent(
  forwardRef(({ width, height, onPress }: Block3Props, ref) => (
    <Block3 width={width} height={height} onPress={onPress} ref={ref} />
  )),
);

export default function Screen1() {
  const width = useSharedValue(50);
  const height = useSharedValue(50);

  const animatedProps = useAnimatedProps(() => ({
    width: withTiming(width.value),
    height: withTiming(height.value),
  }));

  function onBlock3Press() {
    width.value += 50;
    height.value += 50;
  }

  return (
    <View className='h-screen w-full flex-1 items-center justify-evenly bg-gray-950'>
      <Block1 />
      <Block2 />
      <AnimatedBlock3 width={width} height={height} onPress={onBlock3Press} />
    </View>
  );
}

function Block1() {
  const [width, height] = [useSharedValue(50), useSharedValue(50)];

  function onBlockPress() {
    [width.value, height.value] = [
      withSpring(width.value + 50),
      withSpring(height.value + 50),
    ];
  }
  return (
    <Pressable onPress={onBlockPress}>
      <Animated.View
        style={{ width: width, height: height }}
        className='rounded-lg bg-blue-500'
      ></Animated.View>
    </Pressable>
  );
}

function Block2() {
  const width = useSharedValue(50);
  const height = useSharedValue(50);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    width: withSpring(width.value),
    height: withSpring(height.value),
    transform: [{ rotate: withSpring(`${rotation.value}deg`) }],
  }));

  function onBlockPress() {
    width.value += 25;
    height.value += 25;
    rotation.value += 45;
  }

  return (
    <Pressable onPress={onBlockPress}>
      <Animated.View
        style={[animatedStyle]}
        className='rounded-lg bg-pink-300'
      ></Animated.View>
    </Pressable>
  );
}

interface Block3Props {
  onPress: () => void;
  width?: SharedValue<number>;
  height?: SharedValue<number>;
  ref: React.ForwardedRef<any>;
}

function Block3({ width, height, ref, onPress }: Block3Props) {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withSpring(width?.value || 50),
    height: withSpring(height?.value || 50),
  }));

  return (
    <Pressable onPress={onPress} ref={ref}>
      <Animated.View
        style={[animatedStyle]}
        className='rounded-lg bg-pink-300'
      ></Animated.View>
    </Pressable>
  );
}
