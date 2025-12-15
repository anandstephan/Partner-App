import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../../constants/color";
import Header from "../../commonComponents/Header";
import { useUpload } from "../../features/upload/useUpload";
import { uploadToS3 } from "../../features/upload/uploadService";
import Entypo from 'react-native-vector-icons/Entypo';
import { useOcr } from "../../features/ocr/useOcr";
import { ocrService } from "../../features/ocr/ocrService";
import CheckBox from 'react-native-check-box'
import { check } from "react-native-permissions";

// import { uploadService } from "../../features/upload/uploadService";

export default function KycForm1() {
  const navigation = useNavigation();
  const {params:{leadInfo}} = useRoute()
      const { mutate:upload} = useUpload()
      const {mutate:OcrUpload} = useOcr()
  // console.log("LeadInfo",leadInfo)
  const [checked,setChecked] = useState(false)

  // ✅ Single unified form state
  const [formData, setFormData] = useState({
    firstName: ""+leadInfo.firstName,
    lastName: "last"+leadInfo.lastName,
    smartPhoneUser: null,
    aadhaarNo: "",
    nameAsPerAadhaar:"",
    gender: null,
    marritalStatus: null,
    dob: null,
    aadhaarFrontPhoto: null,
    aadhaarBackPhoto: null,
    addressAsPerAadhaar: "",
    permanentAddress:"",
    selfie:null,
  });

  const [aadharFrontFile, setAadharFrontFile] = useState(null);
  const [aadharBackFile,setAadharBackFile] = useState(null)

  // ✅ Universal update function
  const updateFormData = (field: string, value: any) => {
    if(field==='smartPhoneUser'){
      if(value === 'yes'){
        value = true
      }else{
        value = false
      }
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Dropdown data
  const smartphoneOptions = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  const maritalOptions = [
    { label: "Single", value: "single" },
    { label: "Married", value: "married" },
    { label: "Separated", value: "separated" },
  ];
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "other" },
  ];

const requestCameraPermission = async () => {
  if (Platform.OS !== "android") return true;

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: "Camera Permission",
      message: "Camera permission is required to take photos",
      buttonPositive: "OK",
    }
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

  // ✅ Image Picker + Upload
  const handleSelectImage = async (field: "aadhaarFrontPhoto" | "aadhaarBackPhoto" | "selfie") => {
      const hasPermission = await requestCameraPermission();
  if (!hasPermission) {
    Alert.alert("Permission required", "Camera permission denied");
    return;
  }
    
    const result = await launchCamera({
      mediaType: "photo",
      quality: 0.2,
    });
    console.log("Result", result);
    if (result.didCancel) return;
    const asset = result.assets?.[0];
    if (!asset?.uri) return;

    const file = {
      uri: asset.uri,
      name: asset.fileName || "photo.jpg",
      type: asset.type || "image/jpeg",
    };
    
    const payload = {
      ...file,
      category:field,
      appName:"employeeApp"

    }
    if(field==="aadhaarFrontPhoto"){
      setAadharFrontFile(file)
    }
    if(field==="aadhaarBackPhoto"){
      setAadharBackFile(file)
    }

      upload(payload, {
              onSuccess: (res) => {
                // Alert.alert('✅ Photo Updated Successfully!')
                updateFormData(field,res.fileUrl)
              },
              onError: (err) => {
                Alert.alert("Error",err.message)
                console.log("Error",err)
              }
            })
      

        
    
  };

  useEffect(()=>{
    if(aadharFrontFile!==null && aadharBackFile!==null){
      const front = aadharFrontFile
      const back = aadharBackFile
      const payload = {
        front,
        back,
        docType:"aadhaar"
      }
      OcrUpload(payload, {
              onSuccess: (res) => {
                // updateFormData(field,res.fileUrl)
                console.log("===",res)
                setFormData(prev => (
                  { ...prev, 
                  ['aadhaarNo']: res.data?.docNumber, 
                  ['addressAsPerAadhaar']: res.data?.fullAddress,
                  ['nameAsPerAadhaar']:res.data?.fullName, 
                  ['dob']:res.data?.dateOfBirth 
                }))
              },
              onError: (err) => {
                Alert.alert("Error",err.message)
                console.log("Error",err)
              }
            })
    }
  },[aadharFrontFile,aadharBackFile])

  useEffect(() => {
  if (checked) {
    updateFormData("permanentAddress", formData.addressAsPerAadhaar);
  }else{
    updateFormData("permanentAddress", "");
  }
}, [checked]);

  return (
    <>
      <Header title="KYC Verification" />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{formData.firstName}</Text>
        <View style={styles.line} />
        <View style={styles.row}>
          <Text style={styles.subtitle}>Personal Information</Text>
          <Text style={{ color: "#0A66C2" }}>1/5</Text>
        </View>
        <View style={styles.line} />

        {/* Selfie */}
        {
          formData.selfie ? <View style={{justifyContent:'center',alignItems:'center'}}>
            <Image source={{uri:formData.selfie}} style={{...styles.circle}}/>
            <Pressable style={{zIndex:2, position:'absolute',left:'55%',top:0}} onPress={()=>{
              setFormData({...formData,'selfie':null})
            }}>
            <Entypo name="cross" size={30} color="#000" />
            </Pressable>

          </View>
          :
            <Pressable
          style={{ justifyContent: "center", alignItems: "center", }}
          onPress={() => handleSelectImage("selfie")}
        >
          <View style={styles.circle}>
            <Icon name="user" size={40} color={Colors.white} />
          </View>
          <Text style={{ marginTop: 8 }}>Selfie with Customer</Text>

        </Pressable>
        }
      

        {/* Gender */}
        <Text style={styles.label}>Gender</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={genderOptions}
          labelField="label"
          valueField="value"
          placeholder="Select"
          value={formData.gender}
          onChange={(item) => updateFormData("gender", item.value)}
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
          value={formData.marritalStatus}
          onChange={(item) => updateFormData("marritalStatus", item.value)}
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
          value={formData.smartPhoneUser === true ? "yes" : "no"}
          onChange={(item) => updateFormData("smartPhoneUser", item.value)}
        />

        {/* Aadhaar Upload */}
        <Text style={styles.label}>Aadhaar Details</Text>
        <View style={styles.row}>
          {/* Aadhaar Front */}
          <Pressable
            style={styles.uploadBox}
            onPress={() => handleSelectImage("aadhaarFrontPhoto")}
          >
            {formData.aadhaarFrontPhoto ? (
              <>
              <Image
                source={{ uri: formData.aadhaarFrontPhoto }}
                style={styles.uploadImage}
              />    
            <Pressable 
            style={{zIndex:2, position:'absolute',left:'85%',top:0}} 
            onPress={()=>{
              setFormData({...formData,'aadhaarFrontPhoto':null})
            }}>
            <Entypo name="cross" size={30} color="#000" />
            </Pressable>
              </>
            
            ) : (
              <View style={styles.row}>
                <Image
                  source={require("../../assets/png/aadhar.png")}
                  style={{ width: 40, height: 40 }}
                />
                <Text>Aadhaar Front</Text>
              </View>
            )}
          </Pressable>

          {/* Aadhaar Back */}
          <Pressable
            style={styles.uploadBox}
            onPress={() => handleSelectImage("aadhaarBackPhoto")}
          >
            {formData.aadhaarBackPhoto ? (
              <>
           <Pressable style={{zIndex:2, position:'absolute',left:'85%',top:0}} onPress={()=>{
              setFormData({...formData,'aadhaarBackPhoto':null})
            }}>
            <Entypo name="cross" size={30} color="#000" />
            </Pressable>
              <Image
                source={{ uri: formData.aadhaarBackPhoto }}
                style={styles.uploadImage}
              />
              </>
            ) : (
              <View style={styles.row}>
                <Image
                  source={require("../../assets/png/aadhar.png")}
                  style={{ width: 40, height: 40 }}
                />
                <Text>Aadhaar Back</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Aadhaar No */}
        <Text style={styles.label}>Aadhaar No</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Aadhar Number"
          value={formData.aadhaarNo}
          onChangeText={(val) => updateFormData("aadhaarNo", val)}
          editable={false}
        />

        {/* Aadhaar Name */}
        <Text style={styles.label}>Aadhaar Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Name as per Aadhar"
          value={formData.nameAsPerAadhaar}
          onChangeText={(val) => updateFormData("nameAsPerAadhaar", val)}
            editable={false}
        />

        {/* DOB */}
        <Text style={styles.label}>DOB</Text>

          {/* <Text>{formData.dob.toDateString()}</Text> */}
          <TextInput
          style={styles.input}
          placeholder="Enter Your Date Of Birth"
          value={formData.dob+""}
          onChangeText={(val) => updateFormData("dob", val)}
            editable={false}
        />
        <View style={{marginVertical:10}}>
        {/* <DateTimePicker
          value={formData.dob}
          mode="date"
          display="default"
          onChange={(event, date) => {
            if (date) updateFormData("dob", date);
          }}
        /> */}
        </View>

        {/* Address */}
        <Text style={styles.label}>Aadhaar Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Aadhaar address"
          value={formData.addressAsPerAadhaar}
          onChangeText={(val) => updateFormData("addressAsPerAadhaar", val)}
          editable={false}
        />
        <View style={{
          flexDirection:"row",
          justifyContent:"flex-start",
          alignItems:'center'
        }}>
        <CheckBox
      
        rightText="Same As Permanent Address"
          style={{flex: 1, padding: 10}}
          onClick={() => {
            console.log("checked",checked)
            setChecked(!checked)
          }}
          checked={checked}
          
          />
        </View>
       

         <Text style={styles.label}>Permanent Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Permanent Address"
          value={formData.permanentAddress}
          onChangeText={(v) => updateFormData("permanentAddress", v)}
          editable={!checked}
        />
        {/* <Text>{JSON.stringify(formData)}</Text> */}
          {/* <Text>{JSON.stringify(leadInfo._id)}</Text> */}
        {/* Submit */}
        <Pressable
          style={styles.submitButton}
          onPress={() => {
            const data = {
              ...formData,
              leadId: leadInfo._id,
            }
            navigation.navigate("kycForm2",data)
          }}
        >
          <Text style={styles.submitText}>Next</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    paddingVertical: 15,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  title: { fontSize: 20, fontWeight: "400", alignSelf: "center" },
  subtitle: { fontSize: 16 },
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
    alignItems: "center",
    marginTop: 10,
  },
  uploadBox: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  uploadImage: { 
    width: "100%", 
    height: 100, 
    borderRadius: 5 },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  submitButton: {
    width: "40%",
    marginHorizontal: "30%",
    marginTop: 30,
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    borderWidth: 0.5,
    marginVertical: 10,
    borderColor: "#0D69C4",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  circle: {
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});
