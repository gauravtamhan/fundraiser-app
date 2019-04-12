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
            price: undefined
        }
        this.currentUser = auth.currentUser;
    }

    componentDidMount() {

    }

    handleResponse = data => {
        if (data.title === "success") {
            this.setState({ showModal: false, status: "Complete" });
            this.props.navigation.goBack();
        } else if (data.title === "cancel") {
            this.setState({ showModal: false, status: "Cancelled" });
        } else {
            return;
        }
    };

    render() {
        const { navigation } = this.props;
        const org = navigation.getParam('item');
        const { price, fundraiseremail } = this.state;
        const { status, showModal } = this.state;

        console.log(org);

        return (
              
            <Container>
                <Content style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
                    <View style={{ paddingTop: 50, backgroundColor: 'transparent' }}>
                        <H1 style={styles.title}>{org.name}</H1>
                        <View style={{ paddingTop: 10, paddingBottom: 36, paddingHorizontal: 14 }}>
                            <Text style={[styles.taskListHeaderText, { textAlign: 'center', lineHeight: 19 }]}>{org.bio}</Text>
                        </View>
                    </View>
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
                <View>
                    <ProgressCircle
                    percent={30}
                    radius={50}
                    borderWidth={8}
                    color="#3399FF"
                    shadowColor="#999"
                    bgColor="#fff"
                    >
                    <Text style={{ fontSize: 18 }}>{'30%'}</Text>
                    </ProgressCircle>
                </View>
                </Content>
            </Container>
           
        );
    }
}