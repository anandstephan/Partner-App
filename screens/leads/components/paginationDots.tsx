import { View,StyleSheet,Text } from "react-native";

export  const PaginationDots = () => (
    <View style={styles.paginationContainer}>
      <Text style={styles.paginationText}>Total: 122</Text>
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );

  const styles = StyleSheet.create({
  paginationContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  paginationText: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#dee2e6',
  },
  activeDot: {
    backgroundColor: '#4fc3f7',
  },
  })