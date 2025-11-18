import { View,ScrollView,Text, StyleSheet, Pressable } from "react-native"
import Header from "../../commonComponents/Header"
import { RenderDropdown } from "../../utilites/renderDropdown"
import Colors from "../../constants/color";


  const leadSources = ['Online', 'Referral', 'Walk-in', 'Phone Call', 'Social Media'];
const AddEMI = () =>{
return <View>
    <Header title="Collection & Deposit"/>
<ScrollView style={{marginHorizontal:20,backgroundColor:'white',borderRadius:10,padding:10}}>
        <View style={styles.fieldContainer}>
        <Text>Partner Type</Text>
        <RenderDropdown
          field="leadSource"
            placeholder="Select the Source of lead"
            options={leadSources}
            onSelect={()=>{}}
            currentValue=""
        />
        </View>
        <View style={styles.fieldContainer}>
        <Text>Unique Partner Type</Text>
        <RenderDropdown
          field="leadSource"
            placeholder="Select the Source of lead"
            options={leadSources}
            onSelect={()=>{}}
            currentValue=""
        />
        </View>
        <View style={styles.fieldContainer}>
        <Text>Product Type</Text>
        <RenderDropdown
          field="leadSource"
            placeholder="Select the Source of lead"
            options={leadSources}
            onSelect={()=>{}}
            currentValue=""
        />

        </View>
        <View style={styles.fieldContainer}>
        <Text>Collection Type</Text>
        <RenderDropdown
          field="leadSource"
            placeholder="Select the Source of lead"
            options={leadSources}
            onSelect={()=>{}}
            currentValue=""
        />
        
        </View>
        <View style={styles.fieldContainer}>
        <Text>Collection Amount</Text>
        <RenderDropdown
          field="leadSource"
            placeholder="Select the Source of lead"
            options={leadSources}
            onSelect={()=>{}}
            currentValue=""
        />
        
        </View>
        <View style={styles.fieldContainer}>
        <Text>Payment Mode</Text>
        <RenderDropdown
          field="leadSource"
            placeholder="Select the Source of lead"
            options={leadSources}
            onSelect={()=>{}}
            currentValue=""
        />
        
        </View>
        <View style={styles.fieldContainer}>
        <Text>Transaction/Recipet ID</Text>
        <RenderDropdown
          field="leadSource"
            placeholder="Select the Source of lead"
            options={leadSources}
            onSelect={()=>{}}
            currentValue=""
        />
        
        </View>
             <View style={styles.fieldContainer}>
        <Text>Upload Type</Text>
        <RenderDropdown
          field="leadSource"
            placeholder="Select the Source of lead"
            options={leadSources}
            onSelect={()=>{}}
            currentValue=""
        />
        
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between",padding:10}}>
        <View>
            <Pressable style={styles.btnContainer}>
                <Text>Save</Text>
            </Pressable>
        </View>
          <View>
            <Pressable style={styles.btnContainer}>
                <Text>Submit</Text>
            </Pressable>
        </View>
        </View>
      
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
            flex:1,
            padding:10,
            margin:20,
            borderRadius:10
        }
})