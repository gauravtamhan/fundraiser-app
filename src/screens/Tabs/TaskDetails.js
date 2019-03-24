import React, { Component } from 'react';
import { View, Alert, FlatList, TouchableOpacity } from 'react-native';
import { Button, Text, Content, Icon } from 'native-base';
import TaskCard from '@components/TaskCard';
import { auth, database, provider } from '../../firebase';
import { THEME_COLOR } from '@assets/colors';
import styles from '@assets/styles';

export default class TaskDetails extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Button
                    transparent
                    onPress={navigation.getParam('handleDelete')}
                >
                    <Icon name="trash" style={{ color: THEME_COLOR, fontSize: 26 }} />
                </Button>
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {}
        this.currentUser = auth.currentUser;
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleDelete: this.handleDelete });
    }

    handleDelete = () => {
        const { navigation } = this.props;
        const item = navigation.getParam('item');

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
        const taskRef = database.ref().child('tasks');
        taskRef.child(item.key).remove(() => {
            this.props.navigation.goBack();
        });
    }

    renderListHeader(item) {
        console.log(item)
        return (
            <View style={{ marginTop: 40, paddingHorizontal: 16 }}>
                <Text style={styles.bigText}>Requests ()</Text>
            </View>
        )
    }

    renderItem({ item, index }) {
        return (
            <View key={index} style={styles.requestCard}>
                <View style={styles.requestCardBody}>
                    <View style={styles.requestCardHeaderRow}>
                        <Text style={styles.cardHeaderText}>{item.name}</Text>
                        <Text style={styles.cardRating}>{item.rating} Stars</Text>
                    </View>

                    <Text style={[styles.cardBodyText, { marginTop: 4, fontSize: 15, }]}>{item.bio}</Text>
                </View>
                <View style={styles.requestCardFooterRow}>
                    <TouchableOpacity style={styles.requestCardFooterBtn} onPress={() => { console.log('declined') }}>
                        <Text style={[styles.taskListHeaderText, { color: THEME_COLOR }]}>DECLINE</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.requestCardBtnSeparator} />
                    
                    <TouchableOpacity style={styles.requestCardFooterBtn} onPress={() => { console.log('accepted') }}>
                        <Text style={[styles.taskListHeaderText, { color: THEME_COLOR }]}>ACCEPT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('item');

        const fakeData = [
            {
                name: 'Jose Smith',
                bio: 'I am an honest working, young boy scout who is just trying to make it in this world. With the money, I will fund my college education.',
                rating: 4.9
            },
            {
                name: 'Bob Nellis',
                bio: 'This is a post right here',
                rating: 4.1
            },
            {
                name: 'Sarah Williams',
                bio: 'Gimme that task boy. This is some dummy text, see how it goes? Yeah its great!',
                rating: 4.1
            },
        ]

        return (
            <Content showsVerticalScrollIndicator={false}>
                <View style={{
                    paddingHorizontal: 16,
                    paddingVertical: 20,
                }}>
                    <Text style={styles.taskListHeaderText}>POSTED ON {item.date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</Text>
                </View>
                <View style={{
                    height: 200,
                    borderTopWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderColor: 'rgb(194,193,196)',
                }}>
                    <TaskCard data={item} />
                </View>

                <FlatList
                    data={fakeData}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => item.name + index}
                    renderItem={this.renderItem.bind(this)}
                    ListHeaderComponent={
                        <View style={{ marginTop: 40, paddingHorizontal: 16 }}>
                            <Text style={styles.bigText}>Requests {fakeData.length > 0 ? '(' + fakeData.length + ')' : ''}</Text>
                        </View>
                    }
                    ListEmptyComponent={
                        <View style={{ flex: 1, height: 80, paddingHorizontal: 60, alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text style={[styles.smText, { textAlign: 'center', opacity: 0.6 }]}>No Active Requests.</Text>
                        </View>
                    }
                    ListFooterComponent={
                        <View style={{ height: 20 }} />
                    }
                />


            </Content>
        );
    }
}