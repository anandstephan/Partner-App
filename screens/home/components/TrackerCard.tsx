import { View, Text, StyleSheet } from "react-native";

interface TrackerCardProps {
  title: string;
  totalLeads: number;
  subtitle: string;
  stages: { label: string; value: number }[];
}

const TrackerCard = ({ title, totalLeads, subtitle, stages }: TrackerCardProps) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.heading}>{title}</Text>

      <View style={styles.rowContainer}>
        {/* Left side */}
        <View style={{ flex: 1 }}>
          <Text style={styles.secondaryHeading}>{totalLeads} Leads</Text>
          <Text style={styles.secondaryHeading2}>{subtitle}</Text>
        </View>

        {/* Right side */}
        <View style={{ flex: 2, justifyContent: "center" }}>
          {/* Labels Row */}
          <View style={styles.rowContainer}>
            {stages.map((stage, index) => (
              <Text key={index} style={styles.label}>
                {stage.label}
              </Text>
            ))}
          </View>

          {/* Circles with divider */}
          <View style={styles.progressRow}>
            {stages.map((stage, index) => (
              <View key={index} style={[styles.circle, { width: 40 - index * 8, height: 40 - index * 8 }]}>
                <Text style={{ color: "#FFF", fontSize: 12 - index * 2, fontWeight: "700" }}>
                  {stage.value}
                </Text>
              </View>
            ))}
            <View style={styles.divider} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default TrackerCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    margin: 10,
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 15,
  },
  heading: {
    color: "#2C2C2C",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 12,
  },
  secondaryHeading: {
    color: "#00999F",
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryHeading2: {
    color: "#747474",
    fontWeight: "600",
    fontSize: 12,
    marginTop: 4,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#555",
    flex: 1,
    textAlign: "center",
    
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    position: "relative",
  },
  circle: {
    backgroundColor: "#00953C",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    marginHorizontal: 4,
  },
  divider: {
    position: "absolute",
    top: "50%",
    left: 20,
    right: 20,
    height: 1,
    backgroundColor: "#E0E0E0",
    zIndex: 1,
  },
});
