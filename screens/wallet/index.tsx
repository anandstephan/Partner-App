import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Wallet from './wallet';
import Payment from './payment';


const Stack = createNativeStackNavigator();


const Index = () =>{
return <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='index' component={Wallet}/> 
<Stack.Screen name='payment' component={Payment}/> 


</Stack.Navigator>
}

export default Index