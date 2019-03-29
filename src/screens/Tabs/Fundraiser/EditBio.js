import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text, H1, Container, Content, Form, Textarea, Icon } from 'native-base';
import { auth, database, provider } from '@src/firebase';
import { THEME_COLOR } from '@assets/colors';
import styles from '@assets/styles';

export default class EditBio extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Button
                    transparent
                    onPress={navigation.getParam('saveBio')}
                >
                    <Icon name="save" style={{ color: THEME_COLOR, fontSize: 26 }} />
                </Button>
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            bio: '',
        }
        this.currentUser = auth.currentUser;
    }

    componentDidMount() {
        this.props.navigation.setParams({ saveBio: this.saveBio });
        this.getBio();
    }

    getBio() {
        database.ref(`users/${this.currentUser.uid}`).once('value', (snapshot) => {
            this.setState({
                bio: snapshot.val().bio,
            })
        })
    }

    saveBio = () => {
        database.ref(`users/${this.currentUser.uid}`).update({
            bio: this.state.bio,
        })
        this.props.navigation.goBack();
    }


    render() {
        const { bio } = this.state;

        return (
            <Container style={{ flex: 1 }}>
                <Content contentContainerStyle={[styles.contentPadding, { flex: 1 }]}>
                    <Form style={{ marginTop: 26 }}>
                        <Textarea
                            rowSpan={6}
                            autoFocus
                            rounded
                            style={styles.roundedTextArea}
                            placeholderTextColor={'#9b9b9f'}
                            placeholder="Organization description"
                            autoCorrect
                            value={bio}
                            onChangeText={(bio) => this.setState({ bio })}
                        />
                    </Form>
                </Content>
            </Container>


        );
    }
}