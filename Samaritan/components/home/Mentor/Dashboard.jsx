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
        service: 'Accomodation'
    },
    {
        id: '2',
        name: 'Mary Brown',
        service: 'Job'
    },

    {
        id: '3',
        name: 'Ed John',
        service: 'Accomodation'
    },
    {
        id: '4',
        name: 'Tej John',
        service: 'Job'
    },
    {
        id: '5',
        name: 'Jake Brown',
        service: 'Accomodation'
    },
    {
        id: '6',
        name: 'Joel Cullen',
        service: 'Job'
    }
];

const PAYMENT_API = [
    {
        id: '1',
        name: 'Jes John',
        service: 'Accomodation'
    },
    {
        id: '2',
        name: 'Mary Brown',
        service: 'Job'
    },

    {
        id: '3',
        name: 'Ed John',
        service: 'Accomodation'
    },
    {
        id: '4',
        name: 'Tej John',
        service: 'Job'
    },
    {
        id: '5',
        name: 'Jake Brown',
        service: 'Accomodation'
    },
    {
        id: '6',
        name: 'Joel Cullen',
        service: 'Job'
    }
];




const onPress = (item, navigation) => {
    console.log('click', item);
}

const Item = ({ item, navigation }) => (
    <TouchableOpacity onPress={() => onPress(item, navigation)}>
        <View style={styles.listView}>
            <View style={styles.item}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.title}>{item.location}</Text>
                <Text style={styles.title}>{item.service}</Text>
                <Text style={styles.title}>{item.rating}</Text>
            </View>

        </View>
    </TouchableOpacity>

);

const renderItem = ({ item }) => {
    return (
        <View style={{ margin: 20 }}>
            <Item item={item} />
        </View>
    );
}



const ItemSeparatorView = () => {
    return (
        //Item Separator
        <View
            style={styles.seperatorStyle}
        />
    );
};

//search handle
const handleSearchClick = () => {
    // Perform search button click here
    console.log('Search button click...');
};
const Separator = () => {
    return <View style={styles.separator} />;
};
//Home Component
function HomeScreen({ navigation, searchTerm, setSearchTerm, handleSearchClick }) {
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
                        renderItem={renderItem}
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
                        renderItem={renderItem}
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

//Notification component
function ProfileScreen({ navigation }) {
    return (
        <View style={styles.profileView}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

const Dashboard = () => {
    const router = useRouter();
    const navigation = useNavigation();

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
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default Dashboard;