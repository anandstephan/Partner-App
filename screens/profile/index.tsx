import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './profile';



const Stack = createNativeStackNavigator();


const Index = () =>{
return <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='index' component={Profile}/> 


</Stack.Navigator>
}

export default Index