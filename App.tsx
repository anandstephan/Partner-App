import { NavigationContainer } from "@react-navigation/native"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from "./Main.tsx"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
const queryClient = new QueryClient();
const App = () =>{
return <QueryClientProvider client={queryClient}>
<SafeAreaView style={{flex:1}}>
<NavigationContainer>
      <SafeAreaProvider>
      <Main/>
      </SafeAreaProvider>
</NavigationContainer>
</SafeAreaView>
</QueryClientProvider>
}

export default App