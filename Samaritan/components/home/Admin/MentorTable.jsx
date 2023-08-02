import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Table = ({ data }) => {
  const navigation = useNavigation();
  const renderRow = ({ item }) => {
    console.log("mentors data----", item);

    SERVICE_TYPE_ICON = {
      1: "bed-outline",
      2: "construct-outline",
    };

    STATUS_ICON = {
      APPLIED: "Applied",
      INVITED: "Invited",
      APPROVED: "Approved",
    };

    const redirectToDetail = (mentor) => {
      navigation.navigate("updatementor", { mentor })
    }

    return (
      <TouchableOpacity onPress={() => redirectToDetail(item)}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.textStyle}>
            {item.fname} {item.lname}
          </Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.textStyle}>
            {<Ionicons name={SERVICE_TYPE_ICON[item.serviceOffered]} size={20} />}
          </Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.textStyle}>
            {item.rating}
          </Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.textStyle}>
            {item.strikeCount}
          </Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.textStyle}>{STATUS_ICON[item.onboardStatus]}</Text>
        </View>
      </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Mentor</Text>
        <Text style={styles.headerCell}>Service(s)</Text>
        <Text style={styles.headerCell}>Rating</Text>
        <Text style={styles.headerCell}>Strikes</Text>
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
