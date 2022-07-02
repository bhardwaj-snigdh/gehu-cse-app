import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@ui-kitten/components';
import type { NoticeStackParamList } from '../types/navigation';
import Notices from '../screens/Notices';
import FullPageNotice from '../screens/FullPageNotice';
import CreateNotice from '../screens/CreateNotice';

const Stack = createNativeStackNavigator<NoticeStackParamList>();

export default function NoticeScreensStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: theme['background-basic-color-1'] },
        headerTintColor: theme['text-basic-color'],
      }}
    >
      <Stack.Screen options={{ title: 'GEHU CSE' }} name="Notices" component={Notices} />
      <Stack.Screen
        options={{ title: 'View Notice' }}
        name="FullPageNotice"
        component={FullPageNotice}
      />
      <Stack.Screen
        options={({ route }) => ({ title: route.params.editing ? 'Edit Notice' : 'View Notice' })}
        name="CreateNotice"
        component={CreateNotice}
      />
    </Stack.Navigator>
  );
}
