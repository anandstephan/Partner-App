import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "../../screens/auth/Login"

const Stack = createNativeStackNavigator()
const Auth = () =>{
    return <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="login" component={Login}/>
    </Stack.Navigator>
}

export default Auth