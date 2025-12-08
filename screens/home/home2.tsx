import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from './components/Carousel';
import TrackerCard from './components/TrackerCard';
import SwipeCard from './components/SwipeCard';
import Header from './components/Header';
import Colors from '../../constants/color';
import PerformanceCard from './components/PerformanceCard';
import { useEMISummary, useLeadSummary } from '../../features/home/useHome';
import ServiceCard from './components/ServiceCard';

const Home2: React.FC = () => {
  const {data} = useEMISummary()
  const {data:leadSummary} = useLeadSummary()
  console.log("____",data)
    return (
        <SafeAreaView>
          <Header/>
        <View style={styles.container}>
          <Carousel/>
          <SwipeCard/>
         <ServiceCard/>
         

        <TrackerCard
        title="Product Assign"
        totalLeads={15}
        subtitle="June 25'"
        stages={[
          { label: "Open", value: data?.upcomingSevenDaysCount },
          { label: "Closed", value: data?.dueEmisCount },
          { label: "OverDue", value: data?.overdueCount },
        ]}
      />
   
          </View>
      
        </SafeAreaView>
    );
};
export default Home2;


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor:Colors.primary
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },

});

