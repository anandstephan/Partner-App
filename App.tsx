import { NavigationContainer } from "@react-navigation/native"
import Main from "./Main.tsx"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const App = () =>{
return <SafeAreaView style={{flex:1}}>
<NavigationContainer>
      <SafeAreaProvider>
      <Main/>
      </SafeAreaProvider>
</NavigationContainer>
</SafeAreaView>
}

export default App