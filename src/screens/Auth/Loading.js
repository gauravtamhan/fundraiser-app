import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { auth, database, provider } from '../../firebase';
import styles from '@assets/styles';

export default class Loading extends React.Component {
    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                setTimeout(() => {
                    database.ref().child('users/' + user.uid).once('value', (snapshot) => {
                        if (snapshot.val().isDonor) {
                            // user is a donor
                            this.props.navigation.navigate('Tasks')
                        } else {
                            // user is a fundraiser
                            this.props.navigation.navigate('AllTasks')
                        }
                    })
                }, 750)
            } else {
                this.props.navigation.navigate('Login')
            }
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