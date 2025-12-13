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
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../../constants/color";
import Header from "../../commonComponents/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFinalKyc, useKyc2 } from "../../features/kyc/useKyc";
import { useUpload } from "../../features/upload/useUpload";
import Entypo from 'react-native-vector-icons/Entypo';
import { useOcr } from "../../features/ocr/useOcr";
import CheckBox from 'react-native-check-box'
export default function KycForm3() {
  const navigation = useNavigation();
  const {params} = useRoute();
  const{mutate} = useKyc2();
  const { mutate:upload} = useUpload()
        const {mutate:OcrUpload} = useOcr()
  const {mutate:submitkyc} = useFinalKyc()
  const [rcFrontPic,setRcFrontPic] = useState(null)
  const [rcBackPic, setRcBackPic] = useState(null);
    const [checked,setChecked] = useState(false)

  console.log("====>","693b21b68e5c8c09d6478ead")
  // ✅ Unified form state
  const [formData, setFormData] = useState({
    // RC Details
    rcFrontPhoto: null,
    rcBackPhoto: null,
    rcNo: "",
    vehicleRegistrationDate: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleOwnership: null,
    vehicleNOCDocument: null,
    nocDocPic: null,

    // Bank Info
    bankName: null,
    accountNo: "",
    ifscCode: "",
    chequePhoto: null,

    // Guarantor 1
  guarantor1: {
  refOneNameAsPerAadhaar: "",
  refOneMobileNo: "",
  refOneAadhaarFrontPic :null,
  refOneAadhaarBackPic :null,
  refOneAadhaarNo: "",
  refOnePanNo: "",
  refOneDOB: "",
  refOneAddressAsPerAadhaar: "",
  refOnePermanentAddress: "",
  refOneAadhaarPANPhoto:""
  },

    // Guarantor 2
  guarantor2: {
      refTwoNameAsPerAadhaar: "",
      refTwoMobileNo: "",
      refTwoAadhaarFrontPic :null,
      refTwoAadhaarBackPic :null,
      refTwoPanPic: null,
      refTwoAadhaarNo: "",
      refTwoPanNo: "",
      refTwoDOB: "",
      refTwoAddressAsPerAadhaar: "",
      refTwoPermanentAddress: "",
    },
  });

  // DOB Pickers visibility
  const [refOneAadhaarFrontPhoto,setRefOneAadhaarFrontPhoto] = useState(null)
  const [refOneAadhaarBackPhoto,setRefOneAadhaarBackPhoto] = useState(null)
  const [refOnePanPic,setRefOneAadhaarPanPic] = useState(null)
  const [refTwoAadhaarFrontPic,setRefTwoAadhaarFrontPic] = useState(null)
  const [refTwoAadhaarBackPic,setRefTwoAadhaarBackPic] = useState(null)
  const [refTwoPanPhoto,setRefTwoPanPhoto] = useState(null)
  
  // ✅ Universal update handler
  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Nested guarantor update
  const updateGuarantor = (
    guarantorKey: "guarantor1" | "guarantor2",
    field: string,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [guarantorKey]: { ...prev[guarantorKey], [field]: value },
    }));
  };

  // ✅ Universal image picker
  const handleSelectImage = async (fieldPath: string) => {
    console.log("FFFFFF",fieldPath)
    const result = await launchImageLibrary({ mediaType: "photo", quality: 1 });
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
          category:fieldPath,
          appName:"employeeApp"
    
        }

        if(fieldPath === "rcFrontPhoto"){
          setRcFrontPic(file)
        }
        if(fieldPath === "rcBackPhoto"){
          setRcBackPic(file)
        }
        if(fieldPath === 'guarantor1.refOneAadhaarFrontPic'){
          setRefOneAadhaarFrontPhoto(file)
        }

        if(fieldPath === 'guarantor1.refOneAadhaarBackPic'){
          setRefOneAadhaarBackPhoto(file)
        }

        if(fieldPath === 'guarantor1.refOneAadhaarPANPhoto'){
          setRefOneAadhaarPanPic(file)
        }
        if(fieldPath === 'guarantor2.refTwoAadhaarFrontPic'){
          setRefTwoAadhaarFrontPic(file)
        }
        if(fieldPath === 'guarantor2.refTwoAadhaarBackPic'){
          setRefTwoAadhaarBackPic(file)
        }

        if(fieldPath === 'guarantor2.refTwoPanPic'){
          setRefTwoPanPhoto(file)
        }

          upload(payload, {
                  onSuccess: (res) => {
                    // Alert.alert('✅ Photo Updated Successfully!')
                    updateFormData(fieldPath,res.fileUrl)
                  },
                  onError: (err) => {
                    Alert.alert("Error",err.message)
                    console.log("Error",err)
                  }
                })

    if (fieldPath.includes(".")) {
      const [guarantorKey, innerField] = fieldPath.split(".");
      updateGuarantor(
        guarantorKey as "guarantor1" | "guarantor2",
        innerField,
        asset.uri
      );
    } else {
      updateFormData(fieldPath, asset.uri);
    }
  };

  const ownershipOptions = [
    { label: "Self Owned", value: "self" },
    { label: "Company Owned", value: "company" },
    { label: "Financed", value: "financed" },
    { label: "Leased", value: "leased" },
  ];

  const bankOptions = [
    { label: "HDFC Bank", value: "hdfc" },
    { label: "ICICI Bank", value: "icici" },
    { label: "SBI", value: "sbi" },
    { label: "Axis Bank", value: "axis" },
    { label: "Other", value: "other" },
  ];

  const onSave = () => {
    console.log("✅ Final Form Data:", JSON.stringify(formData) );



    mutate({kycId:"693b21b68e5c8c09d6478ead",payload:formData},     {
                        onSuccess: () => {
                          Alert.alert('✅ KYC Updated Successfully!')
                          // navigation.navigate("kycForm3",newData);  
                          // navigation.goBack()
                        },
                        onError: (err) => {
                          Alert.alert("Error",err.message)
                          console.log("Error",err)
                        }
                      })

  };

  useEffect(()=>{
    if(rcFrontPic !== null && rcBackPic !== null){
         const front = rcFrontPic
            const back = rcBackPic
            const payload = {
              front,
              back,
              docType:"rc"
            }
            OcrUpload(payload, {
                    onSuccess: (res) => {
                      // updateFormData(field,res.fileUrl)
                      console.log("===999",res)
                      // setFormData(prev => (
                      //   { ...prev, 
                      //   ['aadhaarNo']: res.data?.docNumber, 
                      //   ['addressAsPerAadhaar']: res.data?.fullAddress,
                      //   ['nameAsPerAadhaar']:res.data?.fullName, 
                      //   ['dob']:res.data?.dateOfBirth 
                      // }))
                       setFormData(prev => (
                        { ...prev, 
                        ['rcNo']: res.data?.docNumber, 
                        // ['addressAsPerAadhaar']: res.data?.fullAddress,
                        // ['nameAsPerAadhaar']:res.data?.fullName, 
                        // ['dob']:res.data?.dateOfBirth 
                      }))
                    },
                    onError: (err) => {
                      Alert.alert("Error",err.message)
                      console.log("Error",err)
                    }
                  })
    }

    if(refOneAadhaarFrontPhoto !== null && refOneAadhaarBackPhoto !== null){
        const front = refOneAadhaarFrontPhoto
            const back = refOneAadhaarBackPhoto
            const payload = {
              front,
              back,
              docType:"aadhaar"
            }
            OcrUpload(payload, {
                    onSuccess: (res) => {
                      // updateFormData(field,res.fileUrl)
                      console.log("===AAdhar",res)
                    setFormData(prev => ({
                        ...prev,
                        guarantor1: {
                          ...prev.guarantor1,
                          refOneAadhaarNo: res.data?.docNumber,
                          refOnePermanentAddress: res.data?.fullAddress,
                          refOneNameAsPerAadhaar: res.data?.fullName,
                          refOneDOB: res.data?.dateOfBirth
                        }
                      }));
                    },
                    onError: (err) => {
                      Alert.alert("Error",err.message)
                      console.log("Error",err)
                    }
                  })
    }
    if(refOnePanPic !== null){
           const front = refOnePanPic
            const back = refOnePanPic
            const payload = {
              front,
              back,
              docType:"pan"
            }
            OcrUpload(payload, {
                    onSuccess: (res) => {
                      // updateFormData(field,res.fileUrl)
                      console.log("===pan",res)
                    setFormData(prev => ({
                        ...prev,
                        guarantor1: {
                          ...prev.guarantor1,
                          refOnePanNo: res.data?.docNumber
                        }
                      }));
                    },
                    onError: (err) => {
                      Alert.alert("Error",err.message)
                      console.log("Error",err)
                    }
                  })
    }

    if(refTwoAadhaarFrontPic!==null && refTwoAadhaarBackPic!==null){
        const front = refTwoAadhaarFrontPic
            const back = refTwoAadhaarBackPic
            const payload = {
              front,
              back,
              docType:"aadhaar"
            }
            OcrUpload(payload, {
                    onSuccess: (res) => {
                      // updateFormData(field,res.fileUrl)
                      console.log("===AAdhar",res)
                    setFormData(prev => ({
                        ...prev,
                        guarantor2: {
                          ...prev.guarantor2,
                          refTwoAadhaarNo: res.data?.docNumber,
                          refTwoPermanentAddress: res.data?.fullAddress,
                          refTwoNameAsPerAadhaar: res.data?.fullName,
                          refTwoDOB: res.data?.dateOfBirth
                          
                        }
                      }));
                    },
                    onError: (err) => {
                      Alert.alert("Error",err.message)
                      console.log("Error",err)
                    }
                  })
    }

    if(refTwoPanPhoto !== null){
           const front = refTwoPanPhoto
            const back = refTwoPanPhoto
            const payload = {
              front,
              back,
              docType:"pan"
            }
            OcrUpload(payload, {
                    onSuccess: (res) => {
                      // updateFormData(field,res.fileUrl)
                      console.log("===pan",res)
                    setFormData(prev => ({
                        ...prev,
                        guarantor2: {
                          ...prev.guarantor2,
                          refTwoPanNo: res.data?.docNumber
                        }
                      }));
                    },
                    onError: (err) => {
                      Alert.alert("Error",err.message)
                      console.log("Error",err)
                    }
                  })
    }

  },[rcFrontPic,rcBackPic,refOneAadhaarFrontPhoto,refOneAadhaarBackPhoto,refOnePanPic,refTwoAadhaarFrontPic,refTwoAadhaarBackPic,refTwoPanPhoto])


  // ✅ Reusable Upload Component
  const UploadBox = ({ uri, label, onPress, }: any) => (
    <Pressable style={styles.uploadBox} onPress={onPress}>
      {uri ? (
        <>

        <Image source={{ uri }} style={styles.uploadImage} />
         <Pressable style={{zIndex:2, position:'absolute',left:'90%',top:0}} onPress={()=>{
            console.log('PPPPP',uri)
                // setFormData({...formData,[key]:null})
              }}>
              <Entypo name="cross" size={30} color="#000" />
              </Pressable>
        </>
      ) : (
        <View style={styles.uploadContent}>
          <>
            {formData[uri ]}
            <Image
            source={require("../../assets/png/aadhar.png")}
            style={{ width: 40, height: 40 }}
          />
               
          
          </>
        
          <Text style={{ marginTop: 6 }}>{label}</Text>
        </View>
      )}
    </Pressable>
  );

  return (
    <>
      <Header title="KYC Verification" />
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* --- RC DETAILS --- */}
        <View style={styles.container}>
        <View style={[styles.rowBetween]}>
          <Text style={styles.title}>RC Details</Text>
          <Text style={styles.stepText}>3/5</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.row}>
          <UploadBox
            uri={formData.rcFrontPhoto}
          
            label="RC Front"
            onPress={() => handleSelectImage("rcFrontPhoto")}
          />
          <UploadBox
            uri={formData.rcBackPhoto}
            label="RC Back"
            onPress={() => handleSelectImage("rcBackPhoto")}
          />
        </View>

        <Text style={styles.label}>RC Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter RC Number"
          value={formData.rcNo}
          onChangeText={(v) => updateFormData("rcNo", v)}
          editable={false}
        />

        <Text style={styles.label}>Vehicle Registration Date</Text>
        {/* <TextInput
          style={styles.input}
          placeholder="Enter Registration Date"
          value={formData.vehicleRegistrationDate}
          onChangeText={(v) => updateFormData("vehicleRegistrationDate", v)}
        /> */}
         <DateTimePicker
          value={formData.vehicleRegistrationDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            if (date) updateFormData("vehicleRegistrationDate", date);
          }}
        />

        <Text style={styles.label}>Make</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Make"
          value={formData.vehicleMake}
          onChangeText={(v) => updateFormData("vehicleMake", v)}
        />

        <Text style={styles.label}>Model</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Model"
          value={formData.vehicleModel}
          onChangeText={(v) => updateFormData("vehicleModel", v)}
        />

        <Text style={styles.label}>Vehicle Ownership</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={ownershipOptions}
          labelField="label"
          valueField="value"
          placeholder="Select"
          value={formData.vehicleOwnership}
          onChange={(item) => updateFormData("vehicleOwnership", item.value)}
        />

        <Text style={styles.label}>NOC Documentation </Text>
        
    <Pressable
            style={styles.iconBtn}
            onPress={() => handleSelectImage("vehicleNOCDocument")}
          >

            {formData.vehicleNOCDocument ? (
                      <>
                      
                      <Image source={{ uri: formData.vehicleNOCDocument }} style={styles.uploadImage} />
                    <Pressable style={{zIndex:2, position:'absolute',left:'90%',top:0}} onPress={()=>{
                                  setFormData({...formData,'vehicleNOCDocument':null})
                                }}>
                                <Entypo name="cross" size={30} color="#000" />
                                </Pressable>
                                              </>
                    ) : (
                      <View style={[styles.uploadContent,{width:200}]}>
                        <Image
                          source={require("../../assets/png/aadhar.png")}
                          style={{ width: 40, height: 40 }}
                        />
                        <Text style={{ marginTop: 6 }}>NOC Documentation</Text>
                      </View>
                    )}
      
            {/* <Icon name="file-pdf-o" size={18} color={Colors.secondary} /> */}
          </Pressable>
        </View>
            <Pressable
            style={[styles.footerBtn, styles.saveBtn,{marginVertical:20}]}
            onPress={onSave}
          >
            <Text style={[styles.footerText, { color: "#fff" }]}>Submit</Text>
          </Pressable>

        {/* --- BANK INFORMATION --- */}
        <View style={[styles.container,{marginVertical:20}]}>
        <View style={[styles.rowBetween, { marginTop: 30 }]}>
          <Text style={styles.title}>Bank Information</Text>
          <Text style={styles.stepText}>4/5</Text>
        </View>
        <View style={styles.line} />

        <Text style={styles.label}>Bank Name</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={bankOptions}
          labelField="label"
          valueField="value"
          placeholder="Select"
          value={formData.bankName}
          onChange={(item) => updateFormData("bankName", item.value)}
        />

        <Text style={styles.label}>Account No</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Account Number"
          keyboardType="number-pad"
          value={formData.accountNo}
          onChangeText={(v) => updateFormData("accountNo", v)}
        />

        <Text style={styles.label}>IFSC Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter IFSC Code"
          autoCapitalize="characters"
          value={formData.ifscCode}
          onChangeText={(v) => updateFormData("ifscCode", v)}
        />

        <UploadBox
          uri={formData.chequePhoto}
          label="Blank Cheque Pic"
          onPress={() => handleSelectImage("chequePhoto")}
        />
      <Pressable
            style={[styles.footerBtn, styles.saveBtn,{marginVertical:20}]}
            onPress={onSave}
          >
            <Text style={[styles.footerText, { color: "#fff" }]}>Submit</Text>
          </Pressable>
          </View>

        {/* --- GUARANTOR 1 --- */}
        <View style={[styles.container,{marginVertical:20}]}>
        <View style={[styles.rowBetween, { marginTop: 30 }]}>
          <Text style={styles.title}>Guarantor 1 Details</Text>
          <Text style={styles.stepText}>5/5</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.row}>
          <UploadBox
            uri={formData.guarantor1.refOneAadhaarFrontPic}
            label="Aadhaar Front"
            onPress={() => handleSelectImage("guarantor1.refOneAadhaarFrontPic")}
          />
          <UploadBox
            uri={formData.guarantor1.refOneAadhaarBackPic}
            label="Aadhaar Back"
            onPress={() => handleSelectImage("guarantor1.refOneAadhaarBackPic")}
          />
        </View>

        <Text style={styles.label}>Aadhaar No</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Aadhaar No"
          value={formData.guarantor1.refOneAadhaarNo}
          onChangeText={(v) =>
            updateGuarantor("guarantor1", "refOneAadhaarNo", v)
          }
          editable={false}
        />

        <Text style={styles.label}>Aadhaar Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name as per Aadhaar"
          value={formData.guarantor1.refOneNameAsPerAadhaar}
          onChangeText={(v) => updateGuarantor("guarantor1", "refOneNameAsPerAadhaar", v)}
          editable={false}
        />

        <Text style={styles.label}>DOB</Text>
  
          <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          value={formData.guarantor1.refOneDOB}
          onChangeText={(v) =>
            updateGuarantor("guarantor1", "refOneDOB", v)
          }
          editable={false}
        />


        <Text style={styles.label}>Permanent Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Permanent Address"
          value={formData.guarantor1.refOnePermanentAddress}
          onChangeText={(v) =>
            updateGuarantor("guarantor1", "refOnePermanentAddress", v)
          }
          editable={false}
        />
        
        <CheckBox
        rightText="Same As Permanent Address"
          style={{flex: 1, padding: 10}}
          onClick={() => {
            console.log("checked",checked)
            setChecked(!checked)
          }}
          checked={checked}
          
          />
        <Text style={styles.label}>Current Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Current Address"
          value={formData.guarantor1.refOneAddressAsPerAadhaar}
          onChangeText={(v) => updateGuarantor("guarantor1", "refOneAddressAsPerAadhaar", v)}
        />

        <UploadBox
          uri={formData.guarantor1.refOneAadhaarPANPhoto}
          label="PAN Pic"
          onPress={() => handleSelectImage("guarantor1.refOneAadhaarPANPhoto")}
        />

        <Text style={styles.label}>PAN Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter PAN Number"
          value={formData.guarantor1.refOnePanNo}
          onChangeText={(v) => updateGuarantor("guarantor1", "refOnePanNo", v)}
          editable={false}
        />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile"
          value={formData.guarantor1.refOneMobileNo}
          onChangeText={(v) => updateGuarantor("guarantor1", "refOneMobileNo", v)}
        />

        {/* --- GUARANTOR 2 --- */}
        <View style={[styles.rowBetween, { marginTop: 30 }]}>
          <Text style={styles.title}>Guarantor 2 Details</Text>
        </View>
        <View style={styles.line} />

          <View style={styles.row}>
          <UploadBox
            uri={formData.guarantor2.refTwoAadhaarFrontPic}
            label="Aadhaar Front Photo"
            onPress={() =>
              handleSelectImage("guarantor2.refTwoAadhaarFrontPic")
            }
          />
          <UploadBox
            uri={formData.guarantor2.refTwoAadhaarBackPic}
            label="Aadhaar Back Photo"
            onPress={() =>
              handleSelectImage("guarantor2.refTwoAadhaarBackPic")
            }
          />
        </View>


        <Text style={styles.label}>Aadhaar No</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Aadhaar No"
          value={formData.guarantor2.refTwoAadhaarNo}
          onChangeText={(v) =>
            updateGuarantor("guarantor2", "refTwoAadhaarNo", v)
          }
          editable={false}
        />

        <Text style={styles.label}>Aadhaar Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name as per Aadhaar"
          value={formData.guarantor2.refTwoNameAsPerAadhaar}
          onChangeText={(v) =>
            updateGuarantor("guarantor2", "refTwoNameAsPerAadhaar", v)
          }
        />
          <Text style={styles.label}>DOB</Text>
           <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          value={formData.guarantor2.refTwoDOB}
          onChangeText={(v) =>
            updateGuarantor("guarantor2", "refTwoDOB", v)
          }
          editable={false}
        />

            <Text style={styles.label}>Permanent Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Permanent Address"
          value={formData.guarantor2.refTwoPermanentAddress}
          onChangeText={(v) =>
            updateGuarantor("guarantor2", "refTwoPermanentAddress", v)
          }
        />

      <Text style={styles.label}>Current Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Current Address"
          value={formData.guarantor2.refTwoAddressAsPerAadhaar}
          onChangeText={(v) =>
            updateGuarantor("guarantor2", "refTwoAddressAsPerAadhaar", v)
          }
        />
      <UploadBox
          uri={formData.guarantor2.refTwoPanPic}
          label="PAN Pic"
          onPress={() => handleSelectImage("guarantor2.refTwoPanPic")}
        />
        <Text style={styles.label}>PAN Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter PAN Number"
          value={formData.guarantor2.refTwoPanNo}
          onChangeText={(v) =>
            updateGuarantor("guarantor2", "refTwoPanNo", v)
          }
          editable={false}
        />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile Number"
          keyboardType="number-pad"
          value={formData.guarantor2.refTwoMobileNo}
          onChangeText={(v) =>
            updateGuarantor("guarantor2", "refTwoMobileNo", v)
          }
        />

      
    

    
