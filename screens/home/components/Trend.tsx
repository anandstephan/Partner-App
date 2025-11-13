import { StyleSheet, Text, View } from "react-native"
import { BarChart,LineChart } from "react-native-gifted-charts";


  // --- Bar Chart Data (Onboarding Trend) ---
  const onboardingData = [
    { value: 45, label: "Aug", frontColor: "#4DA6FF" },
    { value: 30, label: "Sep", frontColor: "#4DA6FF" },
    { value: 35, label: "Oct", frontColor: "#FFD54F" },
    { value: 40, label: "Nov", frontColor: "#FFD54F" },
    { value: 55, label: "Dec", frontColor: "#4DA6FF" },
    { value: 22, label: "Jan", frontColor: "#FF6E6E" },
    { value: 20, label: "Feb", frontColor: "#E0E0E0" },
  ];

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

const Trend = () =>{
return        <View style={styles.chartCard}>
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
}

export default Trend

const styles = StyleSheet.create({
      chartCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginHorizontal:20,
    marginVertical:10
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
})