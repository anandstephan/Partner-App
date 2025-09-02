import { NavigationContainer } from "@react-navigation/native"
import Main from "./Main.tsx"
import { SafeAreaProvider } from "react-native-safe-area-context"

const App = () =>{
return <NavigationContainer>
      <SafeAreaProvider>
      <Main/>
      </SafeAreaProvider>
</NavigationContainer>
}

export default App