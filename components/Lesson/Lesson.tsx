
import { upsertUserProgress } from '@/lib/actions'; // Adjust the import path as needed
import { Database } from '@/database.types'
import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import styles from "./Lesson.styles";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useNavigation } from "@react-navigation/native";
import { Lesson } from "@/lib/types";
const LessonItem = ({ lesson }: { lesson: Lesson } ) => {
  const navigation = useNavigation();
  // const url =
  //   "https://raw.githubusercontent.com/abdulkadir-erdeger/duolingo-clone/master/assets/Icons/" +
  //   exercise.definition.picture;

  return (
    lesson && (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("lessonPage", { lesson: lesson })
          // console.log("exercise", lesson)
        }
        style={styles.innerButton}
      >
        <AnimatedCircularProgress
          size={120}
          width={10}
          // TODO: Change the fill value to the user's progress
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
              <Image
                style={styles.innerLogo}
                source={{
                  // uri: url,
                  uri: "https://raw.githubusercontent.com/abdulkadir-erdeger/duolingo-clone/master/assets/Icons/basics.png"
                }}
                resizeMode="cover"
              />
            </View>
          )}
        </AnimatedCircularProgress>
        <Text style={styles.innerText}>{lesson.title}</Text>
      </TouchableOpacity>
    )
  );
};

export default LessonItem;
