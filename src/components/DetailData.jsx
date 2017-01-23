import React from 'react';
import './DetailData.less';
import ModalData from '../components/Modal.jsx';
import PaymentHistoryData from '../components/PaymentHistoryData.jsx'
import Dropdown from 'react-dropdown';
import '../styles/dropdown.less';

const DetailData = React.createClass({
    render() {
        let d = new Date();

        let months = [
            { value: '0', label: "Январь"},
            { value: '1', label: "Февраль"},
            { value: '2', label: "Март"},
            { value: '3', label: "Апрель"},
            { value: '4', label: "Май"},
            { value: '5', label: "Июнь"},
            { value: '6', label: "Июль"},
            { value: '7', label: "Август"},
            { value: '8', label: "Сентябрь"},
            { value: '9', label: "Октябрь"},
            { value: '10', label: "Ноябрь"},
            { value: '11', label: "Декабрь"}
        ];
        let month = months.find( (el) => el.value == this.props.month );

        let years = [];
        let year = 0;
        for (let i = 0; i < 5; i++) {
            if (this.props.year == d.getFullYear()) {
                year = i;
            }
            years.push(d.getFullYear().toString());
            d.setFullYear(d.getFullYear() - 1);
        }

        return (
            <div className='DetailData'>
                <div className="title">История операций</div>
                <div className="form">
                    <div className="title">За период:</div>
                    <div className="dropdown month">
                        <Dropdown options={months} onChange={this.props.selectMonth} value={month} placeholder="Выберите месяц" />
                    </div>
                    <div className="dropdown year">
                        <Dropdown options={years} onChange={this.props.selectYear} value={years[year]} placeholder="Выберите год" />
                    </div>
                    <input type="submit" className="ss-button detail-input" value="Показать" onClick={this.props.handleSubmit}/>
                </div>
                <div className="detail">
                    <div
                        className={ this.props.detail.charges.list.length > 0 ? "item active" : "item" }
                        onClick={ this.props.detail.charges.list.length > 0 ? this.props.openModalPayment : false }
                    >
                        <div className="title">Начислено</div>
                        <div className="price red">{ this.props.detail.charges.sum }</div>
                        <ModalData
                            isOpen={this.props.isOpenModalPayment}
                            close={this.props.closeModalPayment}
                            content={<PaymentHistoryData list={this.props.detail.charges.list}/>}
                        />
                    </div>

                    <div
                        className={ this.props.detail.payments.list.length > 0 ? "item active" : "item" }
                        onClick={ this.props.detail.payments.list.length > 0 ? this.props.openModalCharges : false }
                    >
                        <div className="title">Оплачено</div>
                        <div className="price">{ this.props.detail.payments.sum }</div>
                        <ModalData
                            isOpen={this.props.isOpenModalCharges}
                            close={this.props.closeModalCharges}
                            content={<PaymentHistoryData list={this.props.detail.payments.list}/>}
                        />
                    </div>

                    <div
                        className={ this.props.detail.costs.list.length > 0 ? "item active" : "item" }
                        onClick={ this.props.detail.costs.list.length > 0 ? this.props.openModalCosts : false }
                    >
                        <div className="title">Расходы</div>
                        <div className="price red">{ this.props.detail.costs.sum }</div>
                        <ModalData
                            isOpen={this.props.isOpenModalCosts}
                            close={this.props.closeModalCosts}
                            content={<PaymentHistoryData list={this.props.detail.costs.list}/>}
                        />
                    </div>

                    <div className="item">
                        <div className="title">Итого</div>
                        <div className={ this.props.detail.balance > 0 ? "price" : "price red" }>{ this.props.detail.balance }</div>
                    </div>
                </div>
            </div>
        );
    }
});

export default DetailData;
