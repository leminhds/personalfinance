import { View, StyleSheet, FlatList, Dimensions, Button } from 'react-native';
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { getFlashcards } from "@/lib/queries";
import { Flashcard }  from "@/lib/types";
import { router } from 'expo-router';

import Card from "@/components/Card";
import Tracker from "@/components/ProgressBar";

import { addExerciseCompleted } from "@/lib/actions";

type RouteParams = {
  FlashcardExercisePage: {
    lessonId: string;
  };
};
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const FlashcardExercisePage: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, 'FlashcardExercisePage'>>();
  const { lessonId } = route.params;
  const [FlashcardExercises, setFlashcardExercises] = React.useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (lessonId) {
          const flashcardExerciseResponse = await getFlashcards(lessonId);
          setFlashcardExercises(flashcardExerciseResponse);
        }
      } catch (error) {
        console.error('Failed to fetch flashcard exercises:', error);
      }
    };
    fetchData();
  }, [lessonId]);

  const renderItem = ({ item }: { item: Flashcard }) => (
    <View style={styles.cardContainer}>
      <Card term={item.term} definition={item.definition} />
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={FlashcardExercises}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={(e) => {
          const index = Math.floor(e.nativeEvent.contentOffset.x / screenWidth);
          setCurrentIndex(index);
        }}
      />
      {currentIndex === FlashcardExercises.length - 1 && (
        <Button
            title="Complete"
            onPress={() => {
              if (FlashcardExercises[0] && FlashcardExercises[0].exercise_item_id) {
                console.log(FlashcardExercises[0].exercise_item_id)
                addExerciseCompleted(FlashcardExercises[0].exercise_item_id);
                router.replace('/Complete');
              }
            }}
          />
      )}
      <Tracker currentIndex={currentIndex} total={FlashcardExercises.length} />
    </View>
  )
}

export default FlashcardExercisePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
  },
});
