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
import { getPracticalExercises } from "@/lib/queries";
import { PracticalExercise }  from "@/lib/types";
type RouteParams = {
  PracticalExercisePage: {
    lessonId: string;
  };
};

const PracticalExercisePage: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, 'PracticalExercisePage'>>();
  const { lessonId } = route.params;
  const [PracticalExercise, setPracticalExercise] = React.useState<PracticalExercise[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const PracticalExerciseResponse = await getPracticalExercises(lessonId);
        setPracticalExercise(PracticalExerciseResponse);
      } catch (error) {
        console.error("Failed to fetch practical exercises:", error);
      }
    };
    fetchData();
  }, []);

  console.log("PracticalExercise", PracticalExercise)

  return (
    <SafeAreaView style={styles.container}>
      <Text>PracticalExercise Page</Text>
    </SafeAreaView>
  )
}

export default PracticalExercisePage;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.Snow,
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
});
