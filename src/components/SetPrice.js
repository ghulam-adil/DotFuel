import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar, TextInput, ToastAndroid, ScrollView, ActivityIndicator } from 
    'react-native';

import { Picker, DatePicker } from 'react-native-wheel-pick';

import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const dark = '#297ac3';
const white = '#fff';
const grayCustom = '#606060';

const appFont = 'Titillium-Semibold';

class SetPrice extends Component {

    state = {
        modal1: false,
        modal2: false,
        petrolPrice: null,
        dieselPrice: null,
        cngPrice: null,
        ProductId: 0,
        value: 0,
        loading: true,
        error: null,
        pickerObject: {
            num1: 0,
            num2: 0,
            num3: 0,
            num4: 0
        },
        pickerValues: [0, 0, 0, 0],
        setLoading1: false,
        setLoading2: false,
        setLoading3: false,
    }

    static navigationOptions = {
        header: null,
    }

    componentDidMount() {
        
        setInterval(() => this.fetchPrices(), 5000); 
        
    }
    
    fetchPrices = () => {
        fetch('http://dotfuelapi.xtremetrac.com/api/DOTFuelServices/GetPrices?id=1', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json()).then(responseJson => {
            // you'll get the response in responseJson
            console.log('this is response of getprices');
            console.log(responseJson);
            //console.log(responseJson[0].Price);
            //console.log(responseJson[1].Price);
            //console.log(responseJson[2].Price);

            //const newObject = { ...this.state.pickerObject };

            //var temp = responseJson[0].Price.toString();
            
            //newObject.num2 = temp[0];
            //newObject.num3 = temp[1];

            //this.setState({ pickerObject: newObject });

            //console.log(this.state.pickerObject);


            if (responseJson[0].ProductName == "Petrol") {
                this.setState({
                    petrolPrice: responseJson[0].Price,
                    dieselPrice: responseJson[1].Price,
                    cngPrice: responseJson[2].Price,
                    loading: false,
                })
            }
            else if (responseJson[0].ProductName == "Diesel") {
                this.setState({
                    petrolPrice: responseJson[1].Price,
                    dieselPrice: responseJson[0].Price,
                    cngPrice: responseJson[2].Price,
                    loading: false,
                })
            }

        })
        .catch((error) => {
            //you will get error here.
            console.log(error);
            this.setState({ error: 'Network Request Failed!', loading: false });
        });
    }

    handleUpdate = (name, price) => {
        if (name == 'Petrol') {
            //this.setState({ value: price,  });

            //const newObject = { ...this.state.pickerObject };

            //var temp = price.toString();
            

            //newObject.num2 = temp[0];
            //newObject.num3 = temp[1];

            //this.setState({ pickerObject: newObject, ProductId: 1 });

            //console.log(this.state.pickerObject);
            

            //const newObject = { ...this.state.pickerObject };

            //if (index == 1) {
            //    newObject.num1 = value;
            //}
            //else if (index == 2) {
            //    newObject.num2 = value;
            //}
            //else if (index == 3) {
            //    newObject.num3 = value;
            //}
            //else {
            //    newObject.num4 = value;
            //}


            //this.setState({ pickerObject: newObject });

            //console.log(this.state.pickerObject);
            //console.log('changing' + value);
            this.setState({ value: price, ProductId: 1 });
            
        }
        else if (name == 'Diesel') {
            this.setState({ value: price, ProductId: 2 });
            
        }
        else if (name == 'CNG') {
            this.setState({ value: price, ProductId: 3 });

        }
    }

