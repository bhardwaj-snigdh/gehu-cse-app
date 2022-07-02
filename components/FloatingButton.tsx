import { Icon, Spinner, useTheme } from '@ui-kitten/components';
import { Pressable, StyleSheet } from 'react-native';

export interface FloatingButtonProps {
  icon: string;
  onPress: () => void;
  loading?: boolean;
}

export default function FloatingButton({ icon, onPress, loading }: FloatingButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? theme['color-primary-hover'] : theme['color-primary-default'],
        },
        styles.button,
      ]}
    >
      {loading ? (
        <Spinner status="basic" size="small" />
      ) : (
        <Icon style={styles.icon} name={icon} fill="#fff" />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 999999,
    position: 'absolute',
    bottom: 15,
    right: 12,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
});
