import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
Pressable,
TextInput
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Header from "../../commonComponents/Header";
import Colors from "../../constants/color"; // adjust path if needed
import { SafeAreaView } from "react-native-safe-area-context";

export default function PersonalInformation() {
  const user = {
    name: "Vishu Kumar",
    empId: "DVI1149",
    contact: "+91 9758687820",
    address: "H.no 52 Royal Street, Sector 14 - Gurgaon",
    city: "Delhi",
    state: "New Delhi",
  };

  const Field = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.fieldBox}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueContainer}>
        <TextInput style={styles.value} value={value}/>
        <Pressable>
          <Icon name="check-circle" size={16} color="#9E9E9E" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Personal Information" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.card}>
            <View style={{marginTop:"20%"}}>
          <Field label="Employee Name" value={user.name} />
          <Field label="Emp ID" value={user.empId} />
          <Field label="Contact Number" value={user.contact} />
          <Field label="Address" value={user.address} />
          <Field label="City" value={user.city} />
          <Field label="State" value={user.state} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  card: {
    backgroundColor: "#D9D9D9", // light gray container like in figma
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  fieldBox: {
    marginBottom: 12,
    borderBottomWidth:1,
    borderColor:"gray"
  },
  label: {
    fontSize: 13,
    color: "#888",
    marginBottom: 4,
  },
  valueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  value: {
    fontSize: 15,
    color: "#000",
    fontWeight: "500",
    flexShrink: 1,
  },
});
