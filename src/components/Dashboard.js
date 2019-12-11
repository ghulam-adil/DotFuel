import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { BarChart, Grid } from 'react-native-svg-charts';
//import { Text } from 'react-native-svg';

import Collapsible from 'react-native-collapsible';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const appFont = 'Titillium-Semibold';

const dark = '#297ac3';
const white = '#fff';
const grayCustom = '#606060';

class Dashboard extends Component {

    static navigationOptions = {
        header: null,
    }

    state = {
        isLastSaleCollapsible: false,
        isCurrentSaleCollapsible: true,
    }
    
    componentDidMount()
    {
        // this.fetchData();
    }

    fetchData = () => {

        //this.setState({ loading: true });

        // fetch('http://dotfuelapi.xtremetrac.com/api/DOTFuelServices/GetStationRealTimeData/', {
        //     method: 'GET',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     }
        // }).then((response) => response.json()).then(responseJson => {

        //     console.log(responseJson);
        //     // this.setState({ tankers: responseJson, loading: false });

        //     console.log('this is tankers array ' + this.state.tankers);

        // })
        // .catch((error) => {

        //     // this.setState({ error: 'Network Request Failed!', loading: false });

        // });

    }



    render() {

        const data = [10, 5, 25, 15, 20]

        const CUT_OFF = 20
        const Labels = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <Text
                    key={index}
                    x={x(index) + (bandwidth / 2)}
                    y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
                    fontSize={14}
                    fill={value >= CUT_OFF ? 'white' : 'black'}
                    alignmentBaseline={'middle'}
                    textAnchor={'middle'}
                >
                    {value}
                </Text>
            ))
        )

        return (

            <ScrollView>
                {/*
            <View style={{ height: 200, paddingVertical: 16 }}>
                <BarChart
                    style={{ flex: 1 }}
                    data={data}
                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacing={0.2}
                    gridMin={0}
                >
                    <Grid direction={Grid.Direction.HORIZONTAL} />
                    <Labels />
                </BarChart>
                    
            </View>
            */}
                <TouchableOpacity style={styles.headingContainer}
                    onPress={() => this.setState({ isLastSaleCollapsible: !this.state.isLastSaleCollapsible })}
                >
                    <Text style={styles.heading}>Last 24 Hours Sale</Text>
                </TouchableOpacity>

                <Collapsible collapsed={this.state.isLastSaleCollapsible}>

                    <View style={styles.row}>

                        <Text style={styles.title}>Petrol</Text>

                        <View style={styles.itemContainer}>
                            <View style={styles.iconContainer}>
                                <MaterialIcon name='opacity' size={20} color={grayCustom} />
                            </View>
                            <Text style={styles.itemText}>Petrol Volume</Text>
                        </View>

                        <View style={styles.itemContainer}>
                            <View style={styles.iconContainer}>
                                <MaterialIcon name='monetization-on' size={20} color={grayCustom} />
                            </View>
                            <Text style={styles.itemText}>Petrol Price</Text>
                        </View>

                    </View>

                    <View style={styles.line}></View>

                    <View style={styles.row}>

                        <Text style={styles.title}>Diesel</Text>

                        <View style={styles.itemContainer}>
                            <View style={styles.iconContainer}>
                                <MaterialIcon name='opacity' size={20} color={grayCustom} />
                            </View>
                            <Text style={styles.itemText}>Diesel Volume</Text>
                        </View>

                        <View style={styles.itemContainer}>
                            <View style={styles.iconContainer}>
                                <MaterialIcon name='monetization-on' size={20} color={grayCustom} />
                            </View>
                            <Text style={styles.itemText}>Diesel Price</Text>
                        </View>

                    </View>

                </Collapsible>


                <TouchableOpacity style={styles.headingContainer}
                    onPress={() => this.setState({ isCurrentSaleCollapsible: !this.state.isCurrentSaleCollapsible })}
                >
                    <Text style={styles.heading}>Current Sale</Text>
                </TouchableOpacity>

                <Collapsible collapsed={this.state.isCurrentSaleCollapsible}>

                    {/* <View style={styles.row}>

                        <View style={styles.item}>
                            <Text style={styles.text}>Petrol</Text>

                            <View style={styles.priceContainer}>
                                <Text style={styles.price}>N/A</Text>
                            </View>
                        </View>

                        <View style={styles.item}>
                            <Text style={styles.text}>Diesel</Text>

                            <View style={styles.priceContainer}>
                                <Text style={styles.price}>N/A</Text>
                            </View>
                        </View>

                    </View> */}

                </Collapsible>
            
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    headingContainer: {
        backgroundColor: dark, padding: screenHeight * 0.02, marginVertical: screenHeight * 0.02, width: screenWidth * 0.9,
        borderTopRightRadius: screenHeight * 0.02, borderBottomRightRadius: screenHeight * 0.02, elevation: 4
    },
    heading: {
        fontFamily: appFont, fontSize: screenHeight * 0.026, color: white,
    },
    item: {
        alignItems: 'center', justifyContent: 'center', borderLeftWidth: 10, borderColor: dark, width: screenWidth * 0.46,
        backgroundColor: white, elevation: 2, paddingVertical: screenHeight * 0.03, borderRadius: screenHeight * 0.02,
        marginHorizontal: screenWidth * 0.02,
    },
    text: {
        fontFamily: appFont, fontSize: screenHeight * 0.026,
    },
    price: {
        fontFamily: appFont, fontSize: screenHeight * 0.02, color: 'gray',
    },
    row: {
        marginVertical: screenHeight * 0.01, marginHorizontal: screenHeight * 0.02,
    },
    title: {
        color: dark, fontFamily: appFont, fontSize: screenHeight * 0.026,
    },
    itemContainer: {
        flexDirection: 'row', alignItems: 'center', marginVertical: screenHeight * 0.01
    },
    itemText: {
        fontFamily: appFont, color: grayCustom
    },
    iconContainer: {
        width: '10%'
    },
    line: {
        height: 1, backgroundColor: '#D3D3D3', marginHorizontal: screenHeight * 0.02,
    }
});

export default Dashboard;