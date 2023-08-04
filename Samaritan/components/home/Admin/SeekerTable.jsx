import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS, api } from "../../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Table = ({ data, refresh }) => {
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

    const ONTARIO_CITIES_MAP = {
      2: 'Waterloo',
      3: 'Kitchener',
      4: 'Toronto',
      5: 'Ottawa',
      6: 'Hamilton',
      7: 'London',
      8: 'Mississauga',
      9: 'Brampton',
      10: 'Markham',
    };

    const handleDelete = async (id) => {
      try {
        // Make API requests here
        const response = await fetch(api.apiUrl + `/admin/deleteSeeker?id=`+id);
        const data = await response.json();
        refresh();
      } catch (error) {
        console.log(error);
      }
    }
 


    return (
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
          <TouchableOpacity  onPress={()=>handleDelete(item.id)}>
            <Ionicons name="trash-bin" size={20} color="white"/>        
          </TouchableOpacity>
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Number</Text>
        <Text style={styles.headerCell}>Target City</Text>
        <Text style={styles.headerCell}>Action</Text>

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
