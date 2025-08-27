import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSpring
} from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export function HeroButton({ title, onPress, disabled = false, icon, style }: ButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    if (!disabled) {
      scale.value = withSpring(0.98);
      opacity.value = withTiming(0.8, { duration: 100 });
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      scale.value = withSpring(1);
      opacity.value = withTiming(1, { duration: 100 });
    }
  };

  return (
    <AnimatedTouchableOpacity
      style={[animatedStyle, style]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={1}>
      <LinearGradient
        colors={disabled ? ['#A0AEC0', '#A0AEC0'] : ['#4ECDC4', '#44B39D']}
        style={[styles.heroButton, disabled && styles.disabledButton]}>
        <Text style={[styles.heroButtonText, disabled && styles.disabledButtonText]}>
          {title}
        </Text>
        {icon && <Text style={styles.buttonIcon}>{icon}</Text>}
      </LinearGradient>
    </AnimatedTouchableOpacity>
  );
}

export function AccentButton({ title, onPress, disabled = false, icon, style }: ButtonProps) {
  const scale = useSharedValue(1);
  const shadowOpacity = useSharedValue(0.1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      shadowOpacity: shadowOpacity.value,
    };
  });

  const handlePressIn = () => {
    if (!disabled) {
      scale.value = withSpring(0.98);
      shadowOpacity.value = withTiming(0.2, { duration: 100 });
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      scale.value = withSpring(1);
      shadowOpacity.value = withTiming(0.1, { duration: 100 });
    }
  };

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.accentButton,
        animatedStyle,
        disabled && styles.disabledAccentButton,
        style
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={1}>
      {icon && <Text style={styles.buttonIcon}>{icon}</Text>}
      <Text style={[styles.accentButtonText, disabled && styles.disabledButtonText]}>
        {title}
      </Text>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    shadowColor: '#4ECDC4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 200,
  },
  heroButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  accentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#4ECDC4',
    shadowColor: '#FFB3BA',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    minWidth: 140,
  },
  accentButtonText: {
    color: '#4ECDC4',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  disabledButton: {
    shadowOpacity: 0,
    elevation: 0,
  },
  disabledAccentButton: {
    backgroundColor: '#F7FAFC',
    borderColor: '#A0AEC0',
    shadowOpacity: 0,
    elevation: 0,
  },
  disabledButtonText: {
    color: '#A0AEC0',
  },
});