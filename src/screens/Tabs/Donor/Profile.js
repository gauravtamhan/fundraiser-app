import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Button, Text, H1, Container, Content, List, ListItem, Left, Body, Icon, Right } from 'native-base';
import { auth, database, provider } from '@src/firebase';
import { THEME_COLOR } from '@assets/colors';
import styles from '@assets/styles';

export default class Profile extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Button
                    transparent
                    onPress={navigation.getParam('warnLogout')}
                >
                    <Icon name="log-out" style={{ color: THEME_COLOR, fontSize: 26 }} />
                </Button>
            ),
        };
    };
    
    constructor(props) {
        super(props);
        this.state = {}
        this.currentUser = auth.currentUser;
    }

    componentDidMount() {
        this.props.navigation.setParams({ warnLogout: this.warnLogout });
    }

    warnLogout = () => {
        Alert.alert(
            'Confirm Logout',
            'You will be returned to the login screen.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: () => this.logout(),
                    style: 'destructive',
                },
            ]
        );
    }

    async logout() {
        try {
            await auth.signOut();
            // Navigate to login view
            this.props.navigation.navigate('Login')
        } catch (error) {
            console.log(error);
        }

    }

    render() {
        return (
            <Container>
                <Content style={{backgroundColor: 'rgb(250, 250, 250)'}}>
                    <View style={{ paddingVertical: 60 }}>
                        <H1 style={styles.title}>{this.currentUser.displayName}</H1>
                    </View>
                    <List style={{ backgroundColor: 'white', borderTopWidth: 0.5, borderColor: '#c9c9c9' }}>
                        <ListItem onPress={() => { console.log('1')} }>
                            <Text>Manage Contact Info</Text>
                        </ListItem>
                        <ListItem onPress={() => { console.log('2') }}>
                            <Text>View Task History</Text>
                        </ListItem>
                        <ListItem onPress={() => { console.log('3') }}>
                            <Text>View Lifetime Donations</Text>
                        </ListItem>
                        <ListItem last onPress={() => { console.log('4') }}>
                            <Text>Preferences</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
                

        );
    }
}