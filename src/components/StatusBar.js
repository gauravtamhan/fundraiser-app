import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import styles from '../assets/styles';

export default class StatusBar extends Component {
    render() {
        return (
            <View>
                <View style={styles.statusbar} />
                <View style={styles.navbar}>
                    <View style={[styleSheet.space, styleSheet.holder]} />
                    <View>
                        <Text style={styles.navbarTitle}>{this.props.title}</Text>
                    </View>
                    <View style={[styleSheet.space, styleSheet.holder]}>
                        <TouchableOpacity
                            hitSlop={{top: 8, left: 12, bottom: 8, right: 12}}
                            onPress={() => { this.props.doLogout() }}>
                            <Text style={styleSheet.iosButton}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styleSheet = StyleSheet.create({
    
    space: {
        width: 100,
    },
    holder: {
        alignItems: 'flex-end',
        paddingRight: 16,
        // backgroundColor: '#DDD',
        // width: '25%',
    },
    iosButton: {
        fontSize: 16,
        fontWeight: '500',
        color: '#007AFF',
    },
})
