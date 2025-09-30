import React, { useState } from "react"
import { Modal, View, Text, Button, StyleSheet, Pressable } from "react-native"
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from "../constants/color";
import ReWork from "../assets/jsx/ReWork";
import Cancel from "../assets/jsx/Cancel";
import { useNavigation } from "@react-navigation/native";

interface modalProp{
  showModal:boolean;
  setModalVisible:Function
}


export default function ActionAlert({showModal,setModalVisible}:modalProp) {
  console.log("showModal",showModal)
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Modal
        visible={showModal}
        animationType="slide"  // "slide" | "fade" | "none"
        transparent={true}     // background transparent
        onRequestClose={()=>setModalVisible(prev =>!prev)} // Android back button
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={styles.btnAlign}>
              <View style={styles.icon}>
              <ReWork/>
            </View>
            <View style={styles.btnContainer}>
              <Text style={styles.txtStyle}>Re-Work</Text>
            </View>
            </View>
            <View style={styles.btnAlign}>
            <View style={[styles.icon,{backgroundColor:Colors.white,padding:12,borderRadius:50}]}>
            <Cancel/>
            </View>
            <View style={styles.btnContainer}>
              <Text style={styles.txtStyle}>Reject</Text>
            </View>
            </View>
            <View style={styles.btnAlign}>
              <View style={[styles.icon,{backgroundColor:Colors.primary,padding:8,borderRadius:50}]}>
            <Entypo name="check" size={35} color={Colors.white} />
            </View>
            <Pressable onPress={()=>{
              navigation.navigate('kycForm1')
              setModalVisible(false)
            }}>
            <View style={styles.btnContainer}>
              <Text style={styles.txtStyle}>Move to KYC</Text>
            </View>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "#000000B2", // dim background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
    elevation: 5,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  btnContainer:{
    backgroundColor:Colors.secondary,
    padding:10,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10
  },
  btnAlign:{
    justifyContent:'center',
    alignItems:'center'
  },
  txtStyle:{
    color:Colors.white,
    fontWeight:"600",
    fontSize:14
  },
  icon:{
    marginVertical:20
  }
})
