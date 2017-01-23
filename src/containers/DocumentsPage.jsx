import React, { PropTypes } from 'react';
import { DocumentsPage } from '../components';
import { connect } from 'react-redux'
import { API_DOCUMENTS, API_DOWNLOAD_FILE } from '../constants/url';
import { fetch, p, json } from '../functions/fetch';
import Loading from '../components/Loading.jsx';

const DocumentsPageContainer = React.createClass({
    getInitialState: function() {
        return {
            loading: true,
            documents: [],
            displayedDocuments: [],
            options: [],
            selectValue: ''
        };
    },

    componentWillMount() {
        if (this.state.documents.length == 0) {
            fetch(API_DOCUMENTS.concat(this.props.account), (json) => {
                let options = Object.keys(json.files);
                let state = {
                    loading: false,
                    documents: json.files,
                    options: options
                };

                if (this.props.location.pathname == '/documents/last') {
                    state = Object.assign(state, {
                        selectValue: options[0],
                        displayedDocuments: json.files[options[0]]
                    });
                }

                this.setState(state);
            });
        } else {
            this.setState({ loading: false });
        }
    },

    shouldComponentUpdate() {
        console.log('shouldComponentUpdate');
        return true;
    },

    select(event) {
        this.setState({
            selectValue: event.value,
            displayedDocuments: this.state.documents[event.value]
        });
    },

    download(event, file) {
        // document.body.style.cursor = 'wait';

        fetch(API_DOWNLOAD_FILE, (response) => {
            // document.body.style.cursor = 'default';
            if (response && response.size > 0) {
                let fileDownload = require('react-file-download');
                fileDownload(response, file);
            }
            else {
                alert('Невозможно скачать файл.')
            }
        }, [
            p('account', this.props.account),
            p('file', file),
        ], true, 'blob');

        event.preventDefault();
    },

    render() {
        if (this.state.loading) {
            return <Loading margin="100px"/>;
        } else {
            return (
                <DocumentsPage
                    account={this.props.account}
                    options={this.state.options}
                    selectValue={this.state.selectValue}
                    displayedDocuments={this.state.displayedDocuments}
                    select={this.select}
                    download={this.download}
                />
            );
        }
    }
});

let mapStateToProps = (state) => ({ account: state.session.account.accountNumber });

export default connect(mapStateToProps)(DocumentsPageContainer)
