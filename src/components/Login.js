import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity, ToastAndroid, AsyncStorage } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'react-native-check-box';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const dark = '#297ac3';
const white = '#fff';

const appFont = 'Titillium-Semibold';

class Login extends Component {

    state = {
        heightOfInnerContainer: 0,
        user: '',
        password: '',
        storedUser: '',
        storedPassword: '',
        isUser: false,
        isPassword: false,
        isEmailEmpty: false,
        isPasswordEmpty: false,
        wrongCredentials: false,
        isChecked: true,
    }

    static navigationOptions = {
        header: null,
    }

    handleClick = () => {
        this.setState({ isChecked: !this.state.isChecked });
    }

    componentDidMount() {
        //this.handleLogin();
        this.autoLogin();
    }

    autoLogin = () => {

        AsyncStorage.multiGet(['user', 'password']).then((data) => {
            let user = data[0][1];
            let password = data[1][1];

            this.setState({
                storedUser: user,
                storedPassword: password,
            })

            if (user !== null) {

                if (user.toLowerCase() == 'unitedcng' && password.toLowerCase() == 'cngunited') {
                    this.props.navigation.navigate('main');
                }
                
            }
            
        });

    }

    handleLogin = () => {

        AsyncStorage.multiSet([
            ["user", String.prototype.trim.call(this.state.user)],
            ["password", this.state.password]
        ])

        AsyncStorage.multiGet(['user', 'password']).then((data) => {
            let user = data[0][1];
            let password = data[1][1];

            if (user !== null) {

                if (user.toLowerCase() == 'unitedcng' && password.toLowerCase() == 'cngunited') {
                    this.props.navigation.navigate('main');
                }
                else if (user == '' && this.state.password == '') {
                    ToastAndroid.showWithGravity(
                        'Please fill all the fields!',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                }
                else {
                    ToastAndroid.showWithGravity(
                        'Wrong Credentials!',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                }

            }

        });
        
    }
    
    render() {
        return (
            <KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps={'always'}
                showsVerticalScrollIndicator={false}
            >

                <StatusBar backgroundColor={white} barStyle="dark-content" />

                <Image source={require('../assets/icon.png')} style={{ height: screenHeight * 0.4, width: screenHeight * 0.4, }} />

                <View style={styles.inputsContainer}>

                    <View style={{ marginVertical: screenHeight * 0.02 }}>
                        <Text style={styles.inputTitle}>User</Text>

                        <View style={styles.innerContainer}>

                            <TextInput
                                style={styles.textInput}
                                placeholder='User Name'
                                onFocus={() => this.setState({ isUser: !this.state.isUser })}
                                onBlur={() => this.setState({ isUser: !this.state.isUser })}
                                onChangeText={(user) => this.setState({ user: user.toLowerCase() })}
                                //value={this.state.storedUser}
                            />
                            <MaterialIcon name='person' size={26} color={this.state.isUser ? dark : '#bbb'} />

                        </View>
                        
                    </View>

                    <View style={{ marginVertical: screenHeight * 0.02 }}>
                        <Text style={styles.inputTitle}>Password</Text>

                        <View style={styles.innerContainer}>

                            <TextInput
                                secureTextEntry={this.state.isChecked}
                                style={styles.textInput}
                                placeholder='Your Password'
                                onFocus={() => this.setState({ isPassword: !this.state.isPassword })}
                                onBlur={() => this.setState({ isPassword: !this.state.isPassword })}
                                onChangeText={(password) => this.setState({ password: password.toLowerCase() })}
                                //value={this.state.storedPassword}
                            />
                            <MaterialIcon name='lock' size={26} color={this.state.isPassword ? dark : '#bbb'} />

                        </View>
                        
                    </View>


                    <View style={styles.showPassword}>

                        <CheckBox
                            style={{ padding: 10 }}
                            onClick={this.handleClick}
                            isChecked={!this.state.isChecked}
                            checkBoxColor={dark}
                        />

                        <Text style={styles.text}>Show Password</Text>

                    </View>


                    <TouchableOpacity
                        onPress={this.handleLogin}
                        style={styles.button}
                    >
                        <MaterialIcon name='keyboard-arrow-right' size={40} color={white} />
                    </TouchableOpacity>

                </View>

            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
    },
    logoContainer: {
        height: screenHeight * 0.4, width: screenHeight * 0.4, left: -screenHeight * 0.05, top: -screenHeight * 0.1, borderRadius: screenHeight * 0.2,
        backgroundColor: dark, alignItems: 'center', justifyContent: 'center', elevation: 6,
    },
    title: {
        color: white, fontSize: screenHeight * 0.05, fontFamily: appFont,
    },
    inputsContainer: {
        marginHorizontal: screenWidth * 0.1, marginVertical: screenHeight * 0.05,
    },
    inputTitle: {
        //position: 'absolute', zIndex: 1, textAlignVertical: 'center', alignItems: 'center', backgroundColor: whiteColor, textTransform: 'uppercase', padding: screenHeight * 0.01
        fontFamily: appFont, color: dark,
    },
    //textBox: {
    //    borderWidth: 2, borderColor: dark, borderRadius: 10, marginVertical: screenHeight * 0.01, paddingHorizontal: screenWidth * 0.04, flexDirection: 'row', alignItems: 'center',
    //    justifyContent: 'space-between'
    //},
    gradientContainer: {
        borderRadius: screenHeight * 0.02,
    },
    innerContainer: {
        borderRadius: screenHeight * 0.02, marginVertical: screenHeight * 0.001, flexDirection: 'row', alignItems: 'center', paddingHorizontal: screenWidth * 0.04,
        justifyContent: 'space-between', backgroundColor: white, width: '99%', alignSelf: 'center', elevation: 3,
    },
    textInput: {
        width: '90%'
    },
    button: {
        alignItems: 'center', justifyContent: 'center', backgroundColor: dark, alignSelf: 'flex-end', height: screenWidth * 0.13, width: screenWidth * 0.25,
        borderRadius: screenWidth * 0.75, elevation: 3, marginVertical: screenHeight * 0.01, marginTop: screenHeight * 0.02
    },
    buttonText: {
        color: white, fontSize: screenHeight * 0.03, fontFamily: appFont,
    },
    showPassword: {
        flexDirection: 'row', alignItems: 'center'
    },
    text: {
        fontFamily: appFont, color: dark,
    },
});

export default Login;

