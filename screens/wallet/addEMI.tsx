import { View,ScrollView,Text, StyleSheet, Pressable, ActivityIndicator, TextInput } from "react-native"
import Header from "../../commonComponents/Header"
import { RenderDropdown } from "../../utilites/renderDropdown"
import Colors from "../../constants/color";
import { useDriver } from "../../features/driver/useDriver";
import { useState } from "react";
import { useCreateCollection } from "../../features/collection/useCollection";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";


  const leadSources = ['Online', 'Referral', 'Walk-in', 'Phone Call', 'Social Media'];
  const partnerType = ['Driver','Dealer','Distuributor',"Others"]
  const collectSources = ['Down Payment','Lease Payment']
  const paymentModeSource = ['cash','UPI']
const AddEMI = () =>{  
  const {data:drivers,isLoading} = useDriver()
  const {mutate} = useCreateCollection()
  const navigation = useNavigation()

  const [formData,setFormData] = useState({
      partnerType:"",
      driverId:"",
      productType:"",
      collectionType:"",
      amount:0,
      paymentMode:""
  })
  const onSubmitHandler= () =>{
    console.log("Form Data",formData)
    formData.partnerType = formData.partnerType == "Driver" ? "driver" : formData.partnerType
    formData.collectionType = formData.collectionType == "Down Payment" ? "DOWN_PAYMENT" : formData.collectionType === 'Lease Payment' ? 'EMI' :formData.collectionType
    formData.paymentMode = formData.paymentMode === 'Cash' ? 'cash':formData.paymentMode
    console.log("After",formData)
    mutate(formData,{
      onSuccess:(res) => {
        console.log("Res",res)
        Alert.alert("Success","Collection Added Successfully")
        navigation.goBack()
        
      },onError: (err) => {
          console.log("Error",err)
      } 
    })
  }

    if(isLoading){
      return <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
        <ActivityIndicator size={'large'}/>
      </View>
    }  

return <View>
    <Header title="Collection & Deposit"/>  
    <ScrollView style={{marginHorizontal:20,backgroundColor:'white',borderRadius:10,padding:10}}>
            <View style={styles.fieldContainer}>
            <Text>Partner Type</Text>
            <RenderDropdown
              field="partnerType"
                placeholder="Select Partner Type"
                options={partnerType}
                onSelect={(field, value) => setFormData({ ...formData, [field]: value })}
                currentValue={formData.partnerType}
            />
            </View>
            <View style={styles.fieldContainer}>
            <Text>Unique Partner Type</Text>
            <RenderDropdown
              field="driverId"
                placeholder="Select the Id"
                options={drivers?.map(driver => driver?.driverId) || []}
                onSelect={(field, value) => setFormData({ ...formData, [field]: value })}
                currentValue={formData.driverId}
            />
            </View>
            <View style={styles.fieldContainer}>
            <Text>Product Type</Text>
            <RenderDropdown
              field="productType"
                placeholder="Select the Source of lead"
                options={drivers?.map(driver => driver?.driverId === formData.driverId ? driver?.productType : "") || []}
                onSelect={(field, value) => setFormData({ ...formData, [field]: value })}
                currentValue={formData.productType}
            />

            </View>
            <View style={styles.fieldContainer}>
            <Text>Collection Type</Text>
            <RenderDropdown
              field="collectionType"
                placeholder="Select the Collection Type"
                options={collectSources}
                onSelect={(field, value) => setFormData({ ...formData, [field]: value })}
                currentValue={formData.collectionType}
            />
            
            </View>
            <View style={styles.fieldContainer}>
            <Text>Collection Amount</Text>
            <TextInput
            style={{borderWidth:1,padding:10,borderRadius:10,borderColor:"gray",marginVertical:10}}
             value={""+formData.amount} 
             onChangeText={(text) => setFormData({ ...formData, 'amount': text })} 
             placeholder="Enter the Collection Amount"
              keyboardType="numeric" />
            
            </View>
            <View style={styles.fieldContainer}>
            <Text>Payment Mode</Text>
            <RenderDropdown
              field="paymentMode"
              placeholder="Select the Source of Payment Mode"
              options={paymentModeSource}
              onSelect={(field, value) => setFormData({ ...formData, [field]: value })}
              currentValue={formData.paymentMode}
            />
            
            </View>
            <View style={styles.fieldContainer}>
            <Text>Transaction/Recipet ID</Text>
            <TextInput 
            style={{borderWidth:1,padding:10,borderRadius:10,borderColor:"gray",marginVertical:10}}
            value=""
            placeholder="Enter the Transaction/Recipet ID" />
            
            </View>
                {/* <View style={styles.fieldContainer}>
            <Text>Upload Type</Text>
            <RenderDropdown
              field="leadSource"
                placeholder="Select the Source of lead"
                options={leadSources}
                onSelect={()=>{}}
                currentValue=""
            />
            
            </View> */}
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <View>
                <Pressable style={styles.btnContainer}>
                    <Text>Save</Text>
                </Pressable>
            </View>
              <View>
                <Pressable style={styles.btnContainer} onPress={onSubmitHandler}>
                    <Text>Submit</Text>
                </Pressable>
            </View>
            </View>
            <View style={{height:100}}/>
          
    </ScrollView>
</View>


}

export default AddEMI
const styles = StyleSheet.create({
        fieldContainer:{
            // borderWidth:2,
            marginVertical:10
        },
        btnContainer:{
            backgroundColor:Colors.secondary,
            // flex:1,
            padding:10,
            margin:20,
            borderRadius:10
        }
})