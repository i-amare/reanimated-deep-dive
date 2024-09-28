import { Slot, useRouter } from 'expo-router';
import { NativeWindStyleSheet } from 'nativewind';
import { useEffect } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function RootLayout() {
  const router = useRouter();
  useEffect(() => {
    // router.navigate('/Screen-1');
  }, []);

  return (
    <GestureHandlerRootView className='flex-1'>
      <View className='flex-1'>
        <Slot />
      </View>
    </GestureHandlerRootView>
  );
}
