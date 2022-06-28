import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Layout style={styles.container}>
        <Text category="h1">Welcome to App.</Text>
      </Layout>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
