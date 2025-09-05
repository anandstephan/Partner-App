import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreateLead from '../leads/createLead';
import Assets from './assets';

const Stack = createNativeStackNavigator();


const Index = () =>{
return <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name='assets' component={Assets}/>

</Stack.Navigator>
}

export default Index