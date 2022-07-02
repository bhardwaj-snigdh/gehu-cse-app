import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Notice from './notice';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AuthNavigationProps<T extends keyof AuthStackParamList> = {
  navigation: NativeStackNavigationProp<AuthStackParamList, T>;
  route: RouteProp<AuthStackParamList, T>;
};

export type AppTabsParamList = {
  NoticeStack: undefined;
  Account: undefined;
};

export type NoticeStackParamList = {
  Notices: undefined;
  FullPageNotice: { notice: Notice };
  CreateNotice: { editing: false; notice: null } | { editing: true; notice: Notice };
};

export type NoticeNavigationProps<T extends keyof NoticeStackParamList> = {
  navigation: NativeStackNavigationProp<NoticeStackParamList, T>;
  route: RouteProp<NoticeStackParamList, T>;
};

export type FullPageNoticeNavigationProps = NativeStackNavigationProp<NoticeStackParamList>;

export type CreateNoticeNavigationProps = NativeStackNavigationProp<NoticeStackParamList>;
