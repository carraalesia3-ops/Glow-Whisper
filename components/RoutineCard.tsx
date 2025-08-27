import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircleCheck as CheckCircle2 } from 'lucide-react-native';

interface RoutineStep {
  step: number;
  product: string;
  description: string;
}

interface RoutineCardProps {
  steps: RoutineStep[];
  type: 'morning' | 'evening';
}

export function RoutineCard({ steps, type }: RoutineCardProps) {
  const gradientColors = type === 'morning' 
    ? ['rgba(78, 205, 196, 0.05)', 'rgba(255, 179, 186, 0.05)']
    : ['rgba(255, 179, 186, 0.05)', 'rgba(78, 205, 196, 0.05)'];

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{step.step}</Text>
          </View>
          
          <View style={styles.stepContent}>
            <Text style={styles.productName}>{step.product}</Text>
            <Text style={styles.productDescription}>{step.description}</Text>
          </View>
          
          <CheckCircle2 size={20} color="#4ECDC4" style={styles.checkIcon} />
        </View>
      ))}
      
      <View style={styles.timeEstimate}>
        <Text style={styles.timeText}>
          Estimated time: {type === 'morning' ? '5-7 minutes' : '8-10 minutes'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#FFB3BA',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  stepContent: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 2,
  },
  productDescription: {
    fontSize: 13,
    color: '#718096',
    lineHeight: 18,
  },
  checkIcon: {
    opacity: 0.6,
  },
  timeEstimate: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#A0AEC0',
    fontStyle: 'italic',
  },
});