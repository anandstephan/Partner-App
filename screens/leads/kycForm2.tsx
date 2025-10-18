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

export default function KycForm2() {
  const navigation = useNavigation();

  // ✅ Single form state
  const [formData, setFormData] = useState({
    ownership: null,
    permanentAddress: "",
    nocDoc: "",
    bill: "",
    dlNo: "",
    rcNo: "",
    vehAge: "",
    lat: "",
    lng: "",
    dlFrontPic: null,
    dlBackPic: null,
    rcPic: null,
    housePic: null,
    localityPic: null,
    selfiePic: null,
  });

  // ✅ Universal update function
  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Dropdown options
  const ownershipOptions = [
    { label: "Owned", value: "owned" },
    { label: "Rented", value: "rented" },
    { label: "Family", value: "family" },
    { label: "Others", value: "other" },
  ];

  // ✅ Universal image picker
  const handleSelectImage = async (field: string) => {
    const result = await launchImageLibrary({ mediaType: "photo", quality: 1 });
    if (result.didCancel) return;
    const asset = result.assets?.[0];
    if (!asset?.uri) return;
    updateFormData(field, asset.uri);
  };

  const onNext = () => {
    console.log("✅ Form Data:", formData);
    navigation.navigate("kycForm3");
  };

  return (
    <>
      <Header title="KYC Verification" />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {/* Top title row */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Address</Text>
          <Text style={styles.stepText}>2/5</Text>
        </View>
        <View style={styles.line} />

        {/* Permanent Address */}
        <Text style={styles.label}>Permanent Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Permanent Address"
          value={formData.permanentAddress}
          onChangeText={(v) => updateFormData("permanentAddress", v)}
        />

        {/* Ownership Dropdown */}
        <Text style={styles.label}>House Ownership</Text>
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

        {/* NOC Documentation */}
        <Text style={styles.label}>NOC Documentation</Text>
        <View style={styles.iconInputRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Enter NOC or remarks"
            value={formData.nocDoc}
            onChangeText={(v) => updateFormData("nocDoc", v)}
          />
          <Pressable style={styles.iconBtn} onPress={() => handleSelectImage("nocDocPic")}>
            <Icon name="file-pdf-o" size={18} color={Colors.secondary} />
          </Pressable>
        </View>

        {/* Bill */}
        <Text style={styles.label}>Electricity/Water Bill</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Bill Number"
          keyboardType="number-pad"
          value={formData.bill}
          onChangeText={(v) => updateFormData("bill", v)}
        />

        {/* House Pic */}
        <Text style={styles.label}>Choose House Pic</Text>
        <Pressable
          style={styles.uploadBox}
          onPress={() => handleSelectImage("housePic")}
        >
          {formData.housePic ? (
            <Image source={{ uri: formData.housePic }} style={styles.uploadImage} />
          ) : (
            <View style={styles.uploadContent}>
              <Image
                source={require("../../assets/png/aadhar.png")}
                style={{ width: 40, height: 40 }}
              />
              <Text style={{ marginTop: 6 }}>House Pic</Text>
            </View>
          )}
        </Pressable>

        {/* Selfie with Customer */}
        <Text style={styles.label}>Selfie with Customer</Text>
        <Pressable
          style={styles.uploadBox}
          onPress={() => handleSelectImage("selfiePic")}
        >
          {formData.selfiePic ? (
            <Image source={{ uri: formData.selfiePic }} style={styles.uploadImage} />
          ) : (
            <View style={styles.uploadContent}>
              <Image
                source={require("../../assets/png/aadhar.png")}
                style={{ width: 40, height: 40 }}
              />
              <Text style={{ marginTop: 6 }}>Selfie</Text>
            </View>
          )}
        </Pressable>

        {/* Location */}
        <Text style={styles.label}>Location</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.half]}
            placeholder="Latitude"
            keyboardType="decimal-pad"
            value={formData.lat}
            onChangeText={(v) => updateFormData("lat", v)}
          />
          <TextInput
            style={[styles.input, styles.half]}
            placeholder="Longitude"
            keyboardType="decimal-pad"
            value={formData.lng}
            onChangeText={(v) => updateFormData("lng", v)}
          />
        </View>

        {/* Locality Pic */}
        <Text style={styles.label}>Choose Locality Pic</Text>
        <Pressable
          style={styles.uploadBox}
          onPress={() => handleSelectImage("localityPic")}
        >
          {formData.localityPic ? (
            <Image source={{ uri: formData.localityPic }} style={styles.uploadImage} />
          ) : (
            <View style={styles.uploadContent}>
              <Image
                source={require("../../assets/png/aadhar.png")}
                style={{ width: 40, height: 40 }}
              />
              <Text style={{ marginTop: 6 }}>Locality Pic</Text>
            </View>
          )}
        </Pressable>

        {/* PAN Front */}
        <Text style={styles.label}>Choose PAN Front Pic</Text>
        <Pressable
          style={styles.uploadBox}
          onPress={() => handleSelectImage("rcPic")}
        >
          {formData.rcPic ? (
            <Image source={{ uri: formData.rcPic }} style={styles.uploadImage} />
          ) : (
            <View style={styles.uploadContent}>
              <Image
                source={require("../../assets/png/aadhar.png")}
                style={{ width: 40, height: 40 }}
              />
              <Text style={{ marginTop: 6 }}>PAN Front Pic</Text>
            </View>
          )}
        </Pressable>

        <Text style={styles.label}>PAN No</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter PAN Number"
          autoCapitalize="characters"
          value={formData.rcNo}
          onChangeText={(v) => updateFormData("rcNo", v)}
        />

        {/* DL Details */}
        <Text style={styles.label}>DL Details</Text>
        <View style={styles.row}>
          <Pressable
            style={styles.uploadBox}
            onPress={() => handleSelectImage("dlFrontPic")}
          >
            {formData.dlFrontPic ? (
              <Image source={{ uri: formData.dlFrontPic }} style={styles.uploadImage} />
            ) : (
              <View style={styles.row}>
                <Image
                  source={require("../../assets/png/aadhar.png")}
                  style={{ width: 50, height: 50 }}
                />
                <Text>DL Front</Text>
              </View>
            )}
          </Pressable>

          <Pressable
            style={styles.uploadBox}
            onPress={() => handleSelectImage("dlBackPic")}
          >
            {formData.dlBackPic ? (
              <Image source={{ uri: formData.dlBackPic }} style={styles.uploadImage} />
            ) : (
              <View style={styles.row}>
                <Image
                  source={require("../../assets/png/aadhar.png")}
                  style={{ width: 50, height: 50 }}
                />
                <Text>DL Back</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footerRow}>
          <Pressable
            style={[styles.footerBtn, styles.backBtn]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.footerText, { color: Colors.secondary }]}>Back</Text>
          </Pressable>
          <Pressable
            style={[styles.footerBtn, styles.nextBtn]}
            onPress={onNext}
          >
            <Text style={[styles.footerText, { color: "#fff" }]}>Next</Text>
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 18, fontWeight: "500" },
  stepText: { color: Colors.secondary, fontSize: 14 },
  line: { borderWidth: 0.5, marginVertical: 10, borderColor: "#0D69C4" },
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
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  half: { flex: 1 },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 8,
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
  nextBtn: { backgroundColor: Colors.secondary, marginLeft: 12 },
  footerText: { fontSize: 16, fontWeight: "600" },
});
