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
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../../constants/color";
import Header from "../../commonComponents/Header";
import { useNavigation } from "@react-navigation/native";

export default function KycForm3() {
  const navigation = useNavigation();

  // ✅ Unified form state
  const [formData, setFormData] = useState({
    // RC Details
    rcFrontPic: null,
    rcBackPic: null,
    rcNumber: "",
    rcRegistrationDate: "",
    rcMake: "",
    rcModel: "",
    ownership: null,
    nocDoc: "",
    nocDocPic: null,

    // Bank Info
    bankName: null,
    accountNo: "",
    ifsc: "",
    blankChequePic: null,

    // Guarantor 1
    guarantor1: {
      aadhaarFrontPic: null,
      aadhaarBackPic: null,
      aadhaarNumber: "",
      name: "",
      dob: new Date(),
      address: "",
      permanentAddress: "",
      panPic: null,
      panNumber: "",
      mobile: "",
    },

    // Guarantor 2
    guarantor2: {
      aadhaarFrontPic: null,
      aadhaarBackPic: null,
      aadhaarNumber: "",
      name: "",
      dob: new Date(),
      address: "",
      permanentAddress: "",
      panPic: null,
      panNumber: "",
      mobile: "",
    },
  });

  // DOB Pickers visibility
  const [showDobPicker1, setShowDobPicker1] = useState(false);
  const [showDobPicker2, setShowDobPicker2] = useState(false);

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
    const result = await launchImageLibrary({ mediaType: "photo", quality: 1 });
    if (result.didCancel) return;
    const asset = result.assets?.[0];
    if (!asset?.uri) return;

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
    console.log("✅ Final Form Data:", formData);
  };

  // ✅ Reusable Upload Component
  const UploadBox = ({ uri, label, onPress }: any) => (
    <Pressable style={styles.uploadBox} onPress={onPress}>
      {uri ? (
        <Image source={{ uri }} style={styles.uploadImage} />
      ) : (
        <View style={styles.uploadContent}>
          <Image
            source={require("../../assets/png/aadhar.png")}
            style={{ width: 40, height: 40 }}
          />
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
            uri={formData.rcFrontPic}
            label="RC Front"
            onPress={() => handleSelectImage("rcFrontPic")}
          />
          <UploadBox
            uri={formData.rcBackPic}
            label="RC Back"
            onPress={() => handleSelectImage("rcBackPic")}
          />
        </View>

        <Text style={styles.label}>RC Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter RC Number"
          value={formData.rcNumber}
          onChangeText={(v) => updateFormData("rcNumber", v)}
        />

        <Text style={styles.label}>Vehicle Registration Date</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Registration Date"
          value={formData.rcRegistrationDate}
          onChangeText={(v) => updateFormData("rcRegistrationDate", v)}
        />

        <Text style={styles.label}>Make</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Make"
          value={formData.rcMake}
          onChangeText={(v) => updateFormData("rcMake", v)}
        />

        <Text style={styles.label}>Model</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Model"
          value={formData.rcModel}
          onChangeText={(v) => updateFormData("rcModel", v)}
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
          value={formData.ownership}
          onChange={(item) => updateFormData("ownership", item.value)}
        />

        <Text style={styles.label}>NOC Documentation</Text>
        <View style={styles.iconInputRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Enter NOC or remarks"
            value={formData.nocDoc}
            onChangeText={(v) => updateFormData("nocDoc", v)}
          />
          <Pressable
            style={styles.iconBtn}
            onPress={() => handleSelectImage("nocDocPic")}
          >
            <Icon name="file-pdf-o" size={18} color={Colors.secondary} />
          </Pressable>
        </View>
        </View>
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
          value={formData.ifsc}
          onChangeText={(v) => updateFormData("ifsc", v)}
        />

        <UploadBox
          uri={formData.blankChequePic}
          label="Blank Cheque Pic"
          onPress={() => handleSelectImage("blankChequePic")}
        />

        {/* --- GUARANTOR 1 --- */}
        <View style={[styles.rowBetween, { marginTop: 30 }]}>
          <Text style={styles.title}>Guarantor 1 Details</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.row}>
          <UploadBox
            uri={formData.guarantor1.aadhaarFrontPic}
            label="Aadhaar Front"
            onPress={() => handleSelectImage("guarantor1.aadhaarFrontPic")}
          />
          <UploadBox
            uri={formData.guarantor1.aadhaarBackPic}
            label="Aadhaar Back"
            onPress={() => handleSelectImage("guarantor1.aadhaarBackPic")}
          />
        </View>

        <Text style={styles.label}>Aadhaar No</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Aadhaar No"
          value={formData.guarantor1.aadhaarNumber}
          onChangeText={(v) =>
            updateGuarantor("guarantor1", "aadhaarNumber", v)
          }
        />

        <Text style={styles.label}>Aadhaar Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name as per Aadhaar"
          value={formData.guarantor1.name}
          onChangeText={(v) => updateGuarantor("guarantor1", "name", v)}
        />

        <Text style={styles.label}>DOB</Text>
        <Pressable
          style={styles.input}
          onPress={() => setShowDobPicker1(true)}
        >
          <Text>{formData.guarantor1.dob?.toDateString()}</Text>
        </Pressable>
        {showDobPicker1 && (
          <DateTimePicker
            value={formData.guarantor1.dob || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDobPicker1(false);
              if (selectedDate)
                updateGuarantor("guarantor1", "dob", selectedDate);
            }}
          />
        )}

        <Text style={styles.label}>Current Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Current Address"
          value={formData.guarantor1.address}
          onChangeText={(v) => updateGuarantor("guarantor1", "address", v)}
        />

        <Text style={styles.label}>Permanent Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Permanent Address"
          value={formData.guarantor1.permanentAddress}
          onChangeText={(v) =>
            updateGuarantor("guarantor1", "permanentAddress", v)
          }
        />

        <UploadBox
          uri={formData.guarantor1.panPic}
          label="PAN Pic"
          onPress={() => handleSelectImage("guarantor1.panPic")}
        />

        <Text style={styles.label}>PAN Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter PAN Number"
          value={formData.guarantor1.panNumber}
          onChangeText={(v) => updateGuarantor("guarantor1", "panNumber", v)}
        />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile"
          value={formData.guarantor1.mobile}
          onChangeText={(v) => updateGuarantor("guarantor1", "mobile", v)}
        />

        {/* --- GUARANTOR 2 --- */}
        <View style={[styles.rowBetween, { marginTop: 30 }]}>
          <Text style={styles.title}>Guarantor 2 Details</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.row}>
          <UploadBox
            uri={formData.guarantor2.aadhaarFrontPic}
            label="Aadhaar Front"
            onPress={() => handleSelectImage("guarantor2.aadhaarFrontPic")}
          />
          <UploadBox
            uri={formData.guarantor2.aadhaarBackPic}
            label="Aadhaar Back"
            onPress={() => handleSelectImage("guarantor2.aadhaarBackPic")}
          />
        </View>

        <Text style={styles.label}>Aadhaar No</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Aadhaar No"
          value={formData.guarantor2.aadhaarNumber}
          onChangeText={(v) =>
            updateGuarantor("guarantor2", "aadhaarNumber", v)
          }
        />

        <Text style={styles.label}>Aadhaar Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name as per Aadhaar"
          value={formData.guarantor2.name}
          onChangeText={(v) => updateGuarantor("guarantor2", "name", v)}
        />

        <Text style={styles.label}>DOB</Text>
        <Pressable
          style={styles.input}
          onPress={() => setShowDobPicker2(true)}
        >
          <Text>{formData.guarantor2.dob?.toDateString()}</Text>
        </Pressable>
        {showDobPicker2 && (
          <DateTimePicker
            value={formData.guarantor2.dob || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDobPicker2(false);
              if (selectedDate)
                updateGuarantor("guarantor2", "dob", selectedDate);
            }}
          />
        )}

        <Text style={styles.label}>Current Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Current Address"
          value={formData.guarantor2.address}
          onChangeText={(v) => updateGuarantor("guarantor2", "address", v)}
        />

        <Text style={styles.label}>Permanent Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Permanent Address"
          value={formData.guarantor2.permanentAddress}
          onChangeText={(v) =>
            updateGuarantor("guarantor2", "permanentAddress", v)
          }
        />

        <UploadBox
          uri={formData.guarantor2.panPic}
          label="PAN Pic"
          onPress={() => handleSelectImage("guarantor2.panPic")}
        />

        <Text style={styles.label}>PAN Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter PAN Number"
          value={formData.guarantor2.panNumber}
          onChangeText={(v) => updateGuarantor("guarantor2", "panNumber", v)}
        />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile"
          value={formData.guarantor2.mobile}
          onChangeText={(v) => updateGuarantor("guarantor2", "mobile", v)}
        />

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
            onPress={onSave}
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
    height: 44,
    width: 44,
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
