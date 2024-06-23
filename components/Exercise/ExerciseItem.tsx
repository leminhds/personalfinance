import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Colors } from '@/constants/Colors';
import { ExerciseType } from '@/lib/types'; // Adjust the import path to your types

interface ExerciseItemProps {
  type: ExerciseType;
  lessonId: string;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ type, lessonId }) => {

  // Determine the path based on exercise type
  const getPath = () => {
    switch (type) {
      case 'Flashcards':
        return 'FlashcardPage';
      case 'Quiz':
        return 'QuizPage';
      case 'Case Studies':
        return 'CaseStudyPage';
      case 'Practical Exercises':
        return 'PracticalExercisePage';
      default:
        return '';
    }
  };

  return (
    <Link href={{ pathname: getPath(), params: { lessonId } }} asChild>
      <TouchableOpacity style={styles.innerButton}>
        <AnimatedCircularProgress
          size={120}
          width={10}
          fill={100}
          rotation={135}
          tintColor={Colors.Beak_Upper}
          backgroundColor={Colors.Hare}
        >
          {() => (
            <View
              style={{
                ...styles.innerCircle,
                backgroundColor: Colors.Feather_Green,
              }}
            >
              <Text style={styles.innerCircleText}>{type}</Text>
            </View>
          )}
        </AnimatedCircularProgress>
        <Text style={styles.innerText}>{type}</Text>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  innerButton: {
    margin: 10,
    alignItems: 'center',
  },
  innerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    width: 100,
    height: 100,
  },
  innerCircleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  innerText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExerciseItem;
