import React from 'react';
import './LoginPage.less';

const LoginPage = React.createClass({
    render() {
        return (
            <div className='LoginPage'>
                <form onSubmit={(e) => this.props.handleSubmit(e)}>
                    <input
                        type="text"
                        name="login"
                        className="ss-input login"
                        placeholder="Логин"
                        value={this.props.login}
                        onChange={this.props.handleLoginChange}
                    />
                    <input
                        type="password"
                        name="password"
                        className="ss-input password"
                        placeholder="Пароль"
                        value={this.props.password}
                        onChange={this.props.handlePasswordChange}
                    />
                    <input type="submit" className="ss-button" value="Войти" onClick={this.props.handleSubmit}/>
                    <div className="error">{this.props.error}</div>
                </form>
            </div>
        );
    }
});

export default LoginPage;