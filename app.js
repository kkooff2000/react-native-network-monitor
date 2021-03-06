import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Text, FlatList} from 'react-native'
import Logger from './logger'
import ResultItem from './ResultItem'
import Colors from './colors'
import RequestDetails from './RequestDetails'
import MailDetails from './MailDetails'

const logger = new Logger()

export default class MonitorResult extends Component {
    state = {
        requests: [],
        request: undefined,
        showDetails: false,
        editMailInfo: false,
    }

    componentDidMount() {
        logger.setCallback(requests => {
            this.setState({requests: Object.assign([], requests)})
        })
        this.setState({requests: logger.getRequests()})
        logger.enableXHRInterception()
    }

    render() {
        console.log(this.state.requests)
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.back}
                        onPress={() => {
                            this.props.navigation.pop()
                        }}>
                        <Text style={styles.backTitle}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.back}
                        onPress={() => {
                            this.setState({editMailInfo: true})
                        }}>
                        <Text style={styles.backTitle}>Send By Gmail</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.requests}
                    renderItem={({item, index}) => {
                        return (
                            <ResultItem
                                request={item}
                                onPress={() => {
                                    this.setState({
                                        showDetails: true,
                                        request: item,
                                    })
                                }}
                            />
                        )
                    }}
                />
                {this.state.showDetails && (
                    <RequestDetails
                        onClose={() => this.setState({showDetails: false})}
                        request={this.state.request}
                    />
                )}
                {this.state.editMailInfo && (
                    <MailDetails
                        onClose={() => this.setState({editMailInfo: false})}
                        sendOutMail={(email, password, subject, body) =>
                            logger.sendFeedbackEmail(
                                email,
                                password,
                                subject,
                                body,
                            )
                        }
                    />
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    back: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.green,
        borderRadius: 5,
        color: Colors.white,
        marginLeft: 5,
        marginTop: 5,
        padding: 10,
    },
    backTitle: {
        color: Colors.white,
        fontSize: 20,
    },
    container: {
        backgroundColor: Colors.dark,
        flex: 1,
    },
    record: {
        backgroundColor: Colors.red,
        borderRadius: 100,
        height: 30,
        position: 'absolute',
        right: 30,
        top: 30,
        width: 30,
    },
})

export const startMonitor = () => {
    logger.enableXHRInterception()
}

export const getRequestLogger = () => {
    return logger.getRequests()
}

export const sendOutEmail = (email, password, subject, message) => {
    logger.sendFeedbackEmail(email, password, subject, message)
}

class MonitorButton extends Component {
    data = []

    setupData(data) {}

    constructor(props) {
        super(props)
    }

    componentDidMount() {}

    render() {
        return (
            <TouchableOpacity>
                <View style={styles.record} />
            </TouchableOpacity>
        )
    }
}
