import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sun, Moon, Heart, RefreshCw, Star } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { HeroButton, AccentButton } from '@/components/CustomButtons';
import { RoutineCard } from '@/components/RoutineCard';
import { ProductCard } from '@/components/ProductCard';

interface SkinProfile {
  type: string;
  concerns: string;
  age: string;
  budget: string;
}

interface RoutineStep {
  step: number;
  product: string;
  description: string;
}

interface ProductRecommendation {
  name: string;
  type: string;
  reason: string;
  price: string;
}

interface QuizResults {
  skinProfile: SkinProfile;
  morningRoutine: RoutineStep[];
  eveningRoutine: RoutineStep[];
  productRecommendations: ProductRecommendation[];
  generatedAt: string;
}

export default function HomePage() {
  const [results, setResults] = useState<QuizResults | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
    loadFavorites();
  }, []);

  const loadResults = async () => {
    try {
      const savedResults = await AsyncStorage.getItem('skincare_quiz_results');
      if (savedResults) {
        setResults(JSON.parse(savedResults));
      }
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('skincare_favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const toggleFavorite = async (productName: string) => {
    try {
      const newFavorites = favorites.includes(productName)
        ? favorites.filter(fav => fav !== productName)
        : [...favorites, productName];
      
      setFavorites(newFavorites);
      await AsyncStorage.setItem('skincare_favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const retakeQuiz = () => {
    Alert.alert(
      'Retake Quiz',
      'This will reset your current routine. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Retake',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('skincare_quiz_results');
              await AsyncStorage.removeItem('skincare_quiz_answers');
              await AsyncStorage.removeItem('skincare_quiz_completed');
              router.push('/(tabs)/quiz');
            } catch (error) {
              console.error('Error resetting quiz:', error);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <LinearGradient
        colors={['#FFE5E5', '#FFF8E7']}
        style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your routine...</Text>
        </View>
      </LinearGradient>
    );
  }

  if (!results) {
    return (
      <LinearGradient
        colors={['#FFE5E5', '#FFF8E7']}
        style={styles.container}>
        <View style={styles.emptyContainer}>
          <Star size={80} color="#FFB3BA" />
          <Text style={styles.emptyTitle}>No Routine Yet</Text>
          <Text style={styles.emptyDescription}>
            Take our skin assessment quiz to get personalized skincare recommendations.
          </Text>
          
          <View style={styles.emptyActions}>
            <HeroButton
              title="Start Quiz"
              onPress={() => router.push('/(tabs)/quiz')}
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
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Skincare Routine</Text>
          <Text style={styles.headerSubtitle}>
            Personalized for {results.skinProfile.type} skin
          </Text>
          
          <View style={styles.profileBadge}>
            <Text style={styles.profileText}>
              {results.skinProfile.type} • {results.skinProfile.concerns} • {results.skinProfile.age}
            </Text>
          </View>
        </View>

        {/* Morning Routine */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Sun size={24} color="#4ECDC4" />
            <Text style={styles.sectionTitle}>Morning Routine</Text>
          </View>
          
          <RoutineCard
            steps={results.morningRoutine}
            type="morning"
          />
        </View>

        {/* Evening Routine */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Moon size={24} color="#4ECDC4" />
            <Text style={styles.sectionTitle}>Evening Routine</Text>
          </View>
          
          <RoutineCard
            steps={results.eveningRoutine}
            type="evening"
          />
        </View>

        {/* Product Recommendations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Heart size={24} color="#4ECDC4" />
            <Text style={styles.sectionTitle}>Recommended Products</Text>
          </View>
          
          <View style={styles.productsContainer}>
            {results.productRecommendations.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                isFavorite={favorites.includes(product.name)}
                onToggleFavorite={() => toggleFavorite(product.name)}
              />
            ))}
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <AccentButton
            title="Retake Quiz"
            onPress={retakeQuiz}
            icon={<RefreshCw size={16} color="#4ECDC4" />}
          />
          
          <Text style={styles.lastUpdated}>
            Last updated: {new Date(results.generatedAt).toLocaleDateString()}
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#718096',
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    marginTop: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  emptyActions: {
    width: '100%',
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
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 16,
    textAlign: 'center',
  },
  profileBadge: {
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4ECDC4',
  },
  profileText: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    marginLeft: 8,
  },
  productsContainer: {
    gap: 12,
  },
  actions: {
    alignItems: 'center',
    paddingVertical: 30,
    gap: 16,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#A0AEC0',
    fontStyle: 'italic',
  },
});