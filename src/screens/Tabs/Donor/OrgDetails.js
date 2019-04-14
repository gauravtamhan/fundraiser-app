import React, { Component } from 'react';
import { View, ActivityIndicator, Modal, WebView, SafeAreaView } from 'react-native';
import { Button, Text, Content, Container, H1, Form, Item, Input } from 'native-base';
import { auth, database, provider } from '@src/firebase';
import { THEME_COLOR } from '@assets/colors';
import styles from '@assets/styles';
import ProgressCircle from 'react-native-progress-circle';


export default class OrgDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
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
        const org = this.props.navigation.getParam('item');

        this.setState((prevState, props) => ({
            amount: parseFloat(prevState.amount) + parseFloat(prevState.price)
        }), () => {
                database.ref(`goals/${org.key}`).update({
                    amountEarned: this.state.amount
                })
        });
    }

    handleResponse = data => {
        if (data.title === "success") {
            this.setState({ showModal: false });
            this.updateGoalAmount();
        } else if (data.title === "cancel") {
            this.setState({ showModal: false });
        } else {
            return;
        }
    };

    loadRequests() {
        const org = this.props.navigation.getParam('item');

        database.ref(`goals/${org.key}`).on('value', (snapshot) => {
            const goal = snapshot.val().goal;
            const amount = snapshot.val().amountEarned;
            
            this.setState({
                amount: amount,
                progress: amount * 1.0 / goal * 100,
                loaderVisible: false
            })
            
        });

    }

    render() {
        const org = this.props.navigation.getParam('item');
        const { price, showModal, progress, loaderVisible } = this.state;

        const fundraiseremail = "jcclark43-buyer2@gmail.com";

        return (
            <Container>
                { 
                    loaderVisible ? (
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
                                    <Button rounded style={styles.roundedBtn} onPress={() => this.setState({ showModal: true }) }>
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
                                            `document.getElementById("price").value="${ price === undefined ? '0' : price }"`
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
                        </Content> 
                    )
                }
            </Container>
           
        );
    }
}