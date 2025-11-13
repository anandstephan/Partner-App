import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './home';
import Home2 from './home2';

const Stack = createNativeStackNavigator();


const Index = () =>{
return <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='home2'>
    <Stack.Screen name='home' component={Home}/>
    <Stack.Screen name="home2" component={Home2}/>
    

</Stack.Navigator>
}

export default Index