import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SelectList } from "react-native-dropdown-select-list";
import styles from "./dashboard.style";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { icons, SIZES, COLORS, strings, api } from "../../../constants";
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
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const AdminDashboard = (props) => {
  const Drawer = createDrawerNavigator();
  const [adminDetail, setDetail] = useState({});
  const [connReqs, setConnReqs] = useState(null);
  const [services, setServices] = useState(null);
  const [payments, setPayments] = useState(null);
  const [mentors, setMentors] = useState(null);
  const [seekers, setSeekers] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [adminId, setId] = useState(null);

  useEffect(() => {
    setId(props.userId)
  }, [props])

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
    const ItemSeparatorView = () => {
      return (
        //Item Separator
        <View style={styles.seperatorStyle} />
      );
    };

    return (
      <LinearGradient colors={[COLORS.primaryDark, COLORS.primary, COLORS.primaryLight]}>
        <View style={styles.homeContainer}>
          <View style={styles.subContainer}>
            <View>
              <Text style={styles.welcomeMsg}>{strings.welcomeMsg}</Text>
            </View>
            <ItemSeparatorView />
            <View style={styles.cardContainer}>
              <View style={styles.rowContainer}>
                <View>
                  <Text style={styles.headingMsg}>{strings.userAnalytics}</Text>
                </View>
              </View>
              <View style={styles.rowContainer}>
                <View
                  style={styles.analyticsContainer}
                >
                  <Text style={styles.textContainer}>{strings.seekers}</Text>
                  <Text style={styles.textCountStyle}>
                    {adminDetail.seekerCount}
                  </Text>
                </View>
                <View style={styles.seperatorViewStyles}></View>
                <View
                  style={styles.analyticsContainer}
                >
                  <Text style={styles.textContainer}>{strings.mentors}</Text>
                  <Text style={styles.textCountStyle}>
                    {adminDetail.mentorCount}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View style={styles.serviceAnalytics}>
                <View>
                  <Text style={styles.headingMsg}>{strings.serviceAnalytics}</Text>
                </View>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.dashboardSubCardStyles}>
                  <Text style={styles.textContainer}>{strings.ongoing}</Text>
                  <Text style={styles.textCountStyle}>
                    {adminDetail.service?.ongoing}
                  </Text>
                </View>
                <View style={styles.dashboardSubCardStyles}>
                  <Text style={styles.textContainer}>{strings.completed}</Text>
                  <Text style={styles.textCountStyle}>
                    {adminDetail.service?.completed}
                  </Text>
                </View>
                <View style={styles.dashboardSubCardStyles}>
                  <Text style={styles.textContainer}>{strings.failed}</Text>
                  <Text style={styles.textCountStyle}>
                    {adminDetail.service?.failed}
                  </Text>
                </View>
              </View>
            </View>

            <View>
              <View style={styles.serviceAnalytics}>
                <View>
                  <Text style={styles.headingMsg}>{strings.mentorStatus}</Text>
                </View>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.dashboardSubCardStyles}>
                  <Text style={styles.textContainer}>{strings.applied}</Text>
                  <Text style={styles.textCountStyle}>
                    {adminDetail.mentorsStatus?.applied}
                  </Text>
                </View>
                <View style={styles.dashboardSubCardStyles}>
                  <Text style={styles.textContainer}>{strings.invited}</Text>
                  <Text style={styles.textCountStyle}>
                    {adminDetail.mentorsStatus?.invited}
                  </Text>
                </View>
                <View style={styles.dashboardSubCardStyles}>
                  <Text style={styles.textContainer}>{strings.approved}</Text>
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

  //Connection requests component
  function ConnectionRequestsScreen() {
    return (
      <LinearGradient colors={[COLORS.primaryDark, COLORS.primary, COLORS.primaryLight]}>
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
      <LinearGradient colors={[COLORS.primaryDark, COLORS.primary, COLORS.primaryLight]}>
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
      <LinearGradient colors={[COLORS.primaryDark, COLORS.primary, COLORS.primaryLight]}>
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
    const [orgEmail, setOrgEmail] = useState("");
    const [organization, setOrganization] = useState("");

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

    const handleSignUp = () => {

      // POST API
      fetch(api.apiUrl + '/admin/addCollaborator', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fname: firstName,
          lname: lastName,
          num: contactNumber,
          city,
          orgName: organization,
          orgType: mentorOrgType,
          service: mentorServiceType,
          orgEmail
        })
      })
        .then(() => Alert.alert(
          strings.addedTitle, // Specify the desired title here
          `Collaborator ${firstName} ${lastName} is added as mentor!`,
          [{ text: strings.done, onPress: () => navigation.navigate("mentors") }]
        ));

    }

    return (
      <LinearGradient colors={[COLORS.primaryDark, COLORS.primary, COLORS.primaryLight]}>
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
                  placeholderTextColor={COLORS.secondary}
                  placeholder={strings.organizationType}
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
                  placeholder={strings.serviceLbl}
                />
              </View>
              <View style={styles.inputTextFieldContainer}>
                <TextInput
                  placeholderTextColor={COLORS.secondary}
                  style={styles.inputTextField}
                  placeholder={strings.email}
                  onChangeText={(value) => setOrgEmail(value)}
                  value={orgEmail}
                />
              </View>
              <TouchableOpacity style={styles.saveButton} onPress={handleSignUp}>
                <Text style={styles.saveText}>{strings.save}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    );
  }

  //Service component
  function ServiceScreen() {
    return (
      <LinearGradient colors={[COLORS.primaryDark, COLORS.primary, COLORS.primaryLight]}>
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
  function PaymentScreen() {
    return (
      <LinearGradient colors={[COLORS.primaryDark, COLORS.primary, COLORS.primaryLight]}>
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
  function UpdatePaymentStatusScreen({ route }) {
    const { item } = route.params;
    STATUS_MAP = {
      PENDING: strings.pending,
      COMPLETED: strings.completed,
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
        setPaymentDetail(data[0]);
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
        Alert.alert(
          strings.paymentStatusUpdated, // Specify the desired title here
          `${item.mentor.fname} ${item.mentor.lname}'s payment status updated successfully!`,
          [{ text: strings.done, onPress: () => fetchPaymentDetail() }]
        );
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <LinearGradient colors={[COLORS.primaryDark, COLORS.primary, COLORS.primaryLight]}>
        <View style={styles.connectionContainer}>
          <View style={styles.subContainermentor}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.messageContainer}>
                <View style={styles.rowContainer}>
                  <Text style={styles.paymentDetailText}>{strings.mentor}</Text>
                  <Text style={styles.paymentValueText}>
                    {item.mentor.fname} {item.mentor.lname}
                  </Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.paymentDetailText}>{strings.seeker}</Text>
                  <Text style={styles.paymentValueText}>
                    {item.seeker.fname} {item.seeker.lname}
                  </Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.paymentDetailText}>{strings.service}</Text>
                  <Text style={styles.paymentValueText}>{item.type}</Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.paymentDetailText}>{strings.paymentStatus}</Text>
                  <Text style={styles.paymentValueText}>
                    {paymentDetail?.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.paymentDetailText}>
                {strings.updatePaymentStatus}
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

  const [message, setMessage] = useState('');



  function ChatComponent({ route, navigation }) {
    const { mentorDetail, data } = route.params;


    const updateChat = async () => {
      try {
        const response = await fetch(api.apiUrl + `/getMessages?sender=${mentorDetail.id}&receiver=${adminId}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        });

        const data = await response.json();
        setMessage('');

        navigation.navigate("mentorchat", { mentorDetail, data })

      } catch (error) {
        console.error('Error:', error);
        // Handle error
      }
    }


    const postMessage = async () => {

      fetch(api.apiUrl + `/admin/addMessage`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          adminId,
          mentorId: mentorDetail.id,
          message
        })
      })
        .then(() => updateChat())

    };

    return (
      <LinearGradient colors={[COLORS.primaryDark, COLORS.primary, COLORS.primaryLight]} style={styles.linearGradient}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{mentorDetail.fname} {mentorDetail.lname}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate("mentors")}>
              <Image source={icons.cancel_icon} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />

          <ScrollView showsVerticalScrollIndicator={false} style={styles.messageContainer}>
            {data && data.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  item.sender === adminId && item.receiver === mentorDetail.id ? styles.sentBubble : styles.receivedBubble,
                ]}
              >
                <Text style={item.sender === adminId && item.receiver === mentorDetail.id ? styles.sentText : styles.receivedText}>
                  {item.content} {/* Assuming 'content' is the property containing the message */}
                </Text>
              </View>
            ))}
          </ScrollView>

        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder={strings.typeHere}
              placeholderTextColor={COLORS.secondary}
              value={message}
              onChangeText={value => setMessage(value)}
            />
            <TouchableOpacity style={styles.sendButton} onPress={postMessage}>
              <Text style={styles.sendButtonText}><Ionicons name="send-outline" size={20} /></Text>
            </TouchableOpacity>
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
      { key: 'INVITED', value: 'Invited' },
      { key: 'APPROVED', value: 'Approved' }
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
        setMentorDetail(data[0]);
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
        Alert.alert(
          strings.onBoardStatus, // Specify the desired title here
          `${mentor.fname} ${mentor.lname}'s onboard status updated successfully!`,
          [{ text: strings.done, onPress: () => fetchMentorDetail() }]
        );
      } catch (error) {
        console.log(error);
      }
    };

    // Chat 
    const getMessages = async () => {
      try {
        const response = await fetch(api.apiUrl + `/getMessages?sender=${mentorDetail.id}&receiver=${adminId}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        });

        const data = await response.json();
        navigation.navigate("mentorchat", { mentorDetail, data })
      } catch (error) {
        console.error('Error:', error);
        // Handle error
      }
    };


    return (
      <LinearGradient colors={[COLORS.primaryDark, COLORS.primary, COLORS.primaryLight]}>
        <View style={styles.connectionContainer}>
          <View style={styles.subContainermentor}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.marginBottomstyle}>
                <View style={styles.mentorDetailContainer}>
                  <Text style={styles.headingText}>
                    {mentorDetail?.fname} {mentorDetail?.lname}
                  </Text>
                  <Text style={styles.subHeadingText}>
                    {mentorDetail && '+1 ' + mentorDetail?.num}
                  </Text>
                  <Text style={styles.subHeadingText}>{mentorDetail?.email}</Text>
                </View>
                <Text style={styles.detailText}>
                  {strings.service} <Ionicons
                    name={SERVICE_TYPE_ICON[mentorDetail?.serviceOffered]}
                    size={20}
                  />
                  {' '}
                  {SERVICE_TEXT_MAP[mentorDetail?.serviceOffered]}
                </Text>
                <Text style={styles.detailText}>
                  {strings.location} {ONTARIO_CITIES_MAP[mentorDetail?.currentLocation]}
                </Text>
                {/* Status */}
                <View style={styles.serviceAnalytics}>
                </View>
                <Text style={styles.detailText}>
                  {strings.onBoard} {STATUS_MAP[mentorDetail?.onboardStatus]}
                </Text>
                <Text style={styles.detailText}>
                  {strings.visaStatus} {mentorDetail?.visaStatus}
                </Text>
                {/* Strike Count */}
                <View style={styles.serviceAnalytics}>
                  <View>
                    <Text style={styles.detailText}>{strings.strikeCount} {mentorDetail?.strikeCount}/5</Text>
                  </View>
                </View>
                {/* Rating */}
                <View style={styles.serviceAnalytics}>
                  <Text style={styles.detailText}>{strings.rating} </Text>
                  <View style={styles.serviceAnalytics}>
                    {[...Array(5)].map((_, index) => (
                      <Text key={index} style={styles.star}>
                        {index < Math.floor(mentorDetail?.rating) ? "★" : "☆"}
                      </Text>
                    ))}
                  </View>
                </View>

              </View>
              {/* Update Mentor Onboard Status */}
              <View style={styles.serviceAnalytics}>
                <View>
                  <Text style={styles.detailText}>
                    {strings.updateMentorStatus}
                  </Text>
                </View>
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
            <TouchableOpacity style={styles.chatContainer} onPress={getMessages}>
              <Ionicons name="chatbox-ellipses" size={40} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }

  const handleSignOut = () => {
    // Call the props.logout function here
    Alert.alert(
      strings.signOutTitle, // Specify the desired title here
      strings.signOutMsg,
      [{ text: strings.no }, { text: strings.yes, onPress: () => props.logout() }],
    );
  };

  // Notification modal component
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const NotificationsModal = () => {
    return (
      <LinearGradient colors={[COLORS.primaryDark, COLORS.primary, COLORS.primaryLight]}>
        <View style={styles.containernotification}>
          <View style={styles.notificationheader}>
            <Text style={styles.headertext}>{strings.notification}</Text>
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
                  {strings.adminNotification}
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
        <DrawerItem label={strings.signOut} labelStyle={styles.signOutLbl} onPress={() => handleSignOut()} />
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
            color: COLORS.white,
          },

        }}
        drawerContent={props => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: strings.dashboard,
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: styles.headerStyle,
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
            title: strings.mentors,
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: styles.headerStyle,
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
            title: strings.seekers,
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: styles.headerStyle,
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
          name="ConnRequests"
          component={ConnectionRequestsScreen}
          options={{
            title: strings.connections,
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: styles.headerStyle,
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
            title: strings.services,
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: styles.headerStyle,
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
            title: strings.payments,
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: styles.headerStyle,
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
            title: strings.addCollaborator,
            drawerLabel: () => null,
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: styles.headerStyle,
            drawerItemStyle: styles.drawerItemStyle,
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
            title: strings.paymentDetails,
            drawerLabel: () => null,
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: styles.headerStyle,
            drawerItemStyle: styles.drawerItemStyle,
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
            title: strings.mentorDetails,
            drawerLabel: () => null,
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: styles.headerStyle,
            drawerItemStyle: styles.drawerItemStyle,
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
          name="mentorchat"
          component={ChatComponent}
          options={{
            title: "",
            drawerLabel: () => null,
            headerTitleAlign: "center",
            headerTintColor: COLORS.secondary,
            headerTitleStyle: styles.dashboardHeading,
            headerStyle: styles.headerStyle,
            drawerItemStyle: styles.drawerItemStyle,
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