import { useNavigation } from '@react-navigation/native';
import { Layout, List, Spinner, Text, useTheme } from '@ui-kitten/components';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import FloatingButton from '../components/FloatingButton';
import NoticeCard from '../components/NoticeCard';
import {
  fetchAllNotices,
  selectNoticeLoading,
  selectNotices,
} from '../redux/feature/notice/noticeSlice';
import { selectToken, selectUser } from '../redux/feature/user/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { CreateNoticeNavigationProps } from '../types/navigation';
import { Role } from '../types/userAndRoles';
import type { User } from '../types/userAndRoles';

export default function Notices() {
  const navigator = useNavigation<CreateNoticeNavigationProps>();
  const notices = useAppSelector(selectNotices);
  const loading = useAppSelector(selectNoticeLoading);
  const token = useAppSelector(selectToken) as string;
  const user = useAppSelector(selectUser) as User;
  const dispatch = useAppDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchAllNotices({ token }));
  }, [dispatch, token]);

  return (
    <>
      {loading ? (
        <Layout style={styles.pageCenter}>
          <Spinner status="basic" size="giant" />
        </Layout>
      ) : (
        <Layout level="4" style={styles.layout}>
          <List
            contentContainerStyle={
              notices.length === 0
                ? styles.pageCenter
                : { backgroundColor: theme['background-basic-color-4'] }
            }
            ListEmptyComponent={<Text category="h6">No notices 📪</Text>}
            data={notices}
            renderItem={({ item }) => <NoticeCard notice={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </Layout>
      )}
      {user.role !== Role.USER && (
        <FloatingButton
          icon="plus"
          onPress={() => navigator.navigate('CreateNotice', { editing: false, notice: null })}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingVertical: 5,
  },
  pageCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
