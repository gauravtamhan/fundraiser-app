import React, { Component } from 'react';
import { View, SectionList, TouchableHighlight, Text, ActivityIndicator, StatusBar, FlatList } from 'react-native';
import { Container, Content, Button, Icon, H3, H2, List, ListItem, Body, Card, CardItem, } from 'native-base';
import TaskCard from '@components/TaskCard';
import { auth, database, provider } from '../../firebase';
import { THEME_COLOR, BG_COLOR } from '@assets/colors';
import styles from '@assets/styles';

export default class AllTasks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaderVisible: true,
        };
        this.currentUser = auth.currentUser;
    }

    componentDidMount() {
        this.listenForItems();
    }

    listenForItems() {
        database.ref().child('tasks').on('value', (snapshot) => {
            if (snapshot.exists()) {
                var tasks = [];
                snapshot.forEach((task) => {
                    tasks.push({
                        key: task.key,
                        title: task.val().title,
                        description: task.val().description,
                        amount: (+task.val().amount),
                        date: new Date(task.val().date), //.toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }),
                        isActive: task.val().isActive,
                        completionDate: new Date(task.val().completionDate),
                        address: task.val().address,
                        city: task.val().city,
                        state: task.val().state,
                        category: task.val().category,
                    });
                });

                this.setState({
                    data: tasks,
                    loaderVisible: false
                })
            } else {
                this.setState({
                    data: [],
                    loaderVisible: false
                })
            }
        });
    }

    renderItem({ item, index }) {
        return (
            <TaskCard key={index} data={item} onPress={() => { this.props.navigation.navigate('RequestTaskModal', { item }) }} />
        )
    }

    render() {
        const { data } = this.state;

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
                                ListEmptyComponent={
                                    <View style={{ flex: 1, height: 220, paddingHorizontal: 60, alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <Text style={styles.bigText}>No Tasks Available</Text>
                                        <Text style={[styles.smText, { textAlign: 'center' }]}>As tasks get posted, they will appear here.</Text>
                                    </View>
                                }
                            />
                        )
                }

            </Container>
        )
    }
}