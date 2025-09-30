import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";

import Colors from "../../constants/color";
import Header from "../../commonComponents/Header";
import { useNavigation } from "@react-navigation/native";

export default function KycForm3() {
   const navigation = useNavigation() 

      const [rcFrontPic, setRcFrontPic] = useState(null);
      const [rcBackPic,setRCBackPic] = useState(null)
      const [rc,setRc] = useState('')

  // --- BANK INFO ---
  const [bankName, setBankName] = useState(null);
  const [ownership, setOwnership] = useState(null);
  const bankOptions = [
    { label: "HDFC Bank", value: "hdfc" },
    { label: "ICICI Bank", value: "icici" },
    { label: "SBI", value: "sbi" },
    { label: "Axis Bank", value: "axis" },
    { label: "Other", value: "other" },
  ];
    const ownershipOptions = [
    { label: "Self Owned", value: "self" },
    { label: "Company Owned", value: "company" },
    { label: "Financed", value: "financed" },
    { label: "Leased", value: "leased" },
  ];

   const [nocDoc, setNocDoc] = useState(""); 

  const [accountNo, setAccountNo] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [blankChequePic, setBlankChequePic] = useState(null);


  const [guarantorAadharFrontPic1,setGuarantorAadharFrontPic1] = useState(null)
  const [guarantorAadharBackPic1,setGuarantorAadharBackPic1] = useState(null)
  const [guarantorAadharNumber1,setGuarantorAadharNumber1] = useState('')
  const [guarantoName1,setGuarantorName1] = useState('')
  const [guarantorDOB1,setGuarantorDOB1] = useState(new Date())
  const [guarantorAddress1,setGuarantorAddress1] = useState('')
  const [guarantorPermanentAddress1,setGuarantorPermanentAddress1] = useState('')
  const [guarantorPanPic1,setGuarantorPanPic1] = useState(null)
  const [guarantorPanNumber1,setGuarantorPanNumber1] = useState('')
  const [guarantorMobile1,setGuarantorMobile1] = useState('')



  const [guarantorAadharFrontPic2,setGuarantorAadharFrontPic2] = useState(null)
  const [guarantorAadharBackPic2,setGuarantorAadharBackPic2] = useState(null)
  const [guarantorAadharNumber2,setGuarantorAadharNumber2] = useState('')
  const [guarantoName2,setGuarantorName2] = useState('')
  const [guarantorDOB2,setGuarantorDOB2] = useState(new Date())
  const [guarantorAddress2,setGuarantorAddress2] = useState('')
  const [guarantorPermanentAddress2,setGuarantorPermanentAddress2] = useState('')
  const [guarantorPanPic2,setGuarantorPanPic2] = useState(null)
  const [guarantorPanNumber2,setGuarantorPanNumber2] = useState('')
  const [guarantorMobile2,setGuarantorMobile2] = useState('')

  const pickImage = async (setter) => {
    const res = await launchImageLibrary({ mediaType: "photo", quality: 1 });
    if (res.assets && res.assets.length > 0) setter(res.assets[0].uri);
  };

  const onSave = () => {
    // TODO: validations + API submit
    // navigation?.navigate("SomeNextRoute")
  };

  return (
    <>
      <Header title="KYC Verification" />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
                <View style={styles.rowBetween}>
          <Text style={styles.title}>RC Details</Text>
          <Text style={styles.stepText}>3/5</Text>
        </View>
        <View style={styles.line} />
              <View style={styles.row}>
                <Pressable style={styles.uploadBox} onPress={() => pickImage(setRcFrontPic)}>
                  {rcFrontPic ? (
                    <Image source={{ uri: dlPic }} style={styles.uploadImage} />
                  ) : (
                    <View style={styles.row}>
                    <Image
                    source={require('../../assets/png/aadhar.png')}
                    style={{
                        width:"50",
                        height:"50"
                    }}
                    />
                    <Text>RC Pic Front</Text>
                    </View>
                  )}
                </Pressable>
                <Pressable style={styles.uploadBox} onPress={() => pickImage(setRCBackPic)}>
                  {rcBackPic ? (
                    <Image source={{ uri: rcBackPic }} style={styles.uploadImage} />
                  ) : (
                    <View style={styles.row}>
                    <Image
                    source={require('../../assets/png/aadhar.png')}
                    style={{
                        width:"50",
                        height:"50"
                    }}
                    />
                    <Text>RC Back Pic</Text>
                    </View>
                  )}
                </Pressable>

            
              </View>
              <Text style={styles.label}>RC Number</Text>
            <TextInput
            style={[styles.input, styles.half]}
            placeholder="Enter Your RC Number"
            value={rc}
            onChangeText={setRc}
          />
   

             <Text style={styles.label}>Vehicle Registeration Date</Text>
            <TextInput
            style={[styles.input, styles.half]}
            placeholder="Enter Your Vehicle Registration Date"
            value={rc}
            onChangeText={setRc}
          />
          
             <Text style={styles.label}>Make</Text>
            <TextInput
            style={[styles.input, styles.half]}
            placeholder="Enter Your Make"
            value={rc}
            onChangeText={setRc}
          />
          
             <Text style={styles.label}>Model</Text>
            <TextInput
            style={[styles.input, styles.half]}
            placeholder="Enter Your Model"
            value={rc}
            onChangeText={setRc}
          />
              {/* Vehicle Ownership */}
        <Text style={styles.label}>Vehicle Ownership</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={ownershipOptions}
          labelField="label"
          valueField="value"
          placeholder="Select"
          value={ownership}
          onChange={(item) => setOwnership(item.value)}
        />

    {/* NOC Documentation (optional – small doc icon at right like figma) */}
        <Text style={styles.label}>NOC Documentation</Text>
        <View style={styles.iconInputRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Enter NOC or remarks"
            value={nocDoc}
            onChangeText={setNocDoc}
          />
          <Pressable style={styles.iconBtn} onPress={() => pickImage(() => {})}>
            <Icon name="file-pdf-o" size={18} color={Colors.secondary} />
          </Pressable>
        </View>

        {/* BANK INFORMATION (3/4) */}
        <View style={[styles.rowBetween,{marginTop:30}]}>
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
          value={bankName}
          onChange={(item) => setBankName(item.value)}
        />

        <Text style={styles.label}>Account No</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Account Number"
          keyboardType="number-pad"
          value={accountNo}
          onChangeText={setAccountNo}
        />

        <Text style={styles.label}>IFSC Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter IFSC Code"
          autoCapitalize="characters"
          value={ifsc}
          onChangeText={setIfsc}
        />

        <View style={{ marginTop: 10 }}>
          <View style={styles.uploadBox}>
            <Pressable
              style={styles.uploadInner}
              onPress={() => pickImage(setBlankChequePic)}
            >
              {blankChequePic ? (
                <Image source={{ uri: blankChequePic }} style={styles.uploadImage} />
              ) : (
                <View style={styles.uploadContent}>
                  <Image
                    source={require("../../assets/png/aadhar.png")}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text style={{ marginTop: 6 }}>Blank Cheque Pic</Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>

        {/* REF INFORMATION (4/4) */}
        <View style={[styles.rowBetween, { marginTop: 18 }]}>
          <Text style={styles.title}>Ref. Information</Text>
          <Text style={styles.stepText}>5/5</Text>
        </View>
        <View style={styles.line} />
 
      <Text style={styles.label}>Gurrantor 1  Aadhaar Details</Text>
      <View style={styles.row}>
        <Pressable style={styles.uploadBox} onPress={() => pickImage(setGuarantorAadharFrontPic1)}>
          {guarantorAadharFrontPic1 ? (
            <Image source={{ uri: guarantorAadharFrontPic1 }} style={styles.uploadImage} />
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
        <Pressable style={styles.uploadBox} onPress={() => pickImage(setGuarantorAadharBackPic1)}>
          {guarantorAadharBackPic1 ? (
            <Image source={{ uri: guarantorAadharBackPic1 }} style={styles.uploadImage} />
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
     
      <Text style={styles.label}>Gurrantor 1 Aadhaar No</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter Your Gurrantor 1 Aadhaar No."
            value={guarantorAadharNumber1}
            onChangeText={setGuarantorAadharNumber1}
        />
        <Text style={styles.label}>Gurrantor 1 Aadhaar Name</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter Your Name as per your Aadhar"
            value={guarantoName1}
            onChangeText={setGuarantorName1}
        />
      {/* DOB */}
      <Text style={styles.label}>Gurrantor 1 DOB</Text>
      <Pressable style={styles.input} onPress={() => {}}>
        <Text>{guarantorDOB1?.toDateString()}</Text>
      </Pressable>
    

      {/* Address */}
      <Text style={styles.label}>Gurrantor 1 Current Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter current address"
        value={guarantorAddress1}
        onChangeText={setGuarantorAddress1}
      />
            {/* Address */}
      <Text style={styles.label}> Gurrantor 1 Permanent Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter current address"
        value={guarantorPermanentAddress1}
        onChangeText={setGuarantorPermanentAddress1}
      />
      
       <Pressable style={styles.uploadBox} onPress={() => pickImage(setGuarantorPanPic1)}>
          {guarantorPanPic1 ? (
            <Image source={{ uri: guarantorPanPic1 }} style={styles.uploadImage} />
          ) : (
            <View style={[styles.row,{gap:0,marginHorizontal:100}]}>
            <Image
            source={require('../../assets/png/aadhar.png')}
            style={{
                width:"40",
                height:"40"
            }}
            />
            <Text>PAN Pic</Text>
            </View>
          )}
        </Pressable>

          <Text style={styles.label}> Gurrantor 1 PAN Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Gurantor 1 PAN Number"
        value={guarantorPanNumber1}
        onChangeText={setGuarantorPanNumber1}
      />
          <Text style={styles.label}> Gurrantor 1 Mobile Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Gurantor 1 Mobile Number "
        value={guarantorMobile1}
        onChangeText={setGuarantorMobile1}
      />




 <Text style={styles.label}>Gurrantor 2  Aadhaar Details</Text>
      <View style={styles.row}>
        <Pressable style={styles.uploadBox} onPress={() => pickImage(setGuarantorAadharFrontPic2)}>
          {guarantorAadharFrontPic2 ? (
            <Image source={{ uri: guarantorAadharFrontPic2 }} style={styles.uploadImage} />
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
        <Pressable style={styles.uploadBox} onPress={() => pickImage(setGuarantorAadharBackPic1)}>
          {guarantorAadharBackPic1 ? (
            <Image source={{ uri: guarantorAadharBackPic1 }} style={styles.uploadImage} />
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
     
      <Text style={styles.label}>Gurrantor 2 Aadhaar No</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter Your Gurrantor 2 Aadhaar No."
            value={guarantorAadharNumber2}
            onChangeText={setGuarantorAadharNumber2}
        />
        <Text style={styles.label}>Gurrantor 2 Aadhaar Name</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter Your Name as per your Aadhar"
            value={guarantoName2}
            onChangeText={setGuarantorName2}
        />
      {/* DOB */}
      <Text style={styles.label}>Gurrantor 2 DOB</Text>
      <Pressable style={styles.input} onPress={() => {}}>
        <Text>{guarantorDOB2?.toDateString()}</Text>
      </Pressable>
    

      {/* Address */}
      <Text style={styles.label}>Gurrantor 2 Current Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter current address"
        value={guarantorAddress2}
        onChangeText={setGuarantorAddress2}
      />
            {/* Address */}
      <Text style={styles.label}> Gurrantor 2 Permanent Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter current address"
        value={guarantorPermanentAddress2}
        onChangeText={setGuarantorPermanentAddress2}
      />
      
       <Pressable style={styles.uploadBox} onPress={() => pickImage(setGuarantorPanPic2)}>
          {guarantorPanPic2 ? (
            <Image source={{ uri: guarantorPanPic2 }} style={styles.uploadImage} />
          ) : (
            <View style={[styles.row,{gap:0,marginHorizontal:100}]}>
            <Image
            source={require('../../assets/png/aadhar.png')}
            style={{
                width:"40",
                height:"40"
            }}
            />
            <Text>PAN Pic</Text>
            </View>
          )}
        </Pressable>

          <Text style={styles.label}> Gurrantor 2 PAN Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Gurantor 2 PAN Number"
        value={guarantorPanNumber2}
        onChangeText={setGuarantorPanNumber2}
      />
          <Text style={styles.label}> Gurrantor 2 Mobile Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Gurantor 2 Mobile Number "
        value={guarantorMobile2}
        onChangeText={setGuarantorMobile2}
      />



        {/* footer buttons */}
        <View style={styles.footerRow}>
          <Pressable
            style={[styles.footerBtn, styles.backBtn]}
            onPress={() => navigation?.goBack?.()}
          >
            <Text style={[styles.footerText, { color: Colors.secondary }]}>Back</Text>
          </Pressable>
          <Pressable style={[styles.footerBtn, styles.saveBtn]} onPress={onSave}>
            <Text style={[styles.footerText, { color: "#fff" }]}>Save</Text>
          </Pressable>
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
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center",marginVertical:10 },
  title: { fontSize: 18, fontWeight: "500" },
  stepText: { color: Colors.secondary, fontSize: 14 },
  line: { borderWidth: 0.5, marginVertical: 10, borderColor: "#0D69C4" },

  label: { marginTop: 15, fontSize: 16, fontWeight: "400" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 5},

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
  },
    iconInputRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 5 },
      iconBtn: {
    height: 44,
    width: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

    half: { flex: 1},
  uploadInner: { height: 72, alignItems: "center", justifyContent: "center", borderRadius: 8 },
  uploadContent: { alignItems: "center", justifyContent: "center" },
  uploadImage: { width: "100%", height: 72, borderRadius: 8 },

  footerRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 24, marginBottom: 8 },
  footerBtn: { flex: 1, height: 46, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  backBtn: { borderWidth: 1, borderColor: Colors.secondary, marginRight: 12, backgroundColor: "#fff" },
  saveBtn: { backgroundColor: Colors.secondary, marginLeft: 12 },
  footerText: { fontSize: 16, fontWeight: "600" },
});
