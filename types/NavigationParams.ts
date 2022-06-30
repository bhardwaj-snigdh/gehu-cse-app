import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthScreensParamList = {
  Login: undefined;
  Register: undefined;
};

export type AuthNavStackProps<T extends keyof AuthScreensParamList> = {
  navigation: NativeStackNavigationProp<AuthScreensParamList, T>;
  route: RouteProp<AuthScreensParamList, T>;
};

export type AppTabsParamList = {
  Notices: undefined;
  Account: undefined;
};
