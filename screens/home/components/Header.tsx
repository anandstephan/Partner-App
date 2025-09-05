import { View,Pressable,Text, StyleSheet } from "react-native"
import HeaderLogo from "../../../assets/jsx/HeaderLogo"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Colors from "../../../constants/color";
import { useNavigation } from "@react-navigation/native";

const Header = () =>{
    const navigation = useNavigation()
return  <View style={styles.header}>
    <HeaderLogo/>
         <View style={styles.rowContainer}>

          <Pressable style={styles.btnContainer} onPress={()=>navigation.navigate('createLead')}>
            <AntDesign name="plus" size={20} color={'#FFFFFF'}/>
            <Text style={styles.btnTxt}>Create Lead</Text>
          </Pressable>
          <Pressable onPress={() => {}}>
            <MaterialIcons name="notifications-none" size={28}  />
          </Pressable>
        </View>
    </View>
}

export default Header

const styles = StyleSheet.create({
 header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: '2%',

  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginVertical:120
  },
    btnContainer:{
      flexDirection:"row",
    backgroundColor:Colors.secondary,
    padding:10,
    margin:10,
    justifyContent:"space-between",
    alignItems:'center'
  },
  btnTxt:{
    color:"#FFFFFF"
  }
})