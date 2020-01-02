import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, WebView } from 'react-native'
import ResultItem from './ResultItem'
import Colors from './colors'

export default class RequestDetails extends Component {
    state = { content: '' }

    constructor(props) {
        super(props)
        this.state = { content: this.getAll() }
    }

    getRequestHeader() {
        let request = this.props.request
        var header = { ...request.requestHeaders, method: request.method, url: request.url }
        if (request.requestHeaders !== undefined) {
            header = { ...header, ...request.requestHeaders }
        }
        return JSON.stringify(header, null, '\t')
    }

    getRequestBody() {
        try {
            return JSON.stringify(this.props.request.dataSent, null, '\t')
        } catch (e) {
            return this.props.request.dataSent
        }
    }

    getAll() {
        return JSON.stringify(this.props.request, null, '\t')
    }

    getResponseBody() {
        try {
            return JSON.stringify(this.props.request.response, null, '\t')
        } catch (e) {
            return this.props.request.response
        }
    }

    getResponseHeader() {
        let request = this.props.request

        let header = {
            responseHeaders: request.responseHeaders,
            responseContentType: request.responseContentType,
            responseSize: request.responseSize,
            responseURL: request.responseURL,
            responseType: request.responseType
        }
        return JSON.stringify(header, null, '\t')
    }

    render() {
        return (
            <View style={styles.shadow}>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => this.props.onClose()}
                        style={styles.close}><Text style={styles.closeTitle}>X</Text></TouchableOpacity>
                    <ResultItem request={this.props.request} />
                    <View style={styles.horizontal}>
                        <View style={styles.tabArea}>
                            <TouchableOpacity style={styles.tab}
                                onPress={() => this.setState({ content: this.getAll() })}>
                                <Text style={styles.text}>ALL</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.tab}
                                onPress={() => this.setState({ content: this.getRequestHeader() })}>
                                <Text style={styles.text}>Request Header</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.tab}
                                onPress={() => this.setState({ content: this.getRequestBody() })}>
                                <Text style={styles.text}>Request Body</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.tab}
                                onPress={() => this.setState({ content: this.getResponseHeader() })}>
                                <Text style={styles.text}>Response Header</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.tab}
                                onPress={() => this.setState({ content: this.getResponseBody() })}>
                                <Text style={styles.text}>Response Body</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <ScrollView>
                                <Text style={[styles.text, styles.content]}>{this.state.content}</Text>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    shadow: {
        position: 'absolute',
        flex: 1,
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
    }, text: {
        fontSize: 20,
        color: Colors.white
    }, horizontal: {
        flexDirection: 'row',
        alignSelf: 'flex-start'
    }, tabArea: {
        padding: 20
    }, tab: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.grey,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5
    }, content: {
        width: '70%',
        height: '100%',
        paddingBottom: 20
    }
})