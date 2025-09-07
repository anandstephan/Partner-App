import { StyleSheet,View,Text } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
interface Props{
    gender:string;
    name:string;
    loanId:number;
    phone:string;    
    amount:string;
    city:string;
}
const PaymentCard = (item:Props) =>{
return  <View style={styles.card}>
      <Ionicons
        name={item.gender === "male" ? "person-circle" : "woman"}
        size={40}
        color="#fff"
        style={styles.avatar}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subText}>{item.loanId}</Text>
        <Text style={styles.subText}>{item.phone}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.amount}>{item.amount}</Text>
        <View style={styles.locationRow}>
          <MaterialIcons name="location-pin" size={18} color="#FF5722" />
          <Text style={styles.city}>{item.city}</Text>
        </View>
      </View>
    </View>
}

export default PaymentCard

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#009688",
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
    color: "#fff",
  },
  subText: {
    fontSize: 12,
    color: "#f1f1f1",
  },
  rightSection: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
    locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  city: {
    fontSize: 12,
    color: "#fff",
    marginLeft: 2,
  },
})