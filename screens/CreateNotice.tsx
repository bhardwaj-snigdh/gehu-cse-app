import { CheckBox, Divider, Input, Layout, Text, useTheme } from '@ui-kitten/components';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, ToastAndroid } from 'react-native';
import FloatingButton from '../components/FloatingButton';
import { selectKeyboardHidden } from '../redux/feature/keyboard/keyboardSlice';
import {
  issueNotice,
  selectNoticeError,
  selectNoticeLoading,
} from '../redux/feature/notice/noticeSlice';
import { selectToken, selectUser } from '../redux/feature/user/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Role } from '../types/userAndRoles';
import { NoticeNavigationProps } from '../types/navigation';
import type { RoleType, User } from '../types/userAndRoles';
import type Notice from '../types/notice';

// TODO: Edit Notice Feature
export default function CreateNotice({ navigation }: NoticeNavigationProps<'CreateNotice'>) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isStudentChecked, setIsStudentChecked] = useState(false);
  const [isFacultyChecked, setIsFacultyChecked] = useState(false);
  const [isHodChecked, setIsHodChecked] = useState(false);
  const [isAdminChecked, setIsAdminChecked] = useState(false);
  const [isCreateAttempted, setIsCreateAttempted] = useState(false);
  const bodyInputRef = useRef<TextInput>(null);
  const token = useAppSelector(selectToken) as string;
  const user = useAppSelector(selectUser) as User;
  const keyboardHidden = useAppSelector(selectKeyboardHidden);
  const loading = useAppSelector(selectNoticeLoading);
  const publishNoticeError = useAppSelector(selectNoticeError);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (publishNoticeError) {
      ToastAndroid.show(publishNoticeError, ToastAndroid.LONG);
    }
  }, [publishNoticeError]);

  const createNoticeHandler = () => {
    setIsCreateAttempted(true);
    if (title === '' || body === '') return;

    const audience: RoleType[] = [];
    if (isStudentChecked) audience.push(Role.USER);
    if (isFacultyChecked) audience.push(Role.FACULTY);
    if (isHodChecked) audience.push(Role.HOD);
    if (isAdminChecked) audience.push(Role.ADMIN);

    dispatch(issueNotice({ token, notice: { title, body, audience } })).then((res) => {
      ToastAndroid.show('Notice Published', ToastAndroid.LONG);
      navigation.navigate('FullPageNotice', { notice: res.payload as Notice });
    });
  };

  return (
    <Layout style={styles.layout}>
      <Input
        onChangeText={(input) => setTitle(input)}
        value={title}
        style={[styles.titleInput, { backgroundColor: theme['background-basic-color-1'] }]}
        placeholder={isCreateAttempted && title === '' ? 'Title cannot be empty' : 'Title'}
        placeholderTextColor={
          isCreateAttempted && title === ''
            ? theme['color-danger-600']
            : theme['color-basic-control-transparent-600']
        }
        multiline
        spellCheck
        numberOfLines={2}
      />
      <Divider />

      <Text style={styles.checkboxLabel} category="label">
        Publish to:
      </Text>
      <Layout style={styles.checkboxContainer}>
        {([Role.ADMIN] as RoleType[]).includes(user.role) && (
          <CheckBox
            checked={isAdminChecked}
            onChange={() => setIsAdminChecked((checked) => !checked)}
          >
            Admin
          </CheckBox>
        )}
        {([Role.ADMIN, Role.HOD] as RoleType[]).includes(user.role) && (
          <CheckBox checked={isHodChecked} onChange={() => setIsHodChecked((checked) => !checked)}>
            HOD
          </CheckBox>
        )}
        {([Role.ADMIN, Role.HOD, Role.FACULTY] as RoleType[]).includes(user.role) && (
          <CheckBox
            checked={isFacultyChecked}
            onChange={() => setIsFacultyChecked((checked) => !checked)}
          >
            Faculty
          </CheckBox>
        )}
        <CheckBox
          checked={isStudentChecked}
          onChange={() => setIsStudentChecked((checked) => !checked)}
        >
          Student
        </CheckBox>
      </Layout>
      <Divider />

      <Pressable
        style={styles.bodyContainer}
        onPress={() => {
          if (keyboardHidden) {
            bodyInputRef.current?.blur();
            bodyInputRef.current?.focus();
          } else {
            bodyInputRef.current?.focus();
          }
        }}
      >
        <TextInput
          ref={bodyInputRef}
          onChangeText={(input) => setBody(input)}
          value={body}
          placeholder={
            isCreateAttempted && body === ''
              ? 'Notice body cannot be empty'
              : 'Type your notice here'
          }
          style={[
            styles.bodyInput,
            {
              backgroundColor: theme['background-basic-color-1'],
              color: theme['color-basic-default'],
            },
          ]}
          placeholderTextColor={
            isCreateAttempted && body === ''
              ? theme['color-danger-600']
              : theme['color-basic-control-transparent-600']
          }
          multiline
          spellCheck
        />
      </Pressable>
      <FloatingButton loading={loading} onPress={createNoticeHandler} icon="cloud-upload-outline" />
    </Layout>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  titleInput: {
    borderWidth: 0,
    maxHeight: 60,
  },
  checkboxLabel: {
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  bodyInput: {
    fontSize: 15,
    backgroundColor: 'transparent',
  },
});
