import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Button, H1, Text, Icon } from 'native-base'
import { THEME_COLOR } from '@assets/colors';
import styles from '@assets/styles';

export default class ModalHeader extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { title, onPress } = this.props;

        return (
            <SafeAreaView>
                <View>
                    <Button transparent onPress={() => onPress()}>
                        {/* <Text style={{ fontWeight: '500', color: THEME_COLOR }}>Close</Text> */}
                        <Icon name="close-circle-outline" style={{ color: THEME_COLOR, fontSize: 26 }} />
                    </Button>
                    <H1 style={[styles.title, { paddingVertical: 10 }]}>{title}</H1>
                </View>
            </SafeAreaView>
        )
    }
}