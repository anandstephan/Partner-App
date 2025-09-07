import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../commonComponents/Header";

const RequestAssets = () => {
  const [assetType, setAssetType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [partner, setPartner] = useState("");
  const [remarks, setRemarks] = useState("");

  return (
    <>
          <Header title="Request Asset"/>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}


        {/* Asset Type */}
        <View style={styles.card}>
          <Text style={styles.label}>Asset Type</Text>
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Select Type"
              value={assetType}
              style={styles.input}
              onChangeText={setAssetType}
            />
            <Ionicons name="chevron-down" size={18} color="#777" />
          </View>
        </View>

        {/* Quantity */}
        <View style={styles.card}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            placeholder="Enter Qty in numbers"
            keyboardType="numeric"
            value={quantity}
            style={styles.input}
            onChangeText={setQuantity}
          />
        </View>

        {/* Partner */}
        <View style={styles.card}>
          <Text style={styles.label}>Select Partner</Text>
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Search / Select Partner ID"
              value={partner}
              style={styles.input}
              onChangeText={setPartner}
            />
            <Ionicons name="chevron-down" size={18} color="#777" />
          </View>
        </View>

        {/* Remarks */}
        <View style={styles.card}>
          <Text style={styles.label}>Remarks (if Any)</Text>
          <TextInput
            placeholder="Enter your Remarks"
            value={remarks}
            style={[styles.input, { height: 80, textAlignVertical: "top" }]}
            multiline
            onChangeText={setRemarks}
          />
        </View>

        {/* Submit */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
      </>
  );
};

export default RequestAssets;

const styles = StyleSheet.create({
  
  scroll: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    flex: 1,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
