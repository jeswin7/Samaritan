import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

const Table = ({ data }) => {
  const renderRow = ({ item }) => {
    const { seeker, mentor, type, status } = item;

    return (
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>{seeker.fname} {seeker.lname}</Text>
        </View>
        <View style={styles.cell}>
          <Text>{mentor.fname} {mentor.lname}</Text>
        </View>
        <View style={styles.cell}>
          <Text>{type}</Text>
        </View>
        <View style={styles.cell}>
          <Text>{status}</Text>
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
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: COLORS.primary,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    borderRightColor: COLORS.primary,
  },
});

export default Table;
