import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { Container } from 'native-base';
import { THEME_COLOR, BG_COLOR } from '@assets/colors';
import { auth, database, provider } from '@src/firebase';
import styles from '@assets/styles';
import OrgCard from '@components/OrgCard';


export default class Orgs extends Component {
    
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
        database.ref('users').orderByChild('isDonor').equalTo(false).on('value', (snapshot) => {
            if (snapshot.exists()) {
                let fundraisers = [];
                snapshot.forEach((org) => {
                    fundraisers.push({
                        key: org.key,
                        name: org.val().name,
                        bio: org.val().bio,
                    })
                });

                this.setState({
                    data: fundraisers,
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
        })
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
            <OrgCard key={index} data={item} index={index} onPress={() => { this.props.navigation.navigate('OrgDetails', { item })}} />
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
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => item.name + index}
                                renderItem={this.renderItem.bind(this)}
                                ItemSeparatorComponent={({ highlighted }) => <View style={styles.listSeparator} />}
                                ListFooterComponent={
                                    <View style={data.length > 0 && styles.listSeparator} />
                                }
                                ListHeaderComponent={
                                    <View style={data.length > 0 && styles.listSeparatorSpace} />
                                }
                                ListEmptyComponent={
                                    <View style={{ flex: 1, height: 220, paddingHorizontal: 60, alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <Text style={styles.bigText}>No Organizations Listed</Text>
                                        <Text style={[styles.smText, { textAlign: 'center' }]}>As new organizations sign up, they will appear here.</Text>
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