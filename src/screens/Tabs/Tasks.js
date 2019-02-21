import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Content, Button, Icon } from 'native-base'
import { THEME_COLOR } from '@assets/colors';

export default class Tasks extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Button 
                    transparent
                    onPress={navigation.getParam('addTask')}
                >
                    <Icon name="create" style={{ color: THEME_COLOR }} />
                </Button>
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {}

    }

    componentDidMount() {
        this.props.navigation.setParams({ addTask: this.addTask });
    }

    addTask = () => {
        this.props.navigation.navigate('AddTaskModal')
    };

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <Text>Tasks Screen!</Text>
            </ScrollView>
        )
    }
}