import React, { Component } from 'react';
import { View, Alert, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Text, Content, Icon } from 'native-base';
import TaskCard from '@components/TaskCard';
import { auth, database, provider } from '@src/firebase';
import { THEME_COLOR } from '@assets/colors';
import styles from '@assets/styles';

export default class ManageDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: null
        }
        this.currentUser = auth.currentUser;
    }

    componentDidMount() {
        this.getTaskAuthor()
    }

    getTaskAuthor() {
        const { navigation } = this.props;
        const task = navigation.getParam('item');

        database.ref(`tasks/${task.key}`).once('value', (snapshot) => {
            const authorID = snapshot.val().authorID;
            database.ref(`users/${authorID}`).once('value', (user) => {
                this.setState({
                    author: user.val()
                })
            })
        })
    }

    render() {
        const { navigation } = this.props;
        const task = navigation.getParam('item');

        const fullAddress = `${task.address} ${task.city}, ${task.state}`;

        const list = [
            {
                title: 'LOCATION',
                icon: 'pin',
                body: fullAddress
            },
            {
                title: 'SCHEDULED TIME',
                icon: 'time',
                body: `${task.completionDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}  –  ${task.completionDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
            },
            {
                title: 'EARNINGS',
                icon: 'card',
                body: task.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).slice(0, -3)
            },
            {
                title: 'CONTACT',
                icon: 'person',
                body: this.state.author ? this.state.author.name : ''
            },
        ]

        const taskAttributes = list.map((item, index) =>
            <View key={index} style={{ flex: 1, flexDirection: 'row', marginVertical: 15 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name={item.icon} style={{ color: '#9B9FAA', fontSize: 26 }} />
                </View>
                <View style={{ flex: 4 }}>
                    <Text style={styles.attribute}>{item.title}</Text>
                    <Text style={[styles.cardBodyText, { fontWeight: '500' }]}>{item.body}</Text>
                </View>
            </View>
        );

        return (
            <Content showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={[styles.topText, { marginTop: -8 }]}>{task.category}</Text>
                    <Text style={[styles.bigText, { paddingBottom: 12 }]}>{task.title}</Text>
                    <Text style={styles.cardBodyText}>{task.description}</Text>
                </View>
                <View style={[styles.section, { paddingVertical: 20, paddingHorizontal: 0 }]}>
                    { taskAttributes }
                </View>
            </Content>
        );
    }
}