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
import Header from "../../commonComponents/Header";
import Colors from "../../constants/color"; // optional if you have color constants
import { SafeAreaView } from "react-native-safe-area-context";

export default function PerformanceTracker() {
  const [activeTab, setActiveTab] = useState<"Daily" | "Weekly" | "Monthly">("Daily");

  // --- Pie Chart Data (Overall Performance) ---
  const performanceData = [
    { value: 75, color: "#1E90FF" }, // Blue portion
    { value: 25, color: "#E6E6E6" }, // Remaining gray circle
  ];

  // --- Bar Chart Data (Onboarding Trend) ---
  const onboardingData = [
    { value: 45, label: "Mon", frontColor: "#4DA6FF" },
    { value: 30, label: "Tue", frontColor: "#4DA6FF" },
    { value: 35, label: "Wed", frontColor: "#FFD54F" },
    { value: 40, label: "Thu", frontColor: "#FFD54F" },
    { value: 55, label: "Fri", frontColor: "#4DA6FF" },
    { value: 22, label: "Sat", frontColor: "#FF6E6E" },
    { value: 0, label: "Sun", frontColor: "#E0E0E0" },
  ];

  // --- Line Chart Data (EMI Collection Trend) ---
  const lineData1 = [
    { value: 20 },
    { value: 45 },
    { value: 28 },
    { value: 80 },
    { value: 99 },
    { value: 43 },
  ];

  const lineData2 = [
    { value: 30 },
    { value: 55 },
    { value: 38 },
    { value: 70 },
    { value: 90 },
    { value: 53 },
  ];

  const TabButton = ({ label }: { label: "Daily" | "Weekly" | "Monthly" }) => (
    <TouchableOpacity
      onPress={() => setActiveTab(label)}
      style={[
        styles.tab,
        activeTab === label && styles.activeTab,
      ]}
    >
      <Text
        style={[
          styles.tabText,
          activeTab === label && styles.activeTabText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Performance Tracker" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* --- Overall Performance --- */}
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

        {/* --- Tabs --- */}
        <View style={styles.tabContainer}>
          <TabButton label="Daily" />
          <TabButton label="Weekly" />
          <TabButton label="Monthly" />
        </View>

        {/* --- Onboarding Trend --- */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Onboarding Trend</Text>
          <BarChart
            data={onboardingData}
            barWidth={22}
            spacing={14}
            yAxisThickness={0}
            xAxisThickness={0}
            hideRules
            noOfSections={4}
            maxValue={60}
            roundedTop
            hideYAxisText
            frontColor="lightblue"
          />
        </View>

        {/* --- EMI Collection Trend --- */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>EMI Collection Trend</Text>
          <LineChart
            areaChart
            data={lineData1}
            data2={lineData2}
            color1="#4DA6FF"
            color2="#00C853"
            hideDataPoints
            startFillColor1="#4DA6FF"
            startOpacity={0.4}
            endOpacity={0.1}
            spacing={30}
            initialSpacing={10}
            hideRules
            yAxisThickness={0}
            xAxisThickness={0}
            curved
          />
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: "#00C853" }]} />
              <Text style={styles.legendText}>Achieved</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: "#4DA6FF" }]} />
              <Text style={styles.legendText}>Target</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
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
    backgroundColor: "#F7F7F7",
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
