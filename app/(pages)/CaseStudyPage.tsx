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
import { getCaseStudies } from "@/lib/queries";
import { CaseStudy }  from "@/lib/types";
type RouteParams = {
  CaseStudyExercisePage: {
    lessonId: string;
  };
};

const CaseStudyExercisePage: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, 'CaseStudyExercisePage'>>();
  const { lessonId } = route.params;
  const [CaseStudyExercise, setCaseStudyExercise] = React.useState<CaseStudy[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const CaseStudyExerciseResponse = await getCaseStudies(lessonId);
        setCaseStudyExercise(CaseStudyExerciseResponse);
      } catch (error) {
        console.error("Failed to fetch practical exercises:", error);
      }
    };
    fetchData();
  }, []);

  console.log("CaseStudyExercise", CaseStudyExercise)

  return (
    <SafeAreaView style={styles.container}>
      <Text>CaseStudyExercise Page</Text>
    </SafeAreaView>
  )
}

export default CaseStudyExercisePage;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.Snow,
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
});
