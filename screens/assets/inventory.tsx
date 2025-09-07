import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "../../commonComponents/Header";

const distributors = [
  {
    id: "1",
    title: "North Distributor - 1000",
    partnerId: "NB001",
    name: "Ranveer Singh",
    phone: "9892254455",
    city: "Delhi_NCR",
    stock: { blue: 800, gray: 60, red: 40, yellow: 100 },
  },
  {
    id: "2",
    title: "South Distributor - 700",
    partnerId: "SB0015",
    name: "Ashish Kumar",
    phone: "8775849849",
    city: "Bangalore",
    stock: { blue: 400, gray: 200, red: 30, yellow: 70 },
  },
];

const Inventory = () => {
  const [search, setSearch] = useState("");

  const filteredData = distributors.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderCard = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
      <Text style={styles.text}>Partner ID: {item.partnerId}</Text>
      <Text style={styles.text}>Name: {item.name}</Text>
      <Text style={styles.text}>📞 {item.phone}</Text>
      <Text style={styles.text}>📍 {item.city}</Text>

      <View style={styles.stockRow}>
        <Text style={[styles.stockBox, { color: "blue" }]}>🟦 {item.stock.blue}</Text>
        <Text style={[styles.stockBox, { color: "gray" }]}>⬜ {item.stock.gray}</Text>
        <Text style={[styles.stockBox, { color: "red" }]}>🟥 {item.stock.red}</Text>
        <Text style={[styles.stockBox, { color: "orange" }]}>🟨 {item.stock.yellow}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
        <Header title="Inventory Management"/>
      <TextInput
        style={styles.search}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {["Home", "My Leads", "Asset", "Wallet", "Profile"].map((tab, index) => (
          <TouchableOpacity key={index} style={styles.navItem}>
            <Text style={styles.navText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 12,
    marginLeft: 16,
  },
  search: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 16,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#ccc",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardHeader: {
    backgroundColor: "#007BFF",
    borderRadius: 6,
    padding: 6,
    marginBottom: 10,
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "700",
  },
  text: { fontSize: 14, marginBottom: 4 },
  stockRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  stockBox: { fontWeight: "600" },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderTopWidth: 0.5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, color: "#333" },
});

export default Inventory;
