import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NoticeStackParamList } from '../types/navigation';
import Notices from '../screens/Notices';
import FullPageNotice from '../screens/FullPageNotice';
import CreateNotice from '../screens/CreateNotice';

const Stack = createNativeStackNavigator<NoticeStackParamList>();

export default function NoticeScreensStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        // headerShown: false,
      }}
    >
      <Stack.Screen name="Notices" component={Notices} />
      <Stack.Screen name="FullPageNotice" component={FullPageNotice} />
      <Stack.Screen name="CreateNotice" component={CreateNotice} />
    </Stack.Navigator>
  );
}
