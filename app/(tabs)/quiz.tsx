import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, ChevronRight, CircleCheck as CheckCircle } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { HeroButton, AccentButton } from '@/components/CustomButtons';
import { QuestionCard } from '@/components/QuestionCard';
import { ProgressBar } from '@/components/ProgressBar';
import { quizQuestions, QuizAnswer } from '@/data/quizData';

const { width } = Dimensions.get('window');

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: QuizAnswer }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    loadExistingAnswers();
  }, []);

  const loadExistingAnswers = async () => {
    try {
      const savedAnswers = await AsyncStorage.getItem('skincare_quiz_answers');
      const savedResults = await AsyncStorage.getItem('skincare_quiz_results');
      
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
      
      if (savedResults) {
        setIsCompleted(true);
      }
    } catch (error) {
      console.error('Error loading quiz data:', error);
    }
  };

  const handleAnswer = async (answer: QuizAnswer) => {
    const questionId = quizQuestions[currentQuestion].id;
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    try {
      await AsyncStorage.setItem('skincare_quiz_answers', JSON.stringify(newAnswers));
    } catch (error) {
      console.error('Error saving answer:', error);
    }

    // Auto-advance to next question
    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const completeQuiz = async () => {
    if (Object.keys(answers).length < quizQuestions.length) {
      Alert.alert(
        'Incomplete Quiz',
        'Please answer all questions before completing the quiz.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      const results = generateRecommendations(answers);
      await AsyncStorage.setItem('skincare_quiz_results', JSON.stringify(results));
      await AsyncStorage.setItem('skincare_quiz_completed', 'true');
      
      setIsCompleted(true);
      
      Alert.alert(
        'Quiz Completed!',
        'Your personalized skincare routine is ready. View it on the My Routine tab.',
        [
          { text: 'View Now', onPress: () => router.push('/(tabs)/home') },
          { text: 'Later', style: 'cancel' }
        ]
      );
    } catch (error) {
      console.error('Error completing quiz:', error);
      Alert.alert('Error', 'Failed to save your results. Please try again.');
    }
  };

  const resetQuiz = async () => {
    Alert.alert(
      'Reset Quiz',
      'Are you sure you want to start over? This will delete your current answers.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('skincare_quiz_answers');
              await AsyncStorage.removeItem('skincare_quiz_results');
              await AsyncStorage.removeItem('skincare_quiz_completed');
              setAnswers({});
              setCurrentQuestion(0);
              setIsCompleted(false);
            } catch (error) {
              console.error('Error resetting quiz:', error);
            }
          }
        }
      ]
    );
  };

  const progress = (Object.keys(answers).length / quizQuestions.length) * 100;
  const allQuestionsAnswered = Object.keys(answers).length === quizQuestions.length;

  if (isCompleted) {
    return (
      <LinearGradient
        colors={['#FFE5E5', '#FFF8E7']}
        style={styles.container}>
        <View style={styles.completedContainer}>
          <CheckCircle size={80} color="#4ECDC4" />
          <Text style={styles.completedTitle}>Quiz Completed!</Text>
          <Text style={styles.completedDescription}>
            Your personalized skincare routine is ready. Check the "My Routine" tab to view your recommendations.
          </Text>
          
          <View style={styles.completedActions}>
            <HeroButton
              title="View My Routine"
              onPress={() => router.push('/(tabs)/home')}
            />
            <AccentButton
              title="Retake Quiz"
              onPress={resetQuiz}
            />
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#FFE5E5', '#FFF8E7']}
      style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Skin Assessment</Text>
          <Text style={styles.headerSubtitle}>
            Question {currentQuestion + 1} of {quizQuestions.length}
          </Text>
          <ProgressBar progress={progress} />
        </View>

        <QuestionCard
          question={quizQuestions[currentQuestion]}
          selectedAnswer={answers[quizQuestions[currentQuestion].id]}
          onAnswer={handleAnswer}
        />

        <View style={styles.navigation}>
          <AccentButton
            title="Previous"
            onPress={goToPrevious}
            disabled={currentQuestion === 0}
            icon={<ChevronLeft size={16} color={currentQuestion === 0 ? '#A0AEC0' : '#4ECDC4'} />}
            style={currentQuestion === 0 ? styles.disabledButton : undefined}
          />

          {currentQuestion < quizQuestions.length - 1 ? (
            <AccentButton
              title="Next"
              onPress={goToNext}
              disabled={!answers[quizQuestions[currentQuestion].id]}
              icon={<ChevronRight size={16} color={!answers[quizQuestions[currentQuestion].id] ? '#A0AEC0' : '#4ECDC4'} />}
              style={!answers[quizQuestions[currentQuestion].id] ? styles.disabledButton : undefined}
            />
          ) : (
            <HeroButton
              title="Complete Quiz"
              onPress={completeQuiz}
              disabled={!allQuestionsAnswered}
            />
          )}
        </View>

        {Object.keys(answers).length > 0 && (
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              {Object.keys(answers).length} of {quizQuestions.length} questions answered
            </Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

function generateRecommendations(answers: { [key: string]: QuizAnswer }) {
  // This is a simplified recommendation algorithm
  // In a real app, this would be more sophisticated
  
  const skinType = answers['skinType']?.value || 'normal';
  const concerns = answers['concerns']?.value || 'general';
  const age = answers['age']?.value || '25-34';
  const budget = answers['budget']?.value || 'medium';

  const morningRoutine = [
    { step: 1, product: 'Gentle Cleanser', description: 'Start your day with a pH-balanced cleanser' },
    { step: 2, product: 'Vitamin C Serum', description: 'Antioxidant protection for daytime' },
    { step: 3, product: 'Moisturizer', description: `${skinType} skin formula for all-day hydration` },
    { step: 4, product: 'Sunscreen SPF 30+', description: 'Essential UV protection' },
  ];

  const eveningRoutine = [
    { step: 1, product: 'Double Cleanse', description: 'Remove makeup and daily buildup' },
    { step: 2, product: 'Treatment Serum', description: `Targets ${concerns} for overnight repair` },
    { step: 3, product: 'Night Moisturizer', description: 'Rich formula for overnight restoration' },
    { step: 4, product: 'Face Oil', description: 'Optional: Extra nourishment for dry skin' },
  ];

  const productRecommendations = [
    {
      name: 'CeraVe Hydrating Cleanser',
      type: 'Cleanser',
      reason: `Perfect for ${skinType} skin with ceramides and hyaluronic acid`,
      price: '$12-15'
    },
    {
      name: 'The Ordinary Vitamin C Suspension',
      type: 'Serum',
      reason: 'Budget-friendly antioxidant protection',
      price: '$7-10'
    },
    {
      name: 'Neutrogena Hydrating Foaming Cleanser',
      type: 'Moisturizer',
      reason: `Lightweight yet hydrating formula for ${skinType} skin`,
      price: '$8-12'
    },
  ];

  return {
    skinProfile: {
      type: skinType,
      concerns,
      age,
      budget
    },
    morningRoutine,
    eveningRoutine,
    productRecommendations,
    generatedAt: new Date().toISOString()
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 20,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
  disabledButton: {
    opacity: 0.5,
  },
  progressInfo: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  progressText: {
    fontSize: 14,
    color: '#718096',
    fontStyle: 'italic',
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  completedTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2D3748',
    marginTop: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  completedDescription: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  completedActions: {
    width: '100%',
    gap: 16,
  },
});