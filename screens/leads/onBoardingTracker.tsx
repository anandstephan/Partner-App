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
  // dropdowns
  const [paymentFrequency, setPaymentFrequency] = useState(null);
  const frequencyOptions = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Bi-Monthly (15 days)", value: "bi-monthly" },
  ];

  const [paymentMode, setPaymentMode] = useState(null);
  const paymentModes = [
    { label: "Cash", value: "cash" },
    { label: "Cheque", value: "cheque" },
    { label: "DD", value: "dd" },
    { label: "Credit Card", value: "credit_card" },
    { label: "Debit Card", value: "debit_card" },
    { label: "Google Pay", value: "gpay" },
    { label: "UPI", value: "upi" },
  ];

  const [couponAppliedOn, setCouponAppliedOn] = useState(null);
  const couponOptions = [
    { label: "Down Payment", value: "down" },
    { label: "EMI", value: "emi" },
  ];

  // text fields
  const [schemeName, setSchemeName] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [emiAmount, setEmiAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponValue, setCouponValue] = useState("");
  const [payableEmi, setPayableEmi] = useState("");
  const [digitalReceipt, setDigitalReceipt] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const onSubmit = () => {
    const payload = {
      paymentFrequency,
      schemeName,
      downPayment,
      loanAmount,
      emiAmount,
      tenure,
      paymentMode,
      couponAppliedOn,
      couponCode,
      couponValue,
      payableEmi,
      digitalReceipt,
      transactionId,
    };
    console.log("Form Data:", payload);
    // TODO: call API or navigate
    // navigation.navigate("SuccessScreen");
  };

  return (
    <>
      <Header title="Onboarding" />
      <ScrollView style={styles.container}>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>Onboarding</Text>
          <Text style={styles.stepText}>3/4</Text>
        </View>
        <View style={styles.line} />

        {/* Payment Frequency */}
        <Text style={styles.label}>Payment Frequency</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={frequencyOptions}
          labelField="label"
          valueField="value"
          placeholder="Select"
          value={paymentFrequency}
          onChange={(item) => setPaymentFrequency(item.value)}
        />

        <Text style={styles.label}>Scheme Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter scheme name"
          value={schemeName}
          onChangeText={setSchemeName}
        />

        <Text style={styles.label}>Down Payment</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter down payment"
          keyboardType="numeric"
          value={downPayment}
          onChangeText={setDownPayment}
        />

        <Text style={styles.label}>Loan Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter loan amount"
          keyboardType="numeric"
          value={loanAmount}
          onChangeText={setLoanAmount}
        />

        <Text style={styles.label}>EMI Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter EMI amount"
          keyboardType="numeric"
          value={emiAmount}
          onChangeText={setEmiAmount}
        />

        <Text style={styles.label}>Tenure</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter tenure (in months)"
          keyboardType="numeric"
          value={tenure}
          onChangeText={setTenure}
        />

        {/* Payment Mode */}
        <Text style={styles.label}>Payment Mode</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={paymentModes}
          labelField="label"
          valueField="value"
          placeholder="Select"
          value={paymentMode}
          onChange={(item) => setPaymentMode(item.value)}
        />

        {/* Coupon */}
        <Text style={styles.label}>Coupon Applied On</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={couponOptions}
          labelField="label"
          valueField="value"
          placeholder="Select"
          value={couponAppliedOn}
          onChange={(item) => setCouponAppliedOn(item.value)}
        />

        <Text style={styles.label}>Coupon Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter coupon code"
          value={couponCode}
          onChangeText={setCouponCode}
        />

        <Text style={styles.label}>Coupon Value</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter coupon value"
          keyboardType="numeric"
          value={couponValue}
          onChangeText={setCouponValue}
        />

        <Text style={styles.label}>Payable EMI (Per)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter payable EMI"
          keyboardType="numeric"
          value={payableEmi}
          onChangeText={setPayableEmi}
        />

        <Text style={styles.label}>Digital Receipt</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter receipt no."
          value={digitalReceipt}
          onChangeText={setDigitalReceipt}
        />

        <Text style={styles.label}>Transaction ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter transaction ID"
          value={transactionId}
          onChangeText={setTransactionId}
        />

        {/* Submit */}
        <Pressable style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.submitText}>Submit</Text>
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
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Android elevation
    elevation: 3,
  },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
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
  submitButton: {
    marginTop: 30,
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
