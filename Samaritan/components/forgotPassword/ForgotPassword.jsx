import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONT, SIZES, strings } from '../../constants';

const ForgotPassword = (props) => {
    const [email, setEmail] = useState('');
    const [checkValidEmail, setCheckValidEmail] = useState(false);

    //email validation
    const handleCheckEmail = text => {
        let reg = /\S+@\S+\.\S+/;
        let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        setEmail(text);
        if (reg.test(text) || regex.test(text)) {
            setCheckValidEmail(false);
        } else {
            setCheckValidEmail(true);
        }
    }

    const handleContinue = () => {
        // Perform forgot password here
        console.log('Continue in...', email);
        if (!email) {
            alert(strings.emailError)
        } else {
            // props.isValid();
        }
    };


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                    <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                    <TextInput
                        style={styles.emailTextField}
                        placeholder={strings.email}
                        value={email}
                        onChangeText={handleCheckEmail}
                    />
                    {checkValidEmail ? (<Text style={styles.invalidText}>{strings.invalidEmail}</Text>) : (<Text></Text>)}
                    <TouchableOpacity onPress={handleContinue} style={styles.forgotPasswordButton}>
                        <Text style={styles.forgotPasswordButtonText}>{strings.continueBtn}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    forgotPasswordText: {
        color: COLORS.secondary,
        fontSize: SIZES.large,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    emailTextField: {
        paddingVertical: 12,
        backgroundColor: COLORS.tertiary2,
        fontSize: SIZES.medium,
        padding: SIZES.small,
        borderRadius: SIZES.small,
        marginTop: 20
    },
    forgotPasswordButton: {
        marginVertical: 40,
        elevation: 8,
        backgroundColor: COLORS.secondary,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 12
    },
    forgotPasswordButtonText: {
        fontSize: 18,
        color: COLORS.white,
        fontWeight: "bold",
        alignSelf: "center",
    },
    invalidText: {
        color: COLORS.red,
        paddingVertical: 5,
        paddingLeft: 8
    }
});

export default ForgotPassword;
