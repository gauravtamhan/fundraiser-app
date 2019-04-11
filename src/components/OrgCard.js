import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import styles from '@assets/styles';
import { THEME_COLOR } from '@assets/colors';

export default class OrgCard extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { data, index, onPress, } = this.props;

        return (
            <TouchableHighlight 
                style={[{ flex: 1, backgroundColor: 'white' }, index % 2 === 0 ? { borderRightWidth: 0.5, borderColor: 'rgb(194,193,196)'} : null ]}
                underlayColor={'#DDD'}
                onPress={onPress}
            >
                <View style={{ flex: 1, height: 180, paddingHorizontal: 8, paddingVertical: 6 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, paddingVertical: 8 }}>
                        <Text style={styles.cardHeaderText}>{data.name}</Text>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Text numberOfLines={4} style={[styles.cardBodyText, { fontSize: 15, textAlign: 'center' }]}>{data.bio}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}