import React, { Component } from 'react';
import { View, Alert, FlatList, TouchableOpacity, ActivityIndicator, Modal, WebView, SafeAreaView} from 'react-native';
import { Form, Input, Item, Button, Content, Icon, Text } from 'native-base';
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
            showModal: false,
            status: "Pending",
            price: "25",
            fundraiseremail: "jcclark43-buyer2@gmail.com"
        }
        this.currentUser = auth.currentUser;
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleDelete: this.handleDelete });
        this.loadRequests();
    }

    handleResponse = data => {
        if (data.title === "success") {
            this.setState({ showModal: false, status: "Complete" });
        } else if (data.title === "cancel") {
            this.setState({ showModal: false, status: "Cancelled" });
        } else {
            return;
        }
    };

    loadRequests() {
        const { navigation } = this.props;
        const item = navigation.getParam('item');

        database.ref(`requests/${item.key}`).on('value', (snapshot) => {
            if (snapshot.exists()) {
                var requests = [];
                snapshot.forEach((req) => {
                    database.ref(`users/${req.val().requesterID}`).on('value', (user) => {
                        requests.push({
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

    removeItem = (item) => {
        const taskRef = database.ref().child('tasks');
        taskRef.child(item.key).remove(() => {
            this.props.navigation.goBack();
        });
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
                    
                    <TouchableOpacity style={styles.requestCardFooterBtn} onPress={() => this.setState({ showModal: true })}>
                        <Text style={[styles.taskListHeaderText, { color: THEME_COLOR }]}>ACCEPT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('item');
        console.log(item.key)
        const { requests } = this.state;
        const { price } = this.state;
        const { fundraiseremail } = this.state;

         database.ref(`tasks/${item.key}`).on('value', (snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val().amount);
                this.state.price = snapshot.val().amount;
                console.log(this.state.price);
                //this.setState({
                    //price: snapshot.val().amount
                //})
            } else {
                this.setState({
                    loaderVisible: false
                })
            }
        }) 
        
        console.log(requests);

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
                }
                <View>
                <View style={{ marginTop: 100 }}>
                    <Modal
                        animationType="slide"
                        visible={this.state.showModal}
                        onRequestClose={() => this.setState({ showModal: false })}>
                        <SafeAreaView style={{flex: 1}}>
                            <WebView
                                source={{ uri: "http://ec2-52-15-55-149.us-east-2.compute.amazonaws.com:3000" }}
                                onNavigationStateChange={data =>
                                    this.handleResponse(data)
                                }
                                injectedJavaScript={
                                'document.getElementById("price").value="' + price + '";'
                                +
                                'document.getElementById("fundraiseremail").value="' + fundraiseremail + '";'
                                +
                                'document.f1.submit();'}
                            />
                        </SafeAreaView>
                    </Modal>
                    <TouchableOpacity
                        style={{ width: 300, height: 100 }}
                        onPress={() => this.setState({ showModal: true })}
                    >
                        <Text>Pay with Paypal</Text>
                    </TouchableOpacity>
                    <Text>Payment Status: {this.state.status}</Text>
                </View>
                </View>
            </Content>
            
        );
    }
}