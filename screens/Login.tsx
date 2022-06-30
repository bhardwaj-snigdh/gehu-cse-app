import { Button, Icon, Input, Layout, Text } from '@ui-kitten/components';
import { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import ButtonWithLoading from '../components/ButtonWithLoading';
import { selectKeyboardHidden } from '../redux/feature/keyboard/keyboardSlice';
import { useAppSelector } from '../redux/hooks';
import type { AuthNavStackProps } from '../types/NavigationParams';
import { emailValidationError, passwordValidationError } from '../utils/validations';

type FormInput = [string, null | string];

export default function Login({ navigation }: AuthNavStackProps<'Login'>) {
  const [email, setEmail] = useState<FormInput>(['', null]);
  const [password, setPassword] = useState<FormInput>(['', null]);
  const [isInputEntrySecured, setIsInputEntrySecured] = useState(true);
  const [isLoginAttempted, setIsLoginAttempted] = useState(false);
  const [loading, setLoading] = useState(false);
  const isKeyboardHidden = useAppSelector(selectKeyboardHidden);

  const loginHandler = () => {
    setIsLoginAttempted(true);
    const emailError = emailValidationError(email[0]);
    const passwordError = passwordValidationError(password[0]);
    setEmail(([value]) => [value, emailError]);
    setPassword(([value]) => [value, passwordError]);

    if (emailError || passwordError) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
    // FIXME: login user using api
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={() => setIsInputEntrySecured(!isInputEntrySecured)}>
      <Icon {...props} name={isInputEntrySecured ? 'eye-off-outline' : 'eye-outline'} />
    </TouchableWithoutFeedback>
  );

  const renderCaption = (caption: string | null) =>
    isLoginAttempted && caption !== null ? <Text>{caption}</Text> : undefined;

  return (
    <Layout style={styles.layout}>
      <View style={styles.header}>
        <Text category="h1">Login</Text>
      </View>

      <View style={styles.form}>
        <Input
          accessoryRight={<Icon name="person-outline" />}
          caption={renderCaption(email[1])}
          label={<Text category="label">Email</Text>}
          onChangeText={(nextInput) => setEmail(([, error]) => [nextInput, error])}
          placeholder="johndoe@gmail.com"
          status={isLoginAttempted && email[1] !== null ? 'danger' : 'basic'}
          style={styles.input}
          value={email[0]}
        />
        <Input
          accessoryRight={renderIcon}
          caption={renderCaption(password[1])}
          label={<Text category="h1">Password</Text>}
          onChangeText={(nextInput) => setPassword(([, error]) => [nextInput, error])}
          placeholder="●●●●●●●●"
          secureTextEntry={isInputEntrySecured}
          status={isLoginAttempted && password[1] !== null ? 'danger' : 'basic'}
          style={styles.input}
          value={password[0]}
        />
        <ButtonWithLoading
          icon="log-in"
          loading={loading}
          onPress={loginHandler}
          style={styles.loginButton}
        >
          Login
        </ButtonWithLoading>
      </View>

      <View style={styles.footer}>
        {isKeyboardHidden && (
          <>
            <Text>Don&apos;t have an account?</Text>
            <Button
              appearance="ghost"
              size="large"
              onPress={() => {
                setIsLoginAttempted(false);
                navigation.navigate('Register');
              }}
            >
              Create Account
            </Button>
          </>
        )}
      </View>
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
  loginButton: {
    marginVertical: 10,
    width: '100%',
  },
});
