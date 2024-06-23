import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './ProgressBar.styles';

interface ProgressBarProps {
  currentIndex: number;
  total: number;
}


const ProgressBar: React.FC<ProgressBarProps> = ({ currentIndex, total }) => {
  return (
    <View style={styles.tracker}>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${((currentIndex + 1) / total) * 100}%` }]} />
      </View>
    </View>
  );
}
export default ProgressBar