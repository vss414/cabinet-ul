import React, { PropTypes } from 'react';
import { HomePage } from '../components';
import { connect } from 'react-redux';
import { API_BALANCE, API_SERVICES, API_CREATE_ISSUE } from '../constants/url';
import { fetch, p } from '../functions/fetch';


const HomePageContainer = React.createClass({
    getInitialState() {
        return {
            balance: {
                sign: '',
                ruble: '0 руб.',
                kopeck: ''
            },
            services: [],
            openedModal: 0,
            issue: {
                success: undefined,
                message: ''
            },
            service: {
                name: '',
                description: ''
            }
        };
    },

    componentWillMount() {
        fetch(API_BALANCE.concat(this.props.account), (json) => {
            this.setState({
                balance: {
                    sign: json.sign,
                    ruble: json.ruble,
                    kopeck: json.kopeck
                }
            });
        });

        fetch(API_SERVICES, (json) => {
            this.setState({
                services: json.services
            });
        }, [
            p('account', this.props.account),
            p('account_id', this.props.accountId),
        ]);
    },

    showInfo(serviceName) {
        let service = this.state.services.find((el, i) => {
            if (el.name == serviceName) {
                return el;
            }
        });

        this.setState({
            openedModal: 1,
            service: service
        });
    },


    createIssue(service) {
        this.setState({ openedModal: 2 });
        fetch(API_CREATE_ISSUE, (json) => {
            let success = false, message = 'Не удалось создать заявку, попробуйте позже.';
            if (json.code > 0) {
                success = true;
                message = `Создана заявка на подключение услуги "${service}".`
            }
            this.setState({
                openedModal: 3,
                issue: {
                    success: success,
                    message: message
                }
            });
        }, [
            p('account', this.props.account),
            p('service', service)
        ]);
    },

    closeModal() {
        this.setState({
            openedModal: 0,
            issue: {
                success: false,
                message: ''
            },
            service: {
                name: '',
                description: ''
            }
        });
    },

    render() {
        return (
            <HomePage
                sign={this.state.balance.sign}
                balance={[this.state.balance.sign, this.state.balance.ruble, this.state.balance.kopeck].join('')}
                services={this.state.services}
                openedModal={this.state.openedModal}
                issue={this.state.issue}
                service={this.state.service}
                createIssue={this.createIssue}
                closeModal={this.closeModal}
                showInfo={this.showInfo}
            />
        );
    }
});

let mapStateToProps = (state) => ({
    account: state.session.account.accountNumber,
    accountId: state.session.account.id
});

export default connect(mapStateToProps)(HomePageContainer)
