import { View,Pressable,Text, StyleSheet } from "react-native"
import HeaderLogo from "../../../assets/jsx/HeaderLogo"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../../../constants/color";

const Header = () =>{
return  <View style={styles.header}>
    <HeaderLogo/>
         <View style={styles.rowContainer}>
          <Pressable style={styles.btnContainer}>
            <Text style={styles.btnTxt}>Create Lead</Text>
          </Pressable>
          <Pressable onPress={() => {}}>
            <MaterialIcons name="notifications-none" size={28} />
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
    backgroundColor:Colors.secondary,
    padding:10,
    margin:10
  },
  btnTxt:{
    color:"#FFFFFF"
  }
})