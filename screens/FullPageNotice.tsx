import { Divider, Layout, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { NoticeNavigationProps } from '../types/navigation';
import parseDateString from '../utils/parseDateString';

// FIXME: Markdown text view
export default function FullPageNotice({ route }: NoticeNavigationProps<'FullPageNotice'>) {
  const { notice } = route.params;

  return (
    <Layout style={styles.layout}>
      <View style={styles.header}>
        <Text style={styles.date} category="s1">
          {parseDateString(notice.createdAt)}
        </Text>
        <Text style={styles.title} category="h4">
          {notice.title}
        </Text>
        <Text style={styles.issuer} category="s1">
          By {notice.issuer.name}
        </Text>
      </View>

      <Divider />

      <View style={styles.body}>
        <Text>{notice.body}</Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  header: {},
  date: {},
  title: {},
  issuer: {},
  body: {},
});
