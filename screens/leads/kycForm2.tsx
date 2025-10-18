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
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";

// apke project ke hisaab se ye imports same hi rakhe:
import Colors from "../../constants/color";
import Header from "../../commonComponents/Header";
import { useNavigation } from "@react-navigation/native";

export default function KycForm2() {

  const navigation = useNavigation()
  // dropdowns
  const [ownership, setOwnership] = useState(null);
  const ownershipOptions = [
    { label: "Owned", value: "owned" },
    { label: "Rented", value: "rented" },
    { label: "Family", value: "family" },
    { label: "Others", value: "other" },
  ];

  // text fields
  const [permanentAddress,setPermanentAddress] = useState('')
  const [nocDoc, setNocDoc] = useState(""); // optional
  const [bill, setBill] = useState("");
  const [dlNo, setDlNo] = useState("");
  const [rcNo, setRcNo] = useState("");
  const [vehAge, setVehAge] = useState(""); // in years
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  // images
  const [dlBackPic, setDlBackPic] = useState(null);
   const [dlFrontPic, setDlFrontPic] = useState(null);
  const [rcPic, setRcPic] = useState(null);
  const [housePic,setHousePic] = useState(null)
  const [localityPic,setLocalityPic] = useState(null)

  // dates
  const [regDate, setRegDate] = useState(new Date());
  const [showRegPicker, setShowRegPicker] = useState(false);

  const pickImage = async (setter) => {
    const result = await launchImageLibrary({ mediaType: "photo", quality: 1 });
    if (result.assets && result.assets.length > 0) {
      setter(result.assets[0].uri);
    }
  };

  const onNext = () => {
    // TODO: validations / API
    navigation?.navigate("kycForm3") // if you have next route
  };

  return (
    <>
      <Header title="KYC Verification" />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {/* Top title row */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Address</Text>
          <Text style={styles.stepText}>2/4</Text>
        </View>
        <View style={styles.line} />
        <Text style={styles.label}>Permanent Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Permanent Address"
          value={permanentAddress}
          onChangeText={setPermanentAddress}
        />

        {/* Vehicle Ownership */}
        <Text style={styles.label}>House Ownership</Text>
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

        {/* Electricity/Water Bill */}
        <Text style={styles.label}>Electricity/Water Bill</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Electricity/Water Bill"
          keyboardType="number-pad"
          value={bill}
          onChangeText={setBill}
        />

                   <Text style={styles.label}>Choose House Pics</Text>
        <View style={styles.uploadBox}>
          <Pressable style={styles.uploadInner} onPress={() => pickImage(setHousePic)}>
            {housePic ? (
              <Image source={{ uri: housePic }} style={styles.uploadImage} />
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
        </View>

             {/* Lat/Long */}
        <Text style={styles.label}>Location</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.half]}
            placeholder="Latitude"
            keyboardType="decimal-pad"
            value={lat}
            onChangeText={setLat}
          />
          <TextInput
            style={[styles.input, styles.half]}
            placeholder="Longitude"
            keyboardType="decimal-pad"
            value={lng}
            onChangeText={setLng}
          />
        </View>
        <Text style={styles.label}>Choose Locality Pics</Text>
        <View style={styles.uploadBox}>
          <Pressable style={styles.uploadInner} onPress={() => pickImage(setLocalityPic)}>
            {localityPic ? (
              <Image source={{ uri: localityPic }} style={styles.uploadImage} />
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
        </View>


      <Text style={styles.label}>Choose PAN Front Pic</Text>

        <View style={styles.uploadBox}>
          <Pressable style={styles.uploadInner} onPress={() => pickImage(setRcPic)}>
            {rcPic ? (
              <Image source={{ uri: rcPic }} style={styles.uploadImage} />
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
        </View>
        <Text style={styles.label}>PAN No</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter PAN Number"
          autoCapitalize="characters"
          value={rcNo}
          onChangeText={setRcNo}
        />
            <Text style={styles.label}>DL Details</Text>
              <View style={styles.row}>
                <Pressable style={styles.uploadBox} onPress={() => pickImage(setDlFrontPic)}>
                  {dlFrontPic ? (
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
                    <Text>DL Pic Front</Text>
                    </View>
                  )}
                </Pressable>
                <Pressable style={styles.uploadBox} onPress={() => pickImage(setDlBackPic)}>
                  {dlBackPic ? (
                    <Image source={{ uri: dlBackPic }} style={styles.uploadImage} />
                  ) : (
                    <View style={styles.row}>
                    <Image
                    source={require('../../assets/png/aadhar.png')}
                    style={{
                        width:"50",
                        height:"50"
                    }}
                    />
                    <Text>DL Back Pic</Text>
                    </View>
                  )}
                </Pressable>
              </View>

        

        {/* Footer buttons */}
        <View style={styles.footerRow}>
          <Pressable style={[styles.footerBtn, styles.backBtn]} onPress={() => navigation?.goBack?.()}>
            <Text style={[styles.footerText, { color: Colors.secondary }]}>Back</Text>
          </Pressable>
          <Pressable style={[styles.footerBtn, styles.nextBtn]} onPress={onNext}>
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
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
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

  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 5},

  half: { flex: 1 },

  uploadBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 8,
  },
  uploadInner: { height: 72, alignItems: "center", justifyContent: "center", borderRadius: 8 },
  uploadContent: { alignItems: "center", justifyContent: "center" },
  uploadImage: { width: "100%", height: 72, borderRadius: 8 },

  footerRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 24, marginBottom: 8 },
  footerBtn: { flex: 1, height: 46, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  backBtn: { borderWidth: 1, borderColor: Colors.secondary, marginRight: 12, backgroundColor: "#fff" },
  nextBtn: { backgroundColor: Colors.secondary, marginLeft: 12 },
  footerText: { fontSize: 16, fontWeight: "600" },
});
