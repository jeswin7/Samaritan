import { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES, strings } from '../constants';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome, Login, Signup } from '../components';


console.log('text:',strings.appHeader)


const Home = () => {

    const router = useRouter();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);

    redirectToHomeScreen = () => {
        console.log("@parent")
        setLoggedIn(true);
    }

    redirectToRegisterScreen = () => {
        setIsNewUser(true);
    }

    redirectToLoginScreen = () => {
        setIsNewUser(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />
            <View style={styles.headerView}>
                <Text style={styles.headerText}>{strings.appHeader}</Text>
                <Image source={icons.logo} style={styles.logo}></Image>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                >
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
                                        <Login
                                            isValid={redirectToHomeScreen}
                                            isNewUser={redirectToRegisterScreen}
                                        />
                                }
                            </View>
                    }
                </View>
            </ScrollView>
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
        width: '100%',
        height: '30%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText:{
        color: '#242948', 
        fontSize: SIZES.xxxLarge,
    },
    logo:{
        height: 150, 
        width: 150
    }
});

export default Home;