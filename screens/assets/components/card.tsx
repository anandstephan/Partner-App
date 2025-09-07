import {View,StyleSheet,Text,Image} from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Card = ({item}) =>{
return     <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.liCode}>{item.liCode}</Text>
      </View>
      <View style={styles.row}>
        <Image
          source={{ uri: "https://via.placeholder.com/50" }}
          style={styles.avatar}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.name}>Name: {item.name}</Text>
          <View style={styles.infoRow}>
            <Icon name="phone-outline" size={16} color="#555" />
            <Text style={styles.infoText}>{item.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="calendar-outline" size={16} color="#555" />
            <Text style={styles.infoText}>{item.date}</Text>
          </View>
        </View>
        <View style={styles.daysContainer}>
          <Icon name="clock-outline" size={16} color="#555" />
          <Text style={styles.daysText}>{item.days}</Text>
        </View>
      </View>
    </View>
}

export default Card

const styles = StyleSheet.create({
  infoText: {
    marginLeft: 6,
    fontSize: 12,
    color: "#555",
  },
  daysContainer: {
    alignItems: "center",
  },
  daysText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
    color: "#444",
  },
    avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#eee",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
    card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    shadowOpacity: 0.05,
    padding: 12,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
    headerRow: {
    backgroundColor: "#87CEEB",
    padding: 6,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  liCode: {
    fontWeight: "700",
    color: "#000",
  },
    row: {
    flexDirection: "row",
    alignItems: "center",
  },

})