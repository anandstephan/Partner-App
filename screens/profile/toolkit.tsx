import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Header from "../../commonComponents/Header";
import Colors from "../../constants/color"; // optional if you use color constants
import { SafeAreaView } from "react-native-safe-area-context";

export default function Toolkit() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Toolkit" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        
        {/* PRODUCT INFO */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="package" size={16} color="#555" />
            <Text style={styles.sectionTitle}>Product Info</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Product 1</Text>
            <Text style={styles.cardSubtitle}>
              Detailed battery specifications are provided.
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Product 2</Text>
            <Text style={styles.cardSubtitle}>
              Detailed charger specifications are provided.
            </Text>
          </View>
        </View>

        {/* VIDEOS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="video" size={16} color="#555" />
            <Text style={styles.sectionTitle}>Videos</Text>
          </View>

          <View style={styles.videoRow}>
            <TouchableOpacity style={styles.videoCard}>
              <Image
                source={{ uri: "https://via.placeholder.com/120x70" }}
                style={styles.videoThumb}
              />
              <View style={styles.videoOverlay}>
                <Text style={styles.videoText}>How to use the battery</Text>
                <Text style={styles.videoPlay}>▶ Play</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.videoCard}>
              <Image
                source={{ uri: "https://via.placeholder.com/120x70" }}
                style={styles.videoThumb}
              />
              <View style={styles.videoOverlay}>
                <Text style={styles.videoText}>How to use the charger</Text>
                <Text style={styles.videoPlay}>▶ Play</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* DOCUMENTS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="file-text" size={16} color="#555" />
            <Text style={styles.sectionTitle}>Document</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Document 1</Text>
            <Text style={styles.cardSubtitle}>
              Learn more about the battery.
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Document 2</Text>
            <Text style={styles.cardSubtitle}>
              Learn more about the charger.
            </Text>
          </View>
        </View>

        {/* FAQ BUTTON */}
        <TouchableOpacity style={styles.faqButton}>
          <Text style={styles.faqText}>FAQs</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  section: {
    backgroundColor: "#F4F4F4",
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginLeft: 6,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 3,
  },
  videoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  videoCard: {
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    width: "48%",
    overflow: "hidden",
  },
  videoThumb: {
    width: "100%",
    height: 90,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  videoOverlay: {
    paddingVertical: 8,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  videoText: {
    fontSize: 12,
    color: "#444",
    marginBottom: 2,
  },
  videoPlay: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1E824C",
  },
  faqButton: {
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  faqText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
});
