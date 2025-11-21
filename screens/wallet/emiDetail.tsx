import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import Header from "../../commonComponents/Header"; // your shared header
import { useRoute } from "@react-navigation/native";
import EmiModal from "./components/EmiModal";
import ReusableModal from "../../utilites/ReusableModal";

export default function EmiDetail() {
  const {params} = useRoute()
  console.log(params.detail)
  const driver = {
    name: params?.detail?.driverId?.firstName + " " + params?.detail?.driverId?.lastName,
    id: params?.detail?.driverId?.driverId,
    phone:  params?.detail?.driverId?.mobile,
    location: params?.detail?.cityId?.name,
    totalPending: "₹53,455",
    paidMonths: 3,
    totalMonths: params?.detail?.emiSchemeId?.tenure,
    details: [
      { label: "Driver Status", value: "Active" },
      { label: "Asset Status", value: "Active" },
      { label: "Onboarded On", value: "01-Jan-2025" },
      { label: "Age on Network", value: "180 Days" },
      { label: "EMI Start Date", value: "01-Feb-2025" },
      { label: "EMI End Date", value: "01-Jan-2026" },
      { label: "EMI Due In", value: "0 Days" },
      { label: "EMI Amount", value: "₹5000/-" },
      { label: "Payment Behaviour", value: "On-Time Payer" },
      { label: "Referral By", value: "Ram Kumar_LI1521" },
      { label: "Referral Mob", value: "999 999 4444" },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="EMI Tracker" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* ---- Profile Card ---- */}
        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <Image
              source={require("../../assets/png/aadhar.png")}
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{driver.name}</Text>
              <Text style={styles.subText}>{driver.id}</Text>
              <Text style={styles.phone}>{driver.phone}</Text>
            </View>
            <View style={styles.locationRow}>
              <Icon name="map-pin" size={14} color="#fff" />
              <Text style={styles.locationText}>{driver.location}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* ---- EMI Status ---- */}
          <View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
            <View>
              <Text style={styles.emiLabel}>Total Pending</Text>
              <Text style={styles.emiValue}>{driver.totalPending}</Text>
            </View>
            <Text style={styles.emiLabel}>Paid {driver.paidMonths} / {driver.totalMonths} Months</Text>
            </View>
          {/* <View style={styles.emiRow}> */}
              <View style={styles.progressBar}>
                {Array.from({ length: driver.totalMonths }).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.progressDot,
                      i < driver.paidMonths
                        ? { backgroundColor: "#fff" }
                        : { opacity: 0.3 },
                    ]}
                  />
                ))}
              </View>
  
          {/* </View> */}
        </View>

        {/* ---- Details Card ---- */}
        <View style={styles.detailsCard}>
          {driver.details.map((item, index) => (
            <View key={index} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{item.label}</Text>
              <Text style={styles.detailValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* ---- Action Buttons ---- */}
        <View style={styles.buttonRow}>
          <Pressable style={({ pressed }) => [styles.trackBtn, pressed && { opacity: 0.8 }]}>
            <Icon name="navigation" size={14} color="#1E824C" />
            <Text style={styles.trackText}>Track Battery</Text>
          </Pressable>

          <Pressable style={({ pressed }) => [styles.payBtn, pressed && { opacity: 0.8 }]}>
            <Text style={styles.payText}>Pay Now</Text>
          </Pressable>

          {/* <EmiModal visible={true}/> */}
          {/* <ReusableModal visible={true}/> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { padding: 16, paddingBottom: 60 },

  profileCard: {
    backgroundColor: "#1E824C",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  profileRow: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 14,
    backgroundColor: "#fff",
  },
  name: { color: "#fff", fontSize: 16, fontWeight: "600" },
  subText: { color: "#E8FFE8", fontSize: 13, marginTop: 2 },
  phone: { color: "#fff", fontSize: 13, marginTop: 2 },
  locationRow: {
    backgroundColor: "#3BAF6E",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  locationText: { color: "#fff", fontSize: 12, marginLeft: 4 },
  divider: {
    height: 1,
    backgroundColor: "#FFFFFF55",
    marginVertical: 10,
  },
  emiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emiLabel: { color: "#E8FFE8", fontSize: 13 },
  emiValue: { color: "#fff", fontWeight: "600", fontSize: 15, marginTop: 4 },
  progressBar: {
    flexDirection: "row",
    marginTop: 6,

  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 4,
    backgroundColor: "#fff",
    flex:1
  },

  detailsCard: {
    backgroundColor: "#1E824C",
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: { color: "#DFFFD9", fontSize: 13 },
  detailValue: { color: "#fff", fontSize: 13, fontWeight: "500" },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trackBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8FFF0",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  trackText: { color: "#1E824C", fontSize: 14, marginLeft: 6, fontWeight: "500" },

  payBtn: {
    backgroundColor: "#1E824C",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  payText: { color: "#fff", fontWeight: "600", fontSize: 15 },
});
