import Markdown from '@bencryrus/react-native-markdown-display';
import { Divider, Icon, Layout, Text, useTheme } from '@ui-kitten/components';
import { ScrollView, StyleSheet, View } from 'react-native';
import FloatingButton from '../components/FloatingButton';
import useMarkdownStyle from '../hooks/useMarkdownStyle';
import { selectUser } from '../redux/feature/user/userSlice';
import { useAppSelector } from '../redux/hooks';
import { NoticeNavigationProps } from '../types/navigation';
import { Role } from '../types/userAndRoles';
import type { User } from '../types/userAndRoles';
import parseDateString from '../utils/parseDateString';

export default function FullPageNotice({
  navigation,
  route,
}: NoticeNavigationProps<'FullPageNotice'>) {
  const { notice } = route.params;
  const theme = useTheme();
  const markdownStyles = useMarkdownStyle();
  const user = useAppSelector(selectUser) as User;

  return (
    <>
      <Layout style={styles.layout}>
        <View style={styles.header}>
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateElement}>
              <Icon name="calendar-outline" fill={theme['text-hint-color']} style={styles.icon} />
              <Text style={[styles.dateText, { color: theme['text-hint-color'] }]} category="s1">
                {parseDateString(notice.createdAt).slice(0, -6)}
              </Text>
            </View>
            <View style={styles.timeElement}>
              <Icon name="clock-outline" fill={theme['text-hint-color']} style={styles.icon} />
              <Text style={[styles.dateText, { color: theme['text-hint-color'] }]} category="s1">
                {parseDateString(notice.createdAt).slice(-6)}
              </Text>
            </View>
          </View>
          <Text style={styles.title} category="h4">
            {notice.title}
          </Text>
          <View style={styles.issuerContainer}>
            <Text style={styles.issuedBy}>Issued By: &nbsp;</Text>
            <Text style={styles.issuerName}>{notice.issuer.name}</Text>
          </View>
        </View>

        <Divider />
        <View style={styles.body}>
          <ScrollView contentContainerStyle={styles.bodyScrollContainer}>
            <Markdown style={markdownStyles}>{notice.body}</Markdown>
          </ScrollView>
        </View>
      </Layout>
      {(user.id === notice.issuerId || user.role === Role.ADMIN) && (
        <FloatingButton
          icon="edit-outline"
          onPress={() => navigation.navigate('CreateNotice', { editing: true, notice })}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateElement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  timeElement: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 17,
    height: 17,
  },
  dateText: {
    marginLeft: 7,
  },
  title: {
    marginVertical: 8,
  },
  issuerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  issuedBy: {
    fontStyle: 'italic',
    fontSize: 14,
  },
  issuerName: {
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
  },
  bodyScrollContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
});
