import React from 'react';

import './AccountData.less';
import Dropdown from 'react-dropdown';
import '../styles/dropdown.less';

const AccountData = React.createClass({
    render() {
        let accountList = this.props.session.list.map( el => el.accountNumber.toString() );
        let email = this.props.session.account.manager.email;

        return (
            <div className='AccountData'>
                {(this.props.session.list.length == 1) ?
                    <div className="account">
                        <div className="title">Лицевой счёт:</div>
                        <span>{this.props.session.account.accountNumber }</span>
                    </div> :
                    <div className="account-select">
                        <div className="title">Лицевой счёт:</div>
                        <div className="list">
                            <Dropdown
                                options={accountList}
                                onChange={this.props.selectAccount}
                                value={this.props.session.account.accountNumber}
                                placeholder="Выберите л/с"
                            />
                        </div>
                    </div>
                }
                <div className="manager">
                    { this.props.session.account.manager.id != 0 ?
                        <div>
                            <p className="title">Менеджер по сопровождению:</p>
                            <p className="name">{this.props.session.account.manager.name}</p>
                            <a href={"mailto:"+email}>{email}</a>
                            <p className="phone">{this.props.session.account.manager.phone}</p>
                        </div>
                        : <div></div>
                    }
                </div>
            </div>
        );
    }
});

export default AccountData;
