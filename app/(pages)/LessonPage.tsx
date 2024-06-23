import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import ExerciseItem from "@/components/Exercise";
import { ExerciseType, LessonWithDetail } from "@/lib/types";
import { getAvailableLessonItemsByLessonId } from "@/lib/queries";

type RouteParams = {
  LessonPage: {
    id: string;
  };
};


const LessonPage: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'LessonPage'>>();
  const { id } = route.params;
  const [lessonDetails, setLessonDetails] = React.useState<LessonWithDetail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lessonDetailResponse = await getAvailableLessonItemsByLessonId(id);
        setLessonDetails(lessonDetailResponse);
      } catch (error) {
        console.error("Failed to fetch lesson Detail:", error);
      }
    };
    fetchData();
  }, []);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const exercises = [
    { type: 'Flashcards' as ExerciseType, available: lessonDetails?.flashcards },
    { type: 'Quiz' as ExerciseType, available: lessonDetails?.quizQuestions },
    { type: 'Case Studies' as ExerciseType, available: lessonDetails?.caseStudies },
    { type: 'Practical Exercises' as ExerciseType, available: lessonDetails?.practicalExercises },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerText}>{lessonDetails?.title}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.exercisesContainer}>
        {exercises.map((exercise) => (
          exercise.available && (
            <ExerciseItem key={exercise.type} type={exercise.type} lessonId={id} />
          )
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LessonPage;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.Snow,
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
  header: {
    width: width,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: Colors.Hare,
    borderBottomWidth: 1.5,
    backgroundColor: Colors.Snow,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.DarkGray,
  },
  exercisesContainer: {
    alignItems: "center",
  },
});