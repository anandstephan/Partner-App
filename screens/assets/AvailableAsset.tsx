import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Modal,
} from "react-native";
import Header from "../../commonComponents/Header";

const batteryData = Array.from({ length: 150 }).map((_, i) => {
  if (i < 80) return { id: i, color: "blue" };
  if (i < 100) return { id: i, color: "yellow" };
  if (i < 125) return { id: i, color: "red" };
  return { id: i, color: "grey" };
});

export default function AvailableAsset() {
  const [selected, setSelected] = useState(null);

  const getIcon = (color: string) => {
    switch (color) {
      case "blue":
        return require("../../assets/png/blueBattery.png");
      case "yellow":
        return require("../../assets/png/yellowBattery.png");
      case "red":
        return require("../../assets/png/redBattery.png");
      default:
        return require("../../assets/png/grayBattery.png");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <Text style={styles.header}>Inventory Management</Text> */}
      <Header title="Inventory Management"/>

      {/* Search */}
      <View style={styles.searchBox}>
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>

      {/* Dealer Info Bar */}
      <View style={styles.dealerStrip}>
        <Text style={styles.dealerName}>Ram Singh - 500</Text>

        <View style={styles.countRow}>
          <View style={styles.countItem}>
            <Image source={require("../../assets/png/blueBattery.png")} style={styles.iconSm} />
            <Text style={styles.countText}>300</Text>
          </View>

          <View style={styles.countItem}>
            <Image source={require("../../assets/png/yellowBattery.png")} style={styles.iconSm} />
            <Text style={styles.countText}>120</Text>
          </View>

          <View style={styles.countItem}>
            <Image source={require("../../assets/png/redBattery.png")} style={styles.iconSm} />
            <Text style={styles.countText}>25</Text>
          </View>

          <View style={styles.countItem}>
            <Image source={require("../../assets/png/grayBattery.png")} style={styles.iconSm} />
            <Text style={styles.countText}>55</Text>
          </View>
        </View>
      </View>

      {/* Battery Grid */}
      <FlatList
        numColumns={10}
        data={batteryData}
        style={{ marginTop: 10 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => setSelected(item)}>
            <Image source={getIcon(item.color)} style={styles.batteryIcon} />
          </Pressable>
        )}
      />

      {/* Bottom Popup */}
      <Modal visible={selected} transparent animationType="slide">
        <View style={styles.modalOverlay}>

          <View style={styles.bottomCard}>
            <View style={[styles.countRow,{backgroundColor:"#0A66C2"}]}>
            <Image source={require('../../assets/png/unlock.png')}/>
            <Text style={[styles.cardTitle,{color:"#FFF"}]}>CGR10105</Text>
            <Image source={require('../../assets/png/lock.png')}/>
          </View>
            <View>
              <View>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:'center'}}>
            <Text style={styles.cardText}>Name: Vinay Verma</Text>
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
              <Text>95%</Text>
              <Image source={require('../../assets/png/blueBattery.png')} width={200} height={200}/>
            </View>
            </View>
              </View>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
              <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <Image source={require('../../assets/png/phone.png')} width={200} height={200}/>
            <Text style={styles.cardText}>9877225456</Text>
              </View>
              <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
              <Text style={styles.cardText}>Health</Text>
              <Image source={require('../../assets/png/health.png')} width={200} height={200}/>
              </View>
            </View>
            <View>
              <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
              <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
              <Image source={require('../../assets/png/location.png')} width={200} height={200}/>
              <Text style={styles.cardText}>COCO-Lucknow_CLWK177</Text>
              </View>
              <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
              <Text style={styles.cardText}>Map</Text>
              <Image source={require('../../assets/png/location.png')} width={200} height={200}/>
              </View>
              </View>

            </View>
            <Pressable
              onPress={() => setSelected(null)}
              style={styles.closeBtn}
            >
              <Text style={{ color: "#fff" }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,  padding: 15 },
  header: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  searchBox: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    fontSize: 16,
    backgroundColor:"#FFF"
  },
  dealerStrip: {
    backgroundColor: "#FFF",
    // padding: 12,
    borderRadius: 12,
    marginTop: 10,
    
  },
  dealerName: {
    fontSize: 18,
    fontWeight: "600",
    backgroundColor: "#0A66C2",
    color:"#FFF",
    textAlign:"center",
    padding:2,
    borderTopRightRadius:10,
    borderTopLeftRadius:10
    
  },
  countRow: {
    flexDirection: "row",
    // marginTop: 10,
    justifyContent: "space-between",
    alignItems:"center",
    padding:5,
    // marginHorizontal:10,
    // paddingVertical:10,
    // backgroundColor:"#0A66C2",
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
  countItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  countText: { fontWeight: "600" },
  iconSm: { width: 18, height: 18 },
  batteryIcon: {
    width: 25,
    height: 25,
    margin: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    // backgroundColor: "rgba(0,0,0,0.4)",
    marginHorizontal:10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
  bottomCard: {
    backgroundColor: "#fff",
    // padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

  },
  cardTitle: { fontSize: 20, fontWeight: "700" },
  cardText: { fontSize: 16, marginTop: 6 },
  closeBtn: {
    marginTop: 14,
    backgroundColor: "#000",
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
  },
});
