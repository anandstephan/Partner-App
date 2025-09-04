import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './home';
import CreateLead from '../leads/createLead';

const Stack = createNativeStackNavigator();


const Index = () =>{
return <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name='map' component={Home}/>
    <Stack.Screen name="createLead" component={CreateLead}/>

</Stack.Navigator>
}

export default Index