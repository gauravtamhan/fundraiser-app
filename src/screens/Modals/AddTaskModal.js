import React, { Component } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { Content, Button, Item, Label, Icon, Input, Text, Form, Textarea, DatePicker, Picker } from 'native-base'
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
            selectedState: 'GA',
            loaderVisible: false,
            completionDate: new Date(),
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

        database.ref('tasks/' + this.currentUser.uid).push({
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
            <View style={{ flex: 1 }}>
                <ModalHeader title="Post a New Task" onPress={this.closeModal.bind(this)} />
                <Content contentContainerStyle={styles.contentPadding}>
                    <DatePicker
                        defaultDate={new Date()}
                        minimumDate={new Date()}
                        locale={"en"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText="Select date"
                        textStyle={{ color: "green" }}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        onDateChange={this.setDate}
                        disabled={false}
                    />
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
                            <Item rounded style={styles.roundedItem}>
                                <Icon name='card' style={{ color: '#9b9b9f' }} />
                                <Input
                                    placeholder={'0.00'}
                                    placeholderTextColor={'#9b9b9f'}
                                    value={this.state.amount}
                                    keyboardType={'decimal-pad'}
                                    clearButtonMode={'while-editing'}
                                    autoCorrect
                                    onChangeText={(amount) => this.setState({ amount })}
                                />
                            </Item>
                            <Item rounded style={styles.roundedItem}>
                                <Text> Completion Date: {this.state.completionDate.toString().substr(4, 12)}</Text>
                            </Item>
                            <Item rounded style={styles.roundedItem}>
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
                            <Picker
                                note
                                mode="dropdown"
                                style={{ width: 120 }}
                                selectedValue={this.state.selectedState}
                                onValueChange={this.handleSelectedState.bind(this)}
                            >
                                { states.map((x, i) => 
                                    <Picker.Item key={i} label={x.name} value={x.abbreviation} />
                                    )}
                            </Picker>
                            <View style={styles.extra}>
                                {
                                    this.state.loaderVisible ? (
                                        <ActivityIndicator size="large" color="#000" />
                                    ) : null
                                }
                            </View>
                            <View style={{marginTop: -40}}>
                                <Button rounded style={styles.roundedBtn} onPress={this.handlePost.bind(this)}>
                                    <Text style={styles.buttonText}>Post Task</Text>
                                </Button>
                            </View>
                        </Form>
                    </View>
                </Content>
            </View>
        )
    }
}