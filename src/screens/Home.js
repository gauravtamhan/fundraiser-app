import React, { Component } from 'react';
import { ListView, View, AlertIOS, SafeAreaView } from 'react-native';
import { auth, database, provider } from '../firebase';
import ActionButton from '../components/ActionButton';
import ListItem from '../components/ListItem';
import StatusBar from '../components/StatusBar';
import styles from '../assets/styles';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: auth.currentUser,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
        // this.itemsRef = database.ref().child('users/' + this.state.currentUser.uid + '/items');
    }

    componentDidMount() {
        this.listenForItems();
    }

    listenForItems() {
        database.ref().child('users/' + this.state.currentUser.uid + '/items').on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    title: child.val().title,
                    _key: child.key
                });
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });

        });
    }

    addItem = () => {
        const itemsRef = database.ref().child('users/' + this.state.currentUser.uid + '/items');
        AlertIOS.prompt(
            'Add New Item',
            null,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Add',
                    onPress: (text) => {
                        itemsRef.push({ title: text })
                    }
                },
            ],
            'plain-text'
        );
    }

    _renderItem(item) {
        const onPress = () => {
            const itemsRef = database.ref().child('users/' + this.state.currentUser.uid + '/items');
            AlertIOS.alert(
                'Complete',
                `This will remove "${item.title}" from your list.`,
                [   
                    { 
                        text: 'Cancel', 
                        onPress: (text) => console.log('Cancelled'),
                        style: 'cancel',
                    },
                    { 
                        text: 'Complete', 
                        onPress: (text) => itemsRef.child(item._key).remove(),
                    },
                ]
            );
        };

        return (
            <ListItem item={item} onPress={onPress} />
        );
    }

    warnLogout() {
        AlertIOS.alert(
            'Are you sure you want to logout?',
            'You will be returned to the login screen.',
            [
                {
                    text: 'Cancel',
                    onPress: (text) => console.log('Cancelled'),
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: () => this.logout(),
                    style: 'destructive',
                },
            ]
        );
    }

    async logout() {
        try {
            await auth.signOut();
            // Navigate to login view
            this.props.navigation.navigate('Login')
        } catch (error) {
            console.log(error);
        }

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.container}>
                    <StatusBar title="Grocery List" doLogout={this.warnLogout.bind(this)} />
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderItem.bind(this)}
                        enableEmptySections={true}
                        style={styles.listview} />
                    <ActionButton onPress={this.addItem} title="Add" />
                </View>
            </SafeAreaView>
        )
    }
}