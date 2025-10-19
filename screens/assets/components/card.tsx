import { useNavigation } from '@react-navigation/native';
import {View,StyleSheet,Text,Image, Pressable} from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Card = ({item}:any) =>{
  const navigation = useNavigation()
return     <Pressable onPress={()=>navigation.navigate('productAssignForm')}>
        <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.liCode}>{item.liCode}</Text>
      </View>
      <View style={styles.row}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900" }}
          style={styles.avatar}
        />
        <View style={{ flex: 1, marginLeft: 22 }}>
          <Text style={styles.name}>Name: {item.name}</Text>
          <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
          <View style={styles.infoRow}>
            <Icon name="phone-outline" size={16} color="#555" />
            <Text style={styles.infoText}>{item.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="calendar-outline" size={16} color="#555" />
            <Text style={styles.infoText}>{item.date}</Text>
          </View>
        
        <View style={styles.infoRow}>
          <Icon name="clock-outline" size={16} color="#555" />
          <Text style={styles.daysText}>{item.days}</Text>
        </View>
        </View>
        </View>
      </View>
    </View>
    </Pressable>
}

export default Card

const styles = StyleSheet.create({
  infoText: {
    marginLeft: 6,
    fontSize: 12,
    color: "#555",
  },
  daysContainer: {
    // alignItems: "center",
  },
  daysText: {
    // marginTop: 4,
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
    marginVertical: 15,
    elevation: 2,
    shadowOpacity: 0.05,
    // padding: 12,
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
    marginBottom: 8,
    marginTop:-12,
  },
  liCode: {
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign:'center'
  },
    row: {
    flexDirection: "row",
    alignItems: "center",
    padding:15
  },

})