import React, { Component } from 'react';
import { View, Alert, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Text, Content, Icon } from 'native-base';
import TaskCard from '@components/TaskCard';
import { auth, database, provider } from '@src/firebase';
import { THEME_COLOR } from '@assets/colors';
import styles from '@assets/styles';

export default class TaskDetails extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Button
                    transparent
                    onPress={navigation.getParam('handleDelete')}
                >
                    <Icon name="trash" style={{ color: THEME_COLOR, fontSize: 26 }} />
                </Button>
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            loaderVisible: true,
            taskStatus: 0,
            user: undefined,
        }
        this.currentUser = auth.currentUser;
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleDelete: this.handleDelete });
        this.loadRequests();
        this.getTaskStatus();
    }

    getTaskStatus() {
        const { navigation } = this.props;
        const task = navigation.getParam('item');

        database.ref(`tasks/${task.key}`).on('value', (snapshot) => {
            var s = snapshot.val().status
            this.setState({ taskStatus: s }, () => {
                if (s == 2) {
                    this.getAssignedUser()
                }
            })
        })
    }

    getAssignedUser() {
        const { navigation } = this.props;
        const task = navigation.getParam('item');

        database.ref(`tasks/${task.key}`).once('value', (snapshot) => {
            const assigneeID = snapshot.val().assigneeID;
            database.ref(`users/${assigneeID}`).once('value', (user) => {
                this.setState({
                    user: user.val()
                })
            })
        })
    }

    loadRequests() {
        const { navigation } = this.props;
        const item = navigation.getParam('item');

        database.ref(`requests/${item.key}`).on('value', (snapshot) => {
            if (snapshot.exists()) {
                var requests = [];
                snapshot.forEach((req) => {
                    database.ref(`users/${req.val().requesterID}`).on('value', (user) => {
                        requests.push({
                            userID: user.key,
                            name: user.val().name,
                            bio: user.val().bio,
                        })

                        this.setState({
                            requests: requests,
                            loaderVisible: false
                        })
                    })
                });
            } else {
                this.setState({
                    loaderVisible: false
                })
            }
        })
    }

    handleDelete = () => {
        const { navigation } = this.props;
        const item = navigation.getParam('item');

        Alert.alert(
            'Confirm Delete',
            `"${item.title}" will no longer be public and will be removed from your tasks.`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => this.removeItem(item),
                    style: 'destructive',
                },
            ]
        );
    }

    handleAccept = (uid) => {
        const { navigation } = this.props;
        const task = navigation.getParam('item');

        database.ref(`tasks/${task.key}`).update({
            assigneeID: uid,
            status: 2,
        })

        this.getAssignedUser();
    }

    removeItem = (item) => {
        const taskRef = database.ref().child('tasks');
        taskRef.child(item.key).remove(() => {
            this.props.navigation.goBack();
        });
    }

    renderSelectedOrg() {
        const { user } = this.state;

        return (
            <View style={styles.requestCard}>
                <View style={styles.requestCardBody}>
                    <View style={styles.requestCardHeaderRow}>
                        <Text style={styles.cardHeaderText}>{user.name}</Text>
                    </View>

                    <Text style={[styles.cardBodyText, { marginTop: 4, fontSize: 15, }]}>{user.bio}</Text>
                </View>
            </View>
        )
    }

    renderListHeader(item) {
        return (
            <View style={{ marginTop: 40, paddingHorizontal: 16 }}>
                <Text style={styles.bigText}>Requests ()</Text>
            </View>
        )
    }

    renderItem({ item, index }) {
        return (
            <View key={index} style={styles.requestCard}>
                <View style={styles.requestCardBody}>
                    <View style={styles.requestCardHeaderRow}>
                        <Text style={styles.cardHeaderText}>{item.name}</Text>
                        {/* <Text style={styles.cardRating}>{item.rating} Stars</Text> */}
                    </View>

                    <Text style={[styles.cardBodyText, { marginTop: 4, fontSize: 15, }]}>{item.bio}</Text>
                </View>
                <View style={styles.requestCardFooterRow}>
                    <TouchableOpacity style={styles.requestCardFooterBtn} onPress={() => { console.log('declined') }}>
                        <Text style={[styles.taskListHeaderText, { color: THEME_COLOR }]}>DECLINE</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.requestCardBtnSeparator} />
                    
                    <TouchableOpacity style={styles.requestCardFooterBtn} onPress={() => { this.handleAccept(item.userID) }}>
                        <Text style={[styles.taskListHeaderText, { color: THEME_COLOR }]}>ACCEPT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('item');

        const { requests, user } = this.state;

        return (
            <Content showsVerticalScrollIndicator={false}>
                <View style={{
                    paddingHorizontal: 16,
                    paddingVertical: 20,
                }}>
                    <Text style={styles.taskListHeaderText}>POSTED ON {item.timestamp.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</Text>
                </View>
                <View style={{
                    height: 230,
                    borderTopWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderColor: 'rgb(194,193,196)',
                }}>
                    <TaskCard data={item} />
                </View>
                {
                    this.state.taskStatus == 2 && user !== undefined  ? (
                        <View>
                            { this.renderSelectedOrg() }
                        </View>
                    ) : (
                            this.state.loaderVisible ? (
                                <View style={[styles.loaderContainer, { marginTop: 80 }]}>
                                    <ActivityIndicator size="large" />
                                </View>
                            ) : (
                                    <FlatList
                                        data={requests}
                                        showsVerticalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.name + index}
                                        renderItem={this.renderItem.bind(this)}
                                        ListHeaderComponent={
                                            <View style={{ marginTop: 40, paddingHorizontal: 16 }}>
                                                {
                                                    requests.length > 0 && <Text style={styles.bigText}>Requests {requests.length > 0 ? '(' + requests.length + ')' : ''}</Text>
                                                }
                                            </View>
                                        }
                                        ListEmptyComponent={
                                            <View style={{ flex: 1, height: 80, paddingHorizontal: 60, alignItems: 'center', justifyContent: 'flex-end' }}>
                                                <Text style={[styles.smText, { textAlign: 'center', opacity: 0.6 }]}>No Active Requests.</Text>
                                            </View>
                                        }
                                        ListFooterComponent={
                                            <View style={{ height: 20 }} />
                                        }
                                    />
                                )
                    )
                }

            </Content>
        );
    }
}