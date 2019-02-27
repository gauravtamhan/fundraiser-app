import React, { Component } from 'react';
import { View, SectionList, TouchableHighlight, Text, ActivityIndicator } from 'react-native';
import { Container, Content, Button, Icon, H3, H2, List, ListItem, Body, Card, CardItem, } from 'native-base';
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
        database.ref().child('tasks/').on('value', (snapshot) => {
            if (snapshot.exists()) {
                var tasks = [];
                snapshot.forEach((task) => {
                    tasks.push({
                        key: task.key,
                        title: task.val().title,
                        description: task.val().description,
                        amount: (+task.val().amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
                        date: new Date(task.val().date).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }),
                        isActive: task.val().isActive,
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

    groupBy(objectArray, property) {
        return objectArray.reduce(function (acc, obj) {
            var key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
    }

    createSections(x) {
        let obj = this.groupBy(x, 'isActive')

        const resultArray = []
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                resultArray.push({ title: (key == 'true' ? 'Active Tasks' : 'Inactive Tasks'), data: obj[key] })
            }
        }
        return resultArray;
    }

    renderSectionHeader({ section: { title } }) {
        return (
            <View style={styles.taskListHeader}>
                <Text style={styles.taskListHeaderText}>{title.toUpperCase()}</Text>
            </View>
        )
    }

    renderItem({ item, index }) {
        return (
            <TouchableHighlight key={index} style={{ flex: 1, backgroundColor: 'white' }} underlayColor={'#DDD'} onPress={() => {
                this.props.navigation.navigate('TaskDetails', { item })
            }}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderText}>{item.title}</Text>
                        <Text style={styles.cardHeaderDate}>{item.date}</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <Text style={styles.cardBodyText}>{item.description}</Text>
                    </View>
                    <View style={styles.cardFooter}>
                        <Text style={styles.cardAmount}>{item.amount}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        const { data } = this.state;
        const section_data = this.createSections(data);

        return (
            <Container style={{ backgroundColor: BG_COLOR }}>
                {
                    this.state.loaderVisible ? (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" />
                        </View>
                    ) : (
                            <SectionList
                                showsVerticalScrollIndicator={false}
                                sections={section_data}
                                ListHeaderComponent={() => <View style={{ height: 30 }} />}
                                renderSectionHeader={this.renderSectionHeader.bind(this)}
                                renderSectionFooter={() => <View style={{ height: 30 }} />}
                                renderItem={this.renderItem.bind(this)}
                                ItemSeparatorComponent={({ highlighted }) => <View style={styles.listSeparator} />}
                                SectionSeparatorComponent={({ trailingItem, section }) => trailingItem ? null : <View style={styles.listSeparator} />}
                                keyExtractor={(item, index) => item.title + index}
                                ListEmptyComponent={
                                    <View style={{ flex: 1, height: 220, paddingHorizontal: 60, alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <Text style={styles.bigText}>No Tasks Posted</Text>
                                        <Text style={[styles.smText, { textAlign: 'center' }]}>To post a task, tap the plus button in the top right.</Text>
                                    </View>
                                }
                            />
                        )
                }

            </Container>
        )
    }
}