import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ActivityIndicator, Image, StatusBar, AsyncStorage } from 'react-native';
import { TabView, TabBar, SceneMap, PagerPan } from 'react-native-tab-view';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import SetPrice from './SetPrice';
import Tanks from './Tanks';
import Dispensers from './Dispensers';
import Dashboard from './Dashboard';

//const webServiceURL = "http://10.0.0.14/DotFuelFSApi";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const dark = '#297ac3';
const white = '#fff';

const appFont = 'Titillium-Semibold';


const getTabBarIcon = (props) => {

    const { route } = props

    if (route.key === 'first') {

        return (

            <View style={styles.tabItem}>

                <MaterialIcon name='dashboard' size={24} color={white} />
                <Text style={styles.text}>Dashboard</Text>

            </View>
            
        )

    } else if (route.key === 'second') {

        return (

            <View style={styles.tabItem}>

                <MaterialIcon name='monetization-on' size={24} color={white} />
                <Text style={styles.text}>Prices</Text>

            </View>
            
        )

    }
    else if (route.key === 'third') {

        return (

            <View style={styles.tabItem}>

                <MaterialIcon name='view-stream' size={24} color={white} />
                <Text style={styles.text}>Tanks</Text>

            </View>
            
        )
    }
    else {
        return (

            <View style={styles.tabItem}>

                <MaterialIcon name='local-gas-station' size={24} color={white} />
                <Text style={styles.text}>Dispensers</Text>

            </View>
            
        )
    }
}

const FirstRoute = () => (
     <Dashboard />
);

const SecondRoute = () => (
     <SetPrice />
);

const ThirdRoute = () => (
     <Tanks />
);

const FourthRoute = () => (
    <Dispensers />
);


class Main extends Component {

    state = {
        //requestState: 0,
        index: 0,
        routes: [
            { key: 'first', },
            { key: 'third', },
            { key: 'second', },
            // { key: 'fourth' },
        ],
        loading: true,
        //setPriceData: {
        //    petrolPrice: null,
        //    dieselPrice: null,
        //    cngPrice: null,
        //    loading: true,
        //},
        //tanksData: {
        //    tankers: [],
        //    loading: true,
        //},
        //dispensersData: {
        //    dispensers: [],
        //    loading: true,
        //}
        
    };


    static navigationOptions = {
        header: null,
    }

    componentDidMount() {

        setTimeout(() => this.setState({ loading: false }), 2000);
        //setInterval(() => this.handleRequest(), 5000);

    }

    //handleRequestError(error) {
    //    this.setState({ error: 'Network Request Failed!', loading: false });
    //    console.log(error);
    //    alert(error);
    //}
    

    //handleRequest = () => {
    //    switch (this.state.requestState) {
    //        case 0:

    //            fetch(webServiceURL + '/api/DOTFuelServices/GetPrices?id=1', {
    //                    method: 'GET',
    //                    headers: {
    //                        'Accept': 'application/json',
    //                        'Content-Type': 'application/json',
    //                    }
    //            }).then((response) => response.json()).then(responseJson => {
    //                console.log(responseJson);

    //                var setPriceData = { ...this.state.setPriceData }
                    
    //                    if (responseJson[0].ProductName == "Petrol") {
                          
    //                        setPriceData.petrolPrice = responseJson[0].Price;
    //                        setPriceData.dieselPrice = responseJson[1].Price;
    //                        setPriceData.cngPrice = responseJson[2].Price;
    //                        setPriceData.loading = false;

    //                        this.setState({ setPriceData });

    //                    }
    //                    else if (responseJson[0].ProductName == "Diesel") {
                           
    //                        setPriceData.petrolPrice = responseJson[1].Price;
    //                        setPriceData.dieselPrice = responseJson[0].Price;
    //                        setPriceData.cngPrice = responseJson[2].Price;
    //                        setPriceData.loading = false;

    //                        this.setState({ setPriceData });
    //                    }
    //                    this.setState({ requestState: 1 });

    //                }).catch((error) => {
    //                    this.handleRequestError(error)
    //                });
    //            break;

    //        case 1:

    //            fetch(webServiceURL + '/api/DOTFuelServices/GetStationRealTimeData/', {
    //                method: 'GET',
    //                headers: {
    //                    'Accept': 'application/json',
    //                    'Content-Type': 'application/json',
    //                }
    //            }).then((response) => response.json()).then(responseJson => {
    //                console.log(responseJson);

