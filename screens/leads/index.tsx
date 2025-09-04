import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Leads from './leads';
import CreateLead from './createLead';


const Stack = createNativeStackNavigator();


const Index = () =>{
return <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='leads' component={Leads}/> 
    <Stack.Screen name="createLead" component={CreateLead}/>


</Stack.Navigator>
}

export default Index