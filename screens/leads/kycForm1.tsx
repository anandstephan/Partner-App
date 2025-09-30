import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Switch,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { launchImageLibrary } from "react-native-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../../constants/color";
import Header from "../../commonComponents/Header";

import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";


export default function KycForm1() {
  const [fname,setFname] = useState('')
  const [lname,setLname] = useState('')
  const [smartphoneUser, setSmartphoneUser] = useState(null);
  const [gender,setGender] = useState(null)
  const [maritalStatus, setMaritalStatus] = useState(null);
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [aadhaarFront, setAadhaarFront] = useState(null);
  const [aadhaarBack, setAadhaarBack] = useState(null);
  const [currentAddress, setCurrentAddress] = useState("");
  const [sameAsCurrent, setSameAsCurrent] = useState(false);

  const navigation = useNavigation()

  const smartphoneOptions = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const maritalOptions = [
    { label: "Single", value: "single" },
    { label: "Married", value: "married" },
    {label:"Seprated",value:'seprate'}
  ];

    const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    {label:"Others",value:'other'}
  ];

  const pickImage = async (setter) => {
    const result = await launchImageLibrary({ mediaType: "photo", quality: 1 });
    if (result.assets && result.assets.length > 0) {
      setter(result.assets[0].uri);
    }
  };

  return (
    <>
    <Header title="KYC Verification"/>
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ravi Singh</Text>
        <View style={styles.line}/>
      <View style={styles.row}> 
      <Text style={styles.subtitle}>Personal Information</Text>
      <Text style={{color:"#0A66C2"}}>1/4</Text>
    </View>
      <View style={styles.line}/>
    <Pressable style={{justifyContent:"center",alignItems:"center"}}>
    <View style={styles.circle}>
      <Icon name="user" size={40} color={Colors.white} />
    </View>
    </Pressable>
        {/* Gender  */}
      <Text style={styles.label}>Gender</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={genderOptions}
        labelField="label"
        valueField="value"
        placeholder="Select"
        value={gender}
        onChange={(item) => setMaritalStatus(item.value)}
      />
      {/* Marital Status */}
      <Text style={styles.label}>Marital Status</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={maritalOptions}
        labelField="label"
        valueField="value"
        placeholder="Select"
        value={maritalStatus}
        onChange={(item) => setMaritalStatus(item.value)}
      />

      {/* Smart Phone User */}
      <Text style={styles.label}>Smart Phone User</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={smartphoneOptions}
        labelField="label"
        valueField="value"
        placeholder="Select"
        value={smartphoneUser}
        onChange={(item) => setSmartphoneUser(item.value)}
      />

    

      {/* Aadhaar Upload */}
    
      <Text style={styles.label}>Aadhaar Details</Text>
      <View style={styles.row}>
        <Pressable style={styles.uploadBox} onPress={() => pickImage(setAadhaarFront)}>
          {aadhaarFront ? (
            <Image source={{ uri: aadhaarFront }} style={styles.uploadImage} />
          ) : (
            <View style={styles.row}>
            <Image
            source={require('../../assets/png/aadhar.png')}
            style={{
                width:"40",
                height:"40"
            }}
            />
            <Text>Aadhaar Pic Front</Text>
            </View>
          )}
        </Pressable>
        <Pressable style={styles.uploadBox} onPress={() => pickImage(setAadhaarBack)}>
          {aadhaarBack ? (
            <Image source={{ uri: aadhaarBack }} style={styles.uploadImage} />
          ) : (
            <View style={styles.row}>
            <Image
            source={require('../../assets/png/aadhar.png')}
            style={{
                width:"40",
                height:"40"
            }}
            />
            <Text>Aadhaar Pic Back</Text>
            </View>
          )}
        </Pressable>
      </View>

     {/*Aadhar No*/}
     
      <Text style={styles.label}>Aadhaar No</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter Your Aadhar Number"
            value={lname}
            onChangeText={setLname}
        />
        <Text style={styles.label}>Aadhaar Name</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter Your Name as per your Aadhar"
            value={lname}
            onChangeText={setLname}
        />
      {/* DOB */}
      <Text style={styles.label}>DOB</Text>
      <Pressable style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text>{dob.toDateString()}</Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setDob(date);
          }}
        />
      )}

      {/* Address */}
      <Text style={styles.label}>Current Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter current address"
        value={currentAddress}
        onChangeText={setCurrentAddress}
      />

  

      {/* Submit */}
      <Pressable style={styles.submitButton} onPress={()=>navigation.navigate('kycForm2')}>
        <Text style={styles.submitText}>Next</Text>
      </Pressable>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
     backgroundColor: "#fff",
    marginHorizontal:20,
    paddingVertical:15,
    // borderWidth:2,
    padding:10,
    borderRadius:10,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation:3
    },
  title: { fontSize: 20, fontWeight: "400",alignSelf:"center" },
  subtitle: { fontSize: 16,  },
  label: { marginTop: 15, fontSize: 16, fontWeight: "400" },

  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderBottomWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  placeholderStyle: { color: "gray", fontSize: 14 },
  selectedTextStyle: { fontSize: 14 },

  row: {
     flexDirection: "row", 
     justifyContent: "space-between", 
     alignItems:'center',
     marginTop: 10 },
  uploadBox: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding:10,
    margin:5
  },
  uploadImage: { width: "100%", height: "100%", borderRadius: 5 },

  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  submitButton: {
    width:"40%",
    marginHorizontal:'30%',
    marginTop: 30,
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent:"center"
  },
  line:{
    borderWidth:0.5,
    marginVertical:10,
    borderColor:"#0D69C4"
  },
  submitText: { 
    color: "#fff", 
    fontSize: 16,
     fontWeight: "bold" },
     circle:{
        backgroundColor:Colors.lightGray,
        justifyContent:'center',
        alignItems:"center",
        width:100,
        height:100,
        borderRadius:100,
     }
});
