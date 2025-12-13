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
import { launchImageLibrary } from "react-native-image-picker";
import { useUpload } from "../../features/upload/useUpload";
import QRCodeScanner from 'react-native-qrcode-scanner';

export default function ProductAssignForm() {

      const { mutate, isPending, error, isError } = useProductAssign();

  const {params} = useRoute()
    const { mutate:upload} = useUpload()
  const [batteryId, setBatteryId] = useState("");
  const [chargerId, setChargerId] = useState("");

  const [BatteryhandoverDate, setBatteryHandoverDate] = useState(null);
  const [ChargerhandoverDate, setChargerHandoverDate] = useState(null);
  const [batteryPhoto,setBatteryPhoto] = useState(null)
  const [chargerPhoto,setChargerPhoto] = useState(null)
  const [emiStartDate, setEmiStartDate] = useState(null);
 

  const [batteryWarranty, setBatteryWarranty] = useState("");
  const [chargerWarranty, setChargerWarranty] = useState("");

  const [brandingMaterial, setBrandingMaterial] = useState<boolean | null>(true);



  const CustomQRCodeScanner = ({onSuccess,msg}:any)=>{
    return       <View style={{ height: 100,...styles.inputRowCard,marginHorizontal:20,marginVertical:20 }}>
      <QRCodeScanner
        onRead={onSuccess}
        showMarker={false}
        cameraStyle={{ height: "100%" }}
        containerStyle={{ flex: 1,marginLeft: -50 }}
          topContent={
          <Text style={styles.centerText}>
            {msg}
          </Text>
        }
      />
    </View>
  }

  const handleSubmit = () => {  
    console.log("Batter",BatteryhandoverDate.toUTCString())
    const formData = {
      leadId: params?.leadId,
      batteryId,
      chargerId,
      batteryPhoto,
      chargerPhoto,
      batteryHandoverDate:BatteryhandoverDate?.toUTCString(),
      chargerHandoverDate:ChargerhandoverDate?.toUTCString(),
      batteryWarrantyTenure: parseInt(batteryWarranty),
      chargerWarrantyTenure: parseInt(chargerWarranty),
      emiStartDate: emiStartDate?.toUTCString() || "",
      emiEndDate: "2027-10-31T00:00:00.000Z",
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

  const handlePic = async(field:string) =>{
 const result = await launchImageLibrary({ mediaType: "photo", quality: 1 });
    if (result.didCancel) return;
    const asset = result.assets?.[0];
    if (!asset?.uri) return;
        const file = {
          uri: asset.uri,
          name: asset.fileName || "photo.jpg",
          type: asset.type || "image/jpeg",
        };
        const payload = {
          ...file,
          category:field,
          appName:"employeeApp"
    
        }
          upload(payload, {
                  onSuccess: (res) => {Alert.alert('✅ Photo Updated Successfully!')
                    if(field === "battery"){
                      setBatteryPhoto(res.fileUrl)
                    }else{
                      setChargerPhoto(res.fileUrl)
                    }
                  },
                  onError: (err) => {
                    Alert.alert("Error",err.message)
                    console.log("Error",err)
                  }
                })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Product Assign" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* ---- Product IDs ---- */}
        <CustomQRCodeScanner msg="Scan the QR code for Vehicle ID"/>
        <View style={styles.card}>
          <TextInput placeholder="Vehicle ID" value="" style={styles.input} />
        </View>
            {batteryPhoto ? 
          <Image source={{uri:batteryPhoto}} style={{width:100,height:100}} /> : 
            <Pressable onPress={()=>handlePic('battery')}>
                      <View style={styles.uploadContent}>
                        <Image
                          source={require("../../assets/png/aadhar.png")}
                          style={{ width: 40, height: 40 }}
                        />
                        <Text style={{ marginTop: 6 }}>Vehicle Photo</Text>
                      </View>
                      </Pressable>
          }

        <CustomQRCodeScanner msg="Scan the QR code for Battery ID"/>
         <View style={styles.card}>
          <TextInput placeholder="Battery OEM ID" value="" style={styles.input} />
        </View>
              {batteryPhoto ? 
          <Image source={{uri:batteryPhoto}} style={{width:100,height:100}} /> : 
            <Pressable onPress={()=>handlePic('battery')}>
                      <View style={styles.uploadContent}>
                        <Image
                          source={require("../../assets/png/aadhar.png")}
                          style={{ width: 40, height: 40 }}
                        />
                        <Text style={{ marginTop: 6 }}>Battery Photo</Text>
                      </View>
                      </Pressable>
          }
                  <CustomQRCodeScanner msg="Scan the QR code for Charger ID"/>
         <View style={styles.card}>
          <TextInput placeholder="Charger OEM ID" value="" style={styles.input} />
        </View>
              {batteryPhoto ? 
          <Image source={{uri:batteryPhoto}} style={{width:100,height:100}} /> : 
            <Pressable onPress={()=>handlePic('battery')}>
                      <View style={styles.uploadContent}>
                        <Image
                          source={require("../../assets/png/aadhar.png")}
                          style={{ width: 40, height: 40 }}
                        />
                        <Text style={{ marginTop: 6 }}>Charger Photo</Text>
                      </View>
                      </Pressable>
          }
        <View style={styles.card}>
          {/* <InputWithIcon
            icon={require("../../assets/png/aadhar.png")}
            label="Scan Your Battery ID"
            value={batteryId}
            onChange={setBatteryId}
          />
          <InputWithIcon
            icon={require("../../assets/png/aadhar.png")}
            label="Charger ID"
            value={chargerId}
            onChange={setChargerId}
          /> */}
  

        {/* ---- Dates ---- */}
          <Text style={styles.label}>  handover Date</Text>
          <DateTimePicker
          value={BatteryhandoverDate || new Date()}
          display="default"
          mode="date"
          onChange={(event,date)=>{
              setBatteryHandoverDate(date)
          }}
          />
    
          <Text style={styles.label}>EMI Start Date</Text>
          <DateTimePicker
          value={ChargerhandoverDate || new Date()}
          display="default"
          mode="date"
          onChange={(event,date)=>setChargerHandoverDate(date)}
          />

            {/* {chargerPhoto ? 
          <Image source={{uri:chargerPhoto}} style={{width:100,height:100}} /> : 
                      <Pressable onPress={()=>handlePic('charger')}>
                      <View style={styles.uploadContent}>
                        <Image
                          source={require("../../assets/png/aadhar.png")}
                          style={{ width: 40, height: 40 }}
                        />
                        <Text style={{ marginTop: 6 }}>Charger Photo</Text>
                      </View>
                      </Pressable>
          }  */}
         <Text style={styles.label}>EMI End Date</Text>
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
  centerText:{
    fontSize: 15,
    fontWeight: "600",
    marginTop:8
  },
  iconImage: { 
    width: 24, 
    height: 24, 
    marginRight: 10, 
    resizeMode: "contain"
   },
  iconInput: { flex: 1, fontSize: 15, color: "#000" },
  fieldBox: { marginBottom: 12 },
  label: { fontSize: 13, color: "#666", marginBottom: 4,marginTop:5 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 18,
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
    uploadContent: { alignItems: "center", justifyContent: "center" },
});
