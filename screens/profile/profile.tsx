import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const Profile = () => {
  const menuItems = [
    {
      id: 1,
      title: 'Personal information',
      icon: '👤',
    },
    {
      id: 2,
      title: 'Performance Tracker',
      icon: '📊',
    },
    {
      id: 3,
      title: 'Toolkit',
      icon: '🔧',
    },
    {
      id: 4,
      title: 'My ticket',
      icon: '🎫',
    },
    {
      id: 5,
      title: 'Services',
      icon: '⚙️',
    },
    {
      id: 6,
      title: 'Logout',
      icon: '🚪',
    },
  ];


  const MenuItemRow = ({ item }) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <Text style={styles.menuIcon}>{item.icon}</Text>
        <Text style={styles.menuTitle}>{item.title}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
     

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Image 
                source={{
                  uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
                }}
                style={styles.avatarImage}
              />
            </View>
          </View>

          {/* User Info Card */}
          <View style={styles.userInfoCard}>
            <Text style={styles.userName}>Vishu Kumar_DV1149</Text>
            <Text style={styles.userRole}>Manager Ops & Sales</Text>
            <Text style={styles.userLocation}>Delhi & Gurgaon</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <MenuItemRow key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 5,
  },
  signal: {
    fontSize: 14,
  },
  wifi: {
    fontSize: 14,
  },
  battery: {
    fontSize: 14,
  },
  header: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e9ecef',
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#fff',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  userInfoCard: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 250,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 13,
    color: '#6c757d',
    marginBottom: 2,
  },
  userLocation: {
    fontSize: 13,
    color: '#6c757d',
  },
  menuSection: {
    backgroundColor: '#e9ecef',
    borderRadius: 15,
    paddingVertical: 10,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(108, 117, 125, 0.1)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 18,
    marginRight: 15,
    width: 24,
    textAlign: 'center',
  },
  menuTitle: {
    fontSize: 15,
    color: '#212529',
    fontWeight: '400',
  },
  chevron: {
    fontSize: 20,
    color: '#6c757d',
    fontWeight: '300',
  },

});

export default Profile;