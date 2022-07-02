import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../types/navigation';
import Login from '../screens/Login';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator<AuthStackParamList>();

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
