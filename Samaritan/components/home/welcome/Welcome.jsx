import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
  Alert
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES, COLORS, strings, api } from "../../../constants";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";



const Welcome = (props) => {
  const router = useRouter();
  const navigation = useNavigation();

  const [mentorsList, setMentorsList] = useState([]);
  const [focussedMentor, setFocussedMentor] = useState(null);
  const [connReqs, setConnReqs] = useState([]);

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


  //search handle
  const handleSearchClick = () => {
    // Perform search button click here
    console.log('Search button click...');
  };



  //Home Component
  function HomeScreen({ searchTerm, setSearchTerm, handleSearchClick }) {
    const navigation = useNavigation();

    const renderHomeItem = ({ item }) => <HomeItem item={item} />

    const ItemSeparatorView = () => <View style={styles.seperatorStyle} />

    const HomeItem = ({ item }) => (
      <TouchableOpacity onPress={() => { 
        setFocussedMentor(item); 
        navigation.navigate("Details", { item }); 
        }
        }>
        <View style={styles.listView}>
          <View style={styles.item}>
            <Text style={styles.title}>{item.fname} {item.lname}</Text>
            <Text style={styles.title}>{ONTARIO_CITIES_MAP[item.currentLocation]}</Text>
            <Text style={styles.title}>{SERVICE_MAP[item.serviceOffered]}</Text>
            <Text style={styles.title}> {[...Array(5)].map((_, index) => (
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
  function RequestComponent({ navigation, searchTerm, setSearchTerm, handleSearchClick }) {

    fetchSeekerConnRequests()

    const ItemSeparatorView = () => <View style={styles.seperatorStyle} />

    const RequestItem = ({ item }) => (
        <TouchableOpacity>
        <View style={styles.listView}>
          <View style={styles.item}>
            <Text style={styles.title}>{item.mentor[0].fname} {item.mentor[0].lname}</Text>
            <Text style={styles.title}>{SERVICE_MAP[item.connection.serviceId]}</Text>
            <View style={styles.statusView}>
              <View style={[styles.statusIcon, { backgroundColor: item.connection.status === 'DECLINED' ? COLORS.red : item.connection.status === 'ACCEPTED' ? COLORS.green : COLORS.yellow }]}></View>
              <Text style={styles.statusTitle}>{item.connection.status}</Text>
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

  //Notification component
  function ProfileScreen({ navigation }) {
    return (
      <View style={styles.profileView}>
        <View style={styles.headerView}>
         <Image source={icons.profileLogo} style={styles.profileLogo}></Image>
      </View>
       <ScrollView showsVerticalScrollIndicator={false} style={{width:"90%"}}>
       
       <View style={{paddingHorizontal:1, paddingVertical: 20}}>
       <View style={styles.searchContainer}>
          <View style={styles.textWrapper}>
            <Text style={styles.Text}>Personal Details</Text>
            <View style= {{height:3, width:'140%',backgroundColor:COLORS.primary, margin:8}}></View>
          </View>
          <TouchableOpacity style={styles.editBtn} onPress={handleSearchClick}>
            <Image
              source={icons.editIcon}
              style={styles.editBtnImage}
            />
          </TouchableOpacity>
        </View>
    
          <Text style={styles.TextField}  editable = {false}>First Name</Text>
          <Text style={styles.TextField}  editable = {false}>Last Name</Text>
          <Text style={styles.TextField}  editable = {false}>Phone Number</Text>
          <Text style={styles.TextField}  editable = {false}>Country</Text>
          <Text style={styles.TextField}  editable = {false}>Preferred Location</Text>
          
          <View style={styles.searchContainer}>
          <View style={styles.textWrapper}>
            <Text style={styles.Text}>Change Password</Text>
            <View style= {{height:3, width:'140%',backgroundColor:COLORS.primary, margin:8}}></View>
          </View>
          <TouchableOpacity style={styles.editBtn} onPress={handleSearchClick}>
            <Image
              source={icons.editIcon}
              style={styles.editBtnImage}
            />
          </TouchableOpacity>
        </View>
          <Text style={styles.TextField}  editable = {false}>Password</Text>
          <Text style={styles.TextField}  editable = {false}>Confirm Password</Text>

         <TouchableOpacity  style={styles.saveButton}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
      </ScrollView>
      </View>
    );
  }  
  



  //Mentor Details Screen
  function MentorDetailsScreen({ route }) {
    const { item } = route.params;
    console.log('metor list', item);
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

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="LOG OUT" labelStyle={{ color: COLORS.white }} onPress={() => alert('Logout')} />
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
          title: focussedMentor ? `${focussedMentor.fname} ${focussedMentor.lname}` : 'DETAILS',
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