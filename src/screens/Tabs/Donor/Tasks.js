import React, { Component } from 'react';
import { View, SectionList, FlatList, TouchableHighlight, Text, ActivityIndicator } from 'react-native';
import { Container, Content, Button, Icon, H3, H2, List, ListItem, Body, Card, CardItem, } from 'native-base';
import TaskCard from '@components/TaskCard';
import { auth, database, provider } from '@src/firebase';
import { THEME_COLOR, BG_COLOR } from '@assets/colors';
import styles from '@assets/styles';

export default class Tasks extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Button 
                    transparent
                    onPress={navigation.getParam('addTask')}
                >
                    <Icon name="add" style={{ color: THEME_COLOR, fontSize: 26 }} />
                </Button>
            ),
        };
    };

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
        this.props.navigation.setParams({ addTask: this.addTask });
        this.listenForItems();
    }

    listenForItems() {
        database.ref().child('tasks').orderByChild('authorID').equalTo(this.currentUser.uid).on('value', (snapshot) => {
            if (snapshot.exists()) {
                var tasks = [];
                snapshot.forEach((task) => {
                    tasks.push({
                        key: task.key,
                        title: task.val().title,
                        description: task.val().description,
                        amount: (+task.val().amount),
                        timestamp: new Date(task.val().timestamp),
                        isActive: task.val().isActive,
                        status: task.val().status,
                        completionDate: new Date(task.val().completionDate),
                        address: task.val().address,
                        city: task.val().city,
                        state: task.val().state,
                        category: task.val().category,
                    });
                });

                this.setState({
                    data: tasks,
                    loaderVisible: false,
                    refreshing: false,
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

    addTask = () => {
        this.props.navigation.navigate('AddTaskModal')
    };

    // groupBy(objectArray, property) {
    //     return objectArray.reduce(function (acc, obj) {
    //         var key = obj[property];
    //         if (!acc[key]) {
    //             acc[key] = [];
    //         }
    //         acc[key].push(obj);
    //         return acc;
    //     }, {});
    // }

    // createSections(x) {
    //     let obj = this.groupBy(x, 'status')

    //     const resultArray = []
    //     for (const key in obj) {
    //         if (obj.hasOwnProperty(key)) {
    //             resultArray.push({ title: (key == 0 ? 'Unclaimed Tasks' : 'Pending Tasks'), data: obj[key] })
    //         }
    //     }
    //     return resultArray;
    // }

    // renderSectionHeader({ section: { title }}) {
    //     return (
    //         <View style={styles.taskListHeader}>
    //             <Text style={styles.taskListHeaderText}>{title.toUpperCase()}</Text>
    //         </View>
    //     )
    // }

    handleRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.listenForItems();
        })
    }

    renderItem({ item, index }) {
        return (
            <TaskCard key={index} data={item} onPress={() => { this.props.navigation.navigate('TaskDetails', { item }) }}/>
        )
    }

    render() {
        const { data } = this.state;
        // const section_data = this.createSections(data);

        return (
            <Container style={{ backgroundColor: BG_COLOR }}>
                {
                    this.state.loaderVisible ? (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" />
                        </View>
                    ) : (
                        // <SectionList
                        //     showsVerticalScrollIndicator={false}
                        //     sections={section_data}
                        //     ListHeaderComponent={() => <View style={{ height: 30 }} />}
                        //     renderSectionHeader={this.renderSectionHeader.bind(this)}
                        //     renderSectionFooter={() => <View style={{ height: 30 }} />}
                        //     renderItem={this.renderItem.bind(this)}
                        //     ItemSeparatorComponent={({ highlighted }) => <View style={styles.listSeparator} />}
                        //     SectionSeparatorComponent={({ trailingItem, section }) => trailingItem ? null : <View style={styles.listSeparator} />}
                        //     keyExtractor={(item, index) => item.title + index}
                        //     ListEmptyComponent={
                        //         <View style={{ flex: 1, height: 220, paddingHorizontal: 60, alignItems: 'center', justifyContent: 'flex-end' }}>
                        //             <Text style={styles.bigText}>No Tasks Posted</Text>
                        //             <Text style={[styles.smText, { textAlign: 'center' }]}>To post a task, tap the plus button in the top right.</Text>
                        //         </View>
                        //     }
                        // />
                            <FlatList
                                data={data}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => item.title + index}
                                renderItem={this.renderItem.bind(this)}
                                ItemSeparatorComponent={({ highlighted }) => <View style={styles.listSeparator} />}
                                ListFooterComponent={
                                    <View style={data.length > 0 && styles.listSeparator} />
                                }
                                ListEmptyComponent={
                                    <View style={{ flex: 1, height: 220, paddingHorizontal: 60, alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <Text style={styles.bigText}>No Tasks Posted</Text>
                                        <Text style={[styles.smText, { textAlign: 'center' }]}>To post a task, tap the plus button in the top right.</Text>
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