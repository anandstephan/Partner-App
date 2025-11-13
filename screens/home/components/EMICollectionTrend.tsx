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

const EMICollectionTrend = () =>{
return        <View style={styles.chartCard}>
       
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
}

export default EMICollectionTrend

const styles = StyleSheet.create({
      chartCard: {
    marginVertical:20,
    marginHorizontal:20,
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 14,
    // marginBottom: 16,
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
})