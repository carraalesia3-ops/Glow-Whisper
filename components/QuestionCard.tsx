import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSpring
} from 'react-native-reanimated';
import { Question, QuizAnswer } from '@/data/quizData';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const { width } = Dimensions.get('window');

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: QuizAnswer;
  onAnswer: (answer: QuizAnswer) => void;
}

export function QuestionCard({ question, selectedAnswer, onAnswer }: QuestionCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.question}</Text>
      
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            option={option}
            isSelected={selectedAnswer?.value === option.value}
            onPress={() => onAnswer(option)}
          />
        ))}
      </View>

      {question.subtitle && (
        <Text style={styles.subtitle}>{question.subtitle}</Text>
      )}
    </View>
  );
}

interface OptionButtonProps {
  option: QuizAnswer;
  isSelected: boolean;
  onPress: () => void;
}

function OptionButton({ option, isSelected, onPress }: OptionButtonProps) {
  const scale = useSharedValue(1);
  const borderColor = useSharedValue('#E2E8F0');

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      borderColor: borderColor.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handlePress = () => {
    borderColor.value = withTiming('#4ECDC4', { duration: 200 });
    onPress();
  };

  React.useEffect(() => {
    if (isSelected) {
      borderColor.value = '#4ECDC4';
    } else {
      borderColor.value = '#E2E8F0';
    }
  }, [isSelected]);

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.optionButton,
        animatedStyle,
        isSelected && styles.selectedOption
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      activeOpacity={1}>
      <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
        {option.label}
      </Text>
      {option.description && (
        <Text style={[styles.optionDescription, isSelected && styles.selectedOptionDescription]}>
          {option.description}
        </Text>
      )}
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    marginVertical: 20,
    shadowColor: '#FFB3BA',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    lineHeight: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#F7FAFC',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    minHeight: 60,
    justifyContent: 'center',
  },
  selectedOption: {
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    borderColor: '#4ECDC4',
    shadowColor: '#4ECDC4',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3748',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#4ECDC4',
    fontWeight: '600',
  },
  optionDescription: {
    fontSize: 12,
    color: '#718096',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
  },
  selectedOptionDescription: {
    color: '#44B39D',
  },
  subtitle: {
    fontSize: 14,
    color: '#A0AEC0',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 16,
    lineHeight: 20,
  },
});