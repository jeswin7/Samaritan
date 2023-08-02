import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import { Picker } from "@react-native-picker/picker";
import styles from "./dashboard.style";
import { icons, SIZES, COLORS, strings, api } from "../../../constants";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DropDownPicker from "react-native-dropdown-picker";
import {
  NavigationContainer,
  ThemeProvider,
  DrawerItem,
} from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import ConnTable from "./ConnTable";
import ServicesTable from "./ServicesTable";
import PaymentTable from "./PaymentTable";
import MentorTable from "./MentorTable";
import Ionicons from "@expo/vector-icons/Ionicons";

const AdminDashboard = (props) => {
  const router = useRouter();

  const Drawer = createDrawerNavigator();
  const [adminDetail, setDetail] = useState({});
  const [connReqs, setConnReqs] = useState(null);
  const [services, setServices] = useState(null);
  const [payments, setPayments] = useState(null);
  const [mentors, setMentors] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [service, setService] = useState("");
  const [status, setStatus] = useState("");
  const [organization, setOrganization] = useState("");
  const [orgtype, setOrgType] = useState("");

  const [selected, setSelected] = useState("");


  const SERVICE_MAP = {
    1: "Accommodation",
    2: "Part-Time Job",
  };

  // Static APIs for testing purpose
  DETAILS_API = {
    fname: "Luke",
    lname: "John",
    rating: "4",
  };

  const SERVICES_API = [
    {
      id: "1",
      name: "Than John",
      service: "Accomodation",
      status: "Completed",
    },
    {
      id: "2",
      name: "Mary Brown",
      service: "Job",
      status: "In Progress",
    },

    {
      id: "3",
      name: "Ed John",
      service: "Accomodation",
      status: "Completed",
    },
    {
      id: "4",
      name: "Tej John",
      service: "Job",
      status: "In Progress",
    },
    {
      id: "5",
      name: "Jake Brown",
      service: "Accomodation",
      status: "Completed",
    },
    {
      id: "6",
      name: "Joel Cullen",
      service: "Job",
      status: "In Progress",
    },
  ];

  const PAYMENT_API = [
    {
      id: "1",
      name: "Jes John",
      service: "Accomodation",
      status: "In Progress",
    },
    {
      id: "2",
      name: "Mary Brown",
      service: "Job",
      status: "Completed",
    },

    {
      id: "3",
      name: "Ed John",
      service: "Accomodation",
      status: "In Progress",
    },
    {
      id: "4",
      name: "Tej John",
      service: "Job",
      status: "In Progress",
    },
    {
      id: "5",
      name: "Jake Brown",
      service: "Accomodation",
      status: "In Progress",
    },
    {
      id: "6",
      name: "Joel Cullen",
      service: "Job",
      status: "Completed",
    },
  ];

  const CONNECTION_REQUESTS_API = [
    {
      id: "1",
      name: "Jes John",
      service: "Accomodation",
      status: "In Progress",
    },
    {
      id: "2",
      name: "Mary Brown",
      service: "Job",
      status: "Completed",
    },

    {
      id: "3",
      name: "Ed John",
      service: "Accomodation",
      status: "In Progress",
    },
    {
      id: "4",
      name: "Tej John",
      service: "Job",
      status: "In Progress",
    },
    {
      id: "5",
      name: "Jake Brown",
      service: "Accomodation",
      status: "In Progress",
    },
    {
      id: "6",
      name: "Joel Cullen",
      service: "Job",
      status: "Completed",
    },
  ];

  const statuslist = [
    { key: "1", value: "Completed" },
    { key: "2", value: "Pending" },
  ];

  const MENTOR_ONBOARD_STATUS_MAP = [
    { key: 'APPLIED', value: 'Applied'},
    { key: 'INVITED', value: 'Invited'},
    { key: 'APPROVED', value: 'Approved'}
  ]



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

  // Dynamic APIS
  // 1. Fetch Mentor Details API
  const fetchDashboardData = async () => {
    try {
      // Make API requests here

      const response = await fetch(api.apiUrl + `/admin/dashboard`);
      const data = await response.json();
      setDetail(data);
    } catch (error) {
      console.log(error);
    }
  };

  // 2. Fetch Services list API
  const fetchServices = async () => {
    try {
      // Make API requests here
      const response = await fetch(api.apiUrl + `/admin/viewServices`);
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.log(error);
    }
  };

  // 3. Fetch Payments list API
  const fetchPayments = async () => {
    try {
      // Make API requests here
      const response = await fetch(api.apiUrl + `/admin/viewPayments`);
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Fetch Mentors
  const fetchMentors = async () => {
    try {
      // Make API requests here
      const response = await fetch(api.apiUrl + `/mentors`);
      const data = await response.json();
      setMentors(data);
      console.log("dtaaaa", data);
    } catch (error) {
      console.log(error);
    }
  };

  // 4. Update Service Status API

  // 5. Fetch Connection Requests
  const fetchConnRequests = async () => {
    try {
      // Make API requests here
      const response = await fetch(api.apiUrl + `/admin/viewConnections`);
      const data = await response.json();
      setConnReqs(data);

      // Handle the API response and update component state
      // ...
    } catch (error) {
      console.log(error);
    }
  };

  // 5. Fetch Connection Requests
  // const updateMentorConnRequestStatus = async (id, status) => {
  //     try {
  //         // Make API requests here
  //         const response = await fetch(api.apiUrl+`/updateConnection?id=${id}&status=${status}`);
  //         const data = await response.json();
  //         console.log("Conn Status Upd:", data)
  //         fetchMentorConnRequests()
  //         // Handle the API response and update component state
  //         // ...

  //     } catch (error) {
  //         console.log(error);
  //     }
  // };

  useEffect(() => {
    // Fetch API data here
    fetchDashboardData();
    fetchConnRequests();
    fetchServices();
    fetchPayments();
    fetchMentors();
  }, []);

  //Home Component
  function HomeScreen() {
    const navigation = useNavigation();

    const Separator = () => {
      return <View style={styles.separator} />;
    };

    const ItemSeparatorView = () => {
      return (
        //Item Separator
        <View style={styles.seperatorStyle} />
      );
    };

    return (
      <LinearGradient colors={["#458592", "#50A4AB", "#CFF4F7"]}>
        <View style={styles.homeContainer}>
          <View style={styles.subContainer}>
            <View>
              <Text style={styles.welcomeMsg}>Welcome Admin!</Text>
            </View>
            <ItemSeparatorView />
            <View style={styles.cardContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Text style={styles.headingMsg}>Users Analytics</Text>
                </View>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.textContainer}>
                  #Seekers: {adminDetail.seekerCount}
                </Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.textContainer}>
                  #Mentors: {adminDetail.mentorCount}
                </Text>
              </View>
            </View>
            <View style={styles.cardContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Text style={styles.headingMsg}>Services Analytics</Text>
                </View>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.textContainer}>
                  #Ongoing: {adminDetail.service?.ongoing}
                </Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.textContainer}>
                  #Completed: {adminDetail.service?.completed}
                </Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.textContainer}>
                  #Failed: {adminDetail.service?.failed}
                </Text>
              </View>
            </View>

            <View style={styles.cardContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Text style={styles.headingMsg}>Mentor Status</Text>
                </View>
              </View>

              <View style={{ marginBottom: 10 }}>
                <Text style={styles.textContainer}>
                  #Applied: {adminDetail.mentorsStatus?.applied}
                </Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.textContainer}>
                  #Invited: {adminDetail.mentorsStatus?.invited}
                </Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.textContainer}>
                  #Approved: {adminDetail.mentorsStatus?.approved}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }

  //Profile component
  function ProfileScreen() {
    return (
      <View style={styles.profileView}>
        <Text>Profile Screen!</Text>
        <Button
          onPress={() => navigation.navigate("Home")}
          title="Go back home"
        />
      </View>
    );
  }

  //Connection requests component
  function ConnectionRequestsScreen() {
    return (
      <LinearGradient colors={["#458592", "#50A4AB", "#CFF4F7"]}>
        <View style={styles.connectionContainer}>
          <View style={styles.subContainer}>
            <ScrollView>
              <ConnTable data={connReqs} />
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    );
  }

  //Mentors Screen component
  function MentorsScreen() {
    const navigation = useNavigation();
    return (
      <LinearGradient colors={["#458592", "#50A4AB", "#CFF4F7"]}>
        <View style={styles.connectionContainer}>
          <TouchableOpacity
            style={styles.addIcon}
            onPress={() => navigation.navigate("addmentor")}
          >
            <Image source={icons.add_icon}></Image>
          </TouchableOpacity>
          <View style={styles.subContainermentor}>
            <ScrollView>
              <MentorTable data={mentors} />
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    );
  }

  //Add mentor component
  function AddmentorScreen({ route, navigation }) {
    return (
      <LinearGradient colors={["#458592", "#50A4AB", "#CFF4F7"]}>
        <View style={styles.connectionContainer}>
          <View style={styles.subContainermentor}>
            <ScrollView>
              <View style={styles.cardContainer}>
                <TextInput
                  placeholderTextColor={COLORS.white}
                  style={styles.inputTextField}
                  placeholder={strings.firstName}
                  value={firstName}
                  onChangeText={(value) => setFirstName(value)}
                />
              </View>
              <View style={styles.cardContainer}>
                <TextInput
                  placeholderTextColor={COLORS.white}
                  style={styles.inputTextField}
                  placeholder={strings.lastName}
                  onChangeText={(value) => setLastName(value)}
                  value={lastName}
                />
              </View>
              <View style={styles.cardContainer}>
                <TextInput
                  placeholderTextColor={COLORS.white}
                  style={styles.inputTextField}
                  placeholder={strings.contactNumber}
                  onChangeText={(value) => setContactNumber(value)}
                  value={contactNumber}
                />
              </View>
              <View style={styles.cardContainer}>
                <TextInput
                  placeholderTextColor={COLORS.white}
                  style={styles.inputTextField}
                  placeholder={strings.city}
                  onChangeText={(value) => setCity(value)}
                  value={city}
                />
              </View>
              <View style={styles.cardContainer}>
                <TextInput
                  placeholderTextColor={COLORS.white}
                  style={styles.inputTextField}
                  placeholder={strings.province}
                  onChangeText={(value) => setProvince(value)}
                  value={province}
                />
              </View>
              <View style={styles.cardContainer}>
                <TextInput
                  placeholderTextColor={COLORS.white}
                  style={styles.inputTextField}
                  placeholder={strings.services}
                  onChangeText={(value) => setService(value)}
                  value={service}
                />
              </View>
              <View style={styles.cardContainer}>
                <TextInput
                  placeholderTextColor={COLORS.white}
                  style={styles.inputTextField}
                  placeholder={strings.organization}
                  onChangeText={(value) => setOrganization(value)}
                  value={organization}
                />
              </View>
              <View style={styles.cardContainer}>
                <TextInput
                  placeholderTextColor={COLORS.white}
                  style={styles.inputTextField}
                  placeholder={strings.orgType}
                  onChangeText={(value) => setOrgType(value)}
                  value={orgtype}
                />
              </View>
              <View style={styles.cardContainer}>
                <TextInput
                  placeholderTextColor={COLORS.white}
                  style={styles.inputTextField}
                  placeholder={strings.email}
                  onChangeText={(value) => setEmail(value)}
                  value={email}
                />
              </View>
              <View style={styles.cardContainer}>
                <TextInput
                  placeholderTextColor={COLORS.white}
                  style={styles.inputTextField}
                  placeholder={strings.password}
                  onChangeText={(value) => setPassword(value)}
                  value={password}
                />
              </View>

              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveText}>{strings.save}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    );
  }

  //Profile component
  function ServiceScreen({ route, navigation }) {
    return (
      <LinearGradient colors={["#458592", "#50A4AB", "#CFF4F7"]}>
        <View style={styles.connectionContainer}>
          <View style={styles.subContainer}>
            <ScrollView>
              <ServicesTable data={services} />
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    );
  }

  //Payment component
  function PaymentScreen({ route, navigation }) {
    return (
      <LinearGradient colors={["#458592", "#50A4AB", "#CFF4F7"]}>
        <View style={styles.connectionContainer}>
          <View style={styles.subContainer}>
            <ScrollView>
              <PaymentTable data={payments} />
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    );
  }

  //Payment details
  function UpdatepaymentstatusScreen({ route, navigation }) {
    return (
      <LinearGradient colors={["#458592", "#50A4AB", "#CFF4F7"]}>
        <View style={styles.connectionContainer}>
          <View style={styles.subContainermentor}>
            <ScrollView>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.headingMsg}>Mentor name: { }</Text>
                <Text style={styles.headingMsg}>Seeker name: { }</Text>
                <Text style={styles.headingMsg}>Service: { }</Text>
              </View>

              <SelectList
                data={statuslist}
                setStatus={setStatus}
                boxStyles={styles.pickercardContainer}
                text
                value={status}
                dropdownStyles={styles.dropdownbox}
                dropdownTextStyles={styles.dropdowntext}
                placeholderTextColor={COLORS.white}
              />

              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveText}>{strings.update}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    );
  }

  function UpdateMentorStatusScreen({ route, navigation }) {
    const { mentor } = route.params;
    SERVICE_TEXT_MAP = {
      1: "Accommodation",
      2: "Part-Time Job",
    };

    STATUS_MAP = {
      APPLIED: "Applied",
      INVITED: "Invited",
      APPROVED: "Approved",
    };

    SERVICE_TYPE_ICON = {
      1: "bed-outline",
      2: "construct-outline",
    };

      setSelected(mentor.onboardStatus);



    return (
      <LinearGradient colors={["#458592", "#50A4AB", "#CFF4F7"]}>
        <View style={styles.connectionContainer}>
          <View style={styles.subContainermentor}>
            <ScrollView>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.headingText}>{mentor.fname} {mentor.lname}</Text>
                <Text style={styles.subHeadingText}>{mentor.email} | {mentor.num}</Text>
                <View style={{ flex: 1, height: 1, backgroundColor: COLORS.white }} />

                <Text style={styles.detailText}>Service:  {<Ionicons name={SERVICE_TYPE_ICON[mentor.serviceOffered]} size={20} />} {SERVICE_TEXT_MAP[mentor.serviceOffered]}</Text>
                <Text style={styles.detailText}>Location: {ONTARIO_CITIES_MAP[mentor.currentLocation]}</Text>


                {/* Status */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View>
                    <Text style={styles.detailText}>Status</Text>
                  </View>
                  <View style={{ flex: 1, height: 1, backgroundColor: COLORS.white }} />
                </View>
                <Text style={styles.detailText}>Onboard Status: {STATUS_MAP[mentor.onboardStatus]}</Text>
                <Text style={styles.detailText}>Visa Status: {mentor.visaStatus}</Text>

                {/* Strike Count */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View>
                    <Text style={styles.detailText}>Strike Count</Text>
                  </View>
                  <View style={{ flex: 1, height: 1, backgroundColor: COLORS.white }} />
                </View>
                <Text style={styles.detailText}>{mentor.strikeCount}/5</Text>

                {/* Rating */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View>
                    <Text style={styles.detailText}>Rating</Text>
                  </View>
                  <View style={{ flex: 1, height: 1, backgroundColor: COLORS.white }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {[...Array(5)].map((_, index) => (
                    <Text key={index} style={styles.star}>
                      {index < Math.floor(mentor.rating) ? '★' : '☆'}
                    </Text>
                  ))}
                </View>
              </View>


              {/* Update Mentor Onboard Status */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                  <Text style={styles.detailText}>Update Mentor Status</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: COLORS.white }} />
              </View>


              <SelectList
                data={MENTOR_ONBOARD_STATUS_MAP}
                setSelected={() => setSelected(selected)} 
                boxStyles={styles.pickercardContainer}
                text
                value={selected}
                dropdownStyles={styles.dropdownbox}
                dropdownTextStyles={styles.dropdowntext}
                placeholderTextColor={COLORS.white}
              />

              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveText}>{strings.update}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    );
  }
  const handleSignOut = () => {
    // Call the props.logout function here
    props.logout();
    navigation.closeDrawer();
  };

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: {
            backgroundColor: COLORS.secondary,
          },
          drawerActiveBackgroundColor: COLORS.primary,
          drawerLabelStyle: {
            color: "#fff",
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "SAMARITAN",
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: {
              backgroundColor: "#458592",
            },
            headerRight: () => (
              <TouchableOpacity
                style={styles.buttonBellStyle}
                onPress={() => alert("notification")}
              >
                <Image source={icons.bell_icon}></Image>
              </TouchableOpacity>
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "PROFILE",
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: {
              backgroundColor: "#458592",
            },
            headerRight: () => (
              <TouchableOpacity
                style={styles.buttonBellStyle}
                onPress={() => alert("notification")}
              >
                <Image source={icons.bell_icon}></Image>
              </TouchableOpacity>
            ),
          }}
        />

        <Drawer.Screen
          name="ConnRequests"
          component={ConnectionRequestsScreen}
          options={{
            title: "CONNECTIONS",
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: {
              backgroundColor: "#458592",
            },
            headerRight: () => (
              <TouchableOpacity
                style={styles.buttonBellStyle}
                onPress={() => alert("notification")}
              >
                <Image source={icons.bell_icon}></Image>
              </TouchableOpacity>
            ),
          }}
        />

        <Drawer.Screen
          name="seekers"
          component={ConnectionRequestsScreen}
          options={{
            title: "SEEKERS",
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: {
              backgroundColor: "#458592",
            },
            headerRight: () => (
              <TouchableOpacity
                style={styles.buttonBellStyle}
                onPress={() => alert("notification")}
              >
                <Image source={icons.bell_icon}></Image>
              </TouchableOpacity>
            ),
          }}
        />

        <Drawer.Screen
          name="mentors"
          component={MentorsScreen}
          options={{
            title: "MENTORS",
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: {
              backgroundColor: "#458592",
            },
            headerRight: () => (
              <TouchableOpacity
                style={styles.buttonBellStyle}
                onPress={() => alert("notification")}
              >
                <Image source={icons.bell_icon}></Image>
              </TouchableOpacity>
            ),
          }}
        />

        <Drawer.Screen
          name="services"
          component={ServiceScreen}
          options={{
            title: "SERVICES",
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: {
              backgroundColor: "#458592",
            },
            headerRight: () => (
              <TouchableOpacity
                style={styles.buttonBellStyle}
                onPress={() => alert("notification")}
              >
                <Image source={icons.bell_icon}></Image>
              </TouchableOpacity>
            ),
          }}
        />
        <Drawer.Screen
          name="Payment"
          component={PaymentScreen}
          options={{
            title: "PAYMENTS",
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: {
              backgroundColor: "#458592",
            },
            headerRight: () => (
              <TouchableOpacity
                style={styles.buttonBellStyle}
                onPress={() => alert("notification")}
              >
                <Image source={icons.bell_icon}></Image>
              </TouchableOpacity>
            ),
          }}
        />
        <Drawer.Screen
          name="addmentor"
          component={AddmentorScreen}
          options={{
            title: "ADD MENTOR",
            drawerLabel: () => null,
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: {
              backgroundColor: "#458592",
            },
            headerRight: () => (
              <TouchableOpacity
                style={styles.buttonBellStyle}
                onPress={() => alert("notification")}
              >
                <Image source={icons.bell_icon}></Image>
              </TouchableOpacity>
            ),
          }}
        />

        <Drawer.Screen
          name="payment"
          component={UpdatepaymentstatusScreen}
          options={{
            title: "PAYMENT DETAILS",
            drawerLabel: () => null,
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: {
              backgroundColor: "#458592",
            },
            headerRight: () => (
              <TouchableOpacity
                style={styles.buttonBellStyle}
                onPress={() => alert("notification")}
              >
                <Image source={icons.bell_icon}></Image>
              </TouchableOpacity>
            ),
          }}
        />

        <Drawer.Screen
          name="updatementor"
          component={UpdateMentorStatusScreen}
          options={{
            title: "MENTOR DETAILS",
            drawerLabel: () => null,
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: {
              backgroundColor: "#458592",
            },
            headerRight: () => (
              <TouchableOpacity
                style={styles.buttonBellStyle}
                onPress={() => alert("notification")}
              >
                <Image source={icons.bell_icon}></Image>
              </TouchableOpacity>
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AdminDashboard;
