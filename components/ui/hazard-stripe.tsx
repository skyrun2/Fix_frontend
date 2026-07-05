import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

export function HazardStripe() {
  const stripeWidth = 14;
  const gap = 12;
  const screenWidth = Dimensions.get('window').width;
  // Cover the screen width with extra stripes to handle skews and rotations safely
  const count = Math.ceil((screenWidth * 1.5) / (stripeWidth + gap));

  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.stripe,
            {
              transform: [{ skewX: '-35deg' }],
              marginLeft: i === 0 ? -15 : gap,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 14,
    backgroundColor: '#1E1E24',
    flexDirection: 'row',
    overflow: 'hidden',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  stripe: {
    width: 14,
    height: 30,
    backgroundColor: '#FFA000',
    top: -8,
  },
});
