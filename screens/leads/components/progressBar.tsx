    import { StyleSheet, View } from "react-native";
  export const ProgressBar = ({ progress }:any) => (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
    </View>
  );

  const styles = StyleSheet.create({
      progressBarContainer: {
    height: 2,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 3,
  },
  })
