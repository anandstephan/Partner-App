import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import Logo from "../assets/jsx/Logo"
import Colors from "../constants/color"
import Fonts from "../constants/font"

const Login = () =>{
return <View style={styles.container}>
        <View style={styles.upperContainer}>
        <Logo/>
        <Text style={{fontFamily:Fonts.INTER_MEDIUM}}>Login as a <Text style={{color:Colors.secondary}}>Employee</Text> today</Text>
        </View>
        <View style={styles.rowContainer}>
        <Pressable style={styles.btnContainer}>
            <Text style={{color:"#FFF"}}>Employee login</Text>
        </Pressable>
        <Pressable style={[styles.btnContainer,{backgroundColor:Colors.primary}]}>
            <Text style={{color:"#FFF"}}>Partner login</Text>
        </Pressable>
        </View>
        <View style={styles.lowerContainer}>
        <Text style={{fontFamily:Fonts.INTER_BOLD}}>Employee ID</Text>
        <TextInput style={styles.input}/>
         <Text>Password</Text>
        <TextInput style={styles.input}/>
                <View style={styles.rowContainer}>
        <Pressable style={[styles.btnContainer,{borderRadius:0,backgroundColor:'transparent'}]}>
            <Text>Login with OTP</Text>
        </Pressable>
        <Pressable style={[styles.btnContainer,{backgroundColor:Colors.primary,borderRadius:5,padding:15,margin:20}]}>
            <Text>Login Now</Text>
        </Pressable>
        </View>
        </View>

</View>
}

export default Login

const styles = StyleSheet.create({
    container:{
            // marginVertical:'20%',
            justifyContent:'center',
            alignItems:"center",
            backgroundColor:Colors.appBackground
    },
    upperContainer:{
        width:"100%",
        justifyContent:"center",
        alignItems:'center',
    },
    lowerContainer:{
        borderWidth:0.4,
        width:Dimensions.get('window').width/1.2,
        borderRadius:20,
        backgroundColor:Colors.white,
        padding:10,
    },
    rowContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center'
    },
    btnContainer:{
        backgroundColor:Colors.secondary,
        padding:20,
        borderRadius:50,
        margin:10
    },
    input:{
        backgroundColor:"#F7F7F7",
        padding:10,
        margin:10
    }
})