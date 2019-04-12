import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Text, Content } from 'native-base';
import { auth, database, provider } from '@src/firebase';
import { THEME_COLOR } from '@assets/colors';
import styles from '@assets/styles';
import ProgressCircle from 'react-native-progress-circle'


export default class OrgDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.currentUser = auth.currentUser;
    }

    componentDidMount() {

    }

    render() {
        const { navigation } = this.props;
        const org = navigation.getParam('item');

        console.log(org)

        return (
            <View>
            <ProgressCircle
            percent={30}
            radius={50}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
            >
                <Text style={{ fontSize: 18 }}>{'30%'}</Text>
            </ProgressCircle>
            <Content showsVerticalScrollIndicator={false}>
                <View>
                    <Text>{org.name}</Text>
                </View>
            </Content>
            </View>
        );
    }
}