import { Layout, Spinner } from '@ui-kitten/components';
import { useEffect } from 'react';
import { Keyboard } from 'react-native';
import { setVisible } from '../redux/feature/keyboard/keyboardSlice';
import { loadFomStorage, selectAuthBooting, selectUser } from '../redux/feature/user/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import AppNavigationTabs from './AppNavigationTabs';
import AuthNavigationStack from './AuthNavigationStack';

export default function Main() {
  const booting = useAppSelector(selectAuthBooting);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadFomStorage());

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

  if (booting) {
    return (
      <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Spinner size="giant" status="basic" />
      </Layout>
    );
  }

  return user ? <AppNavigationTabs /> : <AuthNavigationStack />;
}
