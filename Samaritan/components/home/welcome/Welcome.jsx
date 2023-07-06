import { useEffect, useState } from "react";
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



const Welcome = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const [mentorsList, setMentorsList] = useState([]);

  useEffect(() => {
    fetchMentors()
  }, [])


  const fetchMentors = async () => {
    try {
        // Make API requests here
        const response = await fetch(`http://10.211.55.3:3001/mentors`);
        const data = await response.json();
        setMentorsList(data);
    } catch (error) {
        console.log(error);
    }
};


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

const SERVICE_MAP = {
  1: 'Accommodation',
  2: 'Part-Time Job'
}

const onHomeItemPress = (item, navigation) => {
  console.log('click',item);
}

const HomeItem = ({ item, navigation }) => (
  <TouchableOpacity onPress={() => onHomeItemPress(item,navigation)}>
    <View style={styles.listView}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.fname} {item.lname}</Text>
        <Text style={styles.title}>{ONTARIO_CITIES_MAP[item.currentLocation]}</Text>
        <Text style={styles.title}>{SERVICE_MAP[item.serviceOffered]}</Text>
        <Text style={styles.title}>{[...Array(5)].map((_, index) => (
                            <Text key={index} style={styles.star}>
                                {index < Math.floor(item.rating) ? '★' : '☆'}
                            </Text>
                        ))}</Text>
      </View>
      <View style={styles.cheveronView}>
        <Image source={icons.cheveron_icon} style={styles.cheveronIcon}></Image>
      </View>
    </View>
  </TouchableOpacity>

);

const renderHomeItem = ({ item }) => <HomeItem item={item} />;

const ItemSeparatorView = () => <View style={styles.seperatorStyle}/>

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

{
  mentorsList.length>0? 
  <View style={styles.tabsContainer}>
  <FlatList
    data={mentorsList}
    renderItem={renderHomeItem}
    ItemSeparatorComponent={ItemSeparatorView}
    keyExtractor={item => item.id}
    showsVerticalScrollIndicator={false}
  />
</View>
:
<Text>Loading...</Text>
}

      </View>
    </View>
  );
}

const RequestItem = ({ item, navigation }) => (
  <TouchableOpacity onPress={() => onHomeItemPress(item,navigation)}>
    <View style={styles.listView}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.title}>{item.service}</Text>
        <View style={styles.statusView}>
        <View style={[styles.statusIcon, {backgroundColor: item.status === 'Declined' ? COLORS.red : item.status === 'Accepted' ? COLORS.green : COLORS.yellow }]}></View>
        <Text style={styles.statusTitle}>{item.status}</Text>
        </View>
        
      </View>
    </View>
  </TouchableOpacity>

);

const renderRequestItem = ({ item }) => <RequestItem item={item} />;

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

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="LOG OUT" labelStyle={{color:COLORS.white}} onPress={() => alert('Logout')} />
    </DrawerContentScrollView>
  );
}

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home" 
      screenOptions={{
        drawerStyle: {
          backgroundColor: COLORS.secondary,
        },
        drawerActiveBackgroundColor: COLORS.primary,
        drawerLabelStyle : {
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
      </Drawer.Navigator>
    </NavigationContainer>
 );
};

export default Welcome;