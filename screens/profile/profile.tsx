  import React from "react";
  import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    ScrollView,
    Dimensions,
  } from "react-native";
  import Icon from "react-native-vector-icons/Feather";
  import { NativeStackNavigationProp } from "@react-navigation/native-stack";
  import { useNavigation } from "@react-navigation/native";

  // 👇 Define navigation types (customize routes as per your stack)
  type RootStackParamList = {
    PersonalInfo: undefined;
    Performance: undefined;
    Toolkit: undefined;
    Tickets: undefined;
    Services: undefined;
    Logout: undefined;
  };

  type ProfileScreenNavigationProp =
    NativeStackNavigationProp<RootStackParamList>;

  interface MenuItem {
    title: string;
    icon: string;
    route: keyof RootStackParamList;
  }

  const ProfileScreen: React.FC = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const menuItems: MenuItem[] = [
      { title: "Personal Information", icon: "user", route: "PersonalInfo" },
      { title: "Performance Tracker", icon: "trending-up", route: "Performance" },
      { title: "Toolkit", icon: "tool", route: "Toolkit" },
      { title: "My Ticket", icon: "tag", route: "Tickets" },
      { title: "Services", icon: "briefcase", route: "Services" },
      { title: "Logout", icon: "log-out", route: "Logout" },
    ];

    return (
      <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}>
        <Text style={styles.name}>My Profile</Text>
        {/* Profile Menu Card */}
        <View style={styles.card}>
      {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
            }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Vishu Kumar_DV1149</Text>
            <Text style={styles.role}>Manager Ops & Sales</Text>
            <Text style={styles.location}>Delhi & Gurgaon</Text>
          </View>
        </View>

          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={styles.menuLeft}>
                <Icon name={item.icon} size={18} color="#444" />
                <Text style={styles.menuText}>{item.title}</Text>
              </View>
              <Icon name="chevron-right" size={18} color="#999" />
            </Pressable>
          ))}
        </View>

        {/* Bottom Spacer */}
        <View style={{ height: 40 }} />
      </ScrollView>
    );
  };

  export default ProfileScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 30,
    },
    profileHeader: {
      alignItems: "center",

    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 60,
      borderWidth: 2,
      borderColor: "#D9D9D9",
      borderStyle:"solid",
      // zIndex:2,
      marginTop:-60,
      
    },
    profileInfo: {
      alignItems: "center",
      marginTop: 12,
    },
    name: {
      fontSize: 16,
      fontWeight: "700",
      color: "#222",
    },
    role: {
      fontSize: 14,
      color: "#777",
      marginTop: 3,
    },
    location: {
      fontSize: 13,
      color: "#9c9c9c",
      marginTop: 2,
    },
    card: {
      marginTop: 64,
      backgroundColor: "#D9D9D9",
      borderRadius: 16,
      paddingVertical: 6,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
      height:Dimensions.get('window').height*0.60
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 14,
      paddingHorizontal: 18,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    menuLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    menuText: {
      fontSize: 15,
      color: "#333",
      marginLeft: 12,
    },
  });
