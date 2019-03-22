import React, { Component } from 'react';
import { View } from 'react-native';
import { Content, Text, Form, Item, Input, Button } from 'native-base'
import { THEME_COLOR } from '@assets/colors';
import { auth, database, provider } from '../../firebase';
import styles from '@assets/styles';

import { DangerZone } from 'expo';
const { Stripe } = DangerZone;

export default class PayPal extends Component {

    constructor(props) {
        super(props);
        this.state = {data: '', token: ''};
    }

    async componentWillMount() {
        await Stripe.setOptionsAsync({
            publishableKey: 'pk_test_vMkp9tb9CAfaBwDMQBkwYVqC', // Your key
            //androidPayMode: 'test', // [optional] used to set wallet environment (AndroidPay)
            //merchantId: 'your_merchant_id', // [optional] used for payments with ApplePay
          });
    }

    async onSubmit() {

        const params = {
            // mandatory
            number: '4242424242424242',
            expMonth: 11,
            expYear: 22,
            cvc: '223',
            // optional
            name: 'Test User',
            currency: 'usd',
            addressLine1: '123 Test Street',
            addressLine2: 'Apt. 5',
            addressCity: 'Test City',
            addressState: 'Test State',
            addressCountry: 'Test Country',
            addressZip: '55555',
          };
          
          let token = await Stripe.createTokenWithCardAsync(params);
          let tokendata = await JSON.stringify(token);
          this.setState({token:tokendata})
    }

    // Example of a working input and submit button provided below. 
    // Can delete everything inside of 'return' if not needed.
    // Also delete the 'onSubmit' function above and the state if deleting everything.
    render() { 
        return (
                <Content contentContainerStyle={styles.contentPadding}>
                    <View style={styles.formContainer}>

                        <Form>

                            <Item rounded style={styles.roundedItem}>
                                <Input
                                    placeholder={'Some data...'}
                                    placeholderTextColor={'#9b9b9f'}
                                    value={this.state.data}
                                    autoCapitalize={'none'}
                                    clearButtonMode={'while-editing'}
                                    keyboardType={'email-address'}
                                    autoCorrect={false}
                                    onChangeText={(data) => this.setState({ data })}
                                />
                            </Item>
                            
                            <View style={styles.bmContainer}>
                                <Button rounded style={[styles.roundedBtn, { width: 220 }]} onPress={this.onSubmit.bind(this)}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </Button>
                            </View>

                        </Form>
                        <Text>{this.state.token}</Text>

                    </View>
                </Content>
        );
    }
}