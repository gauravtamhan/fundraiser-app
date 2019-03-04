import React, { Component } from 'react';
import { View, TouchableOpacity, Modal, WebView } from "react-native";
import { Content, Text, Form, Item, Input, Button } from 'native-base'
import { THEME_COLOR } from '@assets/colors';
import { auth, database, provider } from '../../firebase';
import styles from '@assets/styles';


import express from 'express'
import paypal from 'paypal-rest-sdk';

const app = express();

app.set("views", "../screens/WebView");
app.set("view engine", "js");

app.get("/", (req, res) => {
    res.render("index.html");
});

app.listen(3000, () => {
    console.log("Server is running");
});


paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id:
        "AUeunJwrVlZ8rdwD4-uNO5ZLZbe9AMvKlTlZY7_ww1_84w-VNsMkDpuey7TXj0d0v2IixISteuPO1ZNI",
    client_secret:
        "EEWLd9pPJu8aAPcSfOaVYQnawJmpgb7DqiqTUVNO3HcPJpgpgBwfVOb02GVyDczaFoi_VVqTotlrGswL"
});


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
        return (
            <View style={{ marginTop: 100 }}>
                <Modal
                    visible={this.state.showModal}
                    onRequestClose={() => this.setState({ showModal: false })}
                >
                    <WebView
                        source={{ uri: "http://localhost:3000" }}
                        onNavigationStateChange={data =>
                            this.handleResponse(data)
                        }
                        injectedJavaScript={`document.f1.submit()`}
                    />
                </Modal>
                <TouchableOpacity
                    style={{ width: 300, height: 100 }}
                    onPress={() => this.setState({ showModal: true })}
                >
                    <Text>Pay with Paypal</Text>
                </TouchableOpacity>
                <Text>Payment Status: {this.state.status}</Text>
            </View>
        );
    }

























    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         data: '',
    //     };
    // }

    // onSubmit() {
    //     const { data } = this.state;

    //     console.log('Data is:', data);
    // }

    // Example of a working input and submit button provided below. 
    // Can delete everything inside of 'return' if not needed.
    // Also delete the 'onSubmit' function above and the state if deleting everything.
    // render() { 
    //     return (
    //             <Content contentContainerStyle={styles.contentPadding}>
    //                 <View style={styles.formContainer}>

    //                     <Form>

    //                         <Item rounded style={styles.roundedItem}>
    //                             <Input
    //                                 placeholder={'Some data...'}
    //                                 placeholderTextColor={'#9b9b9f'}
    //                                 value={this.state.data}
    //                                 autoCapitalize={'none'}
    //                                 clearButtonMode={'while-editing'}
    //                                 keyboardType={'email-address'}
    //                                 autoCorrect={false}
    //                                 onChangeText={(data) => this.setState({ data })}
    //                             />
    //                         </Item>
                            
<<<<<<< HEAD
    //                         <View style={styles.bmContainer}>
    //                             <Button block style={{ backgroundColor: THEME_COLOR }} onPress={this.onSubmit.bind(this)}>
    //                                 <Text style={styles.buttonText}>Submit</Text>
    //                             </Button>
    //                         </View>

    //                     </Form>

    //                 </View>
    //             </Content>
    //     );
    // }
=======
                            <View style={styles.bmContainer}>
                                <Button rounded style={[styles.roundedBtn, { width: 220 }]} onPress={this.onSubmit.bind(this)}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </Button>
                            </View>
>>>>>>> eee9e411f4a15c1da4ac3df6dafb21b8164da15f


}