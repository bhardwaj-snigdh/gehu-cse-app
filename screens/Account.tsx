import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { logout, selectUser } from '../redux/feature/user/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export default function Account() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleLogout = () => {
    AsyncStorage.removeItem('auth').then(() => {
      dispatch(logout());
    });
  };

  return (
    <Layout style={styles.layout}>
      <View style={styles.iconBox}>
        <Icon style={styles.icon} fill="#8F9BB3" name="person" />
      </View>

      <View style={styles.nameRow}>
        <Text selectable category="h4">
          {user?.name}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label} category="p1">
          Email
        </Text>
        <Text selectable category="p1">
          {user?.email}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label} category="p1">
          Phone
        </Text>
        <Text selectable category="p1">
          {user?.phone}
        </Text>
      </View>
      <View style={styles.buttonRow}>
        <Button
          onPress={handleLogout}
          style={styles.button}
          appearance="outline"
          status="basic"
          accessoryRight={<Icon name="log-out" />}
        >
          Logout
        </Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox: {
    backgroundColor: 'rgba(225, 225, 225, 0.04)',
    borderRadius: 7,
    padding: 8,
    paddingBottom: 5,
  },
  icon: {
    width: 60,
    height: 60,
  },
  nameRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '75%',
    marginVertical: 10,
  },
  buttonRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  button: {
    width: 180,
  },
  label: {
    fontWeight: 'bold',
  },
});
