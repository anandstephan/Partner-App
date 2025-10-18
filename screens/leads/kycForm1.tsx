import React, { useState } from "react";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/color";
import Header from "../../commonComponents/Header";
import { useUpload } from "../../features/upload/useUpload";

export default function KycForm1() {
  const navigation = useNavigation();
  const { mutate: upload } = useUpload();

  // ✅ Single unified form state
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    smartphoneUser: null,
    aadharNumber: "",
    gender: null,
    maritalStatus: null,
    dob: new Date(),
    aadhaarFront: null,
    aadhaarBack: null,
    adharAddress: "",
  });

  // ✅ Universal update function
  const updateFormData = (field: string, value: any) => {
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

  // ✅ Image Picker + Upload
  const handleSelectImage = async (field: "aadhaarFront" | "aadhaarBack" | "selfie") => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.8,
    });

    if (result.didCancel) return;
    const asset = result.assets?.[0];
    if (!asset?.uri) return;

    const file = {
      uri: asset.uri,
      name: asset.fileName || "photo.jpg",
      type: asset.type || "image/jpeg",
    };

    updateFormData(field, asset.uri);

    upload(
      { file, category: field, appName: "employeeApp" },
      {
        onSuccess: () => Alert.alert("✅ Image Uploaded Successfully!"),
        onError: (err: any) => {
          Alert.alert("❌ Upload Error", err.message || "Something went wrong");
          console.log("Error", err);
        },
      }
    );
  };

  return (
    <>
      <Header title="KYC Verification" />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Ravi Singh</Text>
        <View style={styles.line} />
        <View style={styles.row}>
          <Text style={styles.subtitle}>Personal Information</Text>
          <Text style={{ color: "#0A66C2" }}>1/5</Text>
        </View>
        <View style={styles.line} />

        {/* Selfie */}
        <Pressable
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => handleSelectImage("selfie")}
        >
          <View style={styles.circle}>
            <Icon name="user" size={40} color={Colors.white} />
          </View>
          <Text style={{ marginTop: 8 }}>Selfie with Customer</Text>
        </Pressable>

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
          value={formData.maritalStatus}
          onChange={(item) => updateFormData("maritalStatus", item.value)}
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
          value={formData.smartphoneUser}
          onChange={(item) => updateFormData("smartphoneUser", item.value)}
        />

        {/* Aadhaar Upload */}
        <Text style={styles.label}>Aadhaar Details</Text>
        <View style={styles.row}>
          {/* Aadhaar Front */}
          <Pressable
            style={styles.uploadBox}
            onPress={() => handleSelectImage("aadhaarFront")}
          >
            {formData.aadhaarFront ? (
              <Image
                source={{ uri: formData.aadhaarFront }}
                style={styles.uploadImage}
              />
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
            onPress={() => handleSelectImage("aadhaarBack")}
          >
            {formData.aadhaarBack ? (
              <Image
                source={{ uri: formData.aadhaarBack }}
                style={styles.uploadImage}
              />
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
          value={formData.aadharNumber}
          onChangeText={(val) => updateFormData("aadharNumber", val)}
        />

        {/* Aadhaar Name */}
        <Text style={styles.label}>Aadhaar Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Name as per Aadhar"
          value={formData.lname}
          onChangeText={(val) => updateFormData("lname", val)}
        />

        {/* DOB */}
        <Text style={styles.label}>DOB</Text>
        <Pressable
          style={styles.input}
          onPress={() => updateFormData("showDatePicker", true)}
        >
          <Text>{formData.dob.toDateString()}</Text>
        </Pressable>
        <View style={{marginVertical:10}}>
        <DateTimePicker
          value={formData.dob}
          mode="date"
          display="default"
          onChange={(event, date) => {
            if (date) updateFormData("dob", date);
          }}
        />
        </View>

        {/* Address */}
        <Text style={styles.label}>Aadhaar Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Aadhaar address"
          value={formData.adharAddress}
          onChangeText={(val) => updateFormData("adharAddress", val)}
        />

        {/* Submit */}
        <Pressable
          style={styles.submitButton}
          onPress={() => navigation.navigate("kycForm2")}
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
  uploadImage: { width: "100%", height: 100, borderRadius: 5 },
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
