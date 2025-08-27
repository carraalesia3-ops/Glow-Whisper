import { Tabs } from 'expo-router';
import { Heart, Chrome as Home, ClipboardList } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabLayout() {
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);

  useEffect(() => {
    checkQuizCompletion();
  }, []);

  const checkQuizCompletion = async () => {
    try {
      const quizData = await AsyncStorage.getItem('skincare_quiz_results');
      setHasCompletedQuiz(!!quizData);
    } catch (error) {
      console.error('Error checking quiz completion:', error);
    }
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFF8E7',
          borderTopWidth: 1,
          borderTopColor: '#FFE5E5',
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#4ECDC4',
        tabBarInactiveTintColor: '#FFB3BA',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Welcome',
          tabBarIcon: ({ size, color }) => (
            <Heart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: 'Quiz',
          tabBarIcon: ({ size, color }) => (
            <ClipboardList size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'My Routine',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
          tabBarBadge: hasCompletedQuiz ? undefined : '!',
          tabBarBadgeStyle: {
            backgroundColor: '#4ECDC4',
            color: 'white',
          },
        }}
      />
    </Tabs>
  );
}