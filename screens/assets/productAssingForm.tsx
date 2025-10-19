import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
  Alert,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ replaced SafeAreaView
import Header from "../../commonComponents/Header";

export default function ProductAssignForm() {
  const [rickshawId, setRickshawId] = useState("");
  const [batteryId, setBatteryId] = useState("");
  const [chargerId, setChargerId] = useState("");

  const [handoverDate, setHandoverDate] = useState<Date | null>(null);
  const [emiStartDate, setEmiStartDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState<{ type: string; visible: boolean }>({
    type: "",
    visible: false,
  });

  const [batteryWarranty, setBatteryWarranty] = useState("");
  const [chargerWarranty, setChargerWarranty] = useState("");

  const [cardHandover, setCardHandover] = useState<"Yes" | "No" | null>(null);
  const [brandingMaterial, setBrandingMaterial] = useState<"Yes" | "No" | null>(null);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      if (showPicker.type === "handover") setHandoverDate(selectedDate);
      else if (showPicker.type === "emi") setEmiStartDate(selectedDate);
    }
    setShowPicker({ type: "", visible: false });
  };

  const handleSubmit = () => {
    if (!rickshawId || !batteryId || !chargerId) {
      Alert.alert("Incomplete", "Please fill all product IDs before submitting.");
      return;
    }

    const formData = {
      rickshawId,
      batteryId,
      chargerId,
      handoverDate: handoverDate?.toDateString() || "",
      emiStartDate: emiStartDate?.toDateString() || "",
      batteryWarranty,
      chargerWarranty,
      cardHandover,
      brandingMaterial,
    };

    console.log("🧾 Form Data:", formData);
    Alert.alert("✅ Success", "Product assigned successfully!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Product Assign" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* ---- Product IDs ---- */}
        <View style={styles.card}>
          <InputWithIcon
            icon={require("../../assets/png/aadhar.png")}
            label="E-Rickshaw ID"
            value={rickshawId}
            onChange={setRickshawId}
          />
          <InputWithIcon
            icon={require("../../assets/png/aadhar.png")}
            label="Battery ID"
            value={batteryId}
            onChange={setBatteryId}
          />
          <InputWithIcon
            icon={require("../../assets/png/aadhar.png")}
            label="Charger ID"
            value={chargerId}
            onChange={setChargerId}
          />
  

        {/* ---- Dates ---- */}
          <DateField
            label="Assets Handover Date"
            value={handoverDate}
            onPress={() => setShowPicker({ type: "handover", visible: true })}
          />
          <DateField
            label="EMI Start Date"
            value={emiStartDate}
            onPress={() => setShowPicker({ type: "emi", visible: true })}
          />

        {/* ---- Warranty ---- */}
          <InputField
            label="Battery Warranty Tenure"
            value={batteryWarranty}
            onChange={setBatteryWarranty}
          />
          <InputField
            label="Charger Warranty Tenure"
            value={chargerWarranty}
            onChange={setChargerWarranty}
          />
      

        {/* ---- Radio Options ---- */}
          <RadioGroup
            label="Physical Warranty Card Handover"
            selected={cardHandover}
            onSelect={setCardHandover}
          />
          <RadioGroup
            label="Branding Material"
            selected={brandingMaterial}
            onSelect={setBrandingMaterial}
          />
     

        {/* ---- Submit Button ---- */}
        <Pressable style={({ pressed }) => [styles.submitBtn, pressed && { opacity: 0.8 }]} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>

        {showPicker.visible && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={handleDateChange}
          />
        )}
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

/* ---------- Sub Components ---------- */

const InputWithIcon = ({
  icon,
  label,
  value,
  onChange,
}: {
  icon: any;
  label: string;
  value: string;
  onChange: (t: string) => void;
}) => (
  <View style={styles.inputRowCard}>
  
    <Image source={icon} style={styles.iconImage} />
    <Text style={styles.iconInput}>
      {label}
      </Text>
  </View>
);

const InputField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (t: string) => void;
}) => (
  <View style={styles.fieldBox}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={label}
      style={styles.input}
      placeholderTextColor="#999"
    />
  </View>
);

const DateField = ({
  label,
  value,
  onPress,
}: {
  label: string;
  value: Date | null;
  onPress: () => void;
}) => (
  <Pressable onPress={onPress} style={styles.fieldBox}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputRow}>
      <Text style={styles.inputText}>
        {value ? value.toDateString() : "Select Date"}
      </Text>
      <Icon name="calendar" size={18} color="#888" />
    </View>
  </Pressable>
);

const RadioGroup = ({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: string | null;
  onSelect: (v: "Yes" | "No") => void;
}) => (
  <View style={{ marginBottom: 10 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.radioRow}>
      {["Yes", "No"].map((opt) => (
        <Pressable
          key={opt}
          style={({ pressed }) => [styles.radioBtn, pressed && { opacity: 0.7 }]}
          onPress={() => onSelect(opt as "Yes" | "No")}
        >
          <View
            style={[
              styles.radioOuter,
              selected === opt && { borderColor: "#1E824C" },
            ]}
          >
            {selected === opt && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.radioText}>{opt}</Text>
        </Pressable>
      ))}
    </View>
  </View>
);

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { padding: 20, paddingBottom: 60 },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,

  },
  inputRowCard: {
    flexDirection: "row",
    justifyContent:'center',
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,


  },
  iconImage: { 
    width: 24, 
    height: 24, 
    marginRight: 10, 
    resizeMode: "contain"
   },
  iconInput: { flex: 1, fontSize: 15, color: "#000" },
  fieldBox: { marginBottom: 12 },
  label: { fontSize: 13, color: "#666", marginBottom: 4 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 15,
    color: "#000",
    borderWidth: 0.4,
    borderColor: "#ddd",
  },
  inputRow: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.4,
    borderColor: "#ddd",
  },
  inputText: { color: "#000", fontSize: 15 },
  radioRow: { flexDirection: "row", marginTop: 6 },
  radioBtn: { flexDirection: "row", alignItems: "center", marginRight: 20 },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "#999",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#1E824C" },
  radioText: { fontSize: 14, color: "#333" },
  submitBtn: {
    backgroundColor: "#5DC5E1",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
