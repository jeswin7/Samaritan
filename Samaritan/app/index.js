import { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES, strings } from '../constants';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome, Login, Signup, ForgotPassword } from '../components';


console.log('text:', strings.appHeader)


const Home = () => {

    const router = useRouter();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [backButtonVisible, setBackButtonVisible] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);

    redirectToHomeScreen = () => {
        console.log("@parent")
        setLoggedIn(true);
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
                    <Welcome />
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