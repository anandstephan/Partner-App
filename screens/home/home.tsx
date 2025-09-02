import React from 'react';
import { View, Text, StyleSheet,Pressable } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import HeaderLogo from '../../assets/jsx/HeaderLogo';
import Colors from '../../constants/color';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home: React.FC = () => {
    return (
        <SafeAreaView>
    <View style={styles.header}>
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
        <View style={styles.container}>
       
            <Text style={styles.title}>Home Screen</Text>
        </View>
        </SafeAreaView>
    );
};
export default Home;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
 header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: '2%',
    marginTop: 10,
    marginVertical: 10,
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
});

