import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './profile';
import PersonalInformation from './personalInfo';
import PerformanceTracker from './performanceTracker';
import Toolkit from './toolkit';



const Stack = createNativeStackNavigator();


const Index = () =>{
return <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='index' component={Profile}/> 
        <Stack.Screen name="PersonalInfo" component={PersonalInformation}/>
        <Stack.Screen name="Performance" component={PerformanceTracker}/>
        <Stack.Screen name="Toolkit" component={Toolkit}/>

</Stack.Navigator>
}

export default Index