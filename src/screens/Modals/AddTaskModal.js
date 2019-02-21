import React, { Component } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Content, Button, Icon, H1, Text } from 'native-base'
import { THEME_COLOR } from '@assets/colors';
import styles from '@assets/styles';
import ModalHeader from '@components/ModalHeader';

export default class AddTaskModal extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    componentDidMount() {

    }

    goBack() {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <ModalHeader title="Add a Task" onPress={this.goBack.bind(this)} />
            </ScrollView>
        )
    }
}