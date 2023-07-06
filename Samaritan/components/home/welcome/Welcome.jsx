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
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


const Drawer = createDrawerNavigator();

const DATAHome = [
  {
    id: '1',
    name: 'First Name',
    location: 'Waterloo',
    service: 'Accomodation',
    rating: '3'
  },
  {
    id: '2',
    name: 'Second Name',
    location: 'Waterloo',
    service: 'Accomodation',
    rating: '4'
  },
  {
    id: '3',
    name: 'Third Name',
    location: 'Waterloo',
    service: 'Accomodation',
    rating: '4'
  },
  {
    id: '4',
    name: 'Fourth Name',
    location: 'Waterloo',
    service: 'Accomodation',
    rating: '4'
  },
];

const DATARequest = [
  {
    id: '1',
    name: 'First Name',
    service: 'Accomodation',
    status: 'Requested'
  },
  {
    id: '2',
    name: 'Second Name',
    service: 'Accomodation',
    status: 'Accepted'
  },
  {
    id: '3',
    name: 'Third Name',
    service: 'Accomodation',
    status: 'Declined'
  },
  {
    id: '4',
    name: 'Fourth Name',
    service: 'Accomodation',
    status: 'Declined'
  }
];

const onHomeItemPress = (item) => {
  console.log('click', item);
  const navigation = useNavigation();
  navigation.navigate("ProfileScreen");
}

//search handle
const handleSearchClick = () => {
  // Perform search button click here
  console.log('Search button click...');
};

//Home Component
function HomeScreen({ searchTerm, setSearchTerm, handleSearchClick }) {
  const navigation = useNavigation();

  const HomeItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Details", { item })}>
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

  const renderHomeItem = ({ item }) => {
    return (
      <HomeItem item={item} />);
  }



  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View
        style={styles.seperatorStyle}
      />
    );
  };

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
            data={DATAHome}
            renderItem={renderHomeItem}
            ItemSeparatorComponent={ItemSeparatorView}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
}

const RequestItem = ({ item, navigation }) => (
  <TouchableOpacity onPress={() => onHomeItemPress(item, navigation)}>
    <View style={styles.listView}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.title}>{item.service}</Text>
        <View style={styles.statusView}>
          <View style={[styles.statusIcon, { backgroundColor: item.status === 'Declined' ? COLORS.red : item.status === 'Accepted' ? COLORS.green : COLORS.yellow }]}></View>
          <Text style={styles.statusTitle}>{item.status}</Text>
        </View>

      </View>
    </View>
  </TouchableOpacity>

);

const renderRequestItem = ({ item }) => {
  return (
    <RequestItem item={item} />);
}

//Request Component
function RequestComponent({ navigation, searchTerm, setSearchTerm, handleSearchClick }) {
  return (
    <View style={styles.homeContainer}>
      <View style={styles.homeSubContainer}>
        <View style={styles.requestContainer}>
          <FlatList
            data={DATARequest}
            renderItem={renderRequestItem}
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

//
function handleSendConnectionRequest() {

}

//Mentor Details Screen
function MentorDetailsScreen({ route }) {
  const { item } = route.params;
  console.log('metor list', item);
  return (
    <View style={styles.mentorDetailsContainer}>
      <View style={styles.mentorDetailsSubContainer}>
        <View style={styles.listView}>
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.title}>{item.location}</Text>
            <Text style={styles.title}>{item.service}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {[...Array(5)].map((_, index) => (
                <Text key={index} style={styles.star}>
                  {index < Math.floor(item.rating) ? '★' : '☆'}
                </Text>
              ))}
            </View>

          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleSendConnectionRequest} style={styles.sendConnectionButton}>
        <Text style={styles.sendConnectionText}>{strings.dendConnectionRequest}</Text>
      </TouchableOpacity>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="LOG OUT" labelStyle={{ color: COLORS.white }} onPress={() => alert('Logout')} />
    </DrawerContentScrollView>
  );
}

const Welcome = () => {
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home"
        screenOptions={{
          drawerStyle: {
            backgroundColor: COLORS.secondary,
          },
          drawerActiveBackgroundColor: COLORS.primary,
          drawerLabelStyle: {
            color: '#fff'
          }
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}
      >
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
        <Drawer.Screen name="Requests" component={RequestComponent} options={{
          title: 'REQUESTS',
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
        <Drawer.Screen name="Details" component={MentorDetailsScreen} options={{
          title: 'DETAILS',
          headerTitleAlign: 'center',
          headerTintColor: COLORS.secondary,
          headerTitleStyle: styles.dashboardHeading,
          drawerItemStyle: { height: 0 },
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

export default Welcome;