import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from './components/Carousel';
import TrackerCard from './components/TrackerCard';
import SwipeCard from './components/SwipeCard';
import Header from './components/Header';
import { useEMIHomePage, useHomeLeadSummary } from '../../features/home/useHome';
import Trend from './components/Trend';
import EMICollection from './components/EMICollectionTrend';
import ServiceTrend from './components/ServiceTrend';
import MidCard from './components/MidCard';



const Home3: React.FC = () => {
  const {data} = useEMIHomePage()
  const {data:leadSummary} = useHomeLeadSummary()
    const [activeTab, setActiveTab] = useState<"Daily" | "Weekly" | "Monthly">("Daily");

  const TabButton = ({ label }: { label: "Daily" | "Weekly" | "Monthly" }) => (
    <TouchableOpacity
      onPress={() => setActiveTab(label)}
      style={[
        styles.tab,
        activeTab === label && styles.activeTab,
      ]}
    >
      <Text
        style={[
          styles.tabText,
          activeTab === label && styles.activeTabText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
 
  return (
        <SafeAreaView>
          <Header/>
          <ScrollView>
        <View style={styles.container}>
          <Carousel/>
          <View style={styles.midContainer}>
            <MidCard/>
            <MidCard/>
            <MidCard/>
          </View>
          <SwipeCard/>

        <Carousel/>
                 
        <View style={styles.tabContainer}>
        <TabButton label="Daily" />
        <TabButton label="Weekly" />
        <TabButton label="Monthly" />
        </View>
        <View style={styles.backgroundChart}>
            <Text style={{fontSize:15,marginHorizontal:20,marginVertical:10,fontWeight:"500"}}>Team Performance</Text>
            <Trend/>
            <EMICollection/>
            <ServiceTrend/>
        </View>
          </View>
          </ScrollView>
      
        </SafeAreaView>
    );
};
export default Home3;


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor:Colors.primary
    },
    midContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginHorizontal:20 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
    marginVertical:20
  },
  tab: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DADADA",
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: "#1E824C",
    borderColor: "#1E824C",
  },
  tabText: {
    color: "#333",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
  },
  backgroundChart:{
   backgroundColor:"#D9D9D9",
   marginHorizontal:20 
  }

});

