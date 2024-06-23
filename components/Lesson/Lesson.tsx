import { upsertUserProgress } from '@/lib/actions'; // Adjust the import path as needed
import { Database } from '@/database.types';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import styles from './Lesson.styles';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Link } from 'expo-router';
import { LessonWithDetail } from '@/lib/types';

const LessonItem = ({ lesson }: { lesson: LessonWithDetail }) => {
  return (
    lesson && (
      <Link href={{ pathname: 'LessonPage', params: { id: lesson.id } }} asChild>
        <TouchableOpacity style={styles.innerButton}>
          <AnimatedCircularProgress
            size={120}
            width={10}
            fill={100} // TODO: Change the fill value to the user's progress
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
                    uri: 'https://raw.githubusercontent.com/abdulkadir-erdeger/duolingo-clone/master/assets/Icons/basics.png',
                  }}
                  resizeMode="cover"
                />
              </View>
            )}
          </AnimatedCircularProgress>
          <Text style={styles.innerText}>{lesson.title}</Text>
        </TouchableOpacity>
      </Link>
    )
  );
};

export default LessonItem;
