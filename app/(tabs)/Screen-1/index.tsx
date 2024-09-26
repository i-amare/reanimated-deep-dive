import { Pressable, View } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

export default function Screen1() {
  return (
    <View className='h-screen w-full flex-1 items-center justify-evenly bg-red-400'>
      <Block1 />
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
