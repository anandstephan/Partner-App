import { NavigationContainer } from "@react-navigation/native"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from "./Main.tsx"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { Provider } from "react-redux";
import store from "./store/index.ts";
const queryClient = new QueryClient();
const App = () =>{
return <Provider store={store}>
<QueryClientProvider client={queryClient}>
<SafeAreaView style={{flex:1}}>
<NavigationContainer>
      <SafeAreaProvider>
      <Main/>
      </SafeAreaProvider>
</NavigationContainer>
</SafeAreaView>
</QueryClientProvider>
</Provider>
}

export default App