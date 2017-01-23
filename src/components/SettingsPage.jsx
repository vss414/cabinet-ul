import React from 'react';

import './SettingsPage.less';
import InputElement from 'react-input-mask';

const SettingsPage = React.createClass({
    render() {
        return (
            <div className='SettingsPage'>
                <form className="block" onSubmit={(e) => this.props.handleSubmitNotification(e)}>
                    <span className="title">Уведомления:</span>
                    <div className="input-block">
                        <InputElement
                            mask="+7 (999) 999-99-99"
                            name="phone"
                            type="text"
                            className="ss-input settings-input"
                            defaultValue={ this.props.settings.phone }
                            onChange={this.props.handleChangePhone}
                            placeholder="Введите телефон"
                        />
                        <div className="checkbox indent">
                            <input
                                name="phone_notif"
                                id="phone_notif"
                                type="checkbox"
                                defaultChecked={ this.props.settings.phone_notification }
                                onChange={this.props.handleChangePhoneNotification}
                            />
                            <label htmlFor="phone_notif">Использовать для уведомлений</label>
                        </div>
                    </div>
                    <div className="input-block">
                        <input
                            name="email"
                            type="text"
                            className="ss-input settings-input"
                            defaultValue={ this.props.settings.email }
                            onChange={this.props.handleChangeEmail}
                            placeholder="Введите e-mail"
                        />
                        <p className="indent">Заполните, если хотите получать уведомления по почте</p>
                    </div>
                    <div className="input-block">
                        <input
                            name="balance_threshold"
                            type="text"
                            className="ss-input settings-input"
                            defaultValue={ this.props.settings.balance_threshold }
                            onChange={this.props.handleChangeThresholdNotification}
                            placeholder="Впишите сумму руб."
                        />
                        <p className="indent">Уведомлять при достижении этой суммы на счёте</p>
                        <input
                            type="submit"
                            className="ss-button settings-input"
                            value="Сохранить"
                            onClick={this.props.handleSubmitNotification}
                        />
                    </div>
                </form>
                <form className="block" onSubmit={(e) => this.props.handleSubmitChangePassword(e)}>
                    <span className="title">Смена пароля:</span>
                    <div>
                        <div className="input-block">
                            <input
                                name="old_password"
                                type="password"
                                className="ss-input settings-input"
                                placeholder="Ваш старый пароль"
                                onChange={this.props.handleChangeOldPassword}
                            />
                        </div>
                        <div className="input-block">
                            <input
                                name="new_password"
                                type="password"
                                className="ss-input settings-input"
                                placeholder="Ваш новый пароль"
                                onChange={this.props.handleChangeNewPassword}
                            />
                        </div>
                        <div className="input-block">
                            <input
                                type="submit"
                                className="ss-button settings-input"
                                value="Сохранить"
                                onClick={this.props.handleSubmitChangePassword}
                            />
                        </div>
                    </div>
                    {(this.props.successPassword !== undefined) ?
                        <div className={ (this.props.successPassword) ? "message success" : "message error" }>
                            {this.props.messagePassword}
                        </div>
                        :
                        <div className="message"/>
                    }
                </form>
            </div>
        );
    }
});

export default SettingsPage;
