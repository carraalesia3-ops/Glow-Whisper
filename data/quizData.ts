export interface QuizAnswer {
  value: string;
  label: string;
  description?: string;
}

export interface Question {
  id: string;
  question: string;
  subtitle?: string;
  options: QuizAnswer[];
}

export const quizQuestions: Question[] = [
  {
    id: 'skinType',
    question: 'What is your skin type?',
    subtitle: 'Think about how your skin feels naturally without products',
    options: [
      {
        value: 'oily',
        label: 'Oily',
        description: 'Shiny, large pores, prone to breakouts'
      },
      {
        value: 'dry',
        label: 'Dry',
        description: 'Tight, flaky, rough texture'
      },
      {
        value: 'combination',
        label: 'Combination',
        description: 'Oily T-zone, dry cheeks'
      },
      {
        value: 'sensitive',
        label: 'Sensitive',
        description: 'Easily irritated, reactive to products'
      },
      {
        value: 'normal',
        label: 'Normal',
        description: 'Balanced, not too oily or dry'
      }
    ]
  },
  {
    id: 'concerns',
    question: 'What is your primary skin concern?',
    options: [
      {
        value: 'acne',
        label: 'Acne & Breakouts',
        description: 'Active breakouts, blackheads, whiteheads'
      },
      {
        value: 'aging',
        label: 'Anti-Aging',
        description: 'Fine lines, wrinkles, loss of firmness'
      },
      {
        value: 'hyperpigmentation',
        label: 'Dark Spots',
        description: 'Acne scars, sun spots, uneven tone'
      },
      {
        value: 'dryness',
        label: 'Dryness & Dehydration',
        description: 'Tight, flaky, lacking moisture'
      },
      {
        value: 'redness',
        label: 'Redness & Sensitivity',
        description: 'Irritation, rosacea, reactive skin'
      },
      {
        value: 'general',
        label: 'General Maintenance',
        description: 'Healthy skin maintenance'
      }
    ]
  },
  {
    id: 'age',
    question: 'What is your age range?',
    subtitle: 'This helps us recommend age-appropriate products',
    options: [
      {
        value: '18-24',
        label: '18-24 years old'
      },
      {
        value: '25-34',
        label: '25-34 years old'
      },
      {
        value: '35-44',
        label: '35-44 years old'
      },
      {
        value: '45-54',
        label: '45-54 years old'
      },
      {
        value: '55+',
        label: '55+ years old'
      }
    ]
  },
  {
    id: 'currentRoutine',
    question: 'How would you describe your current skincare routine?',
    options: [
      {
        value: 'minimal',
        label: 'Minimal',
        description: 'Just cleanser or soap and water'
      },
      {
        value: 'basic',
        label: 'Basic',
        description: 'Cleanser, moisturizer, occasional sunscreen'
      },
      {
        value: 'moderate',
        label: 'Moderate',
        description: 'Morning and evening routine with 3-5 products'
      },
      {
        value: 'extensive',
        label: 'Extensive',
        description: '6+ products, multiple serums and treatments'
      }
    ]
  },
  {
    id: 'lifestyle',
    question: 'Which best describes your lifestyle?',
    subtitle: 'This affects your skin and time available for skincare',
    options: [
      {
        value: 'low-stress',
        label: 'Low Stress',
        description: 'Regular sleep, low stress levels'
      },
      {
        value: 'moderate-stress',
        label: 'Moderate Stress',
        description: 'Some stress, occasional late nights'
      },
      {
        value: 'high-stress',
        label: 'High Stress',
        description: 'Very busy, irregular sleep, high stress'
      },
      {
        value: 'very-active',
        label: 'Very Active',
        description: 'Exercise frequently, sweat a lot'
      }
    ]
  },
  {
    id: 'budget',
    question: 'What is your budget for skincare products?',
    subtitle: 'Monthly budget for all skincare products',
    options: [
      {
        value: 'low',
        label: 'Under $50/month',
        description: 'Budget-friendly drugstore options'
      },
      {
        value: 'medium',
        label: '$50-150/month',
        description: 'Mix of drugstore and mid-range brands'
      },
      {
        value: 'high',
        label: '$150-300/month',
        description: 'Premium and professional brands'
      },
      {
        value: 'luxury',
        label: '$300+/month',
        description: 'High-end and luxury skincare'
      }
    ]
  },
  {
    id: 'sunExposure',
    question: 'How much sun exposure do you get daily?',
    subtitle: 'Helps determine sunscreen needs',
    options: [
      {
        value: 'minimal',
        label: 'Minimal',
        description: 'Mostly indoors, limited outdoor time'
      },
      {
        value: 'moderate',
        label: 'Moderate',
        description: 'Some outdoor activities, commuting'
      },
      {
        value: 'high',
        label: 'High',
        description: 'Outdoor job or frequent outdoor activities'
      }
    ]
  },
  {
    id: 'timeAvailable',
    question: 'How much time can you dedicate to skincare?',
    options: [
      {
        value: '2-3-minutes',
        label: '2-3 minutes',
        description: 'Quick morning and evening routine'
      },
      {
        value: '5-10-minutes',
        label: '5-10 minutes',
        description: 'Standard routine with multiple steps'
      },
      {
        value: '10-15-minutes',
        label: '10-15+ minutes',
        description: 'Comprehensive routine with treatments'
      }
    ]
  },
  {
    id: 'products',
    question: 'Which products have worked well for you?',
    subtitle: 'Select ingredients or brands you\'ve had success with',
    options: [
      {
        value: 'retinoids',
        label: 'Retinoids/Retinol',
        description: 'Anti-aging and acne treatment'
      },
      {
        value: 'vitamin-c',
        label: 'Vitamin C',
        description: 'Brightening antioxidant'
      },
      {
        value: 'hyaluronic-acid',
        label: 'Hyaluronic Acid',
        description: 'Hydrating ingredient'
      },
      {
        value: 'niacinamide',
        label: 'Niacinamide',
        description: 'Pore-refining and oil control'
      },
      {
        value: 'natural',
        label: 'Natural/Organic Products',
        description: 'Plant-based, minimal ingredients'
      },
      {
        value: 'none',
        label: 'None/Not Sure',
        description: 'Haven\'t found what works yet'
      }
    ]
  },
  {
    id: 'allergies',
    question: 'Do you have any known skincare allergies or sensitivities?',
    options: [
      {
        value: 'fragrances',
        label: 'Fragrances',
        description: 'Perfumes and scented products'
      },
      {
        value: 'acids',
        label: 'Alpha/Beta Hydroxy Acids',
        description: 'AHA/BHA, glycolic acid, salicylic acid'
      },
      {
        value: 'retinoids',
        label: 'Retinoids',
        description: 'Retinol, tretinoin, retinyl palmitate'
      },
      {
        value: 'alcohol',
        label: 'Alcohol/Drying Ingredients',
        description: 'Denatured alcohol, sulfates'
      },
      {
        value: 'none',
        label: 'None Known',
        description: 'No known sensitivities'
      }
    ]
  }
];