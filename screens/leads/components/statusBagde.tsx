import { StyleSheet, Text, View } from "react-native";

  export const StatusBadge = ({ status, color }:any) => (
    <View style={[styles.statusBadge, { backgroundColor: `${color}20` }]}>
      <Text style={[styles.statusText, { color }]}>{status}</Text>
    </View>
  );

  const styles = StyleSheet.create({
      statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'center',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  })