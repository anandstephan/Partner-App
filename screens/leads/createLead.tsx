import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  StatusBar,
} from 'react-native';

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

  const [dropdowns, setDropdowns] = useState({
    leadSource: false,
    vehicleType: false,
    dlStatus: false,
    loanStatus: false
  });

  const leadSources = ['Online', 'Referral', 'Walk-in', 'Phone Call', 'Social Media'];
  const vehicleTypes = ['Car', 'Bike', 'Truck', 'Bus', 'Auto'];
  const dlStatuses = ['Valid', 'Expired', 'Applied', 'Not Applied'];
  const loanStatuses = ['Approved', 'Pending', 'Rejected', 'Not Applied'];

  const updateFormData = (field:string, value:string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleDropdown = (field) => {
    setDropdowns(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const selectDropdownValue = (field, value) => {
    updateFormData(field, value);
    setDropdowns(prev => ({ ...prev, [field]: false }));
  };

  const renderDropdown = (field, placeholder, options, currentValue) => (
    <View style={styles.dropdownContainer}>
      <Pressable
        style={styles.dropdown}
        onPress={() => toggleDropdown(field)}
      >
        <Text style={[styles.dropdownText, !currentValue && styles.placeholderText]}>
          {currentValue || placeholder}
        </Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </Pressable>
      {dropdowns[field] && (
        <View style={styles.dropdownList}>
          {options.map((option, index) => (
            <Pressable
              key={index}
              style={styles.dropdownItem}
              onPress={() => selectDropdownValue(field, option)}
            >
              <Text style={styles.dropdownItemText}>{option}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={()=>navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Create Lead</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Lead Source */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lead Source</Text>
          {renderDropdown('leadSource', 'Select the Source of lead', leadSources, formData.leadSource)}
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
              {renderDropdown('vehicleType', '', vehicleTypes, formData.vehicleType)}
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>DL Status</Text>
              {renderDropdown('dlStatus', '', dlStatuses, formData.dlStatus)}
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Loan Status</Text>
              {renderDropdown('loanStatus', '', loanStatuses, formData.loanStatus)}
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Segment</Text>
          <View style={styles.segmentContainer}>
            <Pressable
              style={[
                styles.segmentButton,
                formData.segment === 'Current' && styles.segmentButtonActive
              ]}
              onPress={() => updateFormData('segment', 'Current')}
            >
              <Text style={[
                styles.segmentButtonText,
                formData.segment === 'Current' && styles.segmentButtonTextActive
              ]}>Current</Text>
            </Pressable>
            <Pressable
              style={[
                styles.segmentButton,
                formData.segment === 'Proposed' && styles.segmentButtonActive
              ]}
              onPress={() => updateFormData('segment', 'Proposed')}
            >
              <Text style={[
                styles.segmentButtonText,
                formData.segment === 'Proposed' && styles.segmentButtonTextActive
              ]}>Proposed</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  backArrow: {
    fontSize: 24,
    color: '#333333',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  headerSpacer: {
    width: 32,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 24,
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
});

export default CreateLead;