import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,

} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../../commonComponents/Header";
import ProductIcon from "../../assets/jsx/ProductIcon";
import TodoListIcon from "../../assets/jsx/TodoListIcon";
import BoxIcon from "../../assets/jsx/BoxIcon";
import InventoryIcon from "../../assets/jsx/InventoryIcon";
import EagleIcon from "../../assets/jsx/EagleIcon";
import AnalystIcon from "../../assets/jsx/AnalystIcon";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: "1",
    title: "Product Assign",
    subtitle: "Driver Mapping to Assets",
    icon: <ProductIcon/>,
    screenName:"productAssign"
  },
  {
    id: "2",
    title: "Request Assets",
    subtitle: "Take New Requirements",
    icon: <TodoListIcon/>,
    screenName:"requestForm"
  },
  {
    id: "3",
    title: "Inventory Management",
    subtitle: "Check Assigned / Instock",
    icon: <BoxIcon/>,
    screenName:"inventory"
  },
  {
    id: "4",
    title: "Inventory Move",
    subtitle: "Remapping of Inventory",
    icon: <InventoryIcon/>,
    screenName:"productAssign"
  },
  {
    id: "5",
    title: "Eagle View",
    subtitle: "eagle",
    icon: <EagleIcon/>,
    screenName:"eagle"
  },
  {
    id: "6",
    title: "Asset Analytics",
    subtitle: "Reports",
    icon: <AnalystIcon/>,
  },
];

const AssetScreen = () => {
    const navigation = useNavigation()
  const renderItem = ({ item }: any) => {
    console.log(item.screenName)
    return     <Pressable style={styles.card} onPress={()=>navigation.navigate(item.screenName)}>
      <View style={styles.row}>
            {item.icon}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>
      <Icon name="chevron-right" size={24} color="#999" />
    </Pressable>
  }

  return (
    <>
  <Header title="Assets"/>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      </View>
      </>
  );
};

export default AssetScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 26,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  subtitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
  },
});
