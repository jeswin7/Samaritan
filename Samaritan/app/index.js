import { useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES} from '../constants';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome, Login, Signup } from '../components';
import { ImageBackground } from "react-native-web";

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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    // headerLeft: () => (
                    //     <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                    // ),
                    // headerRight: () => (
                    //     <ScreenHeaderBtn iconUrl={icons.profile} dimension="100%"/>
                    // ),
                    headerTitle: "SAMARITAN"
                 }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                    >
                    {
                        isLoggedIn?
                        <Welcome />
                        :
                        <View>
                            {
                            isNewUser?
                            <Signup
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

export default Home;