import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Colors from './colors'

export default class ResultItem extends Component {
    state = {}

    getMethodStyle(method) {
        switch (method) {
            case 'GET':
                return styles.get
            case 'POST':
                return styles.post
            case 'UPDATE':
                return styles.update
            case 'DELETE':
                return styles.delete
        }
    }

    getStatusTextColor(status) {
        if (status !== 200) {
            return {
                color: Colors.red
            }
        } else {
            return {}
        }
    }

    render() {
        return (
            <TouchableOpacity style={[styles.container, this.props.style]} onPress={() => {
                console.log(this.props.request)
                if (this.props.onPress !== undefined) this.props.onPress()
            }}>
                <Text style={[styles.text, styles.method, this.getMethodStyle(this.props.request.method)]}>{this.props.request.method}</Text>
                <View style={styles.divider} />
                <Text style={[styles.text, this.getStatusTextColor(this.props.request.status)]}>{this.props.request.url}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.grey,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5
    }, text: {
        color: Colors.white,
        fontSize: 20,
        padding: 5,
        textAlign: 'center'
    }, divider: {
        width: 1,
        backgroundColor: Colors.white,
        height: '100%',
        marginLeft: 5,
        marginRight: 5
    }, get: {
        color: Colors.green
    }, post: {
        color: Colors.yellow
    }, update: {
        color: Colors.orange
    }, delete: {
        color: Colors.red
    }, method: {
        width: 100
    }
})