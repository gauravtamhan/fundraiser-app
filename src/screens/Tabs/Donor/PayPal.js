import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Modal, WebView, SafeAreaView} from 'react-native';
import { THEME_COLOR } from '@assets/colors';
import { auth, database, provider } from '@src/firebase';
import styles from '@assets/styles';


export default class PayPal extends Component {
    state = {
        showModal: false,
        status: "Pending"
    };
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
        var price = "20.00";
        var fundraiseremail = "jcclark43-buyer2@gmail.com";
        return(
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
                        'document.f1.submit()'}
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
        </View>)
    }
}