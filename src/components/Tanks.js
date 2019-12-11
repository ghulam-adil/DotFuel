import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Accordion from 'react-native-collapsible/Accordion';
var moment = require('moment');

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const dark = '#297ac3';
const white = '#fff';
const grayCustom = '#606060';
const borderColor = '#e3e3e3';

const appFont = 'Titillium-Semibold';


class Tanks extends Component {

    static navigationOptions = {
        header: null,
    }

    state = {
        tankers: [],
        activeSections: [],
        isActive: false,
        loading: true,
        error: null,
    }

    componentDidMount() {
        
        setInterval(() => this.fetchData(), 5000);
        
    }

    _updateSections = activeSections => {
        this.setState({
            activeSections,
            isActive: true,
        });

        console.log('this is onchange() ' + this.state.activeSections);
        console.log('this is isActive ' + this.state.isActive);
        
    };

    _renderHeader = (section, index) => {
        return (
            <View style={styles.tankHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.tankTextContainer}>
                        <Text style={styles.tankText}>{section.TankAlias}</Text>
                    </View>

                    <View>
                        <Text style={[styles.readingText, { fontSize: screenHeight * 0.022 }]}>{section.Capacity} Litres</Text>
                    </View>
                </View>

                <View style={styles.productTextContainer}>
                    <Text style={styles.productText}>{section.ProductName}</Text>
                </View>
            </View>
        );
    };
    
    _renderContent = section => {
        return (

            <View style={styles.tankBody}>
                
                <View style={styles.tankBodyItem}>
                    <Text style={styles.tankBodyText}>Current Volume</Text>

                    <View style={styles.readingContainer}>
                        <Text style={styles.readingText}>{section.CurrentFuelLevelSmooth} Litres</Text>
                    </View>
                </View>

                <View style={styles.tankBodyItem}>
                    <Text style={styles.tankBodyText}>Last Refuel</Text>
                    
                    <View style={styles.readingContainer}>
                        <Text style={styles.readingText}>{section.EndRefuelTimeInLocal ? moment(section.EndRefuelTimeInLocal).fromNow() : "Not Available"} </Text>
                    </View>
                </View>
                

            </View>

        );
    };

    fetchData = () => {

        //this.setState({ loading: true });

        fetch('http://dotfuelapi.xtremetrac.com/api/DOTFuelServices/GetStationRealTimeData/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json()).then(responseJson => {

            console.log(responseJson);
            this.setState({ tankers: responseJson, loading: false });

            console.log('this is tankers array ' + this.state.tankers);

        })
        .catch((error) => {

            this.setState({ error: 'Network Request Failed!', loading: false });

        });

    }

    
    render() {
        return (

            <View style={{ flex: 1 }}>
                
                <ScrollView>
                    

                    {
                        this.state.loading ?

                            <View style={{ alignItems: 'center', justifyContent: 'center', height: screenHeight * 0.7 }}>

                                <ActivityIndicator size="large" color={dark} />

                                <Text style={styles.waitText}>Please Wait...</Text>
                            
                            </View>

                            :

                            <View style={{ marginHorizontal: screenWidth * 0.03, }}>

                                <Text style={styles.heading}>Tanks Information</Text>

                                <Accordion
                                    sections={this.state.tankers}
                                    activeSections={this.state.isActive ? this.state.activeSections : [0]}
                                    renderHeader={this._renderHeader}
                                    renderContent={this._renderContent}
                                    onChange={this._updateSections}
                                    underlayColor='transparent'
                                />

                            </View>
                    }
                

                    {
                        this.state.error &&

                        <View style={{ alignItems: 'center', justifyContent: 'center', height: screenHeight * 0.7 }}>
                            <Text style={styles.errorText}>{this.state.error}</Text>
                        </View>
                    
                    }
                
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: dark, paddingVertical: screenHeight * 0.03, borderBottomLeftRadius: screenHeight * 0.03, flexDirection: 'row',
        borderBottomRightRadius: screenHeight * 0.03, elevation: 4, alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: screenWidth * 0.02, marginHorizontal: screenWidth * 0.03,
    },
    headerText: {
        color: white, fontFamily: appFont, fontSize: screenHeight * 0.03,
    },
    tankHeader: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderColor: borderColor, borderBottomWidth: 1,
        borderTopWidth: 1, borderRightWidth: 1, borderRadius: screenHeight * 0.02, marginTop: screenHeight * 0.01,
    },
    tankTextContainer: {
        padding: screenHeight * 0.03, backgroundColor: dark, borderTopLeftRadius: screenHeight * 0.02, borderBottomLeftRadius: screenHeight * 0.02,
    },
    productTextContainer: {
        padding: screenHeight * 0.03,
    },
    tankBody: {
        marginHorizontal: screenWidth * 0.03, backgroundColor: white, borderColor: borderColor, borderLeftWidth: 1, borderRightWidth: 1,
    },
    tankContainer: {
        marginVertical: screenHeight * 0.02, borderRadius: screenHeight * 0.03, elevation: 2,
    },
    tankText: {
        color: white, fontFamily: appFont, fontSize: screenHeight * 0.03,
    },
    productText: {
        color: dark, fontFamily: appFont, fontSize: screenHeight * 0.02,
    },
    tankBodyText: {
        fontFamily: appFont, padding: screenHeight * 0.01
    },
    readingText: {
        fontFamily: appFont, color: 'gray', padding: screenHeight * 0.01
    },
    tankBodyItem: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: borderColor,
        backgroundColor: white, padding: screenHeight * 0.01,
    },
    readingContainer: {
        flexDirection: 'row', alignItems: 'center', width: '40%',
    },
    navigationContainer: {
        flexDirection: 'row', alignItems: 'center', marginVertical: screenHeight * 0.02, justifyContent: 'space-between', marginHorizontal: screenWidth * 0.05
    },
    navigationText: {
        color: grayCustom, fontFamily: appFont, fontSize: screenHeight * 0.02
    },
    navigationButton: {
        flexDirection: 'row', alignItems: 'center',
    },
    errorText: {
        color: dark, fontFamily: appFont, fontSize: screenHeight * 0.03,
    },
    waitText: {
        fontFamily: appFont, color: dark,
    },
    heading: {
        fontFamily: appFont, color: dark, fontSize: screenHeight * 0.03, paddingVertical: screenHeight * 0.03,
    },
});

export default Tanks;