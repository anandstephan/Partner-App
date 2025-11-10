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
import { useProductAssign } from "../../features/productAssign/useProductAssign";
import { useRoute } from "@react-navigation/native";

export default function ProductAssignForm() {

      const { mutate, isPending, error, isError } = useProductAssign();

  const {params} = useRoute()
  const [batteryId, setBatteryId] = useState("343@");
  const [chargerId, setChargerId] = useState("87E");

  const [BatteryhandoverDate, setBatteryHandoverDate] = useState<Date | null>(null);
  const [ChargerhandoverDate, setChargerHandoverDate] = useState<Date | null>(null);
  const [emiStartDate, setEmiStartDate] = useState<Date | null>(null);
 

  const [batteryWarranty, setBatteryWarranty] = useState("");
  const [chargerWarranty, setChargerWarranty] = useState("");

  const [brandingMaterial, setBrandingMaterial] = useState<"Yes" | "No" | null>(null);


  const handleSubmit = () => {  
    const formData = {
      leadId: params?.leadId,
      batteryId,
      chargerId,
      batteryPhoto:"https://plus.unsplash.com/premium_photo-1672115680958-54438df0ab82?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnRhaW5zfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",
      chargerPhoto:"https://plus.unsplash.com/premium_photo-1672115680958-54438df0ab82?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnRhaW5zfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",
      batteryHandoverDate:BatteryhandoverDate || "",
      chargerHandoverDate:ChargerhandoverDate || "",
      batteryWarrantyTenure: batteryWarranty,
      chargerWarrantyTenure: chargerWarranty,
      emiStartDate: emiStartDate || "",
      brandingMaterial,
    };

    console.log("🧾 Form Data:", JSON.stringify(formData));

      mutate(formData,{
        onSuccess: (res) => {
          console.log(res)
          Alert.alert('✅ Product Assigned Successfully!')
          // navigation.navigate("kycForm3",newData);  
          // navigation.goBack()
        },
        onError: (err) => {
          Alert.alert("Error",err.message)
          console.log("Error",err)
        }
        
      });
    // Alert.alert("✅ Success", "Product assigned successfully!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Product Assign" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* ---- Product IDs ---- */}
        <View style={styles.card}>
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
          <Text style={styles.label}>Battery handover Date</Text>
          <DateTimePicker
          value={BatteryhandoverDate || new Date()}
          display="default"
          mode="date"
          onChange={(event,date)=>{
              setBatteryHandoverDate(date)
          }}
          />
          <Text style={styles.label}>Charger handover Date</Text>
          <DateTimePicker
          value={ChargerhandoverDate || new Date()}
          display="default"
          mode="date"
          onChange={(event,date)=>setChargerHandoverDate(date)}
          />
         <Text style={styles.label}>EMI Date</Text>
          <DateTimePicker
          value={emiStartDate || new Date()}
          display="default"
          mode="date"
          onChange={(event,date)=>setEmiStartDate(date)}
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
      

     

        {/* ---- Submit Button ---- */}
        <Pressable style={({ pressed }) => [styles.submitBtn, pressed && { opacity: 0.8 }]} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>

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
  <Pressable onPress={() => onChange("AB#45")}>
  <View style={styles.inputRowCard} >
  
    {value.length!==0 ?  <Text>{value}</Text>:
    <>
    <Image source={icon} style={styles.iconImage} />
    <Text style={styles.iconInput}>
      {label}
      </Text>
      </>
      }
  </View>
  </Pressable>
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
