import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import PaymentCard from "./components/paymentCard";
import Header from "../../commonComponents/Header";

const Payment = () => {

  const [activeTab, setActiveTab] = useState("Upcoming EMI’s");

  const tabs = ["Upcoming EMI’s", "Due Today", "Past Due"];

  const data = [
    {
      id: "1",
      name: "Ravi Kumar Singh",
      loanId: "LI521",
      phone: "999 999 4444",
      amount: "₹ 5000",
      city: "Mathura",
      gender: "male",
    },
    {
      id: "2",
      name: "Ram Kumar",
      loanId: "LI221",
      phone: "999 111 4444",
      amount: "₹ 3350",
      city: "Jaipur",
      gender: "male",
    },
    {
      id: "3",
      name: "Lalita Kumari",
      loanId: "LI1221",
      phone: "881 111 3254",
      amount: "₹ 3350",
      city: "Delhi",
      gender: "female",
    },
    {
      id: "4",
      name: "Babita",
      loanId: "LI1521",
      phone: "985 111 3254",
      amount: "₹ 4840",
      city: "Rajasthan",
      gender: "female",
    },
  ];

  const renderItem = ({ item }: any) => (
    <PaymentCard {...item}/>
  );

  return (
    <>
         {/* Header */}
    <Header title="EMI Tracker"/>
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#888" />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#888"
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
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
          </Pressable>
        ))}
      </View>

      {/* EMI Cards */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
    </>
  );
};

export default Payment;

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
});
