import { Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function Screen1() {
  return (
    <View className='h-screen w-full flex-1 items-center justify-evenly bg-gray-950'>
      <Block1 />
      <Block2 />
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
        className='bg-pink-300 rounded-lg'
      ></Animated.View>
    </Pressable>
  );
}
