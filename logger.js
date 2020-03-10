import XHRInterceptor from 'react-native/Libraries/Network/XHRInterceptor'
import RNSmtpMailer from 'react-native-smtp-mailer'
import RNFS from 'react-native-fs'
let nextXHRId = 0

class NetworkRequestInfo {
    type = ''
    url = ''
    method = ''
    status = ''
    dataSent = ''
    responseContentType = ''
    responseSize = 0
    requestHeaders = undefined
    responseHeaders = undefined
    response = ''
    responseURL = ''
    responseType = ''
    timeout = 0
    closeReason = ''
    messages = ''
    serverClose = undefined
    serverError = undefined

    constructor(type, method, url) {
        this.type = type
        this.method = method
        this.url = url
    }
}

export const LOGGER_FILENAME = 'network_monitor_logger.txt'

export default class Logger {
    _requests = []
    _xhrIdMap = {}
    callback = () => {}

    setCallback(callback) {
        this.callback = callback
    }

    _getRequestIndexByXHRID(index) {
        if (index === undefined) {
            return -1
        }
        const xhrIndex = this._xhrIdMap[index]
        if (xhrIndex === undefined) {
            return -1
        } else {
            return xhrIndex
        }
    }

    enableXHRInterception() {
        if (XHRInterceptor.isInterceptorEnabled()) {
            return
        }
        XHRInterceptor.setOpenCallback((method, url, xhr) => {
            xhr._index = nextXHRId++
            const xhrIndex = this._requests.length
            this._xhrIdMap[xhr._index] = xhrIndex

            const _xhr = new NetworkRequestInfo('XMLHttpRequest', method, url)

            this._requests.push(_xhr)
        })

        XHRInterceptor.setRequestHeaderCallback((header, value, xhr) => {
            const xhrIndex = this._getRequestIndexByXHRID(xhr._index)
            if (xhrIndex === -1) {
                return
            }
            const networkInfo = this._requests[xhrIndex]
            if (!networkInfo.requestHeaders) {
                networkInfo.requestHeaders = {}
            }
            networkInfo.requestHeaders[header] = value
        })

        XHRInterceptor.setSendCallback((data, xhr) => {
            const xhrIndex = this._getRequestIndexByXHRID(xhr._index)
            if (xhrIndex === -1) {
                return
            }
            this._requests[xhrIndex].dataSent = data
        })

        XHRInterceptor.setHeaderReceivedCallback(
            (type, size, responseHeaders, xhr) => {
                const xhrIndex = this._getRequestIndexByXHRID(xhr._index)
                if (xhrIndex === -1) {
                    return
                }
                const networkInfo = this._requests[xhrIndex]
                networkInfo.responseContentType = type
                networkInfo.responseSize = size
                networkInfo.responseHeaders = responseHeaders
            },
        )

        XHRInterceptor.setResponseCallback(
            (status, timeout, response, responseURL, responseType, xhr) => {
                const xhrIndex = this._getRequestIndexByXHRID(xhr._index)
                if (xhrIndex === -1) {
                    return
                }
                const networkInfo = this._requests[xhrIndex]
                networkInfo.status = status
                networkInfo.timeout = timeout
                networkInfo.response = response
                networkInfo.responseURL = responseURL
                networkInfo.responseType = responseType
                this.callback(this._requests)
            },
        )
        XHRInterceptor.enableInterception()
    }

    getRequests() {
        return this._requests
    }

    sendFeedbackEmail(email, password, subject, message) {
        this.saveNetworkLogger(LOGGER_FILENAME)
            .then(response =>
                this.sendMail(
                    LOGGER_FILENAME,
                    email,
                    password,
                    subject,
                    message,
                ),
            )
            .then(response => this.deleteNetworkLogger(LOGGER_FILENAME))
            .then(response => console.log('SUCCESS'))
            .catch(error => console.log(error))
    }

    sendMail(filename, email, password, subject, message) {
        console.log('logger.sendFeedbackEmail')
        return RNSmtpMailer.sendMail({
            mailhost: 'smtp.gmail.com',
            port: '465',
            ssl: true,
            username: email,
            from: email,
            password: password,
            recipients: email,
            subject: subject,
            htmlBody: message,
            attachmentPaths: [this.getPath(filename)],
            attachmentNames: [filename],
            attachmentTypes: ['txt'],
        })
    }

    saveNetworkLogger(filename) {
        console.log('logger.saveNetworkLogger')
        return RNFS.writeFile(
            this.getPath(filename),
            JSON.stringify(this.getRequests()),
            'utf8',
        )
    }

    deleteNetworkLogger(filename) {
        console.log('logger.deleteNetworkLogger')
        return RNFS.unlink(this.getPath(filename))
    }

    getPath(filename) {
        return RNFS.DocumentDirectoryPath + '/' + filename
    }
}
