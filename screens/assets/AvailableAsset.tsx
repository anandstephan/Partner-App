import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import Header from "../../commonComponents/Header"; // your existing header

type BatteryStatus = "available" | "assigned" | "faulty" | "returned";

export default function AvailableAsset() {
  const [search, setSearch] = useState("");

  // Sample mock data — replace with real backend values later
  const stats = {
    available: 300,
    assigned: 120,
    faulty: 25,
    returned: 55,
  };

  // Generate 500 batteries with random status
  const allStatuses: BatteryStatus[] = ["available", "assigned", "faulty", "returned"];
  const batteries = Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    status: allStatuses[Math.floor(Math.random() * allStatuses.length)],
  }));

  const colorMap: Record<BatteryStatus, string> = {
    available: "#1E90FF",
    assigned: "#C0C0C0",
    faulty: "#FF3B30",
    returned: "#FFB200",
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Inventory Management" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={18} color="#666" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        {/* Dealer Info Card */}
        <View style={styles.dealerCard}>
          <Text style={styles.dealerName}>Ram Singh – 500</Text>
          <View style={styles.legendRow}>
            <Legend color={colorMap.available} label={stats.available.toString()} />
            <Legend color={colorMap.assigned} label={stats.assigned.toString()} />
            <Legend color={colorMap.faulty} label={stats.faulty.toString()} />
            <Legend color={colorMap.returned} label={stats.returned.toString()} />
          </View>
        </View>

        {/* Battery Grid */}
        <FlatList
          data={batteries}
          keyExtractor={(item) => item.id.toString()}
          numColumns={10}
          scrollEnabled={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <View style={[styles.iconBox, { backgroundColor: colorMap[item.status] }]}>
              <Image
                source={require("../../assets/png/aadhar.png")}
                style={styles.batteryIcon}
              />
            </View>
          )}
          ListFooterComponent={<View style={{ height: 40 }} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- Subcomponent ---------- */
const Legend = ({ color, label }: { color: string; label: string }) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendDot, { backgroundColor: color }]} />
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { padding: 16, paddingBottom: 60 },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 14,
  },
  searchInput: { flex: 1, fontSize: 15, color: "#000" },

  dealerCard: {
    backgroundColor: "#E9F1FF",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 18,
  },
  dealerName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#003366",
    marginBottom: 10,
  },
  legendRow: { flexDirection: "row", alignItems: "center", gap: 20 },
  legendItem: { flexDirection: "row", alignItems: "center" },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: { fontSize: 13, color: "#333" },

  iconBox: {
    width: 28,
    height: 28,
    marginVertical: 4,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  batteryIcon: { width: 16, height: 16, tintColor: "#fff", resizeMode: "contain" },
});
