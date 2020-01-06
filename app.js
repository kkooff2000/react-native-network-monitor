import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native'
import XHRInterceptor from 'react-native/Libraries/Network/XHRInterceptor'
import Logger from './logger'
import ResultItem from './ResultItem'
import Colors from './colors'
import RequestDetails from './RequestDetails'

const logger = new Logger()

export default class MonitorResult extends Component {

  state = { requests: [], request: undefined, showDetails: false }

  componentDidMount() {
      logger.setCallback((requests) => {
          this.setState({ requests: Object.assign([], requests) })
      })
      this.setState({ requests: logger.getRequests() })
      logger.enableXHRInterception()
  }

  render() {
      console.log(this.state.requests)
      return (<View style={styles.container}>
          <TouchableOpacity style={styles.back} onPress={() => {
              this.props.navigation.pop()
          }}><Text style={styles.backTitle}>Back</Text></TouchableOpacity>
          <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.requests}
              renderItem={({ item, index }) => {
                  return (<ResultItem request={item} onPress={() => {
                      this.setState({ showDetails: true, request: item })
                  }} />)
              }}
          />
          {this.state.showDetails && <RequestDetails
              onClose={() => this.setState({ showDetails: false })}
              request={this.state.request} />}
      </View>)
  }
}

const styles = StyleSheet.create({
    back: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.green,
        borderRadius: 5,
        color: Colors.white,
        marginLeft: 5,
        marginTop: 5,
        padding: 10
    },
    backTitle: {
        color: Colors.white,
        fontSize: 20
    },
    container: {
        alignItems: 'center',
        backgroundColor: Colors.dark,
        flex: 1,
        justifyContent: 'center'
    },
    record: {
        backgroundColor: Colors.red,
        borderRadius: 100,
        height: 30,
        position: 'absolute',
        right: 30,
        top: 30,
        width: 30
    }
})

export const startMonitor = () => {
    logger.enableXHRInterception()
}

export const getRequestLogger = () => {
    return logger.getRequests()
}

class MonitorButton extends Component {
  data = []

  setupData(data) {
  }

  constructor(props) {
      super(props)
  }

  componentDidMount() {

  }

  render() {
      return <TouchableOpacity>
          <View style={styles.record} /></TouchableOpacity>
  }
}