`

        {/* Footer Buttons */}
        <View style={styles.footerRow}>
          <Pressable
            style={[styles.footerBtn, styles.backBtn]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.footerText, { color: Colors.secondary }]}>
              Back
            </Text>
          </Pressable>
          <Pressable
            style={[styles.footerBtn, styles.saveBtn]}
            onPress={() => {
                const filteredData = {...formData.guarantor2,...formData.guarantor1}
                // const removeKeys = [
                //   "refTwoPanPic[0]",
                //   "refTwoPanPic[1]",
                //   "aadhaarFrontPic",
                //   "aadhaarBackPic",
                //   "aadhaarNumber",
                //   "name",
                //   "address",
                //   "permanentAddress",
                //   "panPic",
                //   "panNumber",
                //   "mobile"
                // ];
                // removeKeys.forEach((key) => {
                //   delete filteredData[key];
                // });

                delete filteredData['refTwoPanPic[0]']
                delete filteredData['refTwoPanPic[1]']
                delete filteredData['aadhaarFrontPic']
                delete filteredData['aadhaarBackPic']
                delete filteredData['aadhaarNumber']
                delete filteredData['name']
                delete filteredData['address']
                delete filteredData['permanentAddress']
                delete filteredData['panPic']
                delete filteredData['panNumber']
                delete filteredData['mobile']

                console.log("filteredData",JSON.stringify(filteredData))
                // return;
                  submitkyc({kycId:"693b21b68e5c8c09d6478ead",payload:filteredData},{
                        onSuccess: () => {
                          Alert.alert('✅ Guarantor Detail Updated Successfully!')
                          // navigation.navigate("kycForm3",newData);  
                          navigation.goBack()
                        },
                        onError: (err) => {
                          Alert.alert("Error",err.message)
                          console.log("Error",err)
                        }
                      })
            }}
          >
            <Text style={[styles.footerText, { color: "#fff" }]}>Save</Text>
          </Pressable>
        </View>
        </View>
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
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  title: { fontSize: 18, fontWeight: "500" },
  stepText: { color: Colors.secondary, fontSize: 14 },
  line: { borderWidth: 0.5, marginVertical: 10, borderColor: "#0D69C4" },
  label: { marginTop: 15, fontSize: 16, fontWeight: "400" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
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
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 6,
    flex: 1,
  },
  uploadContent: { alignItems: "center", justifyContent: "center" },
  uploadImage: { width: "100%", height: 72, borderRadius: 8 },
  iconInputRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconBtn: {
    // height: 44,
    // width: 44,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 8,
  },
  footerBtn: {
    flex: 1,
    height: 46,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  backBtn: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    marginRight: 12,
    backgroundColor: "#fff",
  },
  saveBtn: { backgroundColor: Colors.secondary, marginLeft: 12 },
  footerText: { fontSize: 16, fontWeight: "600" },
});
