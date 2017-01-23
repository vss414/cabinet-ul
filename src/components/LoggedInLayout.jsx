import React from 'react';
import { Link } from 'react-router';

import './LoggedInLayout.less';
import AccountData from '../components/AccountData.jsx';
import Slides from '../components/Slides.jsx';

const LoggedInLayout = React.createClass({
    render() {
        return (
            <div className="LoggedInLayout">
                <header>
                    <div className="logo" title="Сибирские сети">
                        <Link to="/">
                            <img className="contact_image" src="img/sibset_logo.png"/>
                        </Link>
                    </div>
                    {/*<div className="city_selector middle_line "></div>
                    <div className="phone_title">Звоните</div>
                    <div className="phone">
                        <Link to="tel:250 02 11"><span>250 02 11</span></Link>
                    </div>*/}

                    <div className="additional_menu">
                        <Link to="/settings">Настройки</Link>
                        <a href="/logout" onClick={this.props.logout}>Выйти</a>
                    </div>

                </header>

                <div className="menu">
                    <Link
                        to="/"
                        className={"change_background"+(this.props.pathname == '/' ? ' active' : '')}
                    >Личный кабинет</Link>
                    <Link
                        to="/documents"
                        className={"change_background"+(this.props.pathname == '/documents' ? ' active' : '')}
                    >Документы</Link>
                    <Link
                        to="/notice"
                        className={"change_background"+(this.props.pathname == '/notice' ? ' active' : '')}
                    >Уведомления{
                        <p>{ (this.props.countNotices > 0) ? this.props.countNotices : '\u00A0' }</p>
                    }</Link>
                </div>

                <AccountData
                    session={this.props.session}
                    selectAccount={this.props.selectAccount}
                />
                <Slides slides={this.props.slides} />
                <div className='content'>
                    {this.props.children}
                </div>
            </div>
        );
    }
});


export default LoggedInLayout;
