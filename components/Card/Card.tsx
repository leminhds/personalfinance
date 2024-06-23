import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styles from './Card.styles';
interface CardProps {
  term: string;
  definition: string;
}

const Card: React.FC<CardProps> = ({ term, definition }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <TouchableOpacity style={styles.card} onPress={() => setFlipped(!flipped)}>
      <View>
        {flipped ? (
          <>
            <Text style={styles.term}>{term}</Text>
            <Text style={styles.definition}>{definition}</Text>
          </>
        ) : (
          <Text style={styles.term}>{term}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default Card;