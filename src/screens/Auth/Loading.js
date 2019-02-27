import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { auth, database, provider } from '../../firebase';
import styles from '@assets/styles';

export default class Loading extends React.Component {
    componentDidMount() {
        auth.onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Tasks' : 'Login')
        })
    }

    render() {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}