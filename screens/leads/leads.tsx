import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  StatusBar,
  Image,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Header from '../../commonComponents/Header';
import { useNavigation } from '@react-navigation/native';
import ActionAlert from '../../commonComponents/ActionAlert';
import { useLead } from '../../features/leads/useLead';
import { PaginationDots } from './components/paginationDots';
import { LeadRow, TableHeader } from './components/leadRow';
import { ProgressBar } from './components/progressBar';
import { Lead } from '../../features/leads/type';

const { width } = Dimensions.get('window');

const Leads = () => {
    const navigation = useNavigation()
  const [searchText, setSearchText] = useState('');
  const [modalVisible,setModalVisible] = useState(false)
  const [leadInfo,setLeadInfo] = useState('')
  const {data,isLoading} = useLead()
  const [currentPage, setCurrentPage] = useState(null);
  const [leadData, setLeadData] = useState(null);

    useEffect(() => {
    if (data) {
      setLeadData(data?.data);
    }
    }, [data]);


  if(isLoading){
    return <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
      <ActivityIndicator size={'large'}/>
    </View>
  }




  const SearchIcon = () => <Text style={styles.searchIcon}>🔍</Text>;


  return (
    <>


      <ActionAlert showModal={modalVisible} setModalVisible={setModalVisible} leadInfo={leadInfo}/>
      <StatusBar backgroundColor="#f8f9fa" barStyle="dark-content" />

      {/* Header */}
      <Header title="Lead Tracker" />

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressStats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Leads</Text>
            <Text style={styles.statValue}>{data?.data?.length}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>KYC</Text>
            <Text style={styles.statValue}>{data?.data?.filter(item => item?.leadStatus === 'moved_to_kyc').length}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Onboarding</Text>
            <Text style={styles.statValue}>{data?.data?.filter(item => item?.leadStatus === 'kyc_submitted').length}</Text>
          </View>
        </View>
        <View style={{ marginHorizontal: 40 }}>
          <ProgressBar progress={currentPage} />
        </View>
        <View style={[styles.rowContainer,{top:-10,marginHorizontal:40}]}>
   <Pressable onPress={() => {
    setCurrentPage(0)
      setLeadData(data?.data?.filter(item => item.leadStatus === 'new'))
    }}>
  <View
    style={[
      styles.circle,
      currentPage >= 0 && { backgroundColor: "gray" }
    ]}
  />
</Pressable>

<Pressable onPress={() => {
  setCurrentPage(50)
  // setLeadData(data)
   
  setLeadData(data?.data?.filter(item => item.leadStatus === 'moved_to_kyc'))
}}>
  <View
    style={[
      styles.circle,
      currentPage >=50 && { backgroundColor: "gray" }
    ]}
  />
</Pressable>

<Pressable onPress={() => {
  setCurrentPage(100)
  setLeadData(data?.data?.filter(item => item.leadStatus === 'kyc_submitted'))
}}>
  <View
    style={[
      styles.circle,
      currentPage >= 100 && { backgroundColor: "gray" }
    ]}
  />
</Pressable>

      
      
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
          {leadData?.map((lead:Lead,idx:number) => (
            <LeadRow key={idx} lead={lead} idx={idx} setModalVisible={setModalVisible} setLeadInfo={setLeadInfo}  />
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

    </>
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
