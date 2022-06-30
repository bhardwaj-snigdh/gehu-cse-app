import AsyncStorage from '@react-native-async-storage/async-storage';
import { Layout, Spinner } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { setVisible } from '../redux/feature/keyboard/keyboardSlice';
import { login } from '../redux/feature/user/userSlice';
import { useAppDispatch } from '../redux/hooks';
import type { User } from '../types/UserAndRoles';
import AppNavigationTabs from './AppNavigationTabs';
import AuthNavigationStack from './AuthNavigationStack';

export default function Main() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      dispatch(setVisible(true));
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      dispatch(setVisible(false));
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('auth').then((res) => {
      if (!res) {
        setLoading(false);
      } else {
        setLoading(false);
        const authObject = JSON.parse(res);
        setUser(authObject.user);
        setToken(authObject.token);
        dispatch(login({ user, token }));
      }
    });
  }, [dispatch, token, user]);

  if (loading) {
    return (
      <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Spinner size="giant" status="basic" />
      </Layout>
    );
  }

  return user ? <AppNavigationTabs /> : <AuthNavigationStack />;
}
