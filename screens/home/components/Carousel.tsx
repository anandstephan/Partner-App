import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View, StyleSheet, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const messages = [
  "Refer and Earns!",
  "Enjoy fast delivery.",
  "Get exclusive discounts.",
  "Track your orders live."
];

const Carousel = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  const animateText = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    });
  };

  useEffect(() => {
    // animateText();
  }, [index]);

  return ( <View style={styles.container}> 
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        {messages[index]}
      </Animated.Text>

      {/* Dots */}
      <View style={styles.dotContainer}>
        {messages.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              index === i && styles.activeDot
            ]}
          />
        ))}
      </View>
        </View>
  );
}

export default Carousel
const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor:"#434343",
    marginHorizontal:30
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
