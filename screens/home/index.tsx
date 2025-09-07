import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './home';

const Stack = createNativeStackNavigator();


const Index = () =>{
return <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name='home' component={Home}/>

</Stack.Navigator>
}

export default Index