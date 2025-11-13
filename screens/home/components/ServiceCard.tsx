import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Ionicons from "react-native-vector-icons/Ionicons";

const ServiceCard = () => {
  const data = [
    { label: "High", value: 13, color: "#FF5B5B" },
    { label: "Medium", value: 3, color: "#FFB84D" },
    { label: "Low", value: 21, color: "#3CCF4E" },
  ];

  const renderCircle = (color) => {
    const radius = 25;
    const strokeWidth = 5;
    const circumference = 2 * Math.PI * radius;
    const progress = 0.75; // 75% arc shown

    return (
      <Svg height="60" width="60">
        {/* Background Circle */}
        <Circle
          cx="30"
          cy="30"
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Foreground Arc */}
        <Circle
          cx="30"
          cy="30"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={circumference * (1 - progress)}
          fill="none"
          rotation="-90"
          origin="30,30"
        />
      </Svg>
    );
  };

  return (
    <View style={styles.card}>
      {/* Title */}
      <Text style={styles.title}>Services</Text>

      {/* Info Row */}
      <View style={styles.infoBox}>
        <Ionicons name="information-circle-outline" size={14} color="#9CA3AF" />
        <Text style={styles.infoText}>No service tracking {'\n'}  at  the moment</Text>
      </View>

      {/* Circles */}
      <View style={styles.circleRow}>
        {data.map((item, index) => (
          <View key={index} style={styles.circleItem}>
            <View style={{flex:0.5}}>
            <Text style={styles.value}>{item.value}</Text>
            </View>
            {/* {renderCircle(item.color)} */}
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:'center',flex:3}}>
            <Text style={styles.label}>{item.label}</Text>
            <View style={{backgroundColor:item.color,width:20,height:10,borderRadius:10,marginTop:5}}/>
            </View>
            <View style={{flex:0.5}}>
            <Text style={styles.value}>{item.value}</Text>
            </View>
          </View>
        ))}
        <View style={[styles.circleItem,{justifyContent:'space-between',padding:10}]}>
        <View style={{marginHorizontal:10}}>
        <Image
        source={require('../../../assets/png/pie.png')}
        />
        <Image
        source={require('../../../assets/png/cable.png')}
        style={{
            marginLeft:"40%"
        }}
        />
        </View>
        <View>
        <Image
        source={require('../../../assets/png/pie.png')}
        />

        <Image
        source={require('../../../assets/png/battery.png')}
        style={{
            marginLeft:"40%"
        }}
        />
        </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 10,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 20,
    justifyContent: "center",
    marginBottom: 16,
  },
  infoText: {
    color: "#9CA3AF",
    fontSize: 13,
    marginLeft: 5,
  },
  circleRow: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  circleItem: {
    alignItems: "center",
    justifyContent:"center",
    flexDirection:"row",
    // borderWidth:1,
    marginHorizontal:'20%',
    marginVertical:10
    // flex:3
    // padding:10,
    // margin:10,
    // width:"50%",

  },
  value: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,

  },
  label: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
    fontWeight:"700"
  },
});

export default ServiceCard;
