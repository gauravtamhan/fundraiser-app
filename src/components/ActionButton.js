import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import styles from '../assets/styles';

export default class ActionButton extends Component {
    render() {
        return (
            <TouchableHighlight
                style={[styles.button, { backgroundColor: '#24CE84'}]}
                underlayColor={'#17C177'}
                onPress={this.props.onPress}>
                <Text style={styles.actionText}>{this.props.title}</Text>
            </TouchableHighlight>
        );
    }
}
