import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import styles from '@assets/styles';
import { THEME_COLOR } from '@assets/colors';

export default class TaskCard extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { data, onPress, fundraiser } = this.props;

        return (
            <TouchableHighlight style={{ flex: 1, backgroundColor: 'white' }} underlayColor={'#DDD'} onPress={onPress}>
                <View style={styles.card}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between',  }}>
                        <View style={{ borderWidth: 2, width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderColor: THEME_COLOR, borderRadius: 1000 }}>
                            <Text 
                                adjustsFontSizeToFit
                                numberOfLines={1}
                                style={{
                                fontSize: 20,
                                color: 'rgb(41, 41, 54)',
                                fontWeight: '700',
                            }}>{data.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).slice(0, -3)}</Text>
                        </View>
                        <View style={{ marginTop: 40 }}>
                            <Text style={{ color: 'rgba(89, 89, 89, 0.6)', fontSize: 13, fontWeight: '600', letterSpacing: 0.62 }}>{data.completionDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) }</Text>
                            <Text style={[styles.cardBodyText, { fontWeight: '500', fontSize: 14 }]}>{ data.completionDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) }</Text>
                        </View>
                    </View>
                    <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.cardHeaderText}>{data.title}</Text>
                            <Text style={styles.cardBodyText}>{data.description}</Text>
                            <View style={{ height: 30, justifyContent: 'flex-end'}}>
                                {
                                    !fundraiser && data.status == 1 && (
                                        <Text style={{ color: THEME_COLOR, letterSpacing: 1.02 }}>NEW REQUEST(S)</Text>
                                    )
                                }
                                {
                                    fundraiser && data.isRequested && (
                                        <Text style={{ color: THEME_COLOR, letterSpacing: 1.02 }}>REQUESTED</Text>
                                    )
                                }

                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 20}}>
                            <Text style={[styles.cardBodyText, { fontWeight: '500', color: 'rgb(89, 89, 89)', fontSize: 14 }]}>{data.category ? data.category : 'None'}  •</Text>
                            <Text style={{ color: 'rgb(89, 89, 89)', fontSize: 15, paddingLeft: 5 }}>{`${data.city}, ${data.state}`}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}