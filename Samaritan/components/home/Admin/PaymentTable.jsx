import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { COLORS } from "../../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";

const Table = ({ data }) => {
  const renderRow = ({ item }) => {
    const { seeker, mentor, type, status } = item;

    SERVICE_TYPE_ICON = {
      Accommodation: "bed-outline",
      "Part-Time Job": "construct-outline",
    };

    STATUS_ICON = {
      PENDING: "hourglass-outline",
      ACCEPTED: "thumbs-up-outline",
      DECLINED: "thumbs-down-outline",
    };

    return (
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.textStyle}>
            {seeker.fname} {seeker.lname}
          </Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.textStyle}>
            {mentor.fname} {mentor.lname}
          </Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.textStyle}>
            <Ionicons name={SERVICE_TYPE_ICON[type]} size={20} />
          </Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.textStyle}>
            <Ionicons name={STATUS_ICON[status]} size={20} />
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Seeker</Text>
        <Text style={styles.headerCell}>Mentor</Text>
        <Text style={styles.headerCell}>Type</Text>
        <Text style={styles.headerCell}>Status</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  headerRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: COLORS.white,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.white,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: COLORS.white,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    borderRightColor: COLORS.primary,
  },
  textStyle: {
    color: COLORS.white,
    textAlign: "center",
  },
});

export default Table;