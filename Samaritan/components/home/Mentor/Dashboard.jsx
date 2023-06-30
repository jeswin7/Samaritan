import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Button
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES, COLORS, strings } from "../../../constants";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


const Drawer = createDrawerNavigator();

const DATA = [
  {
    id: '1',
    name: 'Service 1',
    location: 'Waterloo',
    service: 'Accomodation',
    rating: '3'
  },
  {
    id: '2',
    name: 'Service 2',
    location: 'Waterloo',
    service: 'Accomodation',
    rating: '4'
  }
];



const onPress = (item, navigation) => {
  console.log('click',item);
}

const Item = ({ item, navigation }) => (
  <TouchableOpacity onPress={() => onPress(item,navigation)}>
    <View style={styles.listView}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.title}>{item.location}</Text>
        <Text style={styles.title}>{item.service}</Text>
        <Text style={styles.title}>{item.rating}</Text>
      </View>
      <View style={styles.cheveronView}>
        <Image source={icons.cheveron_icon} style={styles.cheveronIcon}></Image>
      </View>
    </View>
  </TouchableOpacity>

);

const renderItem = ({ item }) => {
 return   (
 <Item  item={item} />);
}



const ItemSeparatorView = () => {
  return (
    //Item Separator
    <View
      style={styles.seperatorStyle}
    />
  );
};

//search handle
const handleSearchClick = () => {
  // Perform search button click here
  console.log('Search button click...');
};

//Home Component
function HomeScreen({ navigation, searchTerm, setSearchTerm, handleSearchClick }) {
  return (
    <View style={styles.homeContainer}>
      <View style={styles.homeSubContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              placeholder={strings.searchHintText}
            />
          </View>

          <TouchableOpacity style={styles.searchBtn} onPress={handleSearchClick}>
            <Image
              source={icons.search_icon}
              style={styles.searchBtnImage}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterBtn} onPress={handleSearchClick}>
            <Image
              source={icons.filter_icon}
              style={styles.searchBtnImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.tabsContainer}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparatorView}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
}

//Notification component
function ProfileScreen({ navigation }) {
  return (
    <View style={styles.profileView}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Dashboard = () => {
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} options={{
          title: 'SAMARITAN',
          headerTitleAlign: 'center',
          headerTintColor: COLORS.secondary,
          headerTitleStyle: styles.dashboardHeading,
          headerRight: () => (
            <TouchableOpacity style={styles.buttonBellStyle} onPress={() => alert('notification')}>
              <Image source={icons.bell_icon}></Image>
            </TouchableOpacity >
          ),
        }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{
          title: 'PROFILE',
          headerTitleAlign: 'center',
          headerTintColor: COLORS.secondary,
          headerTitleStyle: styles.dashboardHeading,
          headerRight: () => (
            <TouchableOpacity style={styles.buttonBellStyle} onPress={() => alert('notification')}>
              <Image source={icons.bell_icon}></Image>
            </TouchableOpacity >
          ),
        }} />
      </Drawer.Navigator>
    </NavigationContainer>
 );
};

export default Dashboard;