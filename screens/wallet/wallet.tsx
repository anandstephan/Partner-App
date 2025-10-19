import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../../commonComponents/Header";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Wallet = () => {
    const navigation = useNavigation()
  const options = [
    { id: "1", label: "Payments", icon: "credit-card-outline",screenName:"payment" },
    { id: "2", label: "Collection & Deposit", icon: "bank-transfer",screenName:"collectiondeposit" },
  ];

  const renderCard = ({ item }: any) => (
    <Pressable style={styles.card} onPress={()=>navigation.navigate(item.screenName)}>
      <MaterialCommunityIcons name={item.icon} size={28} color="#1976D2" />
      <Text style={styles.cardLabel}>{item.label}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header title="Emi Tracker"/>

      {/* Cards */}
      <FlatList
        data={options}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "flex-start" }}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardContainer}
      />
    </SafeAreaView>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  cardContainer: {
    marginTop: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    margin: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    color: "#333",
  },
});
