import { Button, Icon, Spinner } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

function LoadingIndicator({ style }: any) {
  return (
    <View style={[style, styles.spinner]}>
      <Spinner size="small" />
    </View>
  );
}

export interface ButtonWithLoadingProps {
  onPress: () => void;
  loading: boolean;
  icon: string;
  style: StyleProp<ViewStyle>;
  children: string;
}

export default function ButtonWithLoading({
  icon,
  loading,
  onPress,
  style,
  children,
}: ButtonWithLoadingProps) {
  return (
    <Button
      onPress={onPress}
      disabled={loading}
      accessoryRight={loading ? <LoadingIndicator /> : <Icon name={icon} />}
      appearance={loading ? 'outline' : 'filled'}
      style={style}
    >
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
