import React, { useState } from "react";
import { View, Text, Modal, Pressable, TextInput, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const paymentModes = [
  { label: "Company QR", value: "company_qr" },
  { label: "Cash", value: "cash" },
  { label: "Cheque", value: "cheque" },
  { label: "DD", value: "dd" },
  { label: "Credit Card", value: "credit_card" },
  { label: "Debit Card", value: "debit_card" },
  { label: "QR Code", value: "qr_code" },
  { label: "UPI", value: "upi" },
];

export default function EmiModal({ visible, onClose }) {
  const [fullAmount, setFullAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState(false);
  const [amount, setAmount] = useState("5000");
  const [paymentMode, setPaymentMode] = useState(null);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.modalBox}>

          {/* Close Button */}
          <Pressable style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>

          <Text style={styles.heading}>Emi Amount</Text>

          {/* Full & Custom Amount */}
          <View style={styles.row}>
            <Pressable
              style={styles.optionRow}
              onPress={() => {
                setFullAmount(true);
                setCustomAmount(false);
                setAmount("5000");
              }}
            >
              <View style={styles.checkbox(fullAmount)} />
              <Text>Full Amount</Text>
            </Pressable>

            <Pressable
              style={styles.optionRow}
              onPress={() => {
                setCustomAmount(true);
                setFullAmount(false);
                setAmount("");
              }}
            >
              <View style={styles.checkbox(customAmount)} />
              <Text>Custom Amount</Text>
            </Pressable>
          </View>

          {/* Amount Box */}
          <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:'center',width:'50%',marginHorizontal:10,rowGap:10}}>
          <View style={styles.amountBox}>
            <Text style={styles.rsText}>Rs</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              placeholder="Enter Amount"
              placeholderTextColor="#888"
              keyboardType="numeric"
              onChangeText={setAmount}
            />
            </View>
                    <View style={styles.amountBox}>
            <Text style={styles.rsText}>Rs</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              placeholder="Enter Amount"
              placeholderTextColor="#888"
              keyboardType="numeric"
              onChangeText={setAmount}
            />
            </View>
          </View>

          <Text style={styles.subHeading}>Select Payment Mode</Text>

          {/* Dropdown */}
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedText}
            itemTextStyle={styles.itemText}
            activeColor="#E7F4FF"
            data={paymentModes}
            labelField="label"
            valueField="value"
            placeholder="Payment Mode"
            value={paymentMode}
            onChange={(item) => setPaymentMode(item.value)}
          />

          <Pressable style={styles.payBtn}>
            <Text style={styles.payBtnText}>Pay Now</Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 18,
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    elevation: 10,
  },
  closeBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 10,
  },
  closeIcon: {
    fontSize: 22,
  },
  heading: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    gap: 30,
    marginVertical: 15,
  },
  optionRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  checkbox: (checked) => ({
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: "#000",
    backgroundColor: checked ? "#000" : "#fff",
  }),
  amountBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C8C8C8",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  rsText: {
    fontWeight: "700",
    marginRight: 10,
  },
  amountInput: {
    flex: 1,
    fontSize: 16,
  },
  subHeading: {
    marginTop: 20,
    fontWeight: "600",
    marginBottom: 6,
  },

  /** Dropdown Styling */
  dropdown: {
    borderWidth: 1,
    borderColor: "#45AEEF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dropdownContainer: {
    borderRadius: 10,
    padding: 5,
    elevation: 8,
    backgroundColor: "white",
  },
  placeholderStyle: {
    color: "#888",
    fontSize: 15,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemText: {
    fontSize: 15,
  },

  payBtn: {
    marginTop: 25,
    backgroundColor: "#08979D",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  payBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
