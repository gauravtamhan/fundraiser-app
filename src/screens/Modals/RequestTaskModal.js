import React, { Component } from 'react';
import { View, ActivityIndicator, Alert, Platform, TouchableOpacity, Dimensions } from 'react-native';
import {
    Container, Content, Button, Item, Icon, Input,
    Text, Form, Textarea, Picker
} from 'native-base'
import TaskCard from '@components/TaskCard';
import { THEME_COLOR } from '@assets/colors';
import styles from '@assets/styles';
import { auth, database, provider } from '@src/firebase';
import ModalHeader from '@components/ModalHeader';


export default class AddTaskModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            btnDisabled: false,
        };
        this.currentUser = auth.currentUser;
    }

    componentDidMount() {
        this.checkIfRequested();
    }

    checkIfRequested() {
        const { navigation } = this.props;
        const item = navigation.getParam('item');

        if (item.isRequested) {
            this.setState({ btnDisabled: true })
        }
    }

    closeModal() {
        this.props.navigation.goBack()
    }

    handleRequest() {
        const { navigation } = this.props;
        const item = navigation.getParam('item');

        database.ref(`requests/${item.key}`).push({
            requesterID: this.currentUser.uid,
        })

        database.ref(`tasks/${item.key}`).update({
            status: 1,
        })

        database.ref(`users/${this.currentUser.uid}/requestedTasks`).push(item.key)
        
        this.closeModal()
    }

    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('item');

        const { btnDisabled } = this.state;

        return (
            <Container style={{ flex: 1 }}>
                <ModalHeader noBtn title="Request to Complete" onPress={this.closeModal.bind(this)} />
                
                <View style={{flex: 1}}>

                </View>
                <View style={{ 
                    flex: 0,
                    flexGrow: Dimensions.get("window").height >= 812 ? 2 : 3,
                    // height: 230, 
                    borderWidth: 1,
                    borderColor: 'rgba(228, 228, 235, 0.2)',
                    marginHorizontal: 6,
                    shadowColor: '#6C6C6C',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.15,
                    shadowRadius: 40,
                }}>
                    <TaskCard fundraiser data={item} />
                </View>
                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center' }}>
                    <Button rounded style={styles.roundedBtnSecondary} onPress={this.closeModal.bind(this)}>
                        <Text style={styles.buttonTextSecondary}>Dismiss</Text>
                    </Button>
                    <Button rounded disabled={btnDisabled} style={[styles.roundedBtn, btnDisabled && styles.roundedBtnDisabled,  {marginLeft: 25}]} onPress={this.handleRequest.bind(this)}>
                        {
                            btnDisabled ? (
                                <Text style={styles.buttonTextDisabled}>Requested</Text>        
                            ) : (
                                <Text style={styles.buttonText}>Request</Text>
                            )
                        }
                    </Button>
                </View>
                
            </Container>
            
        )
    }
}