import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './home';
import Home2 from './home2';
import Home3 from './home3';

const Stack = createNativeStackNavigator();


const Index = () =>{
return <Stack.Navigator screenOptions={{headerShown:false}}   >
    <Stack.Screen name='home' component={Home}/>
    <Stack.Screen name="home2" component={Home2}/>
    <Stack.Screen name="home3" component={Home3}/>

</Stack.Navigator>
}

export default Index