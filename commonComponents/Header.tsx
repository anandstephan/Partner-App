import { useNavigation } from "@react-navigation/native"
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'

interface HeaderProps {
  title: string;
}


const Header = ({title}:HeaderProps) =>{

    const navigation = useNavigation()
return <>
     <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={()=>navigation.goBack()}>
        <Ionicons name="chevron-back" size={25}/>
        </Pressable>
        <Text style={styles.headerTitle}>{title}</Text>

      </View>
</>
}

export default Header

const styles = StyleSheet.create({
      header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"flex-start",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginHorizontal:10
  },
  backButton: {
    padding: 4,
  },
  backArrow: {
    fontSize: 24,
    color: '#333333',
  },
  headerTitle: {
    marginHorizontal:20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  headerSpacer: {
    width: 32,
  },
})