    UpdatePrice = () => {
        console.log("work");
        //var valueString = this.state.value.toString();
        if (this.state.ProductId == 1) {
            this.setState({ setLoading1: true });
        }
        else if (this.state.ProductId == 2) {
            this.setState({ setLoading2: true });
        }
        else {
            this.setState({ setLoading3: true });
        }

        
        var values = { ...this.state.pickerObject };
        var finalValue = values.num1.toString() + values.num2.toString() + values.num3.toString() + '.' + values.num4.toString();
        console.log(finalValue);
        if (this.state.value !== 0 && this.state.ProductId !== 0) {
            console.log(this.state.value + '?' + this.state.ProductId);

            fetch('http://dotfuelapi.xtremetrac.com/api/DOTFuelServices/SetPrice/', {
                method: 'POST',
                headers: {
                    Accept: 'json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Price: finalValue,
                    ProductId: this.state.ProductId,
                })
                ,
            }).then(response => response.json()).then(responseJson => {

                console.log(responseJson);

                setTimeout(() => this.myFunction(), 3000);
                
            })
            .catch(error => {

                console.log(error);

            })
            

            this.fetchPrices();
        }
            
    }

    myFunction = () => {

        this.setState({ setLoading1: false, setLoading2: false, setLoading3: false });

        ToastAndroid.showWithGravity(
            'Price updated successfully!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );

    }

    //validateUpdate = () => {
    //    var valueString = this.state.value.toString();
    //    var last = valueString.length + 1;
    //    if (valueString.indexOf('.') > -1 && valueString.indexOf('.') != last) {
    //        this.setState({ modal1: false, modal2: true })
            
    //    }
    //    else {
    //        ToastAndroid.showWithGravity(
    //            'Please enter value correctly! i.e: (xxx.x)',
    //            ToastAndroid.BOTTOM,
    //            ToastAndroid.SHORT,
    //        );
    //    }
        
    //}

    handlePickerValues = () => {
        this.setState({ modal1: false, modal2: true })

        //console.log(this.state.value1);
        //console.log(this.state.value2);
        //console.log(this.state.value3);
        //console.log(this.state.value4);

        console.log(this.state.pickerObject);
    }

    handleValue = (index, value) => {

        const newObject = { ...this.state.pickerObject };

        if (index == 1) {
            newObject.num1 = value;
        }
        else if (index == 2) {
            newObject.num2 = value;
        }
        else if (index == 3) {
            newObject.num3 = value;
        }
        else {
            newObject.num4 = value;
        }
        

        this.setState({ pickerObject: newObject });

        console.log(this.state.pickerObject);
        console.log('changing' + value);

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

                            <View style={{ marginHorizontal: screenWidth * 0.03 }}>

                                <Text style={styles.heading}>Price Board Information</Text>

                                <TouchableOpacity style={styles.boardContainer}
                                    onPress={() => { this.setState({ modal1: !this.state.modal1 }); this.handleUpdate('Petrol', this.state.petrolPrice) }}
                                >
                                    
                                    <View style={styles.productContainer}>
                                        <Text style={styles.productText}>Petrol</Text>
                                    </View>

                                    <View style={styles.rightContainer}>

                                        <View style={styles.unitContainer}>
                                            <Text style={styles.unitText}>PKR/LTR</Text>
                                        </View>
                                    
                                        <View style={styles.priceContainer}>
                                            {
                                                this.state.setLoading1 ? 
                                                    <ActivityIndicator color={dark} size={"small"} />
                                                    :
                                                <Text style={styles.priceText}>{this.state.petrolPrice ? this.state.petrolPrice : 118.4}</Text>
                                            }
                                            
                                        </View>

                                    </View>

                                </TouchableOpacity>

                                <TouchableOpacity style={styles.boardContainer}
                                    onPress={() => { this.setState({ modal1: !this.state.modal1 }); this.handleUpdate('Diesel', this.state.dieselPrice) }}
                                >
                                    
                                    <View style={styles.productContainer}>
                                        <Text style={styles.productText}>Diesel</Text>
                                    </View>

                                    <View style={styles.rightContainer}>

                                        <View style={styles.unitContainer}>
                                            <Text style={styles.unitText}>PKR/LTR</Text>
                                        </View>
                                    
                                        <View style={styles.priceContainer}>

                                            {
                                                this.state.setLoading2 ?
                                                    <ActivityIndicator color={dark} size={"small"} />
                                                    :
                                                <Text style={styles.priceText}>{this.state.dieselPrice ? this.state.dieselPrice : 133.01}</Text>
                                            }
                                            
                                        </View>

                                    </View>

                                </TouchableOpacity>

                                <TouchableOpacity style={styles.boardContainer}
                                    onPress={() => { this.setState({ modal1: !this.state.modal1 }); this.handleUpdate('CNG', this.state.cngPrice) }}
                                >
                                    
                                    <View style={styles.productContainer}>
                                        <Text style={styles.productText}>CNG</Text>
                                    </View>

                                    <View style={styles.rightContainer}>

                                        <View style={styles.unitContainer}>
                                            <Text style={styles.unitText}>PKR/KG</Text>
                                        </View>
                                    
                                        <View style={styles.priceContainer}>

                                            {
                                                this.state.setLoading3 ?
                                                    <ActivityIndicator color={dark} size={"small"} />
                                                    :
                                                <Text style={styles.priceText}>{this.state.cngPrice ? this.state.cngPrice : 127}</Text>
                                            }
                                            
                                        </View>

                                    </View>

                                </TouchableOpacity>

                            </View>
                    }
                    
                </ScrollView>
                
                    <Dialog
                        visible={this.state.modal1}
                        dialogAnimation={new SlideAnimation({
                            slideFrom: 'bottom',
                        })}
                        onTouchOutside={() => {
                            this.setState({ modal1: false });
                        }}
                    >
                        <DialogContent>
                            <View style={{ height: screenHeight * 0.3, width: screenWidth * 0.85, paddingTop: screenHeight * 0.02 }}>

                                <View style={styles.modalHeader}>

                                    <View>
                                        <Text style={styles.modalHeaderText}>Set Price</Text>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => this.setState({ modal1: false })}
                                    >
                                        <MaterialIcon name='cancel' size={26} color={dark} />
                                    </TouchableOpacity>

                                </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: screenHeight * 0.01 }}>

                                {/*
                                <TextInput
                                    maxLength={5}
                                    placeholder="Enter Price"
                                    keyboardType='numeric'
                                    onChangeText={(value) => this.setState({ value })}
                                    value={this.state.value ? this.state.value.toString() : null}
                                />*/}
                                
                                <Picker
                                    style={styles.pickerStyle}
                                    selectedValue={1}
                                    pickerData={[0, 1]}
                                    onValueChange={value => { this.handleValue(1, value) }}
                                    itemSpace={30} // this only support in android
                                />
                                
                                <Picker
                                    style={styles.pickerStyle}
                                    selectedValue={1}
                                    pickerData={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
                                    onValueChange={value => { this.handleValue(2, value) } }
                                    itemSpace={30} // this only support in android
                                />
                                
                                <Picker
                                    style={styles.pickerStyle}
                                    selectedValue={1}
                                    pickerData={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
                                    onValueChange={value => { this.handleValue(3, value) } }
                                    itemSpace={30} // this only support in android
                                />

                                <Text style={{ fontSize: screenHeight * 0.1, color: dark }}>.</Text>

                                <Picker
                                    style={styles.pickerStyle}
                                    selectedValue={1}
                                    pickerData={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
                                    onValueChange={value => { this.handleValue(4, value) } }
                                    itemSpace={30} // this only support in android
                                />
                                
                                {/*<TextInputMask
                                    placeholder="Enter Price"
                                    keyboardType='numeric'
                                    //refInput={ref => { this.input = ref }}
                                    onChangeText={(value) => this.setState({ value })}
                                    mask={"[000].[0]"}
                                    value={this.state.value ? this.state.value.toString() : null}
                                />*/}

                            </View>

                            <TouchableOpacity style={styles.button}
                                onPress={this.handlePickerValues}
                            >
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>


                            </View>
                        </DialogContent>
                    </Dialog>
                
                    <Dialog
                        visible={this.state.modal2}
                        dialogAnimation={new SlideAnimation({
                            slideFrom: 'top',
                        })}
                        onTouchOutside={() => {
                            this.setState({ modal2: false });
                        }}
                    >
                        <DialogContent>
                            <View style={{ height: screenHeight * 0.24, width: screenWidth * 0.85, paddingTop: screenHeight * 0.02 }}>

                                <View style={styles.modalHeader}>

                                    <View>
                                        <Text style={styles.modalHeaderText}>Confirmation</Text>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => this.setState({ modal2: false })}
                                    >
                                        <MaterialIcon name='cancel' size={26} color={dark} />
                                    </TouchableOpacity>

                                </View>

                                <View style={styles.confirmContainer}>
                                    <Text style={styles.confirmMessage}>Please confirm your selection</Text>
                                </View>

                                <View style={styles.modalFooter}>
                                    <TouchableOpacity style={styles.button}
                                        onPress={() => { this.setState({ modal2: false }); this.UpdatePrice() }}
                                    >
                                        <Text style={styles.buttonText} >Yes</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.button}
                                        onPress={() => this.setState({ modal2: false })}
                                    >
                                        <Text style={styles.buttonText}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            
                            </View>
                        </DialogContent>
                    </Dialog>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    boardContainer: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', marginVertical: screenHeight * 0.01,
        borderRadius: screenHeight * 0.03, elevation: 4
    },
    productContainer: {
        backgroundColor: dark, padding: screenHeight * 0.03, borderTopLeftRadius: screenHeight * 0.02, borderBottomLeftRadius: screenHeight * 0.02,
        width: '30%',
    },
    priceContainer: {
        marginRight: screenWidth * 0.1,
    },
    unitContainer: {
        padding: screenHeight * 0.03,
    },
    productText: {
        color: white, fontSize: 20, fontFamily: appFont,
    },
    priceText: {
        color: dark, fontSize: screenHeight * 0.03, fontFamily: appFont,
    },
    unitText: {
        color: dark, fontSize: screenHeight * 0.02, fontFamily: appFont,
    },
    inputContainer: {
        marginTop: screenHeight * 0.03, borderBottomColor: '#bbb', borderBottomWidth: 1,
    },
    modalHeader: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
    },
    modalFooter: {
        flexDirection: 'row', alignItems: 'center', alignSelf: 'center',
    },
    modalHeaderText: {
        fontFamily: appFont, fontSize: 20, borderBottomWidth: 2, borderColor: dark,
    },
    buttonText: {
        fontFamily: appFont, color: white,
    },
    confirmContainer: {
        marginTop: screenHeight * 0.05, marginBottom: screenHeight * 0.02, alignItems: 'center', justifyContent: 'center',
    },
    confirmMessage: {
        fontFamily: appFont, fontSize: 17, color: 'gray',
    },
    button: {
        backgroundColor: dark, alignSelf: 'center', height: screenHeight * 0.05, width: screenWidth * 0.15, marginVertical: screenHeight * 0.03, borderRadius: screenHeight * 0.01,
        alignItems: 'center', justifyContent: 'center', margin: screenWidth * 0.02,
    },
    refreshButton: {
        backgroundColor: dark, height: screenHeight * 0.07, width: screenHeight * 0.07, borderRadius: screenHeight * 0.035, alignItems: 'center', justifyContent: 'center',
        alignSelf: 'center', marginTop: screenHeight * 0.02,
    },
    headerContainer: {
        backgroundColor: dark, paddingVertical: screenHeight * 0.03, borderBottomLeftRadius: screenHeight * 0.03, flexDirection: 'row',
        borderBottomRightRadius: screenHeight * 0.03, elevation: 4, alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: screenWidth * 0.02, marginHorizontal: screenWidth * 0.03,
    },
    headerText: {
        color: white, fontFamily: appFont, fontSize: screenHeight * 0.03,
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
    waitText: {
        fontFamily: appFont, color: dark,
    },
    heading: {
        fontFamily: appFont, color: dark, fontSize: screenHeight * 0.03, paddingVertical: screenHeight * 0.03,
    },
    rightContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '75%'
    },
    pickerStyle: {
        width: '20%', height: screenHeight * 0.1, backgroundColor: white, elevation: 3, borderRadius: screenHeight * 0.01
    }
})

export default SetPrice;


