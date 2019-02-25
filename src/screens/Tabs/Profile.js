import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Button, Text, H1, Container, Content, List, ListItem, Left, Body, Icon, Right } from 'native-base';
import { auth, database, provider } from '../../firebase';
import { THEME_COLOR } from '@assets/colors';
import styles from '../../assets/styles';

export default class Profile extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Button
                    transparent
                    onPress={navigation.getParam('warnLogout')}
                >
                    <Text style={{ color: THEME_COLOR, fontWeight: '500' }}>Logout</Text>
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
            'Are you sure you want to logout?',
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
                        <H1 style={styles.title}>{'Hi, ' + this.currentUser.displayName}</H1>
                    </View>
                    <List>
                        <ListItem itemHeader first>

                        </ListItem>
                        <ListItem first>
                            <Text>Manage Contact Info</Text>
                        </ListItem>
                        <ListItem>
                            <Text>View Task History</Text>
                        </ListItem>
                        <ListItem>
                            <Text>View Lifetime Donations</Text>
                        </ListItem>
                        <ListItem last>
                            <Text>Preferences</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
                

        );
    }
}