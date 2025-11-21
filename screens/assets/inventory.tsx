import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import Header from "../../commonComponents/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation();

  const filteredData = distributors.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderCard = ({ item }) => (
    <Pressable onPress={() => navigation.navigate("availableAsset")}>
      <View style={styles.card}>
        {/* HEADER */}
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>{item.title}</Text>
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
        {/* BODY */}
        <View style={styles.cardBody}>
          <Text style={styles.bodyText}>
            Partner ID: <Text style={styles.bold}>{item.partnerId}</Text>
          </Text>

          <Text style={styles.bodyText}>
            Name: <Text style={styles.bold}>{item.name}</Text>
          </Text>

          {/* Phone */}
          <View style={styles.row}>
            <Ionicons name="call-outline" size={16} color="#333" />
            <Text style={styles.small}>{item.phone}</Text>
          </View>

          {/* Location */}
          <View style={styles.row}>
            <MaterialIcons name="location-pin" size={18} color="#333" />
            <Text style={styles.small}>{item.city}</Text>
          </View>

          {/* STOCK ROW */}
          {/* <View style={styles.stockRow}>
            <View style={styles.stat}>
              <View style={[styles.dot, { backgroundColor: "#007BFF" }]} />
              <Text style={styles.statText}>{item.stock.blue}</Text>
            </View>

            <View style={styles.stat}>
              <View style={[styles.dot, { backgroundColor: "#E62E2E" }]} />
              <Text style={styles.statText}>{item.stock.red}</Text>
            </View>

            <View style={styles.stat}>
              <View style={[styles.dot, { backgroundColor: "#999" }]} />
              <Text style={styles.statText}>{item.stock.gray}</Text>
            </View>

            <View style={styles.stat}>
              <View style={[styles.dot, { backgroundColor: "#FFC107" }]} />
              <Text style={styles.statText}>{item.stock.yellow}</Text>
            </View>
          </View> */}
        </View>
        <View>
       <View style={styles.row}>
            <View style={styles.row}>
            <Image source={require('../../assets/png/blueBattery.png')} width={200} height={100}/>
            <Text>800</Text>
            </View>
            <View style={styles.row}>
            <Image source={require('../../assets/png/grayBattery.png')} width={200} height={100}/>
            <Text>800</Text>
            </View>
        </View>
       <View style={styles.row}>
            <View style={styles.row}>
            <Image source={require('../../assets/png/redBattery.png')} width={200} height={100}/>
            <Text>800</Text>
            </View>
            <View style={styles.row}>
            <Image source={require('../../assets/png/yellowBattery.png')} width={200} height={100}/>
            <Text>800</Text>
            </View>
        </View>
        </View>
 
        
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Inventory Management" />

      <TextInput
        style={styles.search}
        placeholder="Search"
        placeholderTextColor="#666"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
};

export default Inventory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  // SEARCH BOX
  search: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 10,
    marginBottom: 14,
  },

  // CARD
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  // CARD HEADER
  cardHeader: {
    backgroundColor: "#0974F1",
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  cardHeaderText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  // CARD BODY
  cardBody: {
    padding: 14,
    gap: 6,
  },
  bodyText: {
    fontSize: 13,
    color: "#444",
  },
  bold: {
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  small: {
    fontSize: 13,
    color: "#333",
  },

  // STOCK ROW
  stockRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  dot: {
    width: 16,
    height: 16,
    borderRadius: 16,
  },

  statText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
