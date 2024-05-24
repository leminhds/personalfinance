import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useNavigation } from "@react-navigation/native";
import { Flashcard, QuizQuestion, PracticalExercise, CaseStudy, ExerciseType } from "@/lib/types";
import styles from "./Exercise.styles";


type ExerciseItemProps = {
  type: ExerciseType;
  data: any[];
};

const ExerciseItem = ({ type, data }: ExerciseItemProps) => {
  const navigation = useNavigation();
  console.log("data", data)

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ExercisePage", { type, data })
      }
      style={styles.innerButton}
    >
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
  );
};

export default ExerciseItem;
