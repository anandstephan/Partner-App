import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './profile';
import PersonalInformation from './personalInfo';



const Stack = createNativeStackNavigator();


const Index = () =>{
return <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='index' component={Profile}/> 
        <Stack.Screen name="PersonalInfo" component={PersonalInformation}/>

</Stack.Navigator>
}

export default Index