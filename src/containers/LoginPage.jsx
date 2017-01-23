import React, { PropTypes } from 'react';
import { LoginPage } from '../components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Auth } from '../actions/session';
import { API_AUTH } from '../constants/url';
import { fetch, p } from '../functions/fetch';
import Loading from '../components/Loading.jsx';

let DefaultState = {
    loading: false,
    login: '',
    password: '',
    error: ''
};

const LoginPageContainer = React.createClass({
    getInitialState() {
        return DefaultState;
    },

    handleLoginChange(e) {
        this.setState({
            login: e.target.value
        });
    },

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    },

    validation() {
        const { login, password } = this.state;

        if (!login || !password) {
            this.setState({
                error: 'Пожалуйста, заполните все поля'
            });
            return false;
        }
        return true;
    },

    handleSubmit(e) {

        if (this.validation()) {
            this.setState({ loading: true });

            fetch(API_AUTH, (json) => {
                if (json.error !== undefined) {
                    this.setState({
                        error: json.error
                    });
                }
                else if (json.auth.companyId != 0 && json.auth.list.length > 0) {
                    this.setState(DefaultState);
                    this.props.Auth(
                        json.auth.list[0],
                        json.auth.city,
                        json.auth.companyId,
                        json.auth.login,
                        json.auth.list
                    );
                    browserHistory.push('/');
                }
                else {
                    this.setState({
                        error: "Ошибка авторизации"
                    });
                }

                this.setState({ loading: false });
            }, [
                p('login', this.state.login),
                p('password', this.state.password),
            ]);
        }
        e.preventDefault();
    },

    render() {
        if (this.state.loading) {
            return <Loading margin="10%"/>;
        } else {
            return (
                <LoginPage
                    handleLoginChange={this.handleLoginChange}
                    handlePasswordChange={this.handlePasswordChange}
                    handleSubmit={this.handleSubmit}
                    login={this.state.login}
                    password={this.state.password}
                    error={this.state.error}
                />
            );
        }
    }
});

let mapStateToProps = (state) => ({});
let mapDispatchToProps = (dispatch) => ({ Auth: bindActionCreators(Auth, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer)
