import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import LessonItem from "@/components/Lesson";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { getModulesWithDetails } from "@/lib/queries";
import { ModuleWithDetail, Lesson } from "@/lib/types";
import { Colors } from "@/constants/Colors";

const Courses = () => {
  const navigation = useNavigation();
  const [modules, setModules] = useState<ModuleWithDetail[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modules = await getModulesWithDetails();
        setModules(modules);
      } catch (error) {
        console.error("Failed to fetch modules:", error);
      }
    };
    fetchData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <View style={styles.infoContainer}>
          <Image
            style={styles.diamondLogo}
            source={require("@/assets/Icons/diamond.png")}
          />
          <Text style={styles.diamondText}>100</Text>
        </View>
        <View style={styles.infoContainer}>
          <Image
            style={styles.fireLogo}
            source={require("@/assets/Icons/fire.png")}
          />
          <Text style={styles.fireText}>5</Text>
        </View>
      </View>

      <FlatList
        data={modules}
        renderItem={renderModule}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const renderModule = ({ item }: { item: ModuleWithDetail }) => {
  return (
    <View style={styles.moduleContainer}>
      <FlatList
        data={item.lessons}
        renderItem={renderLesson}
        keyExtractor={(lesson) => lesson.id}
        ListHeaderComponent={
          <View style={styles.moduleHeader}>
            <Text style={styles.moduleHeaderText}>{item.title}</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const renderLesson = ({ item }: { item: Lesson }) => {
  return <LessonItem lesson={item} />;
};

export default Courses;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.Snow,
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
  header: {
    flexDirection: "row",
    backgroundColor: Colors.Snow,
    borderBottomColor: Colors.Hare,
    borderBottomWidth: 1.5,
    width: width,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryLogo: {
    width: width * 0.12,
    height: height * 0.045,
  },
  diamondLogo: {
    width: width * 0.06,
    height: height * 0.04,
  },
  diamondText: {
    fontSize: 16,
    color: Colors.Macaw,
    margin: 5,
    fontFamily: "Nunito_ExtraBold",
  },
  fireText: {
    fontSize: 16,
    color: Colors.Fox,
    margin: 5,
    fontFamily: "Nunito_ExtraBold",
  },
  fireLogo: {
    width: width * 0.06,
    height: height * 0.04,
  },
  body: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  unitLogo: {
    height: 120,
    width: 200,
    margin: 15,
  },
  section: {
    flex: 1,
    paddingBottom: 60,
  },
  tier: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  moduleContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: Colors.White, // or any color you prefer
    borderRadius: 10,
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.DarkGray,
    marginBottom: 10,
    textAlign: "center",
  },
  moduleHeader: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: Colors.LightGray, // or any color you prefer
    borderRadius: 10,
  },
  moduleHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.Black,
    textAlign: "center",
  },
});
