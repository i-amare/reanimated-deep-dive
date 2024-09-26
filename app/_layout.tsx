import { Slot, useRouter } from 'expo-router';
import { NativeWindStyleSheet } from 'nativewind';
import { useEffect } from 'react';
import { View } from 'react-native';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function RootLayout() {
  const router = useRouter();
  useEffect(() => {
    router.navigate('/Screen-1');
  }, []);

  return (
    <View className='flex-1'>
      <Slot />
    </View>
  );
}
