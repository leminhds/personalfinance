import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import ExerciseItem from "@/components/Exercise";
import { ExerciseType, Lesson } from "@/lib/types";
const LessonPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const lesson: Lesson = route.params?.lesson ?? {};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const exercises = [
    { type: 'Flashcards' as ExerciseType, data: lesson.flashcards },
    { type: 'Quiz' as ExerciseType, data: lesson.quizQuestions },
    { type: 'Case Studies' as ExerciseType, data: lesson.caseStudies },
    { type: 'Practical Exercises' as ExerciseType, data: lesson.practicalExercises },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerText}>{lesson.title}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.exercisesContainer}>
        {exercises.map((exercise) => (
          exercise.data.length > 0 && (
            <ExerciseItem key={exercise.type} type={exercise.type} data={exercise.data} />
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