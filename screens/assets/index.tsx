import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreateLead from '../leads/createLead';
import Assets from './assets';
import ProductAssign from './productAssign';
import RequestForm from './requestForm';
import Inventory from './inventory';
import Eagle from './Eagle';
import ProductAssignForm from './productAssingForm';

const Stack = createNativeStackNavigator();


const Index = () =>{
return <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name='home' component={Assets}/>
    <Stack.Screen name="productAssign" component={ProductAssign}/>
    <Stack.Screen name="requestForm" component={RequestForm}/>
    <Stack.Screen name="inventory" component={Inventory}/>
    <Stack.Screen name="eagle" component={Eagle}/>
    <Stack.Screen name="productAssignForm" component={ProductAssignForm}/>
    

</Stack.Navigator>
}

export default Index