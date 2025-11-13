import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  PieChart,
  BarChart,
  LineChart,
} from "react-native-gifted-charts";

import { SafeAreaView } from "react-native-safe-area-context";

export default function ServiceTrend() {
 
  // --- Pie Chart Data (Overall Performance) ---
  const performanceData = [
    { value: 75, color: "#1E90FF" }, // Blue portion
    { value: 25, color: "#E6E6E6" }, // Remaining gray circle
  ];

  return (
    <SafeAreaView style={styles.chartCard}>
        {/* --- Overall Performance --- */}
                  <Text style={styles.chartTitle}>Service Trend</Text>
        <View style={styles.pieContainer}>
          <PieChart
            donut
            data={performanceData}
            radius={80}
            innerRadius={55}
            innerCircleColor="#F6F6F6"
            centerLabelComponent={() => (
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 12, color: "#888" }}>Overall</Text>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#000" }}>
                  Performance
                </Text>
              </View>
            )}
          />
        </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  pieContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  tab: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DADADA",
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: "#1E824C",
    borderColor: "#1E824C",
  },
  tabText: {
    color: "#333",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
  },
  chartCard: {
    marginVertical:20,
    marginHorizontal:20,
    backgroundColor: "#FFF",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#666",
  },
});
