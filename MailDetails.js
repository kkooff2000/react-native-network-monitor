import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import Colors from './colors'

export default class MailDetails extends Component {
    state = { address: '', password: '', subject: '', body: '' }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.shadow}>
                <View style={styles.container}>
                    <View style={styles.horizontal}>
                        <Text style={styles.text}>Gmail address:</Text>
                        <TextInput
                            style={styles.content}
                            placeholder="Gmail Address"
                            placeholderTextColor="#668577"
                            onChangeText={(text) => this.setState({ address: text })}
                            value={this.state.address} />
                    </View>
                    <View style={styles.horizontal}>
                        <Text style={styles.text}>Password:</Text>
                        <TextInput
                            style={styles.content}
                            placeholder="Password"
                            placeholderTextColor="#668577"
                            onChangeText={(text) => this.setState({ password: text })}
                            value={this.state.password} />
                    </View>
                    <View style={styles.horizontal}>
                        <Text style={styles.text}>Subject:</Text>
                        <TextInput
                            style={styles.content}
                            placeholder="Subject"
                            placeholderTextColor="#668577"
                            onChangeText={(text) => this.setState({ subject: text })}
                            value={this.state.subject} />
                    </View>
                    <View style={styles.horizontal}>
                        <Text style={styles.text}>Body:</Text>
                        <TextInput
                            style={styles.content}
                            placeholder="Body"
                            placeholderTextColor="#668577"
                            onChangeText={(text) => this.setState({ body: text })}
                            value={this.state.body} />
                    </View>
                    <TouchableOpacity style={styles.button}
                    onPress={() => this.props.sendOutMail(this.state.address, this.state.password, this.state.subject, this.state.body)}>
                        <Text style={styles.text}>Send</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.onClose()}
                        style={styles.close}><Text style={styles.closeTitle}>X</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    shadow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.shadow,
        justifyContent: 'center',
        alignItems: 'center'
    }, container: {
        width: '90%',
        height: '90%',
        backgroundColor: Colors.dark,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 5
    }, close: {
        position: 'absolute',
        borderRadius: 100,
        backgroundColor: Colors.white,
        right: -15,
        top: -15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }, closeTitle: {
        fontSize: 20,
    }, horizontal: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
    }, text: {
        fontSize: 16,
        padding: 5,
        color: Colors.white
    }, content: {
        margin: 5,
        flex: 1,
        color: Colors.white
    }, button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.grey,
        flexDirection: 'row',
        padding: 10,
        margin: 6,
        borderRadius: 5
    }
})