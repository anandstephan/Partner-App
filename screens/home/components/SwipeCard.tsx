import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View, StyleSheet, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const messages = [
  "Refer and Earns!",
  "Enjoy fast delivery.",
  "Get exclusive discounts.",
  "Track your orders live."
];

const SwipeCard = () => {


  return (
      <LinearGradient
    colors={['#00B27A', '#00A1D6']} // adjust to match your Figma
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={[styles.gradient,styles.container]}
  >
        
    
      <Text style={styles.text}>
        Swipe to punch-in
      </Text>

 
    </LinearGradient>
  );
}

export default SwipeCard
const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginHorizontal:10
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  dotContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'gray',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 12,
    height: 8,
    borderRadius: 4,
  },
  gradient: {
  height: 10,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8, // matches your Figma rounded corner
//   paddingHorizontal: 10,
}
});
