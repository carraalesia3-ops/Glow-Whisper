import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, Star } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring
} from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface ProductRecommendation {
  name: string;
  type: string;
  reason: string;
  price: string;
}

interface ProductCardProps {
  product: ProductRecommendation;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
  const heartScale = useSharedValue(1);
  const cardScale = useSharedValue(1);

  const heartAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: heartScale.value }],
    };
  });

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: cardScale.value }],
    };
  });

  const handleFavoritePress = () => {
    heartScale.value = withSpring(0.8, { duration: 100 }, () => {
      heartScale.value = withSpring(1);
    });
    onToggleFavorite();
  };

  const handlePressIn = () => {
    cardScale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    cardScale.value = withSpring(1);
  };

  return (
    <Animated.View style={[styles.container, cardAnimatedStyle]}>
      <View style={styles.header}>
        <View style={styles.typeContainer}>
          <Text style={styles.typeText}>{product.type}</Text>
        </View>
        
        <AnimatedTouchableOpacity
          style={[styles.favoriteButton, heartAnimatedStyle]}
          onPress={handleFavoritePress}
          activeOpacity={0.7}>
          <Heart 
            size={20} 
            color={isFavorite ? '#FF6B6B' : '#A0AEC0'} 
            fill={isFavorite ? '#FF6B6B' : 'transparent'}
          />
        </AnimatedTouchableOpacity>
      </View>
      
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.reason}>{product.reason}</Text>
      
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{product.price}</Text>
        </View>
        
        <View style={styles.ratingContainer}>
          <Star size={14} color="#FFD700" fill="#FFD700" />
          <Text style={styles.ratingText}>4.5</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#FFB3BA',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeContainer: {
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#4ECDC4',
    textTransform: 'uppercase',
  },
  favoriteButton: {
    padding: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 6,
  },
  reason: {
    fontSize: 13,
    color: '#718096',
    lineHeight: 18,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A5568',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#718096',
    fontWeight: '500',
  },
});