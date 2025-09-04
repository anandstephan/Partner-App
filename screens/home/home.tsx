import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from './components/Carousel';
import TrackerCard from './components/TrackerCard';
import SwipeCard from './components/SwipeCard';
import Header from './components/Header';
import Colors from '../../constants/color';
import PerformanceCard from './components/PerformanceCard';

const Home: React.FC = () => {
    return (
        <SafeAreaView>
          <Header/>
        <View style={styles.container}>
          <Carousel/>
          <SwipeCard/>
        <TrackerCard
        title="Lead Tracker"
        totalLeads={12}
        subtitle="Today"
        stages={[
          { label: "Leads", value: 50 },
          { label: "KYC", value: 30 },
          { label: "Onboarding", value: 20 },
        ]}
      />
        <TrackerCard
        title="EMI Tracker"
        totalLeads={15}
        subtitle="June 25'"
        stages={[
          { label: "Upcoming", value: 10 },
          { label: "Due", value: 3 },
          { label: "OverDue", value: 2 },
        ]}
      />

          <PerformanceCard
          month="July"
          target="45 Onboarding"
          onboarded="74%"
          conversationRate="19%"
          totalLeads={91}
          convertedLeads={80}
        />
          </View>
      
        </SafeAreaView>
    );
};
export default Home;


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

