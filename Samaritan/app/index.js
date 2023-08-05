import { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES, strings } from '../constants';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome, Login, Signup, ForgotPassword, Dashboard, AdminDashboard } from '../components';


console.log('text:', strings.appHeader)


const Home = () => {

    const router = useRouter();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [backButtonVisible, setBackButtonVisible] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [userRole, setRole] = useState('seeker');
    const [userId, setUserId] = useState(null);

    const CONSOLE_MAP = {
        'seeker': <Welcome userId={userId} logout={() => redirectToLoginScreen()}/>,
        'admin': <AdminDashboard userId={userId} logout={() => redirectToLoginScreen()} />,
        'mentor': <Dashboard userId={userId} logout={() => redirectToLoginScreen()}/>,

    }


    getConsole = (role) => {
        console.log("-----------at switch:", role, CONSOLE_MAP[role])
        return CONSOLE_MAP[role];
    }


    redirectToHomeScreen = (role, user_id) => {
        console.log("@parent | ", role, typeof (role), user_id, typeof (user_id))
        setLoggedIn(true);
        setRole(String(role));
        setUserId(user_id);
    }

    redirectToRegisterScreen = () => {
        setIsNewUser(true);
        setBackButtonVisible(true);
        setForgotPassword(false);
    }

    redirectToLoginScreen = () => {
        setIsNewUser(false);
        setBackButtonVisible(false);
        setForgotPassword(false);
        setLoggedIn(false);
        setRole(null);
        setUserId(null);
    }

    redirectToForgotPassword = () => {
        setIsNewUser(false);
        setBackButtonVisible(true);
        setForgotPassword(true);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            {!isLoggedIn ? (<View style={styles.headerView}>
                <View style={styles.headerButtonView}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => redirectToLoginScreen()}>
                        {backButtonVisible ? (<Image source={icons.backIcon} style={styles.backIcon}></Image>) : ''}
                    </TouchableOpacity >
                    <Text style={styles.headerText}>{strings.appHeader}</Text>
                </View>
                <Image source={icons.logo} style={styles.logo}></Image>
            </View>) : ''}
            {
                isLoggedIn ?
                    userId ?
                        getConsole(userRole)

                        :
                        <View style={styles.headerView}>
                            <Image source={icons.logo} style={styles.logo}></Image>
                            <View style={styles.headerButtonView}>
                                <TouchableOpacity style={styles.buttonStyle} onPress={() => redirectToLoginScreen()}>
                                    {backButtonVisible ? (<Image source={icons.backIcon} style={styles.backIcon}></Image>) : ''}
                                </TouchableOpacity >
                                <Text>Unable to fetch request! Server must be down!!</Text>
                            </View>
                        </View>
                    :
                    <View>
                        {
                            isNewUser ?
                                <Signup
                                    registered={redirectToLoginScreen}
                                />
                                :
                                !forgotPassword ?
                                    <Login
                                        isValid={redirectToHomeScreen}
                                        isNewUser={redirectToRegisterScreen}
                                        forgotPassword={redirectToForgotPassword}
                                    />
                                    :
                                    <ForgotPassword
                                        registered={redirectToLoginScreen}
                                    />
                        }
                    </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
        headerShown: false
    },
    headerView: {
        marginTop: 50,
        width: '100%',
        height: '30%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerButtonView: {
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        color: COLORS.secondary,
        fontSize: SIZES.xxxLarge,
        paddingLeft: 50
    },
    logo: {
        height: 150,
        width: 150
    },
    buttonStyle: {
        height: 30,
        width: 30,
        marginLeft: 20,
    },
    backIcon: {
        height: 20,
        width: 20,
    }
});

export default Home;