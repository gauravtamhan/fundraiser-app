import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text, Input, Container, Content, Form, Item, Icon } from 'native-base';
import { auth, database, provider } from '@src/firebase';
import { THEME_COLOR } from '@assets/colors';
import styles from '@assets/styles';

export default class EditGoal extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Button
                    transparent
                    onPress={navigation.getParam('saveGoal')}
                >
                    <Icon name="save" style={{ color: THEME_COLOR, fontSize: 26 }} />
                </Button>
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            goal: '0',
        }
        this.currentUser = auth.currentUser;
    }

    componentDidMount() {
        this.props.navigation.setParams({ saveGoal: this.saveGoal });
        this.getGoal();
    }

    getGoal() {
        database.ref(`goals/${this.currentUser.uid}`).once('value', (snapshot) => {
            this.setState({
                goal: snapshot.val().goal,
            })
        })
    }

    saveGoal = () => {
        database.ref(`goals/${this.currentUser.uid}`).update({
            goal: this.state.goal,
        })
        this.props.navigation.goBack();
    }


    render() {
        const { goal } = this.state;

        return (
            <Container style={{ flex: 1 }}>
                <Content contentContainerStyle={[styles.contentPadding, { flex: 1 }]}>
                    <Form style={{ marginTop: 26 }}>
                        <Item rounded style={styles.roundedItem}>
                            {/* <Icon name='card' style={{ color: '#9b9b9f' }} /> */}
                            <Input
                                placeholder={'Amount'}
                                placeholderTextColor={'#9b9b9f'}
                                value={goal}
                                keyboardType={'number-pad'}
                                clearButtonMode={'while-editing'}
                                autoFocus
                                onChangeText={(goal) => this.setState({ goal })}
                            />
                        </Item>
                    </Form>
                </Content>
            </Container>


        );
    }
}