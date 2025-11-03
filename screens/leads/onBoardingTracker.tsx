import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "../../constants/color";
import Header from "../../commonComponents/Header";

export default function OnboardingTracker() {
  const [paymentFrequency, setPaymentFrequency] = useState(null);
  const [paymentMode, setPaymentMode] = useState(null);
  const [couponAppliedOn, setCouponAppliedOn] = useState(null);

  const frequencyOptions = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Bi-Monthly (15 days)", value: "bi-monthly" },
  ];
  const paymentModes = [
    { label: "Cash", value: "cash" },
    { label: "Cheque", value: "cheque" },
    { label: "DD", value: "dd" },
    { label: "Credit Card", value: "credit_card" },
    { label: "Debit Card", value: "debit_card" },
    { label: "Google Pay", value: "gpay" },
    { label: "UPI", value: "upi" },
  ];
  const couponOptions = [
    { label: "Down Payment", value: "down" },
    { label: "EMI", value: "emi" },
  ];

  const [form, setForm] = useState({
    schemeName: "",
    downPayment: "",
    loanAmount: "",
    emiAmount: "",
    tenure: "",
    couponCode: "",
    couponValue: "",
  });
  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  const submit = () => {
    console.log({
      ...form,
      paymentFrequency,
      paymentMode,
      couponAppliedOn,
    });
  };

  return (
    <>
      <Header title="Onboarding" />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.heading}>Onboarding</Text>
            <Text style={styles.step}>3/4</Text>
          </View>
          <View style={styles.blueLine} />

          <Text style={[styles.label,{
             borderBottomWidth: 1,
    borderRightWidth:0.5,
    borderLeftWidth:0.4,
    borderColor: "#E1E1E1",
    marginHorizontal:10,

          }]}>Payment Frequency</Text>
          {/* <Dropdown
            style={styles.input}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.value}
            data={frequencyOptions}
            labelField="label"
            valueField="value"
            placeholder="Select"
            value={paymentFrequency}
            onChange={(i) => setPaymentFrequency(i.value)}
          /> */}

          {/* <Text style={styles.label}>Scheme Name</Text> */}
          <TextInput
            style={styles.input}
            placeholder="Enter scheme name"
            value={form.schemeName}
            onChangeText={(t) => update("schemeName", t)}
          />

          {/* <Text style={styles.label}>Down Payment</Text> */}
          <TextInput
            style={styles.input}
            placeholder="Enter down payment"
            keyboardType="numeric"
            value={form.downPayment}
            onChangeText={(t) => update("downPayment", t)}
          />

          {/* <Text style={styles.label}>Loan Amount</Text> */}
          <TextInput
            style={styles.input}
            placeholder="Enter loan amount"
            keyboardType="numeric"
            value={form.loanAmount}
            onChangeText={(t) => update("loanAmount", t)}
          />

          {/* <Text style={styles.label}>EMI Amount</Text> */}
          <TextInput
            style={styles.input}
            placeholder="Enter EMI amount"
            keyboardType="numeric"
            value={form.emiAmount}
            onChangeText={(t) => update("emiAmount", t)}
          />

          {/* <Text style={styles.label}>Tenure</Text> */}
          <TextInput
            style={styles.input}
            placeholder="Enter tenure (in months)"
            keyboardType="numeric"
            value={form.tenure}
            onChangeText={(t) => update("tenure", t)}
          />

          <Text style={styles.label}>Payment Mode</Text>
          {/* <Dropdown
            style={styles.input}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.value}
            data={paymentModes}
            labelField="label"
            valueField="value"
            placeholder="Select"
            value={paymentMode}
            onChange={(i) => setPaymentMode(i.value)}
          />

          {/* <Text style={styles.label}>Coupon Applied On</Text> */}
          <Dropdown
            style={styles.input}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.value}
            data={couponOptions}
            labelField="label"
            valueField="value"
            placeholder="Select"
            value={couponAppliedOn}
            onChange={(i) => setCouponAppliedOn(i.value)}
          /> 

          {/* <Text style={styles.label}>Coupon Code</Text> */}
          <TextInput
            style={styles.input}
            placeholder="Enter coupon code"
            value={form.couponCode}
            onChangeText={(t) => update("couponCode", t)}
          />

          {/* <Text style={styles.label}>Coupon Value</Text> */}
          <TextInput
            style={styles.input}
            placeholder="Enter coupon value"
            keyboardType="numeric"
            value={form.couponValue}
            onChangeText={(t) => update("couponValue", t)}
          />

            <TextInput
            style={styles.input}
            placeholder="Payable DP Final"
            keyboardType="numeric"
            value={form.couponValue}
            onChangeText={(t) => update("couponValue", t)}
          />
            <TextInput
            style={styles.input}
            placeholder="Payable EMI Final"
            keyboardType="numeric"
            value={form.couponValue}
            onChangeText={(t) => update("couponValue", t)}
          />

     <TextInput
            style={styles.input}
            placeholder="Digital Recipet"
            keyboardType="numeric"
            value={form.couponValue}
            onChangeText={(t) => update("couponValue", t)}
          />
     <TextInput
            style={styles.input}
            placeholder="Transaction ID"
            keyboardType="numeric"
            value={form.couponValue}
            onChangeText={(t) => update("couponValue", t)}
          />

          <Pressable style={styles.btn} onPress={submit}>
            <Text style={styles.btnText}>Submit</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F2"},

  section: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    // borderWidth:2,
    marginHorizontal:20
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: { fontSize: 18, fontWeight: "600", color: "#000" },
  step: { fontSize: 14, color: "#0D69C4", fontWeight: "500" },
  blueLine: {
    height: 1,
    backgroundColor: "#0D69C4",
    marginTop: 4,
    marginBottom: 8,
  },

  label: {
    marginTop: 14,
    marginBottom: 2,
    color: "#222",
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    height: 44,
    borderBottomWidth: 1,
    borderRightWidth:0.5,
    borderLeftWidth:0.4,
    borderRadius: 2,
    borderColor: "#E1E1E1",
    justifyContent: "center",
    fontSize: 14,
    marginHorizontal:10,
    marginVertical:10,
     shadowColor: "#000",          // iOS shadow color
  shadowOffset: { width: 0, height: 2 }, // small downward shadow
  shadowOpacity: 0.1,           // light, subtle shadow
  shadowRadius: 4,              // blur
  elevation: 3,  
  },
  placeholder: { color: "#999", fontSize: 14 },
  value: { color: "#000", fontSize: 14 },

  btn: {
    backgroundColor: "#0D69C4",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 30,
  },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
