import { Pressable, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const OFFSET = 50;

export default function Screen3() {
  const offset = useSharedValue(0);

  function onBlock1Press() {
    offset.value = withSequence(
      withTiming(-OFFSET),
      withRepeat(withTiming(OFFSET), 4, true),
      withTiming(0),
    );
  }

  return (
    <View className='flex-1 items-center justify-evenly bg-gray-950'>
      <Block1 offset={offset} onPress={onBlock1Press} />
    </View>
  );
}

interface Block1Props {
  offset: SharedValue<number>;
  onPress: () => void;
}

function Block1({ offset, onPress }: Block1Props) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offset.value,
      },
    ],
  }));

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={animatedStyle}
        className='aspect-square w-[100px] rounded-lg bg-teal-400'
      ></Animated.View>
    </Pressable>
  );
}
