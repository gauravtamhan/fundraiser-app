import React, { Component } from 'react';
import { View, ActivityIndicator, Alert, Platform, TouchableOpacity } from 'react-native';
import {
    Container, Content, Button, Item, Icon, Input,
    Text, Form, Textarea, Picker
} from 'native-base'
import TaskCard from '@components/TaskCard';
import { THEME_COLOR } from '@assets/colors';
import styles from '@assets/styles';
import { auth, database, provider } from '../../firebase';
import ModalHeader from '@components/ModalHeader';


export default class AddTaskModal extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.currentUser = auth.currentUser;
    }

    closeModal() {
        this.props.navigation.goBack()
    }

    requestModal() {
        console.log("hi");
        const { navigation } = this.props;
        const item = navigation.getParam('item');
        console.log(item.key);
        database.ref('requests').push({
            tasksID: item.key,
            requesterID: this.currentUser.uid,
        })
        this.props.navigation.goBack()
    }

    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('item');

        return (
            <Container style={{ flex: 1 }}>
                <ModalHeader noBtn title="Request to Complete" onPress={this.closeModal.bind(this)} />
                
                <View style={{flex: 1}}>

                </View>
                <View style={{ 
                    height: 200, 
                    borderWidth: 1,
                    borderColor: 'rgba(228, 228, 235, 0.2)',
                    // borderColor: 'transparent',
                    marginHorizontal: 6,
                    shadowColor: '#6C6C6C',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.15,
                    shadowRadius: 40,
                }}>
                    <TaskCard data={item} />
                </View>
                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center' }}>
                    <Button rounded style={styles.roundedBtnSecondary} onPress={this.closeModal.bind(this)}>
                        <Text style={styles.buttonTextSecondary}>Cancel</Text>
                    </Button>
                    <Button rounded style={[styles.roundedBtn, {marginLeft: 25}]} onPress={this.requestModal.bind(this)}>
                        <Text style={styles.buttonText}>Request</Text>
                    </Button>
                </View>
                
            </Container>
            
        )
    }
}