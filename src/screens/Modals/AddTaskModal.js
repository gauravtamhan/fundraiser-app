import React, { Component } from 'react';
import { View, ActivityIndicator, Alert, Platform } from 'react-native';
import { 
    Container, Content, Button, Item, Icon, Input, 
    Text, Form, Textarea, DatePicker, Picker 
} from 'native-base'
import { THEME_COLOR } from '@assets/colors';
import states from '@assets/states';
import styles from '@assets/styles';
import { auth, database, provider } from '../../firebase';
import ModalHeader from '@components/ModalHeader';

export default class AddTaskModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            amount: '',
            address: '',
            city: '', 
            selectedState: undefined,
            loaderVisible: false,
            completionDate: undefined,
        };
        this.currentUser = auth.currentUser;
        this.setDate = this.setDate.bind(this);
        this.showLoader = this.showLoader.bind(this);
        this.hideLoader = this.hideLoader.bind(this);
    }

    showLoader() {
        this.setState({ loaderVisible: true });
    }

    hideLoader() {
        this.setState({ loaderVisible: false });
    }

    setDate(newDate) {
        this.setState({ completionDate: newDate });
    }

    raiseAlert(title, msg) {
        Alert.alert(title, msg)
    }

    handleSelectedState(value) {
        this.setState({
            selectedState: value
        });
    }

    handlePost() {
        const { title, description, amount, completionDate, address, city, selectedState  } = this.state;

        this.showLoader();

        database.ref('tasks').push({
            userID: this.currentUser.uid,
            title: title,
            description: description,
            amount: amount,
            date: new Date().toJSON(),
            isActive: false,
            completionDate: completionDate.toJSON(),
            address: address,
            city: city,
            state: selectedState,
        }, (error) => {
            if (error) {
                // Error saving data
                this.hideLoader();
                this.raiseAlert('Could Not Post Task', error.toString().substring(6))
            } else {
                // Data save successful
                this.hideLoader();
                this.closeModal();
            }
        });
    }

    closeModal() {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <Container style={{ flex: 1 }}>
                <ModalHeader title="Post a New Task" onPress={this.closeModal.bind(this)} />
                    <Content contentContainerStyle={[styles.contentPadding, { height: 950 }]}>
                        <View style={styles.formContainer}>

                            <Form>
                                <Item rounded style={styles.roundedItem}>
                                    <Input
                                        placeholder={'Title'}
                                        placeholderTextColor={'#9b9b9f'}
                                        value={this.state.title}
                                        autoCapitalize={'sentences'}
                                        clearButtonMode={'while-editing'}
                                        autoCorrect
                                        onChangeText={(title) => this.setState({ title })}
                                    />
                                </Item>
                                <Textarea 
                                    rowSpan={5} 
                                    rounded 
                                    style={styles.roundedTextArea}
                                    placeholderTextColor={'#9b9b9f'} 
                                    placeholder="Description"
                                    autoCorrect
                                    value={this.state.description}
                                    onChangeText={(description) => this.setState({ description })}
                                />
                                

                                <Item rounded style={[styles.roundedItem, { height: 50, marginTop: 40 }]}>
                                    <Icon name='calendar' style={{ color: '#9b9b9f' }} />
                                    <DatePicker
                                        defaultDate={new Date()}
                                        minimumDate={new Date()}
                                        locale={"en_US"}
                                        formatChosenDate={date => (new Date(date)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={Platform.OS === 'ios' ? 'slide' : 'fade'}
                                        androidMode={"default"}
                                        placeHolderText="Completion Date"
                                        textStyle={{ fontSize: 17 }}
                                        placeHolderTextStyle={{ color: "#9b9b9f", fontSize: 17 }}
                                        onDateChange={this.setDate}
                                    />
                                </Item>
                                <Item rounded style={styles.roundedItem}>
                                    <Icon name='card' style={{ color: '#9b9b9f' }} />
                                    <Input
                                        placeholder={'Amount'}
                                        placeholderTextColor={'#9b9b9f'}
                                        value={this.state.amount}
                                        keyboardType={'decimal-pad'}
                                        clearButtonMode={'while-editing'}
                                        autoCorrect
                                        onChangeText={(amount) => this.setState({ amount })}
                                    />
                                </Item>

                                <Item rounded style={[styles.roundedItem, { marginTop: 40 }]}>
                                    <Input
                                        placeholder={'Address'}
                                        placeholderTextColor={'#9b9b9f'}
                                        value={this.state.address}
                                        autoCapitalize={'sentences'}
                                        clearButtonMode={'while-editing'}
                                        onChangeText={(address) => this.setState({ address })}
                                    />
                                </Item>
                                <Item rounded style={styles.roundedItem}>
                                    <Input
                                        placeholder={'City'}
                                        placeholderTextColor={'#9b9b9f'}
                                        value={this.state.city}
                                        autoCapitalize={'sentences'}
                                        clearButtonMode={'while-editing'}
                                        onChangeText={(city) => this.setState({ city })}
                                    />
                                </Item>
                                <Item rounded style={styles.roundedItem}>
                                    <Picker
                                        note
                                        mode="dropdown"
                                        style={{ width: 300 }}
                                        headerBackButtonText={'Close'}
                                        textStyle={{ fontSize: 17, color: '#000', paddingLeft: 8 }}
                                        placeholder={'State'}
                                        placeholderStyle={{ fontSize: 17, color: '#9b9b9f', paddingLeft: 8 }}
                                        headerBackButtonTextStyle={{color: THEME_COLOR}}
                                        selectedValue={this.state.selectedState}
                                        onValueChange={this.handleSelectedState.bind(this)}
                                    >
                                        { states.map((x, i) => 
                                            <Picker.Item key={i} label={x.name} value={x.abbreviation} />
                                            )}
                                    </Picker>
                                </Item>
                                <View style={[styles.extra, { marginTop: 0 }]}>
                                    {
                                        this.state.loaderVisible ? (
                                            <ActivityIndicator size="large" color="#000" />
                                        ) : null
                                    }
                                </View>
                                <View style={{marginTop: 0}}>
                                    <Button rounded style={styles.roundedBtn} onPress={this.handlePost.bind(this)}>
                                        <Text style={styles.buttonText}>Post Task</Text>
                                    </Button>
                                </View>
                            </Form>

                        </View>
                    </Content>
            </Container>
        )
    }
}