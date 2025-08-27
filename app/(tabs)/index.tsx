import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, ArrowRight, Heart, Star } from 'lucide-react-native';
import { HeroButton, AccentButton } from '@/components/CustomButtons';

const { width, height } = Dimensions.get('window');

export default function LandingPage() {
  const handleStartQuiz = () => {
    router.push('/(tabs)/quiz');
  };

  const handleViewRoutines = () => {
    router.push('/(tabs)/home');
  };

  return (
    <LinearGradient
      colors={['#FFE5E5', '#FFF8E7', '#FFB3BA']}
      style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <Sparkles size={40} color="#4ECDC4" />
          </View>
          
          <Text style={styles.title}>SkinCare AI</Text>
          <Text style={styles.title}>Glow Whisper</Text>
          <Text style={styles.subtitle}>
            Your Personal Skincare Journey Starts Here
          </Text>
          
          <Text style={styles.description}>
            Discover your perfect skincare routine with our AI-powered assessment. 
            Get personalized product recommendations tailored to your unique skin type, 
            concerns, and lifestyle.
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <FeatureCard
            icon={<Heart size={24} color="#4ECDC4" />}
            title="Personalized Analysis"
            description="Advanced skin assessment based on your unique characteristics"
          />
          <FeatureCard
            icon={<Star size={24} color="#4ECDC4" />}
            title="Expert Recommendations"
            description="Curated product suggestions from skincare professionals"
          />
          <FeatureCard
            icon={<Sparkles size={24} color="#4ECDC4" />}
            title="Custom Routines"
            description="Morning and evening routines designed just for you"
          />
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <HeroButton
            title="Start Your Skin Assessment"
            onPress={handleStartQuiz}
            icon={<ArrowRight size={20} color="white" />}
          />
          
          <AccentButton
            title="View Sample Routines"
            onPress={handleViewRoutines}
          />
          
          <Text style={styles.disclaimer}>
            Takes only 2 minutes • Completely personalized • Free forever
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.featureIcon}>
        {icon}
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: height * 0.08,
    paddingBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#FFB3BA',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4A5568',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: width * 0.85,
  },
  featuresSection: {
    paddingVertical: 20,
    gap: 20,
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#FFB3BA',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
  },
  ctaSection: {
    paddingVertical: 40,
    alignItems: 'center',
    gap: 16,
  },
  disclaimer: {
    fontSize: 12,
    color: '#A0AEC0',
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
});