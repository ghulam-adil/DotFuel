import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Dimensions, ActivityIndicator, ScrollView } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Accordion from 'react-native-collapsible/Accordion';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const dark = '#297ac3';
const white = '#fff';
const grayCustom = '#606060';
const borderColor = '#e3e3e3';

const appFont = 'Titillium-Semibold';

class Dispensers extends Component {

    static navigationOptions = {
        header: null,
    }

    state = {
        dispensers: [],
        activeSections: [],
        isActive: false,
        loading: true,
    }
    
    componentDidMount() {
        
        setInterval(() => this.fetchData(), 5000);

    }

    fetchData = () => {

        //this.setState({ loading: true });

        fetch('http://dotfuelapi.xtremetrac.com/api/DOTFuelServices/GetFuelStationDispenserNozzelSales/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json()).then(responseJson => {
            console.log(responseJson);

            var DispenserName = responseJson[0].DispenserAlias;
            var finalDispensers = [];
            var nozelArray = [];
            nozelArray.push(responseJson[0]);
            console.log(responseJson.length);
            var count = 1;
            while (true) {
                if (responseJson[count].DispenserAlias == DispenserName) {
                    nozelArray.push(responseJson[count]);
                    count++;
                    console.log(count);
                }

                else {
                    finalDispensers.push(nozelArray);
                    nozelArray = [];
                    DispenserName = responseJson[count].DispenserAlias;
                }
                if (count == responseJson.length) {
                    if (nozelArray.length > 0) {
                        finalDispensers.push(nozelArray)
                    }
                    break;
                }
            }

            console.log(nozelArray);
            console.log(finalDispensers);

            this.setState({ dispensers: finalDispensers, loading: false });

        })
        .catch((error) => {
            //you will get error here.
            this.setState({ error: 'Network Request Failed!', loading: false });
            //console.log('this is error : ' + error);
        });


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

        //console.log(section);
        //console.log(section[0].DispenserAlias);
        //console.log(section[1].DispenserAlias);
        //console.log(index);

        return (
            <View style={styles.dispenserContainer}>
                
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: borderColor }}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, { fontSize: screenHeight * 0.03 }]}>{section[0].DispenserAlias}</Text>
                    </View>

                    <View style={styles.priceContainer}>
                        <Text style={styles.priceUnit}>PKR</Text>

                        <Text style={styles.price}>{section[0].Price}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: screenHeight * 0.02, }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcon name='device-hub' size={24} color={grayCustom} />
                        <Text style={styles.dispenserText}>{section[0].FuelDispenserNozelId} & {section[1].FuelDispenserNozelId}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcon name='opacity' size={24} color={grayCustom} />
                        <Text style={styles.dispenserText}>{section[0].ProductName}</Text>
                    </View>

                </View>
                
            </View>
        );
    };

    
    _renderContent = section => {
        return (

            <View style={styles.dispenserBody}>
                
                <View style={styles.nozelContainer}>

                    <View>
                        <Text style={styles.title}>Nozel 1</Text>
                    </View>

                    <View style={styles.nozelDataContainer}>
                        <View style={styles.nozelData}>
                            <MaterialIcon name='straighten' size={20} color={grayCustom} style={{ transform: [{ rotate: '90deg' }] }} />
                            <Text style={styles.text}>N/A</Text>
                        </View>

                        <View style={styles.nozelData}>
                            <MaterialIcon name='attach-money' size={20} color={grayCustom} />
                            <Text style={styles.text}>N/A</Text>
                        </View>
                    </View>

                </View>

                <View style={styles.nozelContainer}>

                    <View>
                        <Text style={styles.title}>Nozel 2</Text>
                    </View>

                    <View style={styles.nozelDataContainer}>
                        <View style={styles.nozelData}>
                            <MaterialIcon name='straighten' size={20} color={grayCustom} style={{ transform: [{ rotate: '90deg' }] }} />
                            <Text style={styles.text}>N/A</Text>
                        </View>

                        <View style={styles.nozelData}>
                            <MaterialIcon name='attach-money' size={20} color={grayCustom} />
                            <Text style={styles.text}>N/A</Text>
                        </View>
                    </View>

                </View>
                
            </View>

        );
    };

    
    render() {
        return (

            <View style={{ flex: 1 }}>
                
                <ScrollView
                    ref="scrollView"
                    onContentSizeChange={(width, height) => { this.state.isActive ? this.refs.scrollView.scrollTo({ y: height }) : this.refs.scrollView.scrollTo({ y: -height }) }}
                >
                
                    <View style={{ marginHorizontal: screenWidth * 0.03, }}>

                        <Text style={styles.heading}>Dispensers Information</Text>
                        
                        {
                            this.state.loading ?

                                <View style={{ alignItems: 'center', justifyContent: 'center', height: screenHeight * 0.7 }}>

                                    <ActivityIndicator size="large" color={dark} />

                                    <Text style={styles.waitText}>Please Wait...</Text>

                                </View>

                                :

                                <View>

                                    <Accordion
                                        sections={this.state.dispensers}
                                        activeSections={this.state.isActive ? this.state.activeSections : [0]}
                                        renderHeader={this._renderHeader}
                                        renderContent={this._renderContent}
                                        onChange={this._updateSections}
                                        underlayColor='transparent'
                                    />

                                </View>
                        }
                    
                    
                    </View>

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    dispenserContainer: {
        borderRadius: screenHeight * 0.02, backgroundColor: white, borderWidth: 1, borderColor: borderColor, marginTop: screenHeight * 0.01,
    },
    titleContainer: {
        padding: screenHeight * 0.02,
    },
    title: {
        color: dark, fontFamily: appFont, fontSize: screenHeight * 0.025,
    },
    priceContainer: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: dark, padding: screenHeight * 0.02, borderTopRightRadius: screenHeight * 0.02,
    },
    priceUnit: {
        color: white, fontFamily: appFont,
    },
    price: {
        color: white, fontFamily: appFont, fontSize: screenHeight * 0.03
    },
    dispenserText: {
        fontFamily: appFont, marginLeft: screenWidth * 0.02, fontSize: screenHeight * 0.02
    },
    nozelContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: borderColor,
        padding: screenHeight * 0.01,
    },
    dispenserBody: {
        borderLeftWidth: 1, borderRightWidth: 1, borderColor: borderColor, marginHorizontal: screenWidth * 0.03, 
    },
    nozelData: {
        flexDirection: 'row', alignItems: 'center',
    },
    nozelDataContainer: {
        width: '40%',
    },
    waitText: {
        fontFamily: appFont, color: dark,
    },
    text: {
        fontFamily: appFont, marginLeft: screenWidth * 0.01,
    },
    unitText: {
        fontSize: screenWidth * 0.03, fontFamily: appFont,
    },
    errorText: {
        color: dark, fontFamily: appFont, fontSize: screenHeight * 0.03,
    },
    heading: {
        fontFamily: appFont, color: dark, fontSize: screenHeight * 0.03, paddingVertical: screenHeight * 0.03,
    },
});

export default Dispensers;