import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import styles from "./courses.styles";
import Exercise from "@/components/Exercise";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import data from "../../../defaultExampleData.json";
import { StatusBar } from "expo-status-bar";
import { getModulesWithDetails } from "@/lib/queries";
import { ModuleWithDetail, Lesson } from "@/lib/types";
const Courses = () => {
  const navigation = useNavigation();
  const [modules, setModules] = useState<ModuleWithDetail[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const modules = await getModulesWithDetails();
        setModules(modules);
        console.log("modules", modules);
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
            source={require("../../../assets/Icons/diamond.png")}
          />
          <Text style={styles.diamondText}>100</Text>
        </View>
        <View style={styles.infoContainer}>
          <Image
            style={styles.fireLogo}
            source={require("../../../assets/Icons/fire.png")}
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
  console.log("module", item);

  return (
    <View style={styles.moduleContainer}>
      <Text style={styles.moduleTitle}>{item.title}</Text>
      <FlatList
        data={item.lessons}
        renderItem={renderLesson}
        keyExtractor={(lesson) => lesson.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.header}>{item.title}</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const renderLesson = ({ item }: { item: Lesson }) => {
  return <Exercise exercise={item} />;
};

export default Courses;