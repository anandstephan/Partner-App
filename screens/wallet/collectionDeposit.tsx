import React, { act, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Header from "../../commonComponents/Header";
import MoneyBag from "../../assets/jsx/MoneyBag";
import Deposit from "../../assets/jsx/Deposit";
import { useNavigation } from "@react-navigation/native";

const CollectionDeposit = () => {

  const navigation = useNavigation()
  const [activeTab, setActiveTab] = useState("New Collection");
  console.log("active",activeTab)
  const tabs = ["New Collection", "Deposit", "History"];

  const data = [
    {
      id: "1",
      name: "Ravi Kumar Singh",
      loanId: "LI521",
      phone: "999 999 4444",
      amount: "₹ 5000",
      city: "Mathura",
      date: "25-Jun-25",
    },
    {
      id: "2",
      name: "Dealer X",
      loanId: "DL123",
      phone: "999 999 4444",
      amount: "₹ 15000",
      city: "Mathura",
      date: "10-Jun-25",
    },
    {
      id: "3",
      name: "Driver",
      loanId: "DL123",
      phone: "999 999 4444",
      amount: "₹ 1000",
      city: "Mathura",
      date: "25-Jun-25",
    },
  ];

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Ionicons
        name="person-circle"
        size={45}
        color="#1976D2"
        style={styles.avatar}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subText}>{item.loanId}</Text>
        <Text style={styles.subText}>{item.phone}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.amount}>{item.amount}</Text>
        <View style={styles.locationRow}>
          <MaterialIcons name="location-pin" size={16} color="#FF5722" />
          <Text style={styles.city}>{item.city}</Text>
        </View>
      </View>
    </View>
  );

  let icon =         <MoneyBag/>
  if(activeTab === 'Deposit'){
    icon = <Deposit/>
  }
  return (
    <>
    {/* Header */}
    <Header title="Collection & Deposit"/>
    <View style={styles.container}>
      {/* Top Card */}
      <View style={styles.topCard}>
        
          {icon}
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.topText}>{activeTab === 'Deposit' ? 'Balance' : activeTab === 'Deposit' ? 'Year' : 'In-Hand'}</Text>
            <Text style={styles.topAmount}>₹ 50,000</Text>
          </View>
        <View>
          <Text style={styles.topText}>{activeTab === 'Deposit' ? 'Deposited' :activeTab === 'Deposit' ?'Month'  : 'Today'}</Text>
          <Text style={styles.topAmount}>₹ 5,000</Text>
        </View>
      <View/>
      <View/>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#888" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
      </View>

      {/* List */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.fab} onPress={()=>navigation.navigate('emi')}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
    </>
  );
};

export default CollectionDeposit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  topCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    elevation: 2,
  },
  topText: {
    fontSize: 13,
    color: "#666",
  },
  topAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  tabRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#eee",
    marginHorizontal: 4,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#1976D2",
  },
  tabText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 40,
    marginBottom: 12,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#000",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  avatar: {
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  subText: {
    fontSize: 12,
    color: "#444",
  },
  rightSection: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  city: {
    fontSize: 12,
    color: "#333",
    marginLeft: 2,
  },
  date: {
    fontSize: 11,
    color: "#555",
    marginBottom: 4,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1976D2",
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
