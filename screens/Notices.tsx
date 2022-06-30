import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

export default function Notices() {
  return (
    <Layout style={styles.layout}>
      <View style={styles.main}>
        <Text category="h4">Your Notices</Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
