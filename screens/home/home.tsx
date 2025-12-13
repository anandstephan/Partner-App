import React, { use } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from './components/Carousel';
import TrackerCard from './components/TrackerCard';
import SwipeCard from './components/SwipeCard';
import Header from './components/Header';
import Colors from '../../constants/color';
import PerformanceCard from './components/PerformanceCard';
import { useEMISummary,useLeadSummary } from '../../features/home/useHome';

const Home: React.FC = () => {
  const {data} = useEMISummary()
  const {data:leadSummary} = useLeadSummary()
    return (
        <SafeAreaView>
          <Header/>
        <View style={styles.container}>
          <Carousel/>
          <SwipeCard/>
        <TrackerCard
        title="Lead Tracker"
        totalLeads={leadSummary?.todayCount}
        subtitle="Today"
        stages={[
          { label: "Leads", value: leadSummary?.totalLeadCount },
          { label: "KYC", value: leadSummary?.kycDoneLeadCount },
          { label: "Onboarding", value:leadSummary?.onboardedLeadCount },
        ]}
      />
        <TrackerCard
        title="EMI Tracker"
        totalLeads={15}
        subtitle="June 25'"
        stages={[
          { label: "Upcoming", value: data?.upcomingSevenDaysCount },
          { label: "Due", value: data?.dueEmisCount },
          { label: "OverDue", value: data?.overdueCount },
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

