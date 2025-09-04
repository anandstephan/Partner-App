import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface PerformanceCardProps {
  month: string;
  target: string; // e.g. "45 Onboarding"
  onboarded: string; // e.g. "74%"
  conversationRate: string; // e.g. "19%"
  totalLeads: number;
  convertedLeads: number;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  month,
  target,
  onboarded,
  conversationRate,
  totalLeads,
  convertedLeads,
}) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Performance</Text>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#1976D2" }]} />
            <Text style={styles.legendLabel}>Total leads</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#388E3C" }]} />
            <Text style={styles.legendLabel}>Converted Leads</Text>
          </View>
        </View>
      </View>
    
      <View style={{flexDirection:"row"}}>
        <View>
      {/* Month */}
      <Text style={styles.month}>{month}</Text>
      <View style={styles.divider}/>
      {/* Stats */}
      <Text style={styles.statText}>
        Target: <Text style={styles.bold}>{target}</Text>
      </Text>
        <View style={styles.divider}/>
      <Text style={styles.statText}>
        Onboarded: <Text style={styles.bold}>{onboarded}</Text>
      </Text>
        <View style={styles.divider}/>
      <Text style={styles.statText}>
        Conversation Rate: <Text style={styles.bold}>{conversationRate}</Text>
      </Text>
      </View>
        <View style={{flex:1,justifyContent:"center",marginTop:45}}>
          {/* Bars */}
      <View style={styles.barContainer}>
        {/* Blue bar (Total leads) */}
        <View style={[styles.bar, { backgroundColor: "#1976D2", width: `${Math.min(totalLeads, 100)}%` }]}>
          <Text style={styles.barValue}>{totalLeads}</Text>
        </View>
      </View>

      <View style={styles.barContainer}>
        {/* Green bar (Converted leads) */}
        <View style={[styles.bar, { backgroundColor: "#388E3C", width: `${Math.min(convertedLeads, 100)}%` }]}>
          <Text style={styles.barValue}>{convertedLeads}</Text>
        </View>
      </View>
    </View>
    </View>

      {/* Conversation Rate inline */}
      {/* <View style={styles.rateRow}>
        <Text style={styles.rateText}>{conversationRate}</Text>
      </View> */}
    </View>
  );
};

export default PerformanceCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal:15
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  legendRow: {
    // flexDirection: "row",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 12,
    color: "#444",
  },
  month: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#555",
  },
  statText: {
    fontSize: 13,
    marginBottom: 4,
    color: "#444",
  },
  bold: {
    fontWeight: "700",
  },
  barContainer: {
    height: 26,
    backgroundColor: "#eee",
    borderRadius: 6,
    marginTop: 8,
    justifyContent: "center",
  },
  bar: {
    height: 26,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 8,
  },
  barValue: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  rateRow: {
    marginTop: 6,
    alignItems: "flex-end",
  },
  rateText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#444",
  },
  divider:{
    borderWidth:1,
    width:'40%',
    marginVertical:5,
    borderColor:"#D4D4D4"
  }
});
