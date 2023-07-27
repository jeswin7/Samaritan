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
import { Picker } from '@react-native-picker/picker';
import styles from "./dashboard.style";
import { icons, SIZES, COLORS, strings, api } from "../../../constants";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, ThemeProvider, DrawerItem } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";

const AdminDashboard = (props) => {
    const router = useRouter();


    const Drawer = createDrawerNavigator();
    const [mentorDetail, setDetail] = useState({});
    const [connReqs, setConnReqs] = useState(null);

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
    // const fetchMentorDetail = async () => {
    //     try {
    //         // Make API requests here
    //         console.log("-------props-----", props)
    //         const response = await fetch(api.apiUrl+`/mentorDetail?user_id=${props.userId}`);
    //         const data = await response.json();
    //         setDetail(data[0]);

    //         // Handle the API response and update component state
    //         // ...
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };


    // 2. Fetch Services list API


    // 3. Fetch Payments list API


    // 4. Update Service Status API


    // 5. Fetch Connection Requests
    // const fetchMentorConnRequests = async () => {
    //     try {
    //         // Make API requests here
    //         const response = await fetch(api.apiUrl+`/mentor/connectionRequests?user_id=${props.userId}`);
    //         const data = await response.json();
    //         setConnReqs(data);

    //         // Handle the API response and update component state
    //         // ...
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };


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

//     useEffect(() => {
//         // Fetch API data here
//  return <View><Text>Loading...</Text></View>
//     }, []);
//     useEffect(() => {
//         // Fetch API data here
//         console.log("********NEWWWW**********", props)
//         fetchData();
//     }, [props]);



    // const fetchData = () => {
    //     fetchMentorDetail()
    //     fetchMentorConnRequests()
    // }


    //Home Component
    function HomeScreen() {

        const navigation = useNavigation();












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
                        <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 'bold', marginBottom: 10 }}>Welcome Admin!</Text>
                    </View>
                    <ItemSeparatorView />


                </View>

            </View>
        );
    }


    //Profile component
    function ProfileScreen() {
        return (
            <View style={styles.profileView}>
                <Text>Profile Screen!</Text>
                <Button onPress={() => navigation.navigate("Home")} title="Go back home" />
            </View>
        );
    }


    //Connection requests component
    function ConnectionRequestsScreen() {

        return (
            <ScrollView>
                <Text>Connections Screen!</Text>
                <Button onPress={() => navigation.navigate("Home")} title="Go back home" />
            </ScrollView>

        );
    }

    //Profile component
    function ServiceScreen({ route, navigation }) {


        return (
            <View style={styles.homeContainer}>

                <View style={styles.homeSubContainer}>
                <Text>Services Screen!</Text>
                <Button onPress={() => navigation.navigate("Home")} title="Go back home" />



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


                <Text>Payments Screen!</Text>
                <Button onPress={() => navigation.navigate("Home")} title="Go back home" />

                </View>

            </View>
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
                      color: '#fff'
                    }
                  }}

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

                <Drawer.Screen name="ConnRequests" component={ConnectionRequestsScreen} options={{
                    title: 'CONNECTIONS',
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.secondary,
                    headerTitleStyle: styles.dashboardHeading,
                    headerRight: () => (
                        <TouchableOpacity style={styles.buttonBellStyle} onPress={() => alert('notification')}>
                            <Image source={icons.bell_icon}></Image>
                        </TouchableOpacity >
                    ),
                }} />

                <Drawer.Screen name="seekers" component={ConnectionRequestsScreen}
                    options={{
                        title: 'SEEKERS',
                        headerTitleAlign: 'center',
                        headerTintColor: COLORS.secondary,
                        headerTitleStyle: styles.dashboardHeading,
                        headerRight: () => (
                            <TouchableOpacity style={styles.buttonBellStyle} onPress={() => alert('notification')}>
                                <Image source={icons.bell_icon}></Image>
                            </TouchableOpacity >
                        ),
                    }} />

                <Drawer.Screen name="mentors" component={ConnectionRequestsScreen} options={{
                    title: 'MENTORS',
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.secondary,
                    headerTitleStyle: styles.dashboardHeading,
                    headerRight: () => (
                        <TouchableOpacity style={styles.buttonBellStyle} onPress={() => alert('notification')}>
                            <Image source={icons.bell_icon}></Image>
                        </TouchableOpacity >
                    ),
                }} />

                <Drawer.Screen name="services" component={ConnectionRequestsScreen} options={{
                    title: 'SERVICES',
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.secondary,
                    headerTitleStyle: styles.dashboardHeading,
                    headerRight: () => (
                        <TouchableOpacity style={styles.buttonBellStyle} onPress={() => alert('notification')}>
                            <Image source={icons.bell_icon}></Image>
                        </TouchableOpacity >
                    ),
                }} />
                <Drawer.Screen name="Payment" component={ConnectionRequestsScreen} options={{
                    title: 'PAYMENTS',
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

export default AdminDashboard;
