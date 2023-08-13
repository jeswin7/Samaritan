import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS, api, strings } from "../../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";

const Table = ({ data, refresh }) => {
  const renderRow = ({ item }) => {
    SERVICE_TYPE_ICON = {
      1: "bed-outline",
      2: "construct-outline",
    };

    STATUS_ICON = {
      APPLIED: "Applied",
      INVITED: "Invited",
      APPROVED: "Approved",
    };

    const handleDelete = async (id) => {
      try {
        // Make API requests here
        const response = await fetch(api.apiUrl + `/admin/deleteSeeker?id=` + id);
        const data = await response.json();
        refresh();
      } catch (error) {
        console.log(error);
      }
    }

    return (
      <View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.textStyle}>
              {item.fname} {item.lname}
            </Text>
          </View>

          <View style={styles.cell}>
            <Text style={styles.textStyle}>
              {item.num}
            </Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.textStyle}>
              {item.location}
            </Text>
          </View>

          <View style={styles.cell}>
            <Text style={styles.textStyle}>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-bin" size={20} color="white" />
              </TouchableOpacity>
            </Text>
          </View>
        </View>
        <View style={styles.separatorStyle}></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>{strings.nameLbl}</Text>
        <Text style={styles.headerCell}>{strings.phoneLbl}</Text>
        <Text style={styles.headerCell}>{strings.targetCityLbl}</Text>
        <Text style={styles.headerCell}>{strings.actionLbl}</Text>

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
    fontSize: 16
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
