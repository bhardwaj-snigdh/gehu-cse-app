import { Button, Icon, Input, Layout, Text } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import { StyleSheet, ToastAndroid, TouchableWithoutFeedback, View } from 'react-native';
import ButtonWithLoading from '../components/ButtonWithLoading';
import { selectKeyboardHidden } from '../redux/feature/keyboard/keyboardSlice';
import { register, selectAuthError, selectAuthLoading } from '../redux/feature/user/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import type { AuthNavigationProps } from '../types/navigation';
import {
  emailValidationError,
  nameValidationError,
  passwordValidationError,
  phoneValidationError,
} from '../utils/validations';

type FormInput = [string, null | string];

export default function Register({ navigation }: AuthNavigationProps<'Register'>) {
  const [email, setEmail] = useState<FormInput>(['', null]);
  const [name, setName] = useState<FormInput>(['', null]);
  const [password, setPassword] = useState<FormInput>(['', null]);
  const [phone, setPhone] = useState<FormInput>(['', null]);
  const [isInputEntrySecured, setIsInputEntrySecured] = useState(true);
  const [isRegisterAttempted, setIsRegisterAttempted] = useState(false);
  const isKeyboardHidden = useAppSelector(selectKeyboardHidden);
  const loading = useAppSelector(selectAuthLoading);
  const authError = useAppSelector(selectAuthError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authError !== null) {
      ToastAndroid.show('Some error occured', ToastAndroid.LONG);
    }
  }, [authError]);

  const registerHandler = () => {
    setIsRegisterAttempted(true);
    const emailError = emailValidationError(email[0]);
    const passwordError = passwordValidationError(password[0]);
    const nameError = nameValidationError(name[0]);
    const phoneError = phoneValidationError(phone[0]);
    setEmail(([value]) => [value, emailError]);
    setPassword(([value]) => [value, passwordError]);
    setName(([value]) => [value, nameError]);
    setPhone(([value]) => [value, phoneError]);

    if (emailError || passwordError || nameError || phoneError) return;

    dispatch(
      register({
        email: email[0],
        name: name[0],
        phone: phone[0],
        password: password[0],
      })
    );
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={() => setIsInputEntrySecured(!isInputEntrySecured)}>
      <Icon {...props} name={isInputEntrySecured ? 'eye-off-outline' : 'eye-outline'} />
    </TouchableWithoutFeedback>
  );

  const renderCaption = (caption: string | null) =>
    isRegisterAttempted && caption !== null ? <Text>{caption}</Text> : undefined;

  return (
    <Layout style={styles.layout}>
      <View style={styles.header}>
        <Text category="h1">Register</Text>
      </View>

      <View style={styles.form}>
        <Input
          accessoryRight={<Icon name="person-outline" />}
          caption={renderCaption(name[1])}
          label={<Text category="label">Name</Text>}
          onChangeText={(nextInput) => setName(([, error]) => [nextInput, error])}
          placeholder="John Snow"
          status={isRegisterAttempted && name[1] !== null ? 'danger' : 'basic'}
          style={styles.input}
          value={name[0]}
        />
        <Input
          accessoryRight={<Icon name="at-outline" />}
          caption={renderCaption(email[1])}
          label={<Text category="label">Email</Text>}
          onChangeText={(nextInput) => setEmail(([, error]) => [nextInput, error])}
          placeholder="john.snow@got.com"
          status={isRegisterAttempted && email[1] !== null ? 'danger' : 'basic'}
          style={styles.input}
          value={email[0]}
        />
        <Input
          accessoryRight={<Icon name="phone-outline" />}
          caption={renderCaption(phone[1])}
          label={<Text category="label">Phone</Text>}
          onChangeText={(nextInput) => setPhone(([, error]) => [nextInput, error])}
          placeholder="xxxxxxxxxx"
          status={isRegisterAttempted && phone[1] !== null ? 'danger' : 'basic'}
          style={styles.input}
          value={phone[0]}
        />
        <Input
          accessoryRight={renderIcon}
          label={<Text category="label">Password</Text>}
          caption={renderCaption(password[1])}
          onChangeText={(nextInput) => setPassword(([, error]) => [nextInput, error])}
          placeholder="●●●●●●●●"
          secureTextEntry={isInputEntrySecured}
          status={isRegisterAttempted && password[1] !== null ? 'danger' : 'basic'}
          style={styles.input}
          value={password[0]}
        />
        <ButtonWithLoading
          icon="log-in"
          loading={loading}
          onPress={registerHandler}
          style={styles.registerButton}
        >
          Register
        </ButtonWithLoading>
      </View>

      {isKeyboardHidden && (
        <View style={styles.footer}>
          <Text>Already have an account?</Text>
          <Button
            disabled={loading}
            appearance="ghost"
            size="large"
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Button>
        </View>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    maxHeight: '20%',
    paddingLeft: 20,
    paddingTop: 30,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '20%',
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 12,
  },
  registerButton: {
    marginTop: 10,
    width: '100%',
  },
});
