import React, { Component } from 'react';
import { View, SectionList, TouchableHighlight, Text, ActivityIndicator, StatusBar, FlatList } from 'react-native';
import { Container, Content, Button, Icon, H3, H2, List, ListItem, Body, Card, CardItem, } from 'native-base';
import TaskCard from '@components/TaskCard';
import { auth, database, provider } from '@src/firebase';
import { THEME_COLOR, BG_COLOR } from '@assets/colors';
import styles from '@assets/styles';

export default class AllTasks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaderVisible: true,
            refreshing: false,
        };
        this.currentUser = auth.currentUser;
    }

    componentDidMount() {
        this.listenForItems();
    }

    listenForItems() {
        // whooooooooo
        
        database.ref().child('tasks').on('value', (snapshot) => {
            var tasks = [];
            if (snapshot.exists()) {
                var requestedTasks = []
                database.ref(`users/${this.currentUser.uid}/requestedTasks`).once('value', (snap) => {
                    if (snap.exists()) {
                        snap.forEach((t) => {
                            requestedTasks.push(t.val())
                        })
                    }

                    snapshot.forEach((task) => {
                        tasks.push({
                            key: task.key,
                            title: task.val().title,
                            description: task.val().description,
                            amount: (+task.val().amount),
                            timestamp: new Date(task.val().timestamp), //.toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }),
                            status: task.val().status,
                            isActive: task.val().isActive,
                            completionDate: new Date(task.val().completionDate),
                            address: task.val().address,
                            city: task.val().city,
                            state: task.val().state,
                            category: task.val().category,
                            isRequested: requestedTasks.includes(task.key)
                        });
                    });

                    this.setState({
                        data: tasks,
                        loaderVisible: false,
                        refreshing: false,
                    })

                })
                
            } else {
                this.setState({
                    data: [],
                    loaderVisible: false,
                    refreshing: false,
                })
            }
        });
    }

    handleRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.listenForItems();
        })
    }

    renderItem({ item, index }) {
        return (
            <TaskCard fundraiser={true} key={index} data={item} onPress={() => { this.props.navigation.navigate('RequestTaskModal', { item }) }} />
        )
    }

    render() {
        const { data } = this.state;

        // console.log(data)

        return (
            <Container style={{ backgroundColor: BG_COLOR }}>
                {
                    this.state.loaderVisible ? (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" />
                        </View>
                    ) : (
                            <FlatList 
                                data={data}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => item.title + index}
                                renderItem={this.renderItem.bind(this)}
                                ItemSeparatorComponent={({ highlighted }) => <View style={styles.listSeparator} />}
                                // ListHeaderComponent={
                                //     <View style={[styles.listSeparator, { marginTop: 80 }]} />
                                // }
                                ListFooterComponent={
                                    <View style={data.length > 0 && styles.listSeparator } />
                                }
                                ListEmptyComponent={
                                    <View style={{ flex: 1, height: 220, paddingHorizontal: 60, alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <Text style={styles.bigText}>No Tasks Available</Text>
                                        <Text style={[styles.smText, { textAlign: 'center' }]}>As tasks get posted, they will appear here.</Text>
                                    </View>
                                }
                                refreshing={this.state.refreshing}
                                onRefresh={this.handleRefresh}
                            />
                        )
                }

            </Container>
        )
    }
}