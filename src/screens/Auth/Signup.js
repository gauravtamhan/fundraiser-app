import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, ActivityIndicator, Alert } from 'react-native';
import { auth, database, provider } from '../../firebase';
import { Content, Text, H1, Form, Item, Label, Input, Button, Segment } from 'native-base'
import { THEME_COLOR } from '@assets/colors';
import styles from '@assets/styles';

export default class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            goal: '',
            loaderVisible: false,
            isDonor: true,
        };
    }

    onSubmit() {
        const { email, password, name, isDonor, goal } = this.state;

        this.createAccount(email, password, name, isDonor, goal);
    }

    showLoader() {
        this.setState({ loaderVisible: true });
    }

    hideLoader() {
        this.setState({ loaderVisible: false });
    }

    writeUserData(userId, isDonor, name, bio, email, goal) {
        database.ref('users/' + userId).set({
            isDonor: isDonor,
            name: name,
            bio: bio,
            email: email,
        });

        if (!isDonor) {
            database.ref('goals/' + userId).set({
                amountEarned: 0,
                goal: goal
            })
        }
    }

    async createAccount(email, password, name, isDonor, goal) {
        try {
            this.showLoader();
            await auth.createUserWithEmailAndPassword(email, password);
            await auth.currentUser.updateProfile({
                displayName: name
            })
            const bio = 'A new organization looking to assist members within the community.'
            await this.writeUserData(auth.currentUser.uid, isDonor, name, bio, email, goal)
        } catch (e) {
            this.hideLoader();
            Alert.alert('Could Not Create Account', e.toString().substring(6))
        }

    }

    render() {
        const { isDonor } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <Content contentContainerStyle={[styles.contentPadding, { flex: 1 }]}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <H1 style={styles.title}>Create an Account</H1>
                    </View>

                    <View style={{ flex: 4, justifyContent: 'space-between' }}>
                        <Form style={{marginTop: 20}}>
                            <View style={{marginBottom: 50}}>
                                <Segment style={{ backgroundColor: 'transparent' }}>
                                    <Button
                                        style={{
                                            height: 50,
                                            flex: 1,
                                            justifyContent: 'center',
                                            backgroundColor: isDonor ? THEME_COLOR : undefined,
                                            borderColor: THEME_COLOR,
                                        }}
                                        first
                                        active={isDonor}
                                        onPress={() => { this.setState({ isDonor: true }) }}
                                    >
                                        <Text style={{ fontSize: 17, fontWeight: '600', color: isDonor ? 'white' : THEME_COLOR }}>Donor</Text>
                                    </Button>
                                    <Button
                                        style={{
                                            height: 50,
                                            flex: 1,
                                            justifyContent: 'center',
                                            backgroundColor: !isDonor ? THEME_COLOR : undefined,
                                            borderColor: THEME_COLOR,
                                        }}
                                        last
                                        active={!isDonor}
                                        onPress={() => { this.setState({ isDonor: false }) }}
                                    >
                                        <Text style={{ fontSize: 17, fontWeight: '600', color: !isDonor ? 'white' : THEME_COLOR }}>Organization</Text>
                                    </Button>
                                </Segment>
                            </View>

                            <Item rounded style={styles.roundedItem}>
                                <Input
                                    placeholder={'E-mail'}
                                    placeholderTextColor={'#9b9b9f'}
                                    value={this.state.email}
                                    autoCapitalize={'none'}
                                    clearButtonMode={'while-editing'}
                                    keyboardType={'email-address'}
                                    autoCorrect={false}
                                    onChangeText={(email) => this.setState({ email })}
                                />
                            </Item>
                            <Item rounded style={styles.roundedItem}>
                                <Input
                                    placeholder={'Password'}
                                    placeholderTextColor={'#9b9b9f'}
                                    value={this.state.password}
                                    autoCapitalize={'none'}
                                    clearButtonMode={'while-editing'}
                                    autoCorrect={false}
                                    secureTextEntry
                                    onChangeText={(password) => this.setState({ password })}
                                />
                            </Item>
                            <Item rounded style={styles.roundedItem}>
                                <Input
                                    placeholder={isDonor ? 'Full Name' : 'Organization Name'}
                                    placeholderTextColor={'#9b9b9f'}
                                    value={this.state.name}
                                    autoCapitalize={'words'}
                                    clearButtonMode={'while-editing'}
                                    autoCorrect={false}
                                    onChangeText={(name) => this.setState({ name })}
                                />
                            </Item>
                            {
                                !isDonor && (
                                    <Item rounded style={styles.roundedItem}>
                                        <Input
                                            placeholder={'Fundraising Goal ($)'}
                                            placeholderTextColor={'#9b9b9f'}
                                            value={this.state.goal}
                                            keyboardType={'number-pad'}
                                            clearButtonMode={'while-editing'}
                                            autoCorrect={false}
                                            onChangeText={(goal) => this.setState({ goal })}
                                        />
                                    </Item>
                                )
                            }
                        </Form>
                        {
                            this.state.loaderVisible ? (
                                <ActivityIndicator size="large" color="#000" />
                            ) : null
                        }
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center'}}>
                        <Button rounded style={styles.roundedBtn} onPress={this.onSubmit.bind(this)}>
                            <Text style={styles.buttonText}>Create Account</Text>
                        </Button>
                    </View>
                    
                </Content>
            </SafeAreaView>
        );
    }
}
