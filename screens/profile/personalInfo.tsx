import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Header from "../../commonComponents/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { useUpdateUser } from "../../features/user/useUser";

export default function PersonalInformation() {
const route = useRoute();
const data = route?.params?.data || {};  // SAFE
const {mutate} = useUpdateUser()


  // ---------- USER STATE ----------
  const [user, setUser] = useState({
    name: data?.name,
    empId: "DVI1149",
    contact: "+91" + data?.mobile,
    address: data?.address,
    city: data?.cityId?.name,
    state: data?.stateId?.name,
  });

  // ---------- FIELD COMPONENT ----------
  const Field = ({ label, value, fieldName }) => (
    <View style={styles.fieldBox}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.valueContainer}>
        <TextInput
          style={styles.value}
          value={value}
          onChangeText={(text) =>
            setUser((prev) => ({ ...prev, [fieldName]: text }))
          }
      
        />

        <Pressable>
          <Icon name="check-circle" size={16} color="#9E9E9E" />
        </Pressable>
      </View>
    </View>
  );

  // ---------- MAIN UI ----------
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Personal Information" />

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.card}>


          <View style={{ marginTop: "20%" }}>
            <Field label="Employee Name" value={user.name} fieldName="name" />
            <Field label="Emp ID" value={user.empId} fieldName="empId" />
            <Field
              label="Contact Number"
              value={user.contact}
              fieldName="contact"
            />
            <Field
              label="Address"
              value={user.address}
              fieldName="address"
            />
            <Field label="City" value={user.city} fieldName="city" />
            <Field label="State" value={user.state} fieldName="state" />
          </View>

          <Pressable onPress={()=>{
            mutate(user,{
              onSuccess: (res) => {
                console.log("res",res)
                Alert.alert('✅ Profile Updated Successfully!',res)
                // navigation.goBack()
              },
              onError:(err)=>{
                console.log("Error",err)
              }
            })
          }}>
            <View style={styles.updateBtn}>
              <Text>Update</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------- STYLES ----------
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
    backgroundColor: "#D9D9D9",
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
    borderBottomWidth: 1,
    borderColor: "gray",
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
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  value: {
    fontSize: 15,
    color: "#000",
    fontWeight: "500",
    flexShrink: 1,
  },
  updateBtn: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 20,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
  },
});
