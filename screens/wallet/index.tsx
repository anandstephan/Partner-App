import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Wallet from './wallet';
import Payment from './payment';
import CollectionDeposit from './collectionDeposit';
import EmiDetail from './emiDetail';
import AddEMI from './addEMI';


const Stack = createNativeStackNavigator();


const Index = () =>{
return <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='index' component={Wallet}/> 
        <Stack.Screen name='payment' component={Payment}/> 
        <Stack.Screen name="collectiondeposit" component={CollectionDeposit}/>
        <Stack.Screen name="emidetail" component={EmiDetail}/>
        <Stack.Screen name="emi" component={AddEMI}/>
</Stack.Navigator>
}

export default Index