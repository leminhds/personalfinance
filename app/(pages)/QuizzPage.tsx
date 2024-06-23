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
import { getQuizQuestions } from "@/lib/queries";
import { QuizQuestion }  from "@/lib/types";
type RouteParams = {
  QuizExercisePage: {
    lessonId: string;
  };
};

const QuizExercisePage: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, 'QuizExercisePage'>>();
  const { lessonId } = route.params;
  const [QuizExercise, setQuizExercise] = React.useState<QuizQuestion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const QuizExerciseResponse = await getQuizQuestions(lessonId);
        setQuizExercise(QuizExerciseResponse);
      } catch (error) {
        console.error("Failed to fetch practical exercises:", error);
      }
    };
    fetchData();
  }, []);

  console.log("QuizExercise", QuizExercise)

  return (
    <SafeAreaView style={styles.container}>
      <Text>QuizExercise Page</Text>
    </SafeAreaView>
  )
}

export default QuizExercisePage;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.Snow,
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
});
