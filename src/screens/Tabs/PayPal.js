import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Modal, WebView} from 'react-native';
import { THEME_COLOR } from '@assets/colors';
import { auth, database, provider } from '../../firebase';
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
        return(
        <View style={{ marginTop: 100 }}>
            <Modal
                visible={this.state.showModal}
                onRequestClose={() => this.setState({ showModal: false })}>
                <WebView
                    source={{ uri: "http://ec2-18-191-173-246.us-east-2.compute.amazonaws.com:3000" }}
                    onNavigationStateChange={data =>
                        this.handleResponse(data)
                    }
                    injectedJavaScript={`document.f1.submit()`}/>
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