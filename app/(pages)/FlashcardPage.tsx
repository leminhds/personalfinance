import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect } from "react";
import { getFlashcards } from "@/lib/queries";
import { Flashcard }  from "@/lib/types";
type RouteParams = {
  FlashcardExercisePage: {
    lessonId: string;
  };
};

const FlashcardExercisePage: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, 'FlashcardExercisePage'>>();
  const { lessonId } = route.params;
  const [FlashcardExercise, setFlashcardExercise] = React.useState<Flashcard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const FlashcardExerciseResponse = await getFlashcards(lessonId);
        setFlashcardExercise(FlashcardExerciseResponse);
      } catch (error) {
        console.error("Failed to fetch practical exercises:", error);
      }
    };
    fetchData();
  }, []);

  console.log("FlashcardExercise", FlashcardExercise)

  return (
    <SafeAreaView style={styles.container}>
      <Text>FlashcardExercise Page</Text>
    </SafeAreaView>
  )
}

export default FlashcardExercisePage;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.Snow,
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
});
