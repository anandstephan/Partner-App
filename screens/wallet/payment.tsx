import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../commonComponents/Header";
import PaymentCard from "./components/paymentCard";
import { getEmis } from "../../features/emi/emi";
import { useEmiByDueType } from "../../features/emi/useEmiByDueType";

const Payment = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const { mutate } = useEmiByDueType();

  const [page, setPage] = useState(1);
  const [emiList, setEmiList] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);

  // 🔥 Main pagination loader
  const loadEmis = async () => {
    if (!hasNextPage || loading) return;
    setLoading(true);

    const res = await getEmis(page, 20, activeTab); // active tab pass
    console.log("PAGE DATA:", res);

    if (page === 1) {
      setEmiList(res.data);
    } else {
      setEmiList((prev) => [...prev, ...res.data]);
    }

    setHasNextPage(res.pageInfo.hasNextPage);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadEmis(); // first load
  }, []);

  // 🔄 Tab click pe reset + fresh load
  const onTabChange = (value: string) => {
    console.log(value,"vvvv")
    setActiveTab(value);
    setPage(1);
    setHasNextPage(true);
    setEmiList([]);

    mutate(value, {
      onSuccess: (res) => {
        console.log("FILTERED DATA:", res);
        setEmiList(res);
        setHasNextPage(res.pageInfo.hasNextPage);
      },
    });
  };

  const tabs = [
    { name: "Upcoming EMI’s", value: "upcoming" },
    { name: "Due Today", value: "today" },
    { name: "Past Due", value: "past" },
  ];

  const renderItem = ({ item }: any) => {
    return <PaymentCard {...item} />;
  };

  return (
    <>
      <Header title="EMI Tracker" />
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#888" />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="#888"
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {tabs.map((tab) => (
            <Pressable
              key={tab.name}
              style={[
                styles.tab,
                activeTab === tab.value && styles.activeTab,
              ]}
              onPress={() => onTabChange(tab.value)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.value && styles.activeTabText,
                ]}
              >
                {tab.name}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* EMI LIST */}
        <FlatList
          data={emiList}
          keyExtractor={(item) => item?._id}
          renderItem={renderItem}
          onEndReached={() => {
            if (hasNextPage && !loading) loadEmis();
          }}
          onEndReachedThreshold={0.4}
          ListEmptyComponent={
            !loading && (
              <Text style={{ textAlign: "center", marginTop: 50 }}>
                No EMI Records Found {JSON.stringify(emiList)}
              </Text>
            )
          }
          ListFooterComponent={
            loading ? (
              <ActivityIndicator
                size="large"
                style={{ marginVertical: 20 }}
              />
            ) : null
          }
        />
      </View>
    </>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 40,
    marginBottom: 12,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#000",
  },
  tabRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#eee",
    marginHorizontal: 4,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#1976D2",
  },
  tabText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
  },
});
