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
import { Picker } from '@react-native-picker/picker';
import styles from "./dashboard.style";
import { icons, SIZES, COLORS, strings, api } from "../../../constants";
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";


const Drawer = createDrawerNavigator();

const Dashboard = (props) => {
    const router = useRouter();
    const navigation = useNavigation();

    const [mentorDetail, setDetail] = useState({});
    const [connReqs, setConnReqs] = useState(null);
    const [chatMsgs, setMsgs] = useState([]);

    const SERVICE_MAP = {
        1: 'Accommodation',
        2: 'Part-Time Job'
    }

    // Static APIs for testing purpose
    DETAILS_API = {
        fname: 'Luke',
        lname: 'John',
        rating: '4'
    };

    const SERVICES_API = [
        {
            id: '1',
            name: 'Than John',
            service: 'Accomodation',
            status: 'Completed'
        },
        {
            id: '2',
            name: 'Mary Brown',
            service: 'Job',
            status: 'In Progress'
        },

        {
            id: '3',
            name: 'Ed John',
            service: 'Accomodation',
            status: 'Completed'
        },
        {
            id: '4',
            name: 'Tej John',
            service: 'Job',
            status: 'In Progress'
        },
        {
            id: '5',
            name: 'Jake Brown',
            service: 'Accomodation',
            status: 'Completed'
        },
        {
            id: '6',
            name: 'Joel Cullen',
            service: 'Job',
            status: 'In Progress'
        }
    ];

    const PAYMENT_API = [
        {
            id: '1',
            name: 'Jes John',
            service: 'Accomodation',
            status: 'In Progress'
        },
        {
            id: '2',
            name: 'Mary Brown',
            service: 'Job',
            status: 'Completed'
        },

        {
            id: '3',
            name: 'Ed John',
            service: 'Accomodation',
            status: 'In Progress'
        },
        {
            id: '4',
            name: 'Tej John',
            service: 'Job',
            status: 'In Progress'
        },
        {
            id: '5',
            name: 'Jake Brown',
            service: 'Accomodation',
            status: 'In Progress'
        },
        {
            id: '6',
            name: 'Joel Cullen',
            service: 'Job',
            status: 'Completed'
        }
    ];


    const CONNECTION_REQUESTS_API = [
        {
            id: '1',
            name: 'Jes John',
            service: 'Accomodation',
            status: 'In Progress'
        },
        {
            id: '2',
            name: 'Mary Brown',
            service: 'Job',
            status: 'Completed'
        },

        {
            id: '3',
            name: 'Ed John',
            service: 'Accomodation',
            status: 'In Progress'
        },
        {
            id: '4',
            name: 'Tej John',
            service: 'Job',
            status: 'In Progress'
        },
        {
            id: '5',
            name: 'Jake Brown',
            service: 'Accomodation',
            status: 'In Progress'
        },
        {
            id: '6',
            name: 'Joel Cullen',
            service: 'Job',
            status: 'Completed'
        }
    ];



    // Dynamic APIS
    // 1. Fetch Mentor Details API
    const fetchMentorDetail = async () => {
        try {
            // Make API requests here
            console.log("-------props-----", props)
            const response = await fetch(api.apiUrl + `/mentorDetail?user_id=${props.userId}`);
            const data = await response.json();
            setDetail(data[0]);

            // Handle the API response and update component state
            // ...
        } catch (error) {
            console.log(error);
        }
    };


    // 2. Fetch Services list API


    // 3. Fetch Payments list API


    // 4. Update Service Status API


    // 5. Fetch Connection Requests
    const fetchMentorConnRequests = async () => {
        try {
            // Make API requests here
            const response = await fetch(api.apiUrl + `/mentor/connectionRequests?user_id=${props.userId}`);
            const data = await response.json();
            setConnReqs(data);

            // Handle the API response and update component state
            // ...
        } catch (error) {
            console.log(error);
        }
    };


    // 6. Fetch Connection Requests
    const updateMentorConnRequestStatus = async (id, status) => {
        try {
            // Make API requests here
            const response = await fetch(api.apiUrl + `/updateConnection?id=${id}&status=${status}`);
            const data = await response.json();
            console.log("Conn Status Upd:", data)
            fetchMentorConnRequests()
            // Handle the API response and update component state
            // ...

        } catch (error) {
            console.log(error);
        }
    };

    // 7. get cht messages
    const fetchMessages = async () => {

        try {
            const response = await fetch(api.apiUrl + `/getMessages?sender=1&receiver=${props.userId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();
            setMsgs(data)

        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };


    useEffect(() => {
        // Fetch API data here
        console.log("********NEWWWW**********", props)
        fetchData();
    }, [props]);



    const fetchData = () => {
        fetchMentorDetail()
        fetchMentorConnRequests()
        fetchMessages()
    }

    //Home Component
    function HomeScreen() {

        const navigation = useNavigation();


        const PaymentItem = ({ payment }) => {

            const paymentsList = []
            paymentsList.push(payment)

            return (
                <TouchableOpacity onPress={() => navigation.navigate("Payment", { paymentsList })}>
                    <View style={styles.listView}>
                        <View style={styles.item}>
                            <Text style={styles.title}>{payment.name}</Text>
                            <Text style={styles.title}>{payment.service}</Text>
                            <Text style={payment.status == "Completed" ? styles.statusDoneStyle : styles.statusPendingStyle}>{payment.status}</Text>
                        </View>

                    </View>
                </TouchableOpacity>

            );

        }

        const renderPaymentItem = ({ item }) => {
            return (
                <View style={{ margin: 20 }}>
                    <PaymentItem payment={item} />
                </View>
            );
        }




        // ________________________________________________________________________________


        const ServiceItem = ({ service }) => {
            const servicesList = []
            servicesList.push(service)

            return (
                <TouchableOpacity onPress={() => navigation.navigate("Service", { servicesList })}>
                    <View style={styles.listView}>
                        <View style={styles.item}>
                            <Text style={styles.title}>{service.name}</Text>
                            <Text style={styles.title}>{service.service}</Text>
                            <Text style={service.status == "Completed" ? styles.statusDoneStyle : styles.statusPendingStyle}>{service.status}</Text>
                        </View>

                    </View>
                </TouchableOpacity>

            );

        }

        const renderServiceItem = ({ item }) => {
            return (
                <View style={{ margin: 20 }}>
                    <ServiceItem service={item} />
                </View>
            );
        }



        const Separator = () => {
            return <View style={styles.separator} />;
        };

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

                    <View>
                        <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 'bold', marginBottom: 10 }}>Welcome, {mentorDetail.fname} {mentorDetail.lname}!</Text>
                    </View>
                    <ItemSeparatorView />


                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Your Services</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                    </View>
                    <View style={styles.rowContainer}>
                        <FlatList
                            data={SERVICES_API}
                            renderItem={renderServiceItem}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={Separator}
                            horizontal
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Your Payments</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                    </View>

                    <View style={styles.rowContainer}>
                        <FlatList
                            data={PAYMENT_API}
                            renderItem={renderPaymentItem}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={Separator}
                            horizontal
                        />
                    </View>

                    {/* Rating */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Your Rating</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {[...Array(5)].map((_, index) => (
                            <Text key={index} style={styles.star}>
                                {index < Math.floor(mentorDetail.rating) ? '★' : '☆'}
                            </Text>
                        ))}
                    </View>

                    {/* Strike Count */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <View>
                            <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Your Strike Count</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>{mentorDetail.strikeCount}/5</Text>
                    </View>

                </View>

            </View>
        );
    }


    //Profile component
    function ProfileScreen() {
        return (
            <View style={styles.profileView}>
                <Button onPress={() => navigation.navigate("Home")} title="Go back home" />
            </View>
        );
    }


    //Connection requests component
    function ConnectionRequestsScreen() {

        const updateStatus = (id, status) => {
            updateMentorConnRequestStatus(id, status)
        }

        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    connReqs ?
                        connReqs.map((item, index) => {
                            return <View key={index} style={{
                                margin: 15,
                                backgroundColor: COLORS.tertiary,
                                padding: 15
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Service For</Text>
                                    </View>
                                    <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                                </View>
                                <View style={{ marginBottom: 30 }}>
                                    <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>{item.seekerName}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Service Type</Text>
                                    </View>
                                    <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                                </View>
                                <View style={{ marginBottom: 30 }}>
                                    <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>{SERVICE_MAP[item.serviceId]}</Text>
                                </View>

                                {
                                    item.status === 'PENDING' ?
                                        <View style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Button title="Accept" color={COLORS.primary} onPress={() => updateStatus(item.id, 'ACCEPTED')} />
                                            <Button title="Decline" color={COLORS.red} onPress={() => updateStatus(item.id, 'DECLINED')} />
                                        </View>
                                        :
                                        <View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View>
                                                    <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Connection Status</Text>
                                                </View>
                                                <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                                            </View>
                                            <View style={{ marginBottom: 30 }}>
                                                <Text style={{ fontSize: 20, color: item.status === 'ACCEPTED' ? 'green' : 'red', marginRight: 5, fontWeight: 5 }}>{item.status}</Text>
                                            </View>
                                        </View>

                                }



                            </View>
                        })
                        :
                        <View>
                            <Text>No Connection Requests!!</Text>
                        </View>
                }
            </ScrollView>

        );
    }

    //Profile component
    function ServiceScreen({ route, navigation }) {
        const { servicesList } = route.params;
        const [status, setServiceStatus] = useState(servicesList[0].status);
        const STATUS_MAP = {
            'done': 'Completed',
            'pending': 'In Progress'
        }

        return (
            <View style={styles.homeContainer}>

                <View style={styles.homeSubContainer}>

                    {
                        servicesList.map((item, index) => {

                            return <View key={index}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Service For</Text>
                                    </View>
                                    <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                                </View>
                                <View style={{ marginBottom: 30 }}>
                                    <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>{item.name}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Service Type</Text>
                                    </View>
                                    <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                                </View>
                                <View style={{ marginBottom: 30 }}>
                                    <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>{item.service}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Service Status</Text>
                                    </View>
                                    <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                                </View>
                                <View style={{ marginBottom: 30 }}>
                                    <Text style={item.status === "Completed" ? styles.statusDoneStyle : styles.statusPendingStyle}>{item.status}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Update Service Status</Text>
                                    </View>
                                    <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                                </View>
                                <Picker onValueChange={(value) => setServiceStatus(value)} selectedValue={status}>

                                    <Picker.Item label="Completed" value="done" />
                                    <Picker.Item label="In Progress" value="pending" />
                                </Picker>
                                <Button title="Update Status" color={COLORS.secondary} />
                            </View>
                        })
                    }



                </View>

            </View>
        );
    }


    //Profile component
    function PaymentScreen({ route, navigation }) {

        const { paymentsList } = route.params;

        return (
            <View style={styles.homeContainer}>

                <View style={styles.homeSubContainer}>

                    {
                        paymentsList.map((item, index) => {
                            return <View key={index}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Service For</Text>
                                    </View>
                                    <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                                </View>
                                <View style={{ marginBottom: 30 }}>
                                    <Text style={{ fontSize: 20, color: COLORS.primary, margin: 5, fontWeight: 5 }}>{item.name}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Service Type</Text>
                                    </View>
                                    <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                                </View>
                                <View style={{ marginBottom: 30 }}>
                                    <Text style={{ fontSize: 20, color: COLORS.primary, margin: 5, fontWeight: 5 }}>{item.service}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Service Status</Text>
                                    </View>
                                    <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                                </View>
                                <View style={{ marginBottom: 30 }}>
                                    <Text style={item.status === "Completed" ? styles.statusDoneStyle : styles.statusPendingStyle}>{item.status}</Text>
                                </View>

                            </View>
                        })
                    }



                </View>

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
                <DrawerItem label="Sign Out" labelStyle={{ marginTop: -18, color: COLORS.white }} onPress={() => handleSignOut()} />
            </DrawerContentScrollView>
        );
    }


    function ChatScreen({ route, navigation }) {
        // const { mentorDetail, data } = route.params;
        const data = chatMsgs;
        const [message, setMessage] = useState('');


        const updateChat = async () => {
            try {
                const response = await fetch(api.apiUrl + `/getMessages?sender=1&receiver=${props.userId}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                });

                const data = await response.json();
                //setMessage('');

                setMsgs(data)

            } catch (error) {
                console.error('Error:', error);
                // Handle error
            }
        }


        const postMessage = async () => {
            const adminId = 1;

          fetch(api.apiUrl + `/mentor/addMessage`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              adminId,
              mentorId: props.userId,
              message
            })
          })
            .then(() => updateChat())

        };

        return (
            <View style={styles.linearGradient}>
                <View style={styles.container}>
                    {/* <View style={styles.header}>
            <Text style={styles.headerText}>Chat With Admin</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate("Home")}>
              <Image source={icons.cancel_icon} style={styles.closeIcon} />
            </TouchableOpacity>
          </View> */}
                    {/* <View style={styles.line} /> */}

                    <ScrollView showsVerticalScrollIndicator={false} style={styles.messageContainer}>
                        {data && data.map((item, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.messageBubble,
                                    item.sender === props.userId && item.receiver === 1 ? styles.sentBubble : styles.receivedBubble,
                                ]}
                            >
                                <Text style={styles.messageText}>
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
                            placeholder="Type your message..."
                            placeholderTextColor={COLORS.tertiary}
                          value={message}
                          onChangeText={value => setMessage(value)}
                        />
                        <TouchableOpacity style={styles.sendButton}
                        onPress={postMessage}
                        >
                            <Text style={styles.sendButtonText}><Ionicons name="send-outline" size={20} /></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        );
    }

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
                        color: COLORS.white
                    }
                }}
                drawerContent={props => <CustomDrawerContent {...props} />}
            >
                <Drawer.Screen name="Home" component={HomeScreen} options={{
                    title: 'Home',
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
                    title: 'Profile',
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.secondary,
                    headerTitleStyle: styles.dashboardHeading,
                    headerRight: () => (
                        <TouchableOpacity style={styles.buttonBellStyle} onPress={() => alert('notification')}>
                            <Image source={icons.bell_icon}></Image>
                        </TouchableOpacity >
                    ),
                }} />

                <Drawer.Screen name="ConnRequests" component={ConnectionRequestsScreen} options={{
                    title: 'Requests',
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.secondary,
                    headerTitleStyle: styles.dashboardHeading,
                    headerRight: () => (
                        <TouchableOpacity style={styles.buttonBellStyle} onPress={() => alert('notification')}>
                            <Image source={icons.bell_icon}></Image>
                        </TouchableOpacity >
                    ),
                }} />

                <Drawer.Screen name="Chat" component={ChatScreen} options={{
                    title: 'Chat With Us',
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.secondary,
                    headerTitleStyle: styles.dashboardHeading,
                    headerRight: () => (
                        <TouchableOpacity style={styles.buttonBellStyle} onPress={() => alert('notification')}>
                            <Image source={icons.bell_icon}></Image>
                        </TouchableOpacity >
                    ),
                }} />

                <Drawer.Screen name="Service" component={ServiceScreen}
                    options={{
                        title: 'Services',
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

                <Drawer.Screen name="Payment" component={PaymentScreen} options={{
                    title: 'Payments',
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

export default Dashboard;