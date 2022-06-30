import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <Provider store={store}>
        <ApplicationProvider {...eva} theme={eva.dark}>
          <ApplicationProvider {...eva} theme={eva.dark}>
            <Layout style={styles.container}>
              <Text category="h1">Welcome to App.</Text>
            </Layout>
          </ApplicationProvider>
        </ApplicationProvider>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
