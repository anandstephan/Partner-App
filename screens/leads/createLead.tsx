import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo'
import Header from '../../commonComponents/Header';
import { RenderDropdown } from '../../utilites/renderDropdown';
import { useCreateLead } from '../../features/createLead/useCreateLead';
import { launchImageLibrary } from 'react-native-image-picker';
import { useUpload } from '../../features/upload/useUpload';
const CreateLead = () => {
    const navigation = useNavigation()
   
  const [formData, setFormData] = useState({
    leadSource: '',
    firstName: '',
    lastName: '',
    fatherMotherName: '',
    mobileNo: '',
    city: '',
    state: '',
    vehicleType: '',
    dlStatus: '',
    loanStatus: '',
    loanNo: '',
    segment: 'Current'
  });

  const leadSources = ['Online', 'Referral', 'Walk-in', 'Phone Call', 'Social Media'];
  const vehicleTypes = ['Car', 'Bike', 'Truck', 'Bus', 'Auto'];
  const dlStatuses = ['Valid', 'Expired', 'Applied', 'Not Applied'];
  const loanStatuses = ['Approved', 'Pending', 'Rejected', 'Not Applied'];

  const updateFormData = (field:string, value:string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
    const { mutate, isPending, error, isError } = useCreateLead();
    const { mutate:upload} = useUpload()

      const handleSelectImage = async () => {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

    if (result.didCancel) return;

    const asset = result.assets?.[0];
    if (!asset?.uri) return;

    const file = {
      uri: asset.uri,
      name: asset.fileName || 'photo.jpg',
      type: asset.type || 'image/jpeg',
    };
    
    const payload = {
      file,
      category:"selfieWithCustomer",
      appName:"employeeApp"

    }
      upload(payload, {
              onSuccess: () => Alert.alert('✅ Lead Created Successfully!'),
              onError: (err) => {
                Alert.alert("Error",err.message)
                console.log("Error",err)
              }
            })

  };


  const handleAddLead = () =>{
 
          mutate(
            formData,
            {
              onSuccess: () => Alert.alert('✅ Lead Created Successfully!'),
              onError: (err) => {
                Alert.alert("Error",err.message)
                console.log("Error",err)
              }
            }
          );
  }

  return (
    <> 
      <Header title="Create Lead"/>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* <Text>{JSON.stringify(formData)}</Text> */}
        {/* Lead Source */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lead Source</Text>
         <RenderDropdown
            field="leadSource"
            placeholder="Select the Source of lead"
            options={leadSources}
            currentValue={formData.leadSource}
            onSelect={(field, value) => setFormData({ ...formData, [field]: value })}
          />
        </View>

        {/* Personal Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Info</Text>
          
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>First name</Text>
              <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={(value) => updateFormData('firstName', value)}
                placeholder=""
              />
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Last name</Text>
              <TextInput
                style={styles.input}
                value={formData.lastName}
                onChangeText={(value) => updateFormData('lastName', value)}
                placeholder=""
              />
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Father/Mother Name</Text>
            <TextInput
              style={styles.input}
              value={formData.fatherMotherName}
              onChangeText={(value) => updateFormData('fatherMotherName', value)}
              placeholder=""
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Mobile No</Text>
            <TextInput
              style={styles.input}
              value={formData.mobileNo}
              onChangeText={(value) => updateFormData('mobileNo', value)}
              placeholder=""
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                value={formData.city}
                onChangeText={(value) => updateFormData('city', value)}
                placeholder=""
              />
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>State</Text>
              <TextInput
                style={styles.input}
                value={formData.state}
                onChangeText={(value) => updateFormData('state', value)}
                placeholder=""
              />
            </View>
          </View>
        </View>

        {/* Vehicle Related */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Related</Text>
          
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Type</Text>
              <RenderDropdown
                field="vehicleType"
                placeholder="Vehicle Type"
                options={vehicleTypes}
                currentValue={formData.vehicleType}
                onSelect={(field, value) => setFormData({ ...formData, [field]: value })}
              />
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>DL Status</Text>
              <RenderDropdown
              field='dlStatus'
              placeholder='DL Status'
              options={dlStatuses}
              currentValue={formData.dlStatus}
              onSelect={(field, value) => setFormData({ ...formData, [field]: value })}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Loan Status</Text>
              <RenderDropdown
                field="loanStatus"
                placeholder="Loan Status"
                options={loanStatuses}
                currentValue={formData.loanStatus}
                onSelect={(field, value) => setFormData({ ...formData, [field]: value })}
              />

            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Loan No</Text>
              <TextInput
                style={styles.input}
                value={formData.loanNo}
                onChangeText={(value) => updateFormData('loanNo', value)}
                placeholder=""
              />
            </View>
          </View>
        </View>

        {/* Segment */}
        {/* Segment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Segment</Text>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Current</Text>
              <TextInput
                style={styles.input}
                value={formData.segment === "Current" ? formData.segment : ""}
                onChangeText={(value) => updateFormData("segment", value)}
                placeholder=""
              />
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Proposed</Text>
              <TextInput
                style={styles.input}
                value={formData.segment === "Proposed" ? formData.segment : ""}
                onChangeText={(value) => updateFormData("segment", value)}
                placeholder=""
              />
            </View>
          </View>
        </View>

        {/* Selfie with Customer */}
        <View style={styles.section}>
          <Pressable style={styles.selfieButton} onPress={handleSelectImage}>
            <Entypo name="camera" size={25}/>
            <Text style={styles.selfieText}>Selfie with Customer</Text>
          </Pressable>
        </View>

        {/* Remarks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Remarks (If Any)</Text>
          <TextInput
            style={[styles.input, { height: 80, textAlignVertical: "top" }]}
            multiline
            numberOfLines={4}
            placeholder="Write remarks here..."
          />
        </View>

        {/* Save & Submit Buttons */}
        <View style={styles.buttonRow}>
          <Pressable style={[styles.actionButton, { backgroundColor: "#00BCD4" }]} onPress={()=>console.log("jjj")}>
            <Text style={styles.actionButtonText}>Save</Text>
          </Pressable>
          <Pressable style={[styles.actionButton, { backgroundColor: "#00BCD4" }]} onPress={handleAddLead}>
            <Text style={styles.actionButtonText}>Submit</Text>
          </Pressable>
        </View>
    

        <View style={styles.bottomSpacing} />
      </ScrollView>
</>

  );
};

const styles = StyleSheet.create({
  container: {
  },
  scrollView: {
    paddingHorizontal: 26,
  },
  section: {
    marginTop: 24,
    paddingVertical:15,
    // borderWidth:2,
    padding:10,
    borderRadius:10,
    backgroundColor:"#FFFFFF",
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation:3
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  halfWidth: {
    width: '48%',
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  placeholderText: {
    color: '#999999',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666666',
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: 200,
    zIndex: 1001,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderWidth:2,


  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333333',
  },
  segmentContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  segmentButtonActive: {
    backgroundColor: '#007AFF',
  },
  segmentButtonText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  segmentButtonTextActive: {
    color: '#ffffff',
  },
  bottomSpacing: {
    height: 32,
  },
    selfieButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"flex-start",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#F9F9F9",
  },
  selfieIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  selfieText: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "500",
    marginLeft:20
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    marginHorizontal: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

});

export default CreateLead;