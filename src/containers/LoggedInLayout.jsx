import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { LoggedInLayout } from '../components';
import { Logout, selectAccount } from '../actions/session';
import { addNotices } from '../actions/notices';
import { API_NOTICE, API_SLIDE } from '../constants/url';
import { timeOfLastAction } from '../constants/names';
import { fetch } from '../functions/fetch';

let idTimer;
const halfAnHour = 1800000;
const fiveMinutes = 300000;

const LoggedInLayoutContainer = React.createClass({
    getInitialState() {
        return {
            slides: []
        }
    },

    logout() {
        document.removeEventListener('mousemove', this.logoutAfterTimeout);
        document.removeEventListener('keydown', this.logoutAfterTimeout);
        document.removeEventListener('scroll', this.logoutAfterTimeout);

        console.log('logout');
        clearTimeout(idTimer);
        localStorage.removeItem(timeOfLastAction);
        this.props.Logout();
        browserHistory.push('/login');
    },

    logoutAfterTimeout() {
        clearTimeout(idTimer);
        let now = Date.now();
        let time = localStorage.getItem(timeOfLastAction) ?
            parseInt(localStorage.getItem(timeOfLastAction)) :
            now;

        if (time + fiveMinutes < now) {
            this.logout();
        } else {
            localStorage.setItem(timeOfLastAction, now);
            idTimer = setTimeout(() => {
                this.logout();
            }, fiveMinutes);
        }
    },

    getNotices() {
        if (
            !this.props.notices.list.length && this.props.session.city !== '' ||
            this.props.notices.time + halfAnHour < Date.now()
        ) {
            fetch(API_NOTICE.concat(this.props.session.city), (json) => {
                if (json.notices.length > 0) {
                    let list = [];
                    json.notices.map((el, i) => {
                        list = [...list, {
                            id: i,
                            title: el.name,
                            description: el.detailed_text
                        }]
                    });
                    this.props.addNotices(list, Date.now());
                }
            });
        }
    },

    getSlides() {
        // fetch(API_SLIDE, (json) => {
        //     this.setState({
        //         slides: json.slides
        //     });
        // });
    },

    componentWillMount() {
        if (!this.props.session.companyId) {
            browserHistory.push('/login');
        } else {
            this.logoutAfterTimeout();
            document.addEventListener('mousemove', this.logoutAfterTimeout);
            document.addEventListener('keydown', this.logoutAfterTimeout);
            document.addEventListener('scroll', this.logoutAfterTimeout);
            this.getNotices();
            this.getSlides();
        }
    },

    componentDidUpdate() {
        if (this.props.session.companyId) {
            this.logoutAfterTimeout();
            this.getNotices();
            this.getSlides();
        }
    },

    selectAccount(option) {
        let account = this.props.session.list.find( (el) => el.accountNumber == option.value );
        let state = Object.assign(this.props.session, { account: account });
        this.props.selectAccount(state);
        browserHistory.push('/');
        location.reload();
    },

    handleLogout(e) {
        this.logout();
        e.preventDefault();
    },

    render() {
        return (
            <LoggedInLayout
                children={this.props.children}
                logout={this.handleLogout}
                countNotices={this.props.notices.list.length}
                session={this.props.session}
                selectAccount={this.selectAccount}
                pathname={this.props.location.pathname}
                slides={this.state.slides}
            />
        );
    }
});

let mapStateToProps = (state) => ({
    session: state.session,
    notices: state.notices,
    settings: state.settings
});
let mapDispatchToProps = (dispatch) => ({
    Logout: bindActionCreators(Logout, dispatch),
    selectAccount: bindActionCreators(selectAccount, dispatch),
    addNotices: bindActionCreators(addNotices, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInLayoutContainer)