    //                var tanksData = { ...this.state.tanksData }
    //                tanksData.tankers = responseJson;
    //                tanksData.loading = false;

    //                this.setState({ tanksData, requestState: 2 });
    //            }).catch((error) => {
    //                this.handleRequestError(error)
    //                });
    //            break;

    //        case 2:

    //            fetch(webServiceURL + '/api/DOTFuelServices/GetFuelStationDispenserNozzelSales/', {
    //                method: 'GET',
    //                headers: {
    //                    'Accept': 'application/json',
    //                    'Content-Type': 'application/json',
    //                }
    //            }).then((response) => response.json()).then(responseJson => {
    //                console.log(responseJson);

    //                var DispenserName = responseJson[0].DispenserAlias;
    //                var finalDispensers = [];
    //                var nozelArray = [];
    //                nozelArray.push(responseJson[0]);
    //                var count = 1;
    //                while (true) {
    //                    if (responseJson[count].DispenserAlias == DispenserName) {
    //                        nozelArray.push(responseJson[count]);
    //                        count++;
    //                    }

    //                    else {
    //                        finalDispensers.push(nozelArray);
    //                        nozelArray = [];
    //                        DispenserName = responseJson[count].DispenserAlias;
    //                    }
    //                    if (count == responseJson.length) {
    //                        if (nozelArray.length > 0) {
    //                            finalDispensers.push(nozelArray)
    //                        }
    //                        break;
    //                    }
    //                }

    //                var dispensersData = { ...this.state.dispensersData }
    //                dispensersData.dispensers = finalDispensers;
    //                dispensersData.loading = false;

    //                this.setState({ dispensersData, requestState: 0 });
                   

    //            })
    //            .catch((error) => {
    //                this.handleRequestError(error)
    //            });
    //            break;
           
    //        default:
                
    //    }
            
    //  }

    handleLogout = () => {

        let keys = ['user', 'password'];
        AsyncStorage.multiRemove(keys, (err) => {
            console.log('Local storage user info removed!');
        });

        this.props.navigation.navigate('login');

    }

    render() {
        
       
        return (

            <View style={{ flex: 1, }}>

                <StatusBar backgroundColor={'rgb(41,122,195)'} barStyle="light-content" />

                {
                    this.state.loading ?

                    <View style={{ alignItems: 'center', justifyContent: 'center', height: screenHeight * 0.7 }}>

                            <ActivityIndicator size="large" color={dark} />

                            <Image source={require('../assets/logo.png')} style={[styles.bannerImage, { tintColor: dark }]} />

                    </View>

                        :

                    <View style={{ flex: 1, }}>

                        <View style={styles.headerContainer}>
                                
                            <View style={{ width: '90%' }}>

                                    {/*<Image source={require('../assets/logo.png')} style={styles.bannerImage} />*/}

                                <Text style={styles.headerText}>United CNG Pumping Station</Text>
                                
                            </View>

                            <TouchableOpacity
                                onPress={this.handleLogout}
                                style={styles.refreshButton}
                            >
                                <MaterialIcon name='exit-to-app' size={26} color={white} />
                            </TouchableOpacity>

                        </View>

                        <TabView
                            navigationState={this.state}
                            renderScene={SceneMap({
                                first: FirstRoute,
                                second: SecondRoute,
                                third: ThirdRoute,
                                // fourth: FourthRoute,
                            })}
                            onIndexChange={index => this.setState({ index })}
                            initialLayout={{ width: Dimensions.get('window').width }}
                            renderTabBar={props =>
                                <TabBar
                                    {...props}
                                    indicatorStyle={{ backgroundColor: white, }}
                                    style={{ backgroundColor: dark }}
                                    labelStyle={{ fontFamily: appFont, textTransform: 'capitalize' }}
                                    activeColor={white}
                                    //inactiveColor={grayColor}
                                    renderIcon={
                                        props => getTabBarIcon(props)
                                    }

                                />
                            }
                        />

                    </View>
                    
                }
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bannerImage: {
        height: 40, width: screenWidth * 0.5, tintColor: white,
    },
    text: {
        fontFamily: appFont, color: white, fontSize: screenHeight * 0.017
    },
    tabItem: {
        alignItems: 'center',
    },
    headerContainer: {
        backgroundColor: dark, paddingVertical: screenHeight * 0.03, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingHorizontal: screenWidth * 0.05,
    },
    headerText: {
        color: white, fontFamily: appFont, fontSize: screenHeight * 0.03,
    },
});

export default Main;