import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "../../constants/color";
import Header from "../../commonComponents/Header";
import { useRoute } from "@react-navigation/native";
import { useEmi } from "../../features/emi/useEmi";
import { useDealerByParams, useRole } from "../../features/role/useRole";
import { useCreateCollection } from "../../features/collection/useCollection";
import { useOnBoard } from "../../features/onBoarding/useOnBoard";

export default function OnboardingTracker() {
  const { params } = useRoute();
  const { data: emiData = [] } = useEmi();
  const { data: roleData = [] } = useRole();

  const dealerId = useMemo(() => roleData?.[1]?._id ?? "", [roleData]);

      const { mutate, isPending, error, isError } = useCreateCollection();
      const {mutate:submitOnBoard} = useOnBoard()
  const dealerParams = useMemo(() => {
    if (
      params?.leadInfo?.stateId &&
      params?.leadInfo?.cityId &&
      params?.leadInfo?.clusterId &&
      dealerId
    ) {
      return {
        stateId: params.leadInfo.stateId,
        cityId: params.leadInfo.cityId,
        clusterId: params.leadInfo.clusterId,
        role: dealerId,
      };
    }
    return null;
  }, [params, dealerId]);

  const { data: dealerData = [] } = useDealerByParams(dealerParams ?? undefined);


  const [selectedScheme, setSelectedScheme] = useState<any>(null);
  const [paymentFrequency, setPaymentFrequency] = useState<string | null>(null);
  const [couponAppliedOn, setCouponAppliedOn] = useState<string | null>(null);
  const [form, setForm] = useState({
    emiSchemeId:"",
    leadId:""+params?.leadInfo._id,
    downPaymentAmountFinal:0,
    emiAmountFinal:0,
  });


  const [selectedDealerId,setSelectedDealerId] = useState('')
  const [selectedProductType,setSelectedProductType] = useState('')
  const [selectedpaymentFrequency,setSelectedpaymentFrequency] = useState('')

  // ✅ Memoized filtered data (no state, no re-renders)
  
  const filteredData = useMemo(() => {
    if (!emiData?.length) return [];
    return emiData.filter(
      (item) =>
        item.clusterId === "68ec0ade5706fd0d7cab7639" &&
        item.stateId === "68ec06c6ad33264418ee029b" &&
        item.cityId === "68ec09f8f0bfd624900ca88e"
        // && item.emiSchemeId?.dealerId === selectedDealerId && item.emiSchemeId?.productType=== selectedProductType && item.emiSchemeId?.paymentFrequency === selectedpaymentFrequency
    );
  }, [emiData,selectedDealerId,selectedProductType,selectedpaymentFrequency]);


  const productTypesOptions = [
    {
      label:"Vehicle",value:"vehicle",
    },
    {

      label:"battery",value:"battery",
    },
    {
      label:"Vehicle + Battery",value:"vehicle+battery",
    }
  ]

  const selectedSchemeDetails = useMemo(() => {
    if (!selectedScheme) return {};
    const scheme = filteredData.find(
      (item) => item?.emiSchemeId?._id === selectedScheme
    );
    return scheme?.emiSchemeId ?? {};
  }, [selectedScheme, filteredData]);

  const update = (k: string, v: string) => setForm((prev) => ({ ...prev, [k]: v }));

  const submit = () => {
    mutate({
         "leadId": ""+params?.leadInfo._id,
        "collectionType": "DOWN_PAYMENT",
        "amount": 2000,
        "paymentMode": "cash",
        "productType": selectedProductType,
        "partnerType": "driver"
    },{
      onSuccess:(res) =>{
        console.log("mutate",res?.data._id)

    form['emiSchemeId'] = selectedScheme
  
    let newData = {
       "emiSchemeId": form.emiSchemeId,
        "leadId": form.leadId,
        "downPaymentAmountFinal": parseInt(form.downPaymentAmountFinal),
        "emiAmountFinal":parseInt(form.emiAmountFinal),
        "collectionId": res.data._id
    }
      console.log("Form",JSON.stringify(newData))
    submitOnBoard(newData ,{
      onSuccess:(res) => {

        Alert.alert('✅ Onboarding Updated Successfully!')
        // navigation.goBack()
      },
      onError: (err) => {
        Alert.alert("Error",err.message)
        console.log("Error",err)
      }
    })
      }
    })
    // form['couponAppliedOn'] = undefined
    // delete form['couponAppliedOn']
 
    console.log({
      ...form,
    });
  };

  return (
    <>
      <Header title="Onboarding" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.section}>
          <Dropdown
            style={styles.input}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.value}
            labelField="label"
            valueField="value"
            placeholder="Dealer Name"
            data={dealerData.map((item) => ({
              label: item.name,
              value: item._id,
            }))}
            onChange={(val) =>{
              setSelectedDealerId(val.value)
            }}
            value={selectedDealerId}
          />

            <Dropdown
            style={styles.input}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.value}
            data={productTypesOptions}
            labelField="label"
            valueField="value"
            placeholder="Product Type"
            onChange={(val) =>{
              setSelectedProductType(val.value)
            }}
          />
            <Dropdown
            style={styles.input}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.value}
            labelField="label"
            valueField="value"
            placeholder="Payment Frequency"
            data={[
              { label: "Daily", value: "daily" },
              { label: "Weekly", value: "weekly" },
              { label: "Monthly", value: "monthly" },
              { label: "Bi-Monthly (15 days)", value: "bi-monthly" },
            ]}
            value={paymentFrequency}
            onChange={(val) =>{
              setSelectedpaymentFrequency(val.value)
            }}
          />

          <Dropdown
            style={styles.input}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.value}
            labelField="label"
            valueField="value"
            placeholder="EMI Scheme Name"
            value={selectedScheme}
            onChange={(i) => setSelectedScheme(i.value)}
            data={filteredData.map((item) => ({
              label: item?.emiSchemeId?.schemeName,
              value: item?.emiSchemeId?._id,
            }))}
          />

          <TextInput
            style={styles.input}
            placeholder="Down Payment"
            value={selectedSchemeDetails.downPayment?.toString() ?? ""}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Loan Amount"
            value={selectedSchemeDetails.loanAmount?.toString() ?? ""}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="EMI Amount"
            value={selectedSchemeDetails.emiAmount?.toString() ?? ""}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Tenure (months)"
            value={selectedSchemeDetails.tenure?.toString() ?? ""}
            editable={false}
          />



          {/* <Dropdown
            style={styles.input}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.value}
            labelField="label"
            valueField="value"
            placeholder="Coupon Applied On"
            data={[
              { label: "Down Payment", value: "down" },
              { label: "EMI", value: "emi" },
            ]}
            value={couponAppliedOn}
            onChange={(i) => setCouponAppliedOn(i.value)}
          /> */}

          <TextInput
            style={styles.input}
            placeholder="Enter Payable DP"
            value={form.downPaymentAmountFinal}
            onChangeText={(t) => update("downPaymentAmountFinal", t)}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Payable EMI"
            keyboardType="numeric"
            value={form.emiAmountFinal}
            onChangeText={(t) => update("emiAmountFinal", t)}
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
  container: { flex: 1, backgroundColor: "#F2F2F2" },
  section: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    marginHorizontal: 20,
  },
  input: {
    height: 44,
    borderBottomWidth: 1,
    borderColor: "#E1E1E1",
    justifyContent: "center",
    fontSize: 14,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
