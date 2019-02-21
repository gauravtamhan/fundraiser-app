import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

export default class Tasks extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    componentDidMount() {

    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <Text>Tasks Screen!</Text>
            </ScrollView>
        )
    }
}