import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import { Picker } from "@react-native-picker/picker";
import styles from "./dashboard.style";
import { DrawerContentScrollView,DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { icons, SIZES, COLORS, strings, api } from "../../../constants";
import DropDownPicker from "react-native-dropdown-picker";
import {
  NavigationContainer
} from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import ConnTable from "./ConnTable";
import ServicesTable from "./ServicesTable";
import PaymentTable from "./PaymentTable";
import MentorTable from "./MentorTable";
import SeekerTable from "./SeekerTable";
import Ionicons from "@expo/vector-icons/Ionicons";

const AdminDashboard = (props) => {
  const router = useRouter();
  const navigation = useNavigation();
  const Drawer = createDrawerNavigator();
  const [adminDetail, setDetail] = useState({});
  const [connReqs, setConnReqs] = useState(null);
  const [services, setServices] = useState(null);
  const [payments, setPayments] = useState(null);
  const [mentors, setMentors] = useState(null);
  const [seekers, setSeekers] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [showNotifications, setShowNotifications] = useState(false);

  const statuslist = [
    { key: "COMPLETED", value: "Completed" },
    { key: "PENDING", value: "Pending" },
  ];

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

  // 4. Fetch Mentors
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

  // 5. Fetch Seekers
  const fetchSeekers = async () => {
    try {
      // Make API requests here
      const response = await fetch(api.apiUrl + `/seekers`);
      const data = await response.json();
      setSeekers(data);
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
    fetchSeekers();
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
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text style={styles.headingMsg}>Users Analytics</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{ marginBottom: 10, flex: 1, flexDirection: "column" }}
                >
                  <Text style={styles.textContainer}>Seekers</Text>
                  <Text style={styles.textCountStyle}>
                    {adminDetail.seekerCount}
                  </Text>
                </View>
                <View style={styles.seperatorViewStyles}></View>
                <View
                  style={{ marginBottom: 10, flex: 1, flexDirection: "column" }}
                >
                  <Text style={styles.textContainer}>Mentors</Text>
                  <Text style={styles.textCountStyle}>
                    {adminDetail.mentorCount}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Text style={styles.headingMsg}>Services Analytics</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.dashboardSubCardStyles}>
                  <Text style={styles.textContainer}>Ongoing</Text>
                  <Text style={styles.textCountStyle}>
                    {adminDetail.service?.ongoing}
                  </Text>
                </View>
                <View style={styles.dashboardSubCardStyles}>
                  <Text style={styles.textContainer}>Completed</Text>
                  <Text style={styles.textCountStyle}>
                    {adminDetail.service?.completed}
                  </Text>
                </View>
                <View style={styles.dashboardSubCardStyles}>
                  <Text style={styles.textContainer}>Failed</Text>
                  <Text style={styles.textCountStyle}>
                    {adminDetail.service?.failed}
                  </Text>
                </View>
              </View>
            </View>

            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Text style={styles.headingMsg}>Mentor Status</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.dashboardSubCardStyles}>
                  <Text style={styles.textContainer}>Applied</Text>
                  <Text style={styles.textCountStyle}>
                    {adminDetail.mentorsStatus?.applied}
                  </Text>
                </View>
                <View style={styles.dashboardSubCardStyles}>
                  <Text style={styles.textContainer}>Invited</Text>
                  <Text style={styles.textCountStyle}>
                    {adminDetail.mentorsStatus?.invited}
                  </Text>
                </View>
                <View style={styles.dashboardSubCardStyles}>
                  <Text style={styles.textContainer}>Approved</Text>
                  <Text style={styles.textCountStyle}>
                    {adminDetail.mentorsStatus?.approved}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }

  //Profile component
  // function ProfileScreen() {
  //   const navigation = useNavigation();
  //   return (
  //     <View style={styles.profileView}>
  //       <Text>Profile Screen!</Text>
  //       <Button
  //         onPress={() => navigation.navigate("Home")}
  //         title="Go back home"
  //       />
  //     </View>
  //   );
  // }

  //Connection requests component
  function ConnectionRequestsScreen() {
    return (
      <LinearGradient colors={["#458592", "#50A4AB", "#CFF4F7"]}>
        <View style={styles.connectionContainer}>
          <View style={styles.subContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
            <ScrollView showsVerticalScrollIndicator={false}>
              <MentorTable data={mentors} />
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    );
  }

  //Seekers Screen component
  function SeekersScreen() {
    const navigation = useNavigation();
    return (
      <LinearGradient colors={["#458592", "#50A4AB", "#CFF4F7"]}>
        <View style={styles.connectionContainer}>
          <View style={styles.subContainermentor}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <SeekerTable data={seekers} refresh={fetchSeekers} />
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    );
  }

  //Add mentor component
  function AddmentorScreen({ route, navigation }) {
    const [mentorServiceType, setmentorServiceType] = useState(null);
    const [mentorOrgType, setmentorOrgType] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [service, setService] = useState("");
    const [status, setStatus] = useState("");
    const [organization, setOrganization] = useState("");
    const [orgtype, setOrgType] = useState("");

    const SERVICE_MAP = [
      { key: "Accommodation", value: "Accommodation" },
      { key: "Part-Time Job", value: "Part-Time Job" },
    ];

    const ORG_TYPE_MAP = [
      { key: "immigration", value: "Immigration Agency" },
      { key: "landlord", value: "Landlord/Housing" },
      { key: "employer", value: "Employer" },
    ];

    const ONTARIO_CITIES_MAP = [
      { key: 1, value: 'Barrie' },
      { key: 2, value: 'Waterloo' },
      { key: 3, value: 'Kitchener' },
      { key: 4, value: 'Toronto' },
      { key: 5, value: 'Ottawa' },
      { key: 6, value: 'Hamilton' },
      { key: 7, value: 'London' },
      { key: 8, value: 'Mississauga' },
      { key: 9, value: 'Brampton' },
      { key: 10, value: 'Markham' },
      { key: 11, value: 'Scarborough' },
      { key: 12, value: 'Peterborough' },
      { key: 13, value: 'Brantford' },
      { key: 14, value: 'Guelf' },
      { key: 15, value: 'Windsor' },
      { key: 16, value: 'Burlington' },
      { key: 17, value: 'Thunderbay' },
      { key: 18, value: 'Oshawa' },
      { key: 19, value: 'Kingston' },
      { key: 20, value: 'Sudbury' }
    ];

    return (
      <LinearGradient colors={["#458592", "#50A4AB", "#CFF4F7"]}>
        <View style={styles.connectionContainer}>
          <View style={styles.subContainermentor}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.inputTextFieldContainer}>
                <TextInput
                  placeholderTextColor={COLORS.secondary}
                  style={styles.inputTextField}
                  placeholder={strings.firstName}
                  value={firstName}
                  onChangeText={(value) => setFirstName(value)}
                />
              </View>
              <View style={styles.inputTextFieldContainer}>
                <TextInput
                  placeholderTextColor={COLORS.secondary}
                  style={styles.inputTextField}
                  placeholder={strings.lastName}
                  onChangeText={(value) => setLastName(value)}
                  value={lastName}
                />
              </View>
              <View style={styles.inputTextFieldContainer}>
                <TextInput
                  placeholderTextColor={COLORS.secondary}
                  style={styles.inputTextField}
                  placeholder={strings.contactNumber}
                  onChangeText={(value) => setContactNumber(value)}
                  value={contactNumber}
                />
              </View>
              {/* <View style={styles.inputTextFieldContainer}> */}
              <SelectList
                data={ONTARIO_CITIES_MAP}
                setSelected={(val) => setCity(val)}
                search={true}
                boxStyles={styles.inputTextFieldContainer}
                dropdownStyles={styles.inputTextFieldContainer}
                dropdownTextStyles={styles.dropdowntext}
                placeholderTextColor={COLORS.secondary}
                placeholder="City"
              />
              {/* </View> */}
              {/* <View style={styles.inputTextFieldContainer}>
                <TextInput
                  placeholderTextColor={COLORS.secondary}
                  style={styles.inputTextField}
                  placeholder="Ontario"
                  // onChangeText={(value) => setProvince(value)}
                  // value={province}
                  editable={false}
                />
              </View> */}

              <View style={styles.inputTextFieldContainer}>
                <TextInput
                  placeholderTextColor={COLORS.secondary}
                  style={styles.inputTextField}
                  placeholder={strings.organization}
                  onChangeText={(value) => setOrganization(value)}
                  value={organization}
                />
              </View>
              <View>
                <SelectList
                  data={ORG_TYPE_MAP}
                  setSelected={(val) => setmentorOrgType(val)}
                  search={false}
                  boxStyles={styles.inputTextFieldContainer}
                  dropdownStyles={styles.inputTextFieldContainer}
                  dropdownTextStyles={styles.inputTextField}
                  placeholderTextColor={COLORS.secondary}
                  placeholder="Organization Type"
                />
              </View>

              <View>
                <SelectList
                  data={SERVICE_MAP}
                  setSelected={(val) => setmentorServiceType(val)}
                  search={false}
                  boxStyles={styles.inputTextFieldContainer}
                  dropdownStyles={styles.inputTextFieldContainer}
                  dropdownTextStyles={styles.dropdowntext}
                  placeholderTextColor={COLORS.secondary}
                  placeholder="Service"
                />
              </View>
              <View style={styles.inputTextFieldContainer}>
                <TextInput
                  placeholderTextColor={COLORS.secondary}
                  style={styles.inputTextField}
                  placeholder={strings.email}
                  onChangeText={(value) => setEmail(value)}
                  value={email}
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

  //Service component
  function ServiceScreen({ route, navigation }) {
    return (
      <LinearGradient colors={["#458592", "#50A4AB", "#CFF4F7"]}>
        <View style={styles.connectionContainer}>
          <View style={styles.subContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
            <ScrollView showsVerticalScrollIndicator={false}>
              <PaymentTable data={payments} />
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    );
  }

  //Payment details
  function UpdatePaymentStatusScreen({ route, navigation }) {
    const { item } = route.params;
    console.log("payment item--", item);

    STATUS_MAP = {
      PENDING: "Pending",
      COMPLETED: "Completed",
    };

    const [paymentDetail, setPaymentDetail] = useState(null);

    useEffect(() => {
      fetchPaymentDetail();
    }, [route]);

    // Fetch payment detail data
    const fetchPaymentDetail = async () => {
      try {
        // Make API requests here
        const response = await fetch(
          api.apiUrl + `/admin/paymentDetail?id=${item.id}`
        );
        const data = await response.json();
        console.log("@ detail API=", data);
        setPaymentDetail(data[0]);
        console.log("payment Status Upd:", item.id, data);
      } catch (error) {
        console.log(error);
      }
    };

    const [paymentStatus, setPaymentStatus] = useState(null);

    // Handle payment status update/API call
    const handlePaymentStatusUpdate = async () => {
      try {
        // Make API requests here
        const response = await fetch(
          api.apiUrl +
          `/admin/updatePayment?id=${item.id}&status=${paymentStatus}`
        );
        const data = await response.json();
        console.log("onboard Status Upd:", item.id, data);
        Alert.alert(
          "Payment Status Updated!", // Specify the desired title here
          `${item.mentor.fname} ${item.mentor.lname}'s payment status updated successfully!`,
          [{ text: "Done", onPress: () => fetchPaymentDetail() }]
        );
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <LinearGradient colors={["#458592", "#50A4AB", "#CFF4F7"]}>
        <View style={styles.connectionContainer}>
          <View style={styles.subContainermentor}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ marginBottom: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.paymentDetailText}>Mentor:</Text>
                  <Text style={styles.paymentValusText}>
                    {item.mentor.fname} {item.mentor.lname}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.paymentDetailText}>Seeker:</Text>
                  <Text style={styles.paymentValusText}>
                    {item.seeker.fname} {item.seeker.lname}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.paymentDetailText}>Service: </Text>
                  <Text style={styles.paymentValusText}>{item.type}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.paymentDetailText}>Payment Status: </Text>
                  <Text style={styles.paymentValusText}>
                    {paymentDetail?.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.paymentDetailText}>
                Update Payment Status:
              </Text>
              <SelectList
                data={statuslist}
                setSelected={(val) => setPaymentStatus(val)}
                search={false}
                boxStyles={styles.inputTextFieldContainer}
                dropdownStyles={styles.inputTextFieldContainer}
                dropdownTextStyles={styles.dropdowntext}
                placeholderTextColor={COLORS.secondary}
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handlePaymentStatusUpdate}
              >
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

    const MENTOR_ONBOARD_STATUS_MAP = [
      { key: 'APPLIED', value: 'Applied' },
      { key: 'INVITED', value:  'Invited' },
      { key: 'APPROVED', value:  'Approved'}
    ]

    const [mentorDetail, setMentorDetail] = useState(null);

    useEffect(() => {
      fetchMentorDetail();
    }, [route]);

    // Fetch mentor detail data
    const fetchMentorDetail = async () => {
      try {
        // Make API requests here
        const response = await fetch(
          api.apiUrl + `/mentorDetail?user_id=${mentor.id}`
        );
        const data = await response.json();
        console.log("@ detail API=", data);
        setMentorDetail(data[0]);
        console.log("onboard Status Upd:", mentor.id, data);
      } catch (error) {
        console.log(error);
      }
    };

    const [onboard, setOnboardStatus] = useState(null);

    // Handle mentor onboard status update/API call
    const handleMentorStatusUpdate = async () => {
      try {
        // Make API requests here
        const response = await fetch(
          api.apiUrl +
          `/admin/mentorOnboardStatus/update?id=${mentor.id}&status=${onboard}`
        );
        const data = await response.json();
        console.log("onboard Status Upd:", mentor.id, data);
        Alert.alert(
          "Onboard Status Updated!", // Specify the desired title here
          `${mentor.fname} ${mentor.lname}'s onboard status updated successfully!`,
          [{ text: "Done", onPress: () => fetchMentorDetail() }]
        );
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <LinearGradient colors={["#458592", "#50A4AB", "#CFF4F7"]}>
        <View style={styles.connectionContainer}>
          <View style={styles.subContainermentor}>
            <ScrollView>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.headingText}>
                  {mentorDetail?.fname} {mentorDetail?.lname}
                </Text>
                <Text style={styles.subHeadingText}>
                  +1 {mentorDetail?.num}
                </Text>
                <Text style={styles.subHeadingText}>{mentorDetail?.email}</Text>

                <View
                  style={{ flex: 1, height: 1, backgroundColor: COLORS.white }}
                />
                <Text style={styles.detailText}>
                  Service: <Ionicons
                    name={SERVICE_TYPE_ICON[mentorDetail?.serviceOffered]}
                    size={20}
                  />

                  {SERVICE_TEXT_MAP[mentorDetail?.serviceOffered]}
                </Text>
                <Text style={styles.detailText}>
                  Location: {ONTARIO_CITIES_MAP[mentorDetail?.currentLocation]}
                </Text>
                {/* Status */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View>
                    <Text style={styles.sectionHeadingText}>Status</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      height: 1,
                      backgroundColor: COLORS.white,
                    }}
                  />
                </View>
                <Text style={styles.detailText}>
                  Onboard Status: {STATUS_MAP[mentorDetail?.onboardStatus]}
                </Text>
                <Text style={styles.detailText}>
                  Visa Status: {mentorDetail?.visaStatus}
                </Text>
                {/* Strike Count */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View>
                    <Text style={styles.sectionHeadingText}>Strike Count</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      height: 1,
                      backgroundColor: COLORS.white,
                    }}
                  />
                </View>
                <Text style={styles.detailText}>
                  {mentorDetail?.strikeCount}/5
                </Text>
                {/* Rating */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View>
                    <Text style={styles.sectionHeadingText}>Rating</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      height: 1,
                      backgroundColor: COLORS.white,
                    }}
                  />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {[...Array(5)].map((_, index) => (
                    <Text key={index} style={styles.star}>
                      {index < Math.floor(mentorDetail?.rating) ? "★" : "☆"}
                    </Text>
                  ))}
                </View>
              </View>
              {/* Update Mentor Onboard Status */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Text style={styles.sectionHeadingText}>
                    Update Mentor Status
                  </Text>
                </View>
                <View
                  style={{ flex: 1, height: 1, backgroundColor: COLORS.white }}
                />
              </View>
              <SelectList
                data={MENTOR_ONBOARD_STATUS_MAP}
                setSelected={(val) => setOnboardStatus(val)}
                search={false}
                boxStyles={styles.inputTextFieldContainer}
                dropdownStyles={styles.inputTextFieldContainer}
                dropdownTextStyles={styles.dropdowntext}
                placeholderTextColor={COLORS.secondary}
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleMentorStatusUpdate}
              >
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

  // Notification modal component

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const NotificationsModal = () => {
    return (
      <LinearGradient colors={["#458592", "#50A4AB", "#CFF4F7"]}>
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
            <ScrollView>
              <View style={styles.notificationcardContainer}>
                <Text style={styles.textContainer}>
                  { }
                  This is a static notification message.
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    );
  };

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="LOG OUT" labelStyle={{ marginTop:-18,color: COLORS.white }} onPress={() => alert('Logout')} />
      </DrawerContentScrollView>
    );
  }

  return (
    <NavigationContainer independent={true}>
      {showNotifications && <NotificationsModal />}
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
        drawerContent={props => <CustomDrawerContent {...props} />}
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
                onPress={toggleNotifications}
              >
                <Image source={icons.bell_icon}></Image>
              </TouchableOpacity>
            ),
          }}
        />
        {/* <Drawer.Screen
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
                onPress={toggleNotifications}
              >
                <Image source={icons.bell_icon}></Image>
              </TouchableOpacity>
            ),
          }}
        /> */}

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
                onPress={toggleNotifications}
              >
                <Image source={icons.bell_icon}></Image>
              </TouchableOpacity>
            ),
          }}
        />

        <Drawer.Screen
          name="seekers"
          component={SeekersScreen}
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
                onPress={toggleNotifications}
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
                onPress={toggleNotifications}
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
                onPress={toggleNotifications}
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
                onPress={toggleNotifications}
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
            drawerItemStyle: { height: 0 },
            headerRight: () => (
              <TouchableOpacity
                style={styles.buttonBellStyle}
                onPress={toggleNotifications}
              >
                <Image source={icons.bell_icon}></Image>
              </TouchableOpacity>
            ),
          }}
        />

        <Drawer.Screen
          name="updatePayment"
          component={UpdatePaymentStatusScreen}
          options={{
            title: "PAYMENT DETAILS",
            drawerLabel: () => null,
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: {
              backgroundColor: "#458592",
            },
            drawerItemStyle: { height: 0 },
            headerRight: () => (
              <TouchableOpacity
                style={styles.buttonBellStyle}
                onPress={toggleNotifications}
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
            drawerItemStyle: { height: 0 },
            headerRight: () => (
              <TouchableOpacity
                style={styles.buttonBellStyle}
                onPress={toggleNotifications}
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