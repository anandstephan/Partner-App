  import React, { useEffect, useState } from "react";
  import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Pressable,
    Image,
    Alert,
    Platform,
    PermissionsAndroid,
  } from "react-native";
  import { Dropdown } from "react-native-element-dropdown";
  import { launchCamera, launchImageLibrary } from "react-native-image-picker";
  import Icon from "react-native-vector-icons/FontAwesome";
  import Colors from "../../constants/color";
  import Header from "../../commonComponents/Header";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import { AudioRecorder } from "../../utilites/AudioRecorder";
  import useLocation from "../../hooks/useLocation";
  import { useKyc1 } from "../../features/kyc/useKyc";
  import { useUpload, useUploadMultiple } from "../../features/upload/useUpload";
  import Entypo from 'react-native-vector-icons/Entypo';
  import { useOcr } from "../../features/ocr/useOcr";

  export default function KycForm2() {
    const navigation = useNavigation();
    const location = useLocation()
        const { mutate:upload} = useUpload()
        const {mutate:uploadMultiple} = useUploadMultiple()
              const {mutate:OcrUpload} = useOcr()
      const {params} = useRoute()
  
    // ✅ Single form state
    const [formData, setFormData] = useState({
      houseOwnership: null,
      rentAgreementOrNOC: "",
      electricityBill: "",
      waterBill:"55",
      panNo: "",
      lat: "",
      lng: "",
      dlFrontPhoto: null,
      dlBackPhoto: null,
      panFrontPhoto: null,
      housePhoto: null,
      localityPhotos: null,
      selfieWithDriver: null,
    });

    const [panPic,setPanPic] = useState(null)

    const { mutate } = useKyc1();

    // ✅ Universal update function
    const updateFormData = (field: string, value: any) => {
      if(field === "housePhoto" || field === 'localityPhotos'){
      
        setFormData((prev) => ({ ...prev, [field]: value}));
        // return
      }
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Dropdown options
    const ownershipOptions = [
      { label: "Owned", value: "owned" },
      { label: "Rented", value: "rented" },
      { label: "Family", value: "family" },
      { label: "Others", value: "other" },
    ];


    const requestCameraPermission = async () => {
      if (Platform.OS !== "android") return true;
    
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "Camera permission is required to take photos",
          buttonPositive: "OK",
        }
      );
    
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    };
    

    // ✅ Universal image picker
    const handleSelectImage = async (field: string) => {
        //    const hasPermission = await requestCameraPermission();
        // if (!hasPermission) {
        //   Alert.alert("Permission required", "Camera permission denied");
        //   return;
        // }
      const result = await launchImageLibrary({ mediaType: "photo", quality: 0.2 });
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

      if(field === 'panFrontPhoto'){
        setPanPic(file)
      }
      

        upload(payload, {
                onSuccess: (res) => {
                  // Alert.alert('✅ Photo Updated Successfully!')
                  updateFormData(field,res.fileUrl)
                },
                onError: (err) => {
                  Alert.alert("Error",err.message)
                  console.log("Error",err)
                }
              })
    };

  const handleSelectMultipleImage = async (field: string) => {
    const result = await launchImageLibrary({
      selectionLimit: 5,
      mediaType: "photo",
      quality: 1,
    });

    if (result.didCancel) return;
    if (!result.assets || result.assets.length === 0) return;

    // Convert each asset → file object
    const files = result.assets.map(asset => ({
      uri: asset.uri,
      name: asset.fileName || "photo.jpg",
      type: asset.type || "image/jpeg",
      category: field,
      appName: "employeeApp",
    }));



    // 🔥 MULTIPLE UPLOAD HERE
    uploadMultiple(files, {
      onSuccess: (res) => {
        console.log("backendResMUltipilePic",res)
        // If backend returns array of URLs
        updateFormData(field, res.files[0].fileUrl);
      },
      onError: (err) => {
        Alert.alert("Upload Error", err.message);
        console.log(err);
      },
    });
  };

    const onNext = () => {
      try {
      console.log("✅ Form Data:", formData);
      const newData = {
        ...formData,
        ...params
      }

      newData['latLng'] = {
      "lat": 28.7041,
      "lng": 77.1025
    }
      delete newData.lat;
      delete newData.lng;
      newData['localityPhotos'] = [newData['localityPhotos']]
          console.log("new",JSON.stringify(newData))
            //  navigation.navigate("kycForm3",newData);  
          // return;
      mutate(newData,
                {
                      onSuccess: (res) => {
                        console.log("resofkyc1",res.data._id)
                        Alert.alert('✅ KYC Created Successfully!')
                        newData['kycId'] = res.data._id
                        navigation.navigate("kycForm3",newData);  
                        // navigation.goBack()
                      },
                      onError: (err) => {
                        Alert.alert("Error",err.message)
                        console.log("Error",err)
                      }
                    }
      )
      
      } catch (error) {
        console.log("Error",error)
      }

    };

      useEffect(()=>{
        if(panPic!==null ){
          const front = panPic
          const back = panPic
          const payload = {
            front,
            back,
            docType:"pan"
          }
          OcrUpload(payload, {
                  onSuccess: (res) => {
                    // updateFormData(field,res.fileUrl)
                    console.log("===",res)
                    setFormData(prev => (
                      { ...prev, 
                      ['panNo']: res.data?.docNumber, 
                
                    }))
                  },
                  onError: (err) => {
                    Alert.alert("Error",err.message)
                    console.log("Error",err)
                  }
                })
        }




      },[panPic])
    


    return (
      <>
        <Header title="KYC Verification" />
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
          {/* Top title row */}
          {/* <Text>{JSON.stringify(formData)}</Text> */}
          <View style={styles.headerRow}>
            <Text style={styles.title}>Address</Text>
            <Text style={styles.stepText}>2/5</Text>
          </View>
          <View style={styles.line} />

          {/* Permanent Address */}
        
          <AudioRecorder/>
          {/* houseOwnership Dropdown */}
          <Text style={styles.label}>House Ownership</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={ownershipOptions}
            labelField="label"
            valueField="value"
            placeholder="Select"
            value={formData.houseOwnership}
            onChange={(item) => updateFormData("houseOwnership", item.value)}
          />

          {/* NOC Documentation */}
              <Text style={styles.label}>NOC Documentation</Text>
          <View style={styles.iconInputRow}>

        
            <Pressable
            style={[styles.uploadBox,{width:"100%"}]}
            onPress={() => handleSelectImage("rentAgreementOrNOC")}>
            {formData.rentAgreementOrNOC ? (
              <>
              <Image source={{ uri: formData.rentAgreementOrNOC }} style={styles.uploadImage} />
                <Pressable style={{zIndex:2, position:'absolute',left:'90%',top:0}} onPress={()=>{
                            setFormData({...formData,'rentAgreementOrNOC':null})
                          }}>
                          <Entypo name="cross" size={30} color="#000" />
                          </Pressable>
              </>
            ) : (
              <View style={styles.uploadContent}>
                <Image
                  source={require("../../assets/png/aadhar.png")}
                  style={{ width: 40, height: 40 }}
                />
                <Text style={{ marginTop: 6 }}>NOC Documentation</Text>
              </View>
            )}
          </Pressable>
          </View>

          {/* Bill */}
          <Text style={styles.label}>Electricity and Water Bill</Text>
        

            <View style={styles.iconInputRow}>
            <Pressable
            style={[styles.uploadBox,{width:"100%"}]}
            onPress={() => {
              handleSelectImage("electricityBill")
              // handleSelectImage("waterBill")
            }}>
            {formData.electricityBill ? (
              <>
              <Image source={{ uri: formData.electricityBill }} style={styles.uploadImage} />
                <Pressable style={{zIndex:2, position:'absolute',left:'90%',top:0}} onPress={()=>{
                            setFormData({...formData,'electricityBill':null})
                          }}>
                          <Entypo name="cross" size={30} color="#000" />
                          </Pressable>
              </>
            ) : (
              <View style={styles.uploadContent}>
                <Image
                  source={require("../../assets/png/aadhar.png")}
                  style={{ width: 40, height: 40 }}
                />
                <Text style={{ marginTop: 6 }}>Electricity/Water Bill</Text>
              </View>
            )}
          </Pressable>
          </View>
        
          {/* House Pic */}
          <Text style={styles.label}>Choose House Pic</Text>
          <Pressable
            style={styles.uploadBox}
            onPress={() => handleSelectMultipleImage("housePhoto")}
          >
            {formData.housePhoto ? (
              <>
              <Image source={{ uri: formData.housePhoto }} style={styles.uploadImage} />
                <Pressable style={{zIndex:2, position:'absolute',left:'90%',top:0}} onPress={()=>{
                            setFormData({...formData,'housePhoto':null})
                          }}>
                          <Entypo name="cross" size={30} color="#000" />
                          </Pressable>
              </>
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

          {/* selfieWithDriver with Customer */}
          <Text style={styles.label}>Selfie with Driver</Text>
          <Pressable
            style={styles.uploadBox}
            onPress={() => handleSelectImage("selfieWithDriver")}
          >
            {formData.selfieWithDriver ? (
              <>
              
              <Image source={{ uri: formData.selfieWithDriver }} style={styles.uploadImage} />
                      <Pressable style={{zIndex:2, position:'absolute',left:'90%',top:0}} onPress={()=>{
                            setFormData({...formData,'selfieWithDriver':null})
                          }}>
                          <Entypo name="cross" size={30} color="#000" />
                          </Pressable>
              </>
            ) : (
              <View style={styles.uploadContent}>
                <Image
                  source={require("../../assets/png/aadhar.png")}
                  style={{ width: 40, height: 40 }}
                />
                <Text style={{ marginTop: 6 }}>Selfie With Driver</Text>
              </View>
            )}
          </Pressable>

          {/* Location */}
          <Pressable onPress={()=>{
          // console.log(location)
          location.fetchLocation()
            // setFormData({...formData,lat:location.lat,lng:location.lng})
            // setFormData({...formData,lat:"28.51768627084503",lng:"77.19762830234326"})
          }}>
          <Text style={[styles.label,styles.btn]}>Get a Location</Text>
          </Pressable>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.half]}
              placeholder="Latitude"
              keyboardType="decimal-pad"
              value={formData.lat}
              onChangeText={(v) => updateFormData("lat", location.lat)}
              editable={false}
            />
            <TextInput
              style={[styles.input, styles.half]}
              placeholder="Longitude"
              keyboardType="decimal-pad"
              value={formData.lng}
              onChangeText={(v) => updateFormData("lng", location.lng)}
              editable={false}
            />
          </View>

          {/* Locality Pic */}
          <Text style={styles.label}>Choose Locality Pic</Text>
          <Pressable
            style={styles.uploadBox}
            onPress={() => handleSelectMultipleImage("localityPhotos")}
          >
            {formData.localityPhotos ? (
              <>
              
              <Image source={{ uri: formData.localityPhotos }} style={styles.uploadImage} />
                    <Pressable style={{zIndex:2, position:'absolute',left:'90%',top:0}} onPress={()=>{
                            setFormData({...formData,'localityPhotos':null})
                          }}>
                          <Entypo name="cross" size={30} color="#000" />
                          </Pressable>
              </>
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

          {/* PAN Front */}
          <Text style={styles.label}>Choose PAN Front Pic</Text>
          <Pressable
            style={styles.uploadBox}
            onPress={() => handleSelectImage("panFrontPhoto")}
          >
            {formData.panFrontPhoto ? (
              <>
              <Image source={{ uri: formData.panFrontPhoto }} style={styles.uploadImage} />      
                    <Pressable style={{zIndex:2, position:'absolute',left:'90%',top:0}} onPress={()=>{
                            setFormData({...formData,'panFrontPhoto':null})
                          }}>
                          <Entypo name="cross" size={30} color="#000" />
                          </Pressable>      
              </>

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

          <Text style={styles.label}>PAN No</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter PAN Number"
            autoCapitalize="characters"
            value={formData.panNo}
            onChangeText={(v) => updateFormData("panNo", v)}
            editable={false}
          />

          {/* DL Details */}
          <Text style={styles.label}>DL Details</Text>
          <View style={styles.row}>
            <Pressable
              style={styles.uploadBox}
              onPress={() => handleSelectImage("dlFrontPhoto")}
            >
              {formData.dlFrontPhoto ? (
                <>
                <Image 
                source={{ uri: formData.dlFrontPhoto }} 
                style={[styles.uploadImage,{width:100}]} />
                <Pressable 
                style={{zIndex:2, position:'absolute',left:'90%',top:0}} 
                onPress={()=>{
                  setFormData({...formData,'dlFrontPhoto':null})
                }}>
                <Entypo name="cross" size={30} color="#000" />
                </Pressable>  
                </>
              ) : (
                <View style={styles.row}>
                  <Image
                    source={require("../../assets/png/aadhar.png")}
                    style={{ width:50, height: 50 }}
                  />
                  <Text>DL Front</Text>
                </View>
              )}
            </Pressable>

            <Pressable
              style={styles.uploadBox}
              onPress={() => handleSelectImage("dlBackPhoto")}
            >
              {formData.dlBackPhoto ? (
                <>
                    <Pressable style={{zIndex:2, position:'absolute',left:'90%',top:0}} onPress={()=>{
                            setFormData({...formData,'dlBackPhoto':null})
                          }}>
                          <Entypo name="cross" size={30} color="#000" />
                          </Pressable>  
                
                <Image source={{ uri: formData.dlBackPhoto }} style={[styles.uploadImage,{width:100}]}/>
                </>
              ) : (
                <View style={styles.row}>
                  <Image
                    source={require("../../assets/png/aadhar.png")}
                    style={{ width: 50, height: 50 }}
                  />
                  <Text>DL Back</Text>
                </View>
              )}
            </Pressable>
          </View>

          {/* Footer */}
          <View style={styles.footerRow}>
            <Pressable
              style={[styles.footerBtn, styles.backBtn]}
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.footerText, { color: Colors.secondary }]}>Back</Text>
            </Pressable>
            <Pressable
              style={[styles.footerBtn, styles.nextBtn]}
              onPress={onNext}
            >
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
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
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
    btn:{
      backgroundColor:Colors.secondary,
      padding:10,
      borderRadius:8,
      width:150
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
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 5,
    },
    half: { flex: 1 },
    uploadBox: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      marginTop: 8,
    },
    uploadContent: { alignItems: "center", justifyContent: "center" },
    uploadImage: { width: "100%", height: 72, borderRadius: 8 },
    iconInputRow: { flexDirection: "row", alignItems: "center", gap: 10 },
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
    footerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
      marginBottom: 8,
    },
    footerBtn: {
      flex: 1,
      height: 46,
      borderRadius: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    backBtn: {
      borderWidth: 1,
      borderColor: Colors.secondary,
      marginRight: 12,
      backgroundColor: "#fff",
    },
    nextBtn: { backgroundColor: Colors.secondary, marginLeft: 12 },
    footerText: { fontSize: 16, fontWeight: "600" },
  });
