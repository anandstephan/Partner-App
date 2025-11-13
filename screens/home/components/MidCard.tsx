import { StyleSheet, View,Text, Image } from "react-native"

const MidCard = () =>{
return <View style={styles.container}>
    <Image
    source={require('../../../assets/png/customer.png')}
    style={{
        
    }}
    />
    <Text style={styles.txtStyle}>On Boarding</Text>
    <Text>15</Text>
</View>
}

export default MidCard

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#EBEBEB",
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal:10,
        borderRadius:20,
        marginVertical:10,
        padding:15
    },
    txtStyle:{
        fontWeight:"500",
        fontSize:12
    }
})