import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, WebView, SafeAreaView } from 'react-native';
import { Content, Button } from 'native-base';
import { THEME_COLOR } from '@assets/colors';
import { auth, database, provider } from '@src/firebase';
import styles from '@assets/styles';


export default class Payment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            status: "Pending",
        }
    }

    continueWithPayPal = () => {
        this.setState({ showModal: true })
    }

    markTaskAsComplete() {
        const { navigation } = this.props;
        const taskKey = navigation.getParam('key');

        database.ref(`tasks/${taskKey}`).update({
            status: 3,
        })
    }

    handleResponse = data => {
        if (data.title === "success") {
            this.setState({ showModal: false, status: "Complete" });
            this.markTaskAsComplete();
            this.props.navigation.goBack();
        } else if (data.title === "cancel") {
            this.setState({ showModal: false, status: "Cancelled" });
        } else {
            return;
        }
    };

    render() {
        const { status, showModal } = this.state;
        const { navigation } = this.props;
        const user = navigation.getParam('user');
        const amount = navigation.getParam('amount');
        
        const userEmail = user.email ? user.email : '';

        return (
            <Content contentContainerStyle={{flex: 1}} showsVerticalScrollIndicator={false}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.bigText}>Payment Status: {status}</Text>
                </View>
                <View style={{ flex: 4 }}>
                    <View style={{paddingHorizontal: 22}}>
                        <View style={styles.paymentRow}>
                            <Text style={styles.taskListHeaderText}>DONATION AMOUNT</Text>
                            <Text style={styles.value}>{amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).slice(0, -3)}</Text>
                        </View>
                        <View style={styles.paymentRow}>
                            <Text style={styles.taskListHeaderText}>RECIPIENT</Text>
                            <Text style={styles.value}>{user.name}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Button rounded style={styles.roundedBtnSecondary} onPress={this.continueWithPayPal}>
                        <Text style={styles.buttonTextSecondary}>Continue with PayPal</Text>
                    </Button>
                </View>
                <Modal
                    animationType="slide"
                    visible={showModal}
                    onRequestClose={() => this.setState({ showModal: false })}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <WebView
                            source={{ uri: "http://ec2-52-15-55-149.us-east-2.compute.amazonaws.com:3000" }}
                            onNavigationStateChange={data =>
                                this.handleResponse(data)
                            }
                            injectedJavaScript={
                                'document.getElementById("price").value="' + amount + '";'
                                +
                                'document.getElementById("fundraiseremail").value="' + userEmail + '";'
                                +
                                'document.f1.submit();'}
                        />
                    </SafeAreaView>
                </Modal>
            </Content>
        )
    }
}