import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function Screen5() {
  return (
    <View className='flex-1 items-center justify-evenly bg-gray-950'>
      <Block1 />
    </View>
  );
}

function Block1() {
  const positionContext = useSharedValue({ x: 0, y: 0 });
  const xTranslation = useSharedValue(0);
  const yTranslation = useSharedValue(0);

  const drag = Gesture.Pan()
    .onStart(() => {
      positionContext.value.x = xTranslation.value;
      positionContext.value.y = yTranslation.value;
    })
    .onChange((event) => {
      xTranslation.value = withSpring(
        event.translationX + positionContext.value.x,
      );
      yTranslation.value = withSpring(
        event.translationY + positionContext.value.y,
      );
      console.log({ xChange: event.changeX, yChange: event.changeY });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: xTranslation.value },
      { translateY: yTranslation.value },
    ],
  }));

  return (
    <GestureDetector gesture={drag}>
      <Animated.View
        style={animatedStyle}
        className='absolute aspect-square w-[100px] rounded-full bg-rose-400'
      ></Animated.View>
    </GestureDetector>
  );
}
