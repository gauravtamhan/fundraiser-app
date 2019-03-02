import React, { Component } from 'react';
import { View } from 'react-native';
import { Content, Text, Form, Item, Input, Button } from 'native-base'
import { THEME_COLOR } from '@assets/colors';
import { auth, database, provider } from '../../firebase';
import styles from '@assets/styles';

export default class PayPal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: '',
        };
    }

    onSubmit() {
        const { data } = this.state;

        console.log('Data is:', data);
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

                    </View>
                </Content>
        );
    }
}