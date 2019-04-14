import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Button, Text, H1, Container, Content, List, ListItem, Left, Body, Icon, Right } from 'native-base';
import { auth, database, provider } from '@src/firebase';
import { THEME_COLOR } from '@assets/colors';
import styles from '@assets/styles';
import ProgressCircle from 'react-native-progress-circle';

export default class OrgProfile extends Component {

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
        this.state = {
            bio: '',
            progress: 0,
        }
        this.currentUser = auth.currentUser;
    }

    componentDidMount() {
        this.props.navigation.setParams({ warnLogout: this.warnLogout });
        this.getBio();
        this.getProgress();
    }

    getProgress() {
        database.ref(`goals/${this.currentUser.uid}`).on('value', (snapshot) => {
            const goal = snapshot.val().goal;
            const amount = snapshot.val().amountEarned;
            this.setState({ progress: amount * 1.0 / goal * 100 })
        });
    }

    getBio() {
        database.ref(`users/${this.currentUser.uid}`).on('value', (snapshot) => {
            this.setState({
                bio: snapshot.val().bio,
            })
        })
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
        const { bio, progress } = this.state;

        return (
            <Container>
                <Content style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
                    
                    <View style={{ paddingTop: 50, backgroundColor: 'transparent' }}>
                        <H1 style={styles.title}>{this.currentUser.displayName}</H1>
                        <View style={{ paddingTop: 10, paddingBottom: 36, paddingHorizontal: 14 }}>
                            <Text style={[styles.taskListHeaderText, { textAlign: 'center', lineHeight: 19 }]}>{bio}</Text>
                        </View>
                    </View>

                    <View style={{ paddingBottom: 36}}>  
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
                            <ProgressCircle
                                percent={progress}
                                radius={50}
                                borderWidth={8}
                                color={THEME_COLOR}
                                shadowColor="#9b9b9f"
                                bgColor="#fff"
                            >
                                <Text style={styles.taskListHeaderText}>{`${Math.round(progress * 100) / 100}%`}</Text>
                            </ProgressCircle>
                        </View>
                        <Text style={[styles.taskListHeaderText, { textAlign: 'center', lineHeight: 19, paddingTop: 10 }]}>{"Progress to Goal"}</Text>
                    </View>
                    
                    <List style={{ backgroundColor: 'white', borderTopWidth: 0.5, borderColor: '#c9c9c9' }}>
                        <ListItem onPress={() => { this.props.navigation.navigate('EditBio') }}>
                            <Text>Edit Organization Bio</Text>
                        </ListItem>
                        <ListItem onPress={() => { console.log('1') }}>
                            <Text>View Task History</Text>
                        </ListItem>
                        <ListItem onPress={() => { this.props.navigation.navigate('EditGoal') }}>
                            <Text>Edit Goal Amount</Text>
                        </ListItem>
                        <ListItem last onPress={() => { console.log('3') }}>
                            <Text>Preferences</Text>
                        </ListItem>
                    </List>

                    <View style={{ height: 220, justifyContent: 'flex-start' }}>
                        
                    </View>

                </Content>
            </Container>


        );
    }
}