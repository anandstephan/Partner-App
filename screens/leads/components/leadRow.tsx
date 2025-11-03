import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import { Lead } from "../../../features/leads/type";
import { StatusBadge } from "./statusBagde";

interface ParticularLead{
    lead:Lead;
    idx:number;
    setModalVisible:Function;
    setLeadInfo:Function
}

export const TableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={[styles.headerText, styles.serialColumn]}>#</Text>
    <Text style={[styles.headerText, styles.nameColumn]}>Lead Name</Text>
    <Text style={[styles.headerText, styles.idColumn]}>Lead ID</Text>
    <Text style={[styles.headerText, styles.dateColumn]}>Add Date</Text>
    <Text style={[styles.headerText, styles.statusColumn]}>Status</Text>
  </View>
);

export const LeadRow = ({ lead, idx,setModalVisible,setLeadInfo }:ParticularLead) => {
  return (
    <View style={styles.tableRow}>
      <Text style={[styles.cellText, styles.serialColumn]}>#{idx + 1}</Text>
      <Text style={[styles.cellText, styles.nameColumn]}>{lead.firstName}</Text>
      <Text style={[styles.cellText, styles.idColumn]}>{lead.leadId}</Text>
      <Text style={[styles.cellText, styles.dateColumn]}>
        {new Date(lead.createdAt).toISOString().split("T")[0]}
      </Text>
      <Pressable onPress={()=>{
        setModalVisible(prev =>!prev)
        setLeadInfo(lead)
      }}>
        <View style={[styles.statusColumn, { alignItems: "center" }]}>
          <StatusBadge status={lead.leadStatus} />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#4fc3f7",
    paddingVertical: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f4",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  cellText: {
    fontSize: 11,
    color: "#333",
    textAlign: "center",
  },
  serialColumn: {
    flex: 0.7,
    textAlign: "left",
    paddingLeft: 5,
   
  },
  nameColumn: {
    flex: 2.5,
    textAlign: "left",
    paddingLeft: 5,
  },
  idColumn: {
    flex: 1.8,
  },
  dateColumn: {
    flex: 2,
  },
  statusColumn: {
    flex: 1.5,
    justifyContent: "center",
  },
});
