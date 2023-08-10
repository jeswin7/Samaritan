import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import { Picker } from '@react-native-picker/picker';

import styles from "./welcome.style";
import { icons, SIZES, COLORS, strings, api } from "../../../constants";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


const Welcome = (props) => {
  const router = useRouter();
  const navigation = useNavigation();

  const [mentorsList, setMentorsList] = useState([]);
  const [focussedMentor, setFocussedMentor] = useState(null);
  const [connReqs, setConnReqs] = useState([]);

  const [filterName, setFilterName] = useState('');
  const [filterValue, setFilterValue] = useState(1);
  const [showPicker, setShowPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);



  useEffect(() => {
    fetchMentors()
    fetchSeekerConnRequests()
  }, [])


  const fetchMentors = async () => {
    try {
      // Make API requests here
      const response = await fetch(`${api.apiUrl}/mentors`);
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


  // search handle
  const handleSearchClick = (text) => {
    // Perform search button click here
    if (text) {
      setSearchTerm(text);
    }
  };

  // Fetch Connection requests of logged in seeker
  const fetchMentorsFiltered = async (filterName, filterValue) => {
    try {
      // Make API requests here
      const response = await fetch(`${api.apiUrl}/mentors/filter?filterName=${encodeURIComponent(filterName)}&filterValue=${encodeURIComponent(filterValue)}`);
      const data = await response.json();
      //console.log('Fetched data:', data);
      setMentorsList(data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };



  // filter handle
  const handleFilterClick = () => {
    if(!showPicker){
      setShowPicker(true);
    }else{
      setShowPicker(false);
    }
  };




  //Home Component
  function HomeScreen({ searchTerm, setSearchTerm }) {
    const navigation = useNavigation();

    const renderHomeItem = ({ item }) => <HomeItem item={item} />

    const ItemSeparatorView = () => <View style={styles.seperatorStyle} />

    const HomeItem = ({ item }) => (
      <TouchableOpacity onPress={() => {
        setFocussedMentor(item);
        setShowPicker(false);
        navigation.navigate("Details", { item });
      }
      }>
          <View style={styles.listView}>
            <View style={styles.item}>
              <Text style={styles.titleNameStyle}>{item.fname} {item.lname}</Text>
              <Text style={styles.title}>{SERVICE_MAP[item.serviceOffered]} | {ONTARIO_CITIES_MAP[item.currentLocation]}</Text>
              <Text style={styles.title}> {[...Array(5)].map((_, index) => (
                <Text key={index} style={styles.star}>
                  {index < Math.floor(item.rating) ? '★' : '☆'}
                </Text>
              ))}</Text>
            </View>
            <View style={styles.cheveronView}>
              {/* <Image source={icons.cheveron_icon} style={styles.cheveronIcon}></Image> */}
              <Ionicons size={34} style={{color:COLORS.white}} name="chevron-forward-outline"></Ionicons>
            </View>
          </View>
      </TouchableOpacity>

    );


    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.homeContainer}>
            <View style={styles.homeSubContainer}>
              <View style={styles.searchContainer}>
                  <View style={styles.searchWrapper}>
                    <TextInput
                      style={styles.searchInput}
                      value={searchTerm}
                      onChangeText={(text) => handleSearchClick(text)}
                      placeholder={strings.searchHintText}
                      placeholderTextColor={COLORS.white}
                    />
                  </View>

                <TouchableOpacity style={styles.searchBtn} >
                  <Image
                    source={icons.search_icon}
                    style={styles.searchBtnImage}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.filterBtn} onPress={handleFilterClick}>
                  <Image
                    source={icons.filter_icon}
                    style={styles.searchBtnImage}
                  />
                </TouchableOpacity>
              </View>
              <View>
                {showPicker ?
                  (<View><Picker dropdownIconColor={COLORS.white} style={{backgroundColor:COLORS.secondary, marginTop:10,color:COLORS.white }} onValueChange={(value) => {
                    setFilterName('serviceOffered')
                    setFilterValue(value)
                    fetchMentorsFiltered('serviceOffered', value)
                    setShowPicker(false)
                  }} selectedValue={filterValue}>

                    <Picker.Item label="Accommodation" value="1" />
                    <Picker.Item label="Part-Time Job" value="2" />
                  </Picker>


                    <Picker dropdownIconColor={COLORS.white} style={{backgroundColor:COLORS.secondary, marginTop:2, color:COLORS.white,borderRadius:10}} onValueChange={(value) => {
                      setFilterName('currentLocation')
                      setFilterValue(value)
                      fetchMentorsFiltered('currentLocation', value)
                      setShowPicker(false)
                    }} selectedValue={filterValue}>

                      <Picker.Item label="Waterloo" value="2" />
                      <Picker.Item label="Kitchener" value="3" />

                      <Picker.Item label="Toronto" value="4" />
                      <Picker.Item label="Ottawa" value="5" />
                      <Picker.Item label="Hamilton" value="6" />
                      <Picker.Item label="London" value="7" />
                      <Picker.Item label="Mississauga" value="8" />
                      <Picker.Item label="Brampton" value="9" />
                      <Picker.Item label="Markham" value="10" />
                    </Picker></View>) : null
                }

              </View>



              {
                mentorsList.length > 0 ?
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
        </View>
      </ScrollView>

    );
  }


  // Fetch Connection requests of logged in seeker
  const fetchSeekerConnRequests = async () => {
    try {
      // Make API requests here
      const response = await fetch(`${api.apiUrl}/seeker/connectionRequests?user_id=${props.userId}`);
      const data = await response.json();
      setConnReqs(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Request Component
  function RequestComponent({ }) {

    //fetchSeekerConnRequests()

    const ItemSeparatorView = () => <View style={styles.seperatorStyle} />

    const RequestItem = ({ item }) => (
      <TouchableOpacity>
        <View style={styles.listView}>
          <View style={styles.item}>
            <Text style={styles.titleNameStyle}>{item.mentor[0].fname} {item.mentor[0].lname}</Text>
            <Text style={styles.title}>{SERVICE_MAP[item.connection.service]}</Text>
            <View style={styles.statusView}>
              <Text style={[styles.statusTitle,{color:item.connection.status === 'DECLINED' ? COLORS.red : item.connection.status === 'ACCEPTED' ? COLORS.secondary : COLORS.gold}]}>{item.connection.status}</Text>
            </View>

          </View>
        </View>
      </TouchableOpacity>
    )


    const renderRequestItem = ({ item }) => <RequestItem item={item} />;


    return (
      <View style={styles.homeContainer}>
        <View style={styles.homeSubContainer}>
          <View style={styles.requestContainer}>
            <FlatList
              data={connReqs}
              renderItem={renderRequestItem}
              ItemSeparatorComponent={ItemSeparatorView}
              keyExtractor={item => item.connection.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
    );
  }

  // Notification modal component

  const toggleNotifications = () => {
    setShowPicker(false);
    setShowNotifications(!showNotifications);
  };

  const NotificationsModal = () => {
    return (
        <View style={styles.containernotification}>
          <View style={styles.notificationheader}>
            <Text style={styles.headertext}>Notifications</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowNotifications(false)}
            >
              <Image source={icons.cancel_icon}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.notificationline}></View>

          <View style={styles.subContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.notificationcardContainer}>
                <Text style={styles.textContainer}>
                  Your Connection request for Accommodation has been sent Successfully!
                </Text>
              </View>
              <View style={styles.notificationcardContainer}>
                <Text style={styles.textContainer}>
                  Your Connection request for Part time job has been sent Successfully!
                </Text>
              </View>
              <View style={styles.notificationcardContainer}>
                <Text style={styles.textContainer}>
                  Your Connection request for Part time job has been sent Accepted by Mentor!
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
    );
  };

  //Mentor Details Screen
  function MentorDetailsScreen({ route }) {
    const { item } = route.params;
    //console.log('metor list', item);
    const [requestSent, setrequestSent] = useState(false);

    // Send Connection request API initiate
    const handleSendConnectionRequest = async (item) => {
      // POST API
      fetch(`${api.apiUrl}/addConnection`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          seekerId: props.userId,
          mentorId: item.id,
          serviceId: item.serviceOffered
        })
      })
        .then(() => {
          Alert.alert(
            'Request Sent!', // Specify the desired title here
            `Your Connection Request to ${item.fname} ${item.lname} Sent Successfully!`,
            [
              { text: 'Done', onPress: () => setrequestSent(true) }
            ]
          );
        });
    }

    return (
      <View style={styles.mentorDetailsContainer}>
        <View style={styles.mentorDetailsSubContainer}>
            <View style={styles.detailView}>
              <View style={styles.item}>
                <Text style={styles.title}>{ONTARIO_CITIES_MAP[item.currentLocation]}</Text>
                <Text style={styles.title}>{SERVICE_MAP[item.serviceOffered]}</Text>
                <Text style={styles.title}>{[...Array(5)].map((_, index) => (
                  <Text key={index} style={styles.star}>
                    {index < Math.floor(item.rating) ? '★' : '☆'}
                  </Text>
                ))}</Text>
              </View>
            </View>
        </View>
        {
          !requestSent &&
          <TouchableOpacity onPress={() => handleSendConnectionRequest(item)} style={styles.sendConnectionButton}>
            <Text style={styles.sendConnectionText}>{strings.dendConnectionRequest}</Text>
          </TouchableOpacity>
        }

      </View>
    );
  }

  const handleSignOut = () => {
    // Call the props.logout function here
    Alert.alert(
      "Sign Out?", // Specify the desired title here
      `Are you sure, you want to sign out?`,
      [{ text: "No" }, { text: "Yes", onPress: () => props.logout() }],
    );
  };

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Sign Out" labelStyle={{ color: COLORS.white }} onPress={() => handleSignOut()} />
      </DrawerContentScrollView>
    );
  }

  return (
    <NavigationContainer independent={true}>
      {showNotifications && <NotificationsModal />}
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
          title: 'Home',
          headerTitleAlign: 'center',
          headerTintColor: COLORS.secondary,
          headerTitleStyle: styles.dashboardHeading,
          headerStyle: {
            backgroundColor: COLORS.white
          },
          headerRight: () => (
            <TouchableOpacity style={styles.buttonBellStyle} onPress={toggleNotifications}>
              <Image source={icons.bell_icon}></Image>
            </TouchableOpacity >
          ),
        }} />

        <Drawer.Screen name="Requests" component={RequestComponent} options={{
          title: 'Requests',
          headerTitleAlign: 'center',
          headerTintColor: COLORS.secondary,
          headerTitleStyle: styles.dashboardHeading,
          headerRight: () => (
            <TouchableOpacity style={styles.buttonBellStyle} onPress={toggleNotifications}>
              <Image source={icons.bell_icon}></Image>
            </TouchableOpacity >
          ),
        }} />

        <Drawer.Screen name="Details" component={MentorDetailsScreen} options={{
          title: focussedMentor ? `${focussedMentor.fname} ${focussedMentor.lname}` : 'DETAILS',
          headerTitleAlign: 'center',
          headerTintColor: COLORS.secondary,
          headerTitleStyle: styles.dashboardHeading,
          drawerItemStyle: { height: 0 },
          headerRight: () => (
            <TouchableOpacity style={styles.buttonBellStyle} onPress={toggleNotifications}>
              <Image source={icons.bell_icon}></Image>
            </TouchableOpacity >
          ),
        }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Welcome;