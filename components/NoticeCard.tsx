import { useNavigation } from '@react-navigation/native';
import { Icon, Text, useTheme } from '@ui-kitten/components';
import { Pressable, StyleSheet, View } from 'react-native';
import { FullPageNoticeNavigationProps } from '../types/navigation';
import type Notice from '../types/notice';
import parseDateString from '../utils/parseDateString';

export type NoticeCardProps = { notice: Notice };

export default function NoticeCard({ notice }: NoticeCardProps) {
  const navigator = useNavigation<FullPageNoticeNavigationProps>();
  const theme = useTheme();

  return (
    <Pressable
      onPress={() => navigator.navigate('FullPageNotice', { notice })}
      style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? theme['background-basic-color-2']
            : theme['background-basic-color-1'],
        },
        styles.card,
      ]}
    >
      <View style={styles.iconBox}>
        <Icon style={styles.icon} fill="#8F9BB3" name="info-outline" />
      </View>
      <View style={styles.details}>
        <Text style={styles.date}>{parseDateString(notice.createdAt)}</Text>
        <Text style={styles.title}>{notice.title}</Text>
        <Text style={styles.issuer}>By {notice.issuer.name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
    marginHorizontal: 5,
    paddingHorizontal: 8,
    paddingVertical: 15,
    borderRadius: 5,
    minHeight: 100,
  },
  iconBox: {
    flex: 1,
    // backgroundColor: 'orange',
  },
  icon: {
    width: 20,
    height: 20,
  },
  details: {
    flex: 15,
    paddingLeft: 8,
    // backgroundColor: 'pink',
  },
  date: {
    fontStyle: 'italic',
    fontSize: 12,
    // backgroundColor: 'pink',
  },
  title: {
    fontSize: 19,
    marginBottom: 8,
    marginTop: 4,
    // backgroundColor: 'pink',
  },
  issuer: {
    fontSize: 13,
    // backgroundColor: 'pink',
  },
});
