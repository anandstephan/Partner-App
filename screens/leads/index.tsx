import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Leads from './leads';
import CreateLead from './createLead';
import KycForm1 from './kycForm1';
import kycForm2 from './kycForm2';
import KycForm3 from './kycForm3';
import OnboardingTracker from './onBoardingTracker';


const Stack = createNativeStackNavigator();


const Index = () =>{
return <Stack.Navigator screenOptions={{headerShown:false}} >
    <Stack.Screen name='leads' component={Leads}/> 
    <Stack.Screen name="createLead" component={CreateLead}/>
    <Stack.Screen name="kycForm1" component={KycForm1}/>
    <Stack.Screen name="kycForm2" component={kycForm2}/>
     <Stack.Screen name="kycForm3" component={KycForm3}/>
     <Stack.Screen name="onBoarding" component={OnboardingTracker}/>


</Stack.Navigator>
}

export default Index