import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout,
  useTheme,
} from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Account from '../screens/Account';
import NoticeScreensStack from './NoticeScreensStack';
import type { AppTabsParamList } from '../types/navigation';

function InboxIcon(props: any) {
  return <Icon {...props} name="inbox-outline" />;
}

function PersonIcon(props: any) {
  return <Icon {...props} name="person-outline" />;
}

function BottomTabBar({ navigation, state }: BottomTabBarProps) {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab icon={InboxIcon} title="NOTICES" />
      <BottomNavigationTab icon={PersonIcon} title="ACCOUNT" />
    </BottomNavigation>
  );
}

const Tabs = createBottomTabNavigator<AppTabsParamList>();

export default function AppNavigationTabs() {
  const theme = useTheme();

  return (
    <Layout style={{ flex: 1 }}>
      <Tabs.Navigator
        screenOptions={{
          headerTitle: 'GEHU CSE',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: theme['background-basic-color-1'] },
          headerTitleStyle: { color: theme['text-basic-color'] },
        }}
        tabBar={BottomTabBar}
      >
        <Tabs.Screen
          options={{ headerShown: false }}
          name="NoticeStack"
          component={NoticeScreensStack}
        />
        <Tabs.Screen name="Account" component={Account} />
      </Tabs.Navigator>
    </Layout>
  );
}
