import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Image,
  Pressable,
} from 'react-native';
import Header from '../../commonComponents/Header';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Leads = () => {
    const navigation = useNavigation()
  const [searchText, setSearchText] = useState('');

  const leads = [
    {
      id: 1,
      name: 'Ravi Singh',
      leadId: 'DF731526',
      date: '12/12/2024',
      status: 'Hot lead',
      statusColor: '#ff9800',
    },
    {
      id: 2,
      name: 'Amit Kumar',
      leadId: 'DF731568',
      date: '12/12/2024',
      status: 'Click here',
      statusColor: '#4caf50',
    },
    {
      id: 3,
      name: 'Shiraj Singh',
      leadId: 'DF731555',
      date: '12/12/2024',
      status: 'Hot lead',
      statusColor: '#ff9800',
    },
    {
      id: 4,
      name: 'Kranti Kumar',
      leadId: 'DF731564',
      date: '12/12/2024',
      status: 'Hot lead',
      statusColor: '#ff9800',
    },
    {
      id: 5,
      name: 'Ashish Singh',
      leadId: 'DF731565',
      date: '12/12/2024',
      status: 'Click here',
      statusColor: '#4caf50',
    },
    {
      id: 6,
      name: 'Raja Ram',
      leadId: 'DF731565',
      date: '12/12/2024',
      status: 'Click here',
      statusColor: '#4caf50',
    },
    {
      id: 7,
      name: 'Shivam',
      leadId: 'DF731565',
      date: '12/12/2024',
      status: 'Rejected',
      statusColor: '#f44336',
    },
    {
      id: 8,
      name: 'Sama Singh',
      leadId: 'DF731565',
      date: '12/12/2024',
      status: 'Rejected',
      statusColor: '#f44336',
    },
  ];

  const BackIcon = () => <Text style={styles.backIcon}>‹</Text>;

  const SearchIcon = () => <Text style={styles.searchIcon}>🔍</Text>;

  const ProgressBar = ({ progress }) => (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
    </View>
  );

  const StatusBadge = ({ status, color }) => (
    <View style={[styles.statusBadge, { backgroundColor: `${color}20` }]}>
      <Text style={[styles.statusText, { color }]}>{status}</Text>
    </View>
  );

  const TableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerText, styles.nameColumn]}>Lead Name</Text>
      <Text style={[styles.headerText, styles.idColumn]}>Lead ID</Text>
      <Text style={[styles.headerText, styles.dateColumn]}>Add Date</Text>
      <Text style={[styles.headerText, styles.statusColumn]}>Status</Text>
    </View>
  );

  const LeadRow = ({ lead }) => (
    <View style={styles.tableRow}>
      <View style={[styles.nameColumn, { flex: 1 }]}>
        <Text style={styles.leadNumber}>{lead.id}</Text>
      </View>

      <View style={styles.nameColumn}>
        <Text style={styles.leadName}>{lead.name}</Text>
      </View>
      <Text style={[styles.cellText, styles.idColumn]}>{lead.leadId}</Text>
      <Text style={[styles.cellText, styles.dateColumn]}>{lead.date}</Text>
      <View style={styles.statusColumn}>
        <StatusBadge status={lead.status} color={lead.statusColor} />
      </View>
    </View>
  );

  const PaginationDots = () => (
    <View style={styles.paginationContainer}>
      <Text style={styles.paginationText}>Total: 122</Text>
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f8f9fa" barStyle="dark-content" />

      {/* Header */}
      <Header title="Lead Tracker" />

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressStats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Leads</Text>
            <Text style={styles.statValue}>122</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>KYC</Text>
            <Text style={styles.statValue}>80</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Onboarding</Text>
            <Text style={styles.statValue}>50</Text>
          </View>
        </View>
        <View style={{ marginHorizontal: 40 }}>
          <ProgressBar progress={60} />
        </View>
        <View style={[styles.rowContainer,{top:-10,marginHorizontal:40}]}>
          <View style={styles.circle} />
          <View style={styles.circle} />
          <View style={styles.circle} />
        </View>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Lead"
            placeholderTextColor="#6c757d"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Content Section */}
      <ScrollView
        style={styles.contentSection}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tableContainer}>
          <TableHeader />

          {/* Construction Illustration */}
          <Image
            source={require('../../assets/png/leads.png')}
            width={width}
            height={width}
          />
          {/* Lead Rows */}
          {leads.map(lead => (
            <LeadRow key={lead.id} lead={lead} />
          ))}

          {/* Pagination */}
          <PaginationDots />
        </View>
        <View style={{flex:1,justifyContent:'center',alignItems:"center",marginVertical:10}}>
        
        <Pressable style={styles.btnContainer} onPress={()=>navigation.navigate('createLead')}>

            <Text style={{color:"#FFF"}}>+ Lead</Text>
        </Pressable>
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
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  rowContainer:{
    flexDirection:"row",justifyContent:"space-between",alignItems:"center"
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#212529',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginLeft: 10,
  },
  headerSpacer: {
    flex: 1,
  },
  progressSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 10,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 2,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 3,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
    opacity: 0.5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#212529',
    paddingVertical: 0,
  },
  contentSection: {
    flex: 1,
  },
  tableContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#4fc3f7',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  nameColumn: {
    flex: 2,
    textAlign: 'left',
  },
  idColumn: {
    flex: 2,
    textAlign: 'center',
  },
  dateColumn: {
    flex: 2,
    textAlign: 'center',
  },
  statusColumn: {
    flex: 2,
    alignItems: 'center',
  },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
    alignItems: 'center',
  },
  leadName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#212529',
  },
  leadNumber: {
    fontSize: 11,
    color: '#6c757d',
    marginTop: 2,
  },
  cellText: {
    fontSize: 11,
    color: '#6c757d',
    textAlign: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'center',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  paginationContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  paginationText: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#dee2e6',
  },
  activeDot: {
    backgroundColor: '#4fc3f7',
  },
  circle: {
     width: 20,
    height: 20,
    borderRadius: 50, // Half of width/height
    backgroundColor: '#3498db',
  },
  btnContainer:{
    backgroundColor:"#4fc3f7",
    padding:10,
    margin:10,
    borderRadius:10,
    width:100,
    height:40,
    justifyContent:"center",
    alignItems:'center'
  }
});

export default Leads;
