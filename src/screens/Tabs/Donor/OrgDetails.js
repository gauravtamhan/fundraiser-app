import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator, TextInput, Alert, Modal, WebView, SafeAreaView } from 'react-native';
import { Button, Text, Content, Container, List, ListItem, Icon, H1, Form, Item, Input } from 'native-base';
import { auth, database, provider } from '@src/firebase';
import { THEME_COLOR } from '@assets/colors';
import styles from '@assets/styles';
import ProgressCircle from 'react-native-progress-circle'


export default class OrgDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            status: "Pending",
            fundraiseremail: "jcclark43-buyer2@gmail.com",
            price: undefined,
            amount: 0,
            progress: 0,
            loaderVisible: true
        }
        this.currentUser = auth.currentUser;
    }

    componentDidMount() {
        this.loadRequests();
    }

    updateGoalAmount() {
        const { navigation } = this.props;
        const org = navigation.getParam('item');
        this.state.amount = parseFloat(parseFloat(this.state.amount) + parseFloat(this.state.price));
        console.log(this.state.amount)
        console.log(typeof(this.state.amount));
        database.ref(`goals/${org.key}`).update({
            amountEarned: parseFloat(this.state.amount)
        })
    }

    handleResponse = data => {
        if (data.title === "success") {
            this.setState({ showModal: false, status: "Complete" });
            this.updateGoalAmount();
            //this.props.navigation.goBack();
        } else if (data.title === "cancel") {
            this.setState({ showModal: false, status: "Cancelled" });
        } else {
            return;
        }
    };

    loadRequests() {
        const { navigation } = this.props;
        const org = navigation.getParam('item');
        database.ref(`goals/${org.key}`).on('value', (snapshot) => {
            var goal = snapshot.val().goal;
            var amount = snapshot.val().amountEarned;
            //console.log(amount);
            this.state.amount = amount;
            this.state.progress = amount*1.0/goal*100;
            console.log(this.state.progress);
            this.setState({
                loaderVisible: false
            })
        });

        
        console.log(this.state.progress);
    }

    render() {
        const { navigation } = this.props;
        const org = navigation.getParam('item');
        const { price, fundraiseremail } = this.state;
        const { status, showModal } = this.state;
        
        console.log(this.state.progress)

        console.log(org);
        // return (condition) ? (thing1) : (thing2)
        return (
              
            <Container>
                { this.state.loaderVisible ? (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" />
                        </View>
                    ) : (
                <Content style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
                    <View style={{ paddingTop: 50, backgroundColor: 'transparent' }}>
                        <H1 style={styles.title}>{org.name}</H1>
                        <View style={{ paddingTop: 10, paddingBottom: 36, paddingHorizontal: 14 }}>
                            <Text style={[styles.taskListHeaderText, { textAlign: 'center', lineHeight: 19 }]}>{org.bio}</Text>
                        </View>
                    </View>
                    <View style={styles.contentPadding}>
                        <Form>
                            <Item rounded style={styles.roundedItem}>
                                <Input
                                    placeholder={'Amount to be Donated'}
                                    placeholderTextColor={'#9b9b9f'}
                                    value={price}
                                    autoCapitalize={'sentences'}
                                    clearButtonMode={'while-editing'}
                                    autoCorrect
                                    onChangeText={(price) => this.setState({ price })}
                                />
                            </Item>
                            <Button rounded style={styles.roundedBtn} onPress={() => this.setState({ showModal: true })}>
                                    <Text style={styles.buttonText}>Donate</Text>
                            </Button>
                        </Form>
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
                                'document.getElementById("price").value="' + price + '";'
                                +
                                'document.getElementById("fundraiseremail").value="' + fundraiseremail + '";'
                                +
                                'document.f1.submit();'}
                        />
                    </SafeAreaView>
                </Modal>
                <View style={{ paddingTop: 50, paddingBottom: 10, paddingHorizontal: 14 }}>
                    <Text style={[styles.taskListHeaderText, { textAlign: 'center', lineHeight: 19 }]}>{"Progress to Goal"}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
                    <ProgressCircle
                    percent={this.state.progress}
                    radius={50}
                    borderWidth={8}
                    color="rgb(149, 62, 255)"
                    shadowColor="#9b9b9f"
                    bgColor="#fff"
                    >
                    <Text style={styles.taskListHeaderText}>{`${Math.round(this.state.progress * 100) / 100}%`}</Text>
                    </ProgressCircle>
                </View>
                    </Content> )
                }
            </Container>
           
        );
    }
}