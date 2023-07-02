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

import styles from "./dashboard.style";
import { icons, SIZES, COLORS, strings } from "../../../constants";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


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



//Home Component
function HomeScreen() {

    const navigation = useNavigation();


    const PaymentItem = ({ item }) => {


        return (
            <TouchableOpacity onPress={() => navigation.navigate("Payment", { item })}>
                <View style={styles.listView}>
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.title}>{item.service}</Text>
                        <Text style={item.status == "Completed"? styles.statusDoneStyle : styles.statusPendingStyle}>{item.status}</Text>
                    </View>

                </View>
            </TouchableOpacity>

        );

    }

    const renderPaymentItem = ({ item }) => {
        return (
            <View style={{ margin: 20 }}>
                <PaymentItem item={item} />
            </View>
        );
    }




    // ________________________________________________________________________________


    const ServiceItem = ({ item }) => {


        return (
            <TouchableOpacity onPress={() => navigation.navigate("Service", { item })}>
                <View style={styles.listView}>
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.title}>{item.service}</Text>
                        <Text style={item.status == "Completed"? styles.statusDoneStyle : styles.statusPendingStyle}>{item.status}</Text>
                    </View>

                </View>
            </TouchableOpacity>

        );

    }

    const renderServiceItem = ({ item }) => {
        return (
            <View style={{ margin: 20 }}>
                <ServiceItem item={item} />
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

//Profile component
function ServiceScreen({route , navigation}) {
    const { item } = route.params;
    return (
        <View style={styles.homeContainer}>

            <View style={styles.homeSubContainer}>



                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>{item.name}</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>{item.service}</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Your Rating</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                </View>


            </View>

        </View>
    );
}


//Profile component
function PaymentScreen({ route, navigation }) {

    const { item } = route.params;
    return (
        <View style={styles.homeContainer}>

            <View style={styles.homeSubContainer}>



                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>{item.name}</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>{item.service}</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontSize: 20, color: COLORS.primary, marginRight: 5, fontWeight: 5 }}>Your Rating</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: COLORS.primary }} />
                </View>


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

                <Drawer.Screen name="Service" component={ServiceScreen} options={{
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

                <Drawer.Screen name="Payment" component={PaymentScreen} options={{
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

export default Dashboard;