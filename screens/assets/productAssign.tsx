import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import Header from "../../commonComponents/Header";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Card from "./components/card";

const dummyData = [
  {
    id: "1",
    liCode: "LI004",
    name: "Vinay Verma",
    phone: "9877225456",
    date: "03/03/2025",
    days: "1 Day",
  },
  {
    id: "2",
    liCode: "LI002",
    name: "Anju Kumar",
    phone: "9818919241",
    date: "22/02/2025",
    days: "15 Day",
  },
  {
    id: "3",
    liCode: "LI002",
    name: "Sanjay Rana",
    phone: "9817167362",
    date: "22/02/2025",
    days: "16 Day",
  },
  {
    id: "4",
    liCode: "LI001",
    name: "Utkarsh Gangwar",
    phone: "9877225456",
    date: "03/03/2025",
    days: "19 Day",
  },
];

const ProductAssign = () => {
  const [search, setSearch] = useState("");

  const filteredData = dummyData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search)
  );

  const renderItem = ({ item }: any) => (
    <Card item={item}/>
  
  );

  return (
      <>
      {/* Header */}
    <Header title="Product Assign"/>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#999" />
        <TextInput
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      </>
  );
};

export default ProductAssign;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 2,
    shadowOpacity: 0.05,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    marginLeft: 8,
  },




});
