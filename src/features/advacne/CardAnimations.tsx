import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { COLORS } from '../../constants/colors';

export default function CardAnimations() {
  const [showCard, setShowCard] = useState(true);

  return (
    <View style={styles.container}>
      <Button title="Toggle Card" onPress={() => setShowCard(!showCard)} />

      {showCard && (
        <Animated.View
          entering={FadeInUp.duration(1000)}
          exiting={FadeOutDown.duration(1000)}
          style={styles.card}
        >
          <Text style={styles.cardText}>Animated Card</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  card: {
    position: 'absolute',   
    top: 100,              
    width: '80%',
    padding: 20,
    backgroundColor:COLORS.PRIMARY,
    borderRadius: 12,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    color: COLORS.WHITE,
  },
});
