import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Modal, WebView, SafeAreaView} from 'react-native';
import { THEME_COLOR } from '@assets/colors';
import { auth, database, provider } from '@src/firebase';
import styles from '@assets/styles';
import {Form, Input, Item, Button} from 'native-base';


export default class PayPal extends Component {

    constructor(props) {
        super(props)
        this.state ={
            showModal: false,
            status: "Pending",
            price: undefined,
            fundraiseremail: undefined
        }
    }
    handleResponse = data => {
        if (data.title === "success") {
            this.setState({ showModal: false, status: "Complete" });
        } else if (data.title === "cancel") {
            this.setState({ showModal: false, status: "Cancelled" });
        } else {
            return;
        }
    };

    render() { 
        const { price } = this.state;
        const { fundraiseremail } = this.state;

        //var fundraiseremail = "jcclark43-buyer2@gmail.com";
        return(
        <View>    
        <Form>
            <Item rounded style={styles.roundedItem}>
                                    <Input
                                        placeholder={'Price'}
                                        placeholderTextColor={'#9b9b9f'}
                                        value={price}
                                        autoCapitalize={'sentences'}
                                        clearButtonMode={'while-editing'}
                                        autoCorrect
                                        onChangeText={(price) => this.setState({ price })}
                                    />
            </Item>
            <Item rounded style={styles.roundedItem}>
                                    <Input
                                        placeholder={'FundraiserEmail'}
                                        placeholderTextColor={'#9b9b9f'}
                                        value={fundraiseremail}
                                        autoCapitalize={'sentences'}
                                        clearButtonMode={'while-editing'}
                                        autoCorrect
                                        onChangeText={(fundraiseremail) => this.setState({ fundraiseremail })}
                                    />
            </Item>
            <Button rounded style={styles.roundedBtn} onPress={() => this.setState({ showModal: true })}>
                                        <Text style={styles.buttonText}>Submit</Text>
                                    </Button>
        </Form>
        <View style={{ marginTop: 100 }}>
            <Modal
                animationType="slide"
                visible={this.state.showModal}
                onRequestClose={() => this.setState({ showModal: false })}>
                <SafeAreaView style={{flex: 1}}>
                    <WebView
                        source={{ uri: "http://ec2-52-15-55-149.us-east-2.compute.amazonaws.com:3000" }}
                        onNavigationStateChange={data =>
                            this.handleResponse(data)
                        }
                        injectedJavaScript={
                        'document.getElementById("price").value="' + price + '";'
                        +
                        'document.getElementById("fundraiseremail").value="' + fundraiseremail + '";'
                        +
                        'document.f1.submit();'}
                    />
                </SafeAreaView>
            </Modal>
            <TouchableOpacity
                style={{ width: 300, height: 100 }}
                onPress={() => this.setState({ showModal: true })}
            >
                <Text>Pay with Paypal</Text>
            </TouchableOpacity>
            <Text>Payment Status: {this.state.status}</Text>
        </View>
        </View>)
    }
}