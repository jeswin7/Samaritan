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
import { Picker } from '@react-native-picker/picker';
import styles from "./dashboard.style";
import { icons, SIZES, COLORS, strings } from "../../../constants";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";


const Drawer = createDrawerNavigator();

const DETAILS_API = {
    fname: 'Jes',
    lname: 'John',
    rating: '4'
}

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


    return (
        <View style={styles.homeContainer}>

            <View style={styles.homeSubContainer}>



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

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Your Rating</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {[...Array(5)].map((_, index) => (
                        <Text key={index} style={styles.star}>
                            {index < Math.floor(DETAILS_API.rating) ? '★' : '☆'}
                        </Text>
                    ))}
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
    const [connStatus, setConnStatus] = useState("");
    return (
        <ScrollView>
                {
                    CONNECTION_REQUESTS_API.map((item, index) => {
                        return <View key={index} style={{ margin: 15,
                            backgroundColor: COLORS.tertiary,
                            padding: 15
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View>
                                <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Service For</Text>
                            </View>
                            <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                        </View>
                        <View style={{ marginBottom : 30 }}>
                            <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>{item.name}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View>
                                <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Service Type</Text>
                            </View>
                            <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                        </View>
                        <View style={{ marginBottom : 30 }}>
                            <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>{item.service}</Text>
                        </View>

                        <View style={{            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between' }}>
                            <Button title="Accept" color={COLORS.primary} />
                            <Button title="Decline" color={COLORS.red} />
                        </View>

                    </View>
                    })
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
                            <View style={{ marginBottom : 30 }}>
                                <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>{item.name}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View>
                                    <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Service Type</Text>
                                </View>
                                <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                            </View>
                            <View style={{ marginBottom : 30 }}>
                                <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>{item.service}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View>
                                    <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Service Status</Text>
                                </View>
                                <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                            </View>
                            <View style={{ marginBottom : 30 }}>
                                <Text style={item.status === "Completed" ? styles.statusDoneStyle : styles.statusPendingStyle}>{item.status}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View>
                                    <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Update Service Status</Text>
                                </View>
                                <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                            </View>
                            <Picker onValueChange={(value) => setServiceStatus(value)}  selectedValue={status}>

                                <Picker.Item label="Completed" value="done" />
                                <Picker.Item label="In Progress" value="pending" />
                            </Picker>
                            <Button title="Update Status" color={COLORS.primary} />
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
                            <View style={{ marginBottom : 30 }}>
                                <Text style={{ fontSize: 20, color: COLORS.primary, margin: 5, fontWeight: 5 }}>{item.name}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View>
                                    <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Service Type</Text>
                                </View>
                                <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                            </View>
                            <View style={{ marginBottom : 30 }}>
                                <Text style={{ fontSize: 20, color: COLORS.primary, margin: 5, fontWeight: 5 }}>{item.service}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View>
                                    <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Service Status</Text>
                                </View>
                                <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                            </View>
                            <View style={{ marginBottom : 30 }}>
                                <Text style={item.status === "Completed" ? styles.statusDoneStyle : styles.statusPendingStyle}>{item.status}</Text>
                            </View>

                        </View>
                    })
                }



            </View>

        </View>
    );
}


const Dashboard = () => {
    const router = useRouter();

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

                <Drawer.Screen name="ConnRequests" component={ConnectionRequestsScreen} options={{
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

                <Drawer.Screen name="Service" component={ServiceScreen} 
                options={{
                    title: 'SERVICES',
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
                    title: 'PAYMENTS',
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