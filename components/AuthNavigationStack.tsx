import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AuthScreensParamList } from '../types/NavigationParams';
import Login from '../screens/Login';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator<AuthScreensParamList>();

export default function AuthNavigationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'fade_from_bottom',
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
