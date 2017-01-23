import React from 'react';
import { Link } from 'react-router';

import './HomePage.less';
import { DetailData } from '../containers';
import ModalData from './Modal.jsx';
import Loading from './Loading.jsx'

let Service = (props, context) => (
    <li>
        <div className="title"><span>{props.name}</span></div>
        { props.connected ?
            <div className="not-connected"><span>Подключено</span></div> :
            <div>
                <input
                    type="submit"
                    className="ss-button"
                    value="Подключить"
                    onClick={(event) => props.onClick(props.name)}
                />
            </div>
        }
        <div className="message"></div>
    </li>
);

let Message = (props, context) => {
    return <div className="issue-message">
        <div className={ props.issue.success ? 'success' : 'error' }>{ props.issue.message }</div>
    </div>;
};

let ServiceInfo = (props, context) => {
    return <div className="service-info">
        <div>
            <div className="description" dangerouslySetInnerHTML={{__html: props.service.description }} />
            <div className="buttons">
                <input
                    type="submit"
                    className="ss-button-cancel"
                    onClick={props.closeModal}
                    value="Отмена"
                />
                <input
                    type="submit"
                    className="ss-button"
                    onClick={(event) => props.createIssue(props.service.name)}
                    value="Подключить"
                />
            </div>
        </div>
    </div>;
};

const HomePage = React.createClass({
    render() {
        return (
            <div className='HomePage'>
                <div className="top-block">
                    <div className="balance">
                        <div className="title">Баланс:</div>
                        <div className={ (this.props.sign != '-') ? 'positive' : 'negative' }>{this.props.balance}</div>
                    </div>
                    <div className="link">
                        <Link to="/documents/last">Скачать счёт на предоплату</Link>
                        <a href="http://insufficient-funds.211.ru" target="_blank">Обещанный платёж</a>
                        <a href="http://nsk.sibset.ru/b2b/abonentam/" target="_blank">Способы оплаты</a>
                    </div>
                </div>
                <DetailData />
                <div className="services">
                    <div className="title">Услуги</div>
                    <ul>
                        {
                            this.props.services.map((el, i) => (
                                <Service
                                    key={i}
                                    name={el.name}
                                    connected={el.connected}
                                    onClick={this.props.showInfo}
                                />
                            ))
                        }
                    </ul>
                    <ModalData
                        isOpen={this.props.openedModal == 1}
                        close={this.props.closeModal}
                        content={<ServiceInfo
                            service={this.props.service}
                            closeModal={this.props.closeModal}
                            createIssue={this.props.createIssue}
                        />}
                    />
                    <ModalData
                        isOpen={this.props.openedModal == 2}
                        close={this.props.closeModal}
                        content={<Loading margin="20%" />}
                    />
                    <ModalData
                        isOpen={this.props.openedModal == 3}
                        close={this.props.closeModal}
                        content={<Message issue={this.props.issue}/>}
                    />
                    <div className="notice">Для отключения услуги свяжитесь с вашим менеджером по сопровождению.</div>
                </div>
            </div>
        );
    }
});

export default HomePage;
