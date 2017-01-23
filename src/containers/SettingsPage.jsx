import React, { PropTypes } from 'react';
import { SettingsPage } from '../components';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateSettings } from '../actions/settings'
import { API_SETTINGS, API_SETTINGS_SET, API_CHANGE_PASSWORD } from '../constants/url';
import { fetch, p } from '../functions/fetch';
import Loading from '../components/Loading.jsx';

const SettingsPageContainer = React.createClass({
    getInitialState() {
        return {
            loading: true,
            settings: this.props.settings,
            oldPassword: undefined,
            newPassword: undefined,
            messagePassword: undefined,
            successPassword: undefined
        };
    },

    resetMessage() {
        this.setState({
            messagePassword: undefined,
            successPassword: undefined
        });
    },

    getSettings() {
        if (this.props.settings.phone === undefined &&
            this.props.settings.phone_notification === undefined &&
            this.props.settings.balance_threshold === undefined &&
            this.props.settings.email === undefined
        ) {
            fetch(API_SETTINGS, (json) => {
                this.props.updateSettings(json.phone, json.phone_notification, json.balance_threshold, json.email);
                this.setState({ loading: false, settings: json });
            }, [
                p('account', this.props.account),
                p('accountId', this.props.accountId)
            ]);
        } else {
            this.setState({ loading: false });
        }
    },

    componentWillMount() {
        this.getSettings();
    },

    handleChangePhone(event) {
        let state = Object.assign(this.state, {
            settings: Object.assign(this.state.settings, { phone: event.target.value }),
        });
        this.setState(state);
    },
    handleChangePhoneNotification(event) {
        let state = Object.assign(this.state, {
            settings: Object.assign(this.state.settings, { phone_notification: event.target.checked }),
        });
        this.setState(state);
    },
    handleChangeThresholdNotification(event) {
        let state = Object.assign(this.state, {
            settings: Object.assign(this.state.settings, { balance_threshold: event.target.value }),
        });
        this.setState(state);
    },
    handleChangeEmail(event) {
        let state = Object.assign(this.state, {
            settings: Object.assign(this.state.settings, { email: event.target.value }),
        });
        this.setState(state);
    },

    handleSubmitNotification(e) {
        this.resetMessage();
        this.setState({ loading: true });
        fetch(API_SETTINGS_SET, (json) => {
            this.getSettings();
        }, [
            p('account', this.props.account),
            p('accountId', this.props.accountId),
            p('phone', this.state.settings.phone.replace(/^\+7 \((\d{3})\) (\d{3})-(\d{2})-(\d{2}).*/, '$1$2$3$4')),
            p('phone_notification', ~~this.state.settings.phone_notification),
            p('balance_threshold', this.state.settings.balance_threshold),
            p('email', this.state.settings.email)
        ]);
        e.preventDefault();
    },

    handleChangeOldPassword(event) {
        this.setState({ oldPassword: event.target.value });
    },
    handleChangeNewPassword(event) {
        this.setState({ newPassword: event.target.value });
    },

    handleSubmitChangePassword(e) {
        this.resetMessage();
        if (this.state.oldPassword !== undefined && this.state.newPassword) {
            this.setState({loading: true});
            fetch(API_CHANGE_PASSWORD, (json) => {
                this.setState({
                    loading: false,
                    oldPassword: undefined,
                    newPassword: undefined,
                });
                if (json.success) {
                    this.setState({
                        successPassword: true,
                        messagePassword: json.message
                    });
                }
                else {
                    this.setState({
                        successPassword: false,
                        messagePassword: json.message
                    });
                }
            }, [
                p('login', this.props.login),
                p('oldPassword', this.state.oldPassword),
                p('newPassword', this.state.newPassword),
            ]);
        } else {
            this.setState({
                successPassword: false,
                messagePassword: 'Заполните поля со старым и новым паролем'
            });
        }
        e.preventDefault();
    },

    render() {
        if (this.state.loading) {
            return <Loading margin="100px"/>;
        } else {
            return (
                <SettingsPage
                    settings={this.state.settings}
                    handleChangePhone={this.handleChangePhone}
                    handleChangePhoneNotification={this.handleChangePhoneNotification}
                    handleChangeThresholdNotification={this.handleChangeThresholdNotification}
                    handleChangeEmail={this.handleChangeEmail}
                    handleSubmitNotification={this.handleSubmitNotification}
                    handleChangeOldPassword={this.handleChangeOldPassword}
                    handleChangeNewPassword={this.handleChangeNewPassword}
                    handleSubmitChangePassword={this.handleSubmitChangePassword}
                    successPassword={this.state.successPassword}
                    messagePassword={this.state.messagePassword}
                />
            );
        }
    }
});

let mapStateToProps = (state) => ({
    settings: state.settings,
    account: state.session.account.accountNumber,
    accountId: state.session.account.id,
    login: state.session.login
});
let mapDispatchToProps = (dispatch) => ({ updateSettings: bindActionCreators(updateSettings, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPageContainer)
