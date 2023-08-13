import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS, strings } from "../../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Table = ({ data }) => {
  const navigation = useNavigation();
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

    const redirectToDetail = (item) => {
      navigation.navigate("updatePayment", { item })
    }

    return (
      <View>
        <TouchableOpacity onPress={() => redirectToDetail(item)}>
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
               {status}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.separatorStyle}></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>{strings.seekerLbl}</Text>
        <Text style={styles.headerCell}>{strings.mentorLbl}</Text>
        <Text style={styles.headerCell}>{strings.typeLbl}</Text>
        <Text style={styles.headerCell}>{strings.statusLbl}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={(index) => index.toString()}
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
    flexDirection: 'row',
    paddingVertical: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.white,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    backgroundColor: '#458592',
    opacity: 0.9,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
  separatorStyle: {
    width: '100%',
    height: 10
  }
});

export default Table;
