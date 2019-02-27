import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Button, Text, H1, Container, Content, List, ListItem, Left, Body, Icon, Right } from 'native-base';
import { auth, database, provider } from '../../firebase';
import { THEME_COLOR } from '@assets/colors';
import styles from '../../assets/styles';

export default class TaskDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.currentUser = auth.currentUser;
    }

    handleDelete = (item) => {
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
        const taskRef = database.ref().child('tasks/' + this.currentUser.uid);
        taskRef.child(item.key).remove(() => {
            this.props.navigation.goBack();
        });
    }

    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('item');

        const rows = [
            {
                icon: 'card',
                header: 'Donation',
                body: 'Amount to pay is ' + item.amount, 
            },
            {
                icon: 'calendar', 
                header: 'Date',
                body: 'Task to be completed on ' + item.date,
            }, 
            {
                icon: 'navigate',
                header: 'Location',
                body: '123 North Avenue NW \n' + 'Atlanta, GA 30332'
            }
        ];

        const renderRows = rows.map((x, i) => 
            <View key={i} style={{ flexDirection: 'row', flex: 1, paddingBottom: 30 }}>
                <Icon name={x.icon} style={{ color: '#484848', fontSize: 22 }} />
                <View style={{ paddingLeft: 20 }}>
                    <Text style={[styles.smText, { fontWeight: '600', lineHeight: 24 }]}>{x.header}</Text>
                    <Text style={[styles.cardBodyText, { lineHeight: 24 }]}>{x.body}</Text>
                </View>
            </View>
        )

        return (
            <Content contentContainerStyle={{padding: 20}}>
                <View style={{paddingTop: 26, paddingBottom: 40}}>
                    <Text style={styles.bigText}>{item.title}</Text>
                    <Text style={styles.cardBodyText}>{item.description}</Text>
                </View>
                <View style={styles.listSeparator} />
                <View style={{paddingVertical: 30}}>
                    {renderRows}
                </View>
                <View style={styles.listSeparator} />
                <View style={{ marginTop: 40 }}>
                    <Button rounded danger style={styles.roundedDeleteBtn} onPress={() => { this.handleDelete(item) }}>
                        <Text style={styles.buttonText}>Delete Task</Text>
                    </Button>
                </View>

            </Content>
        );
    }
}