import React from 'react';
import { DetailData } from '../components';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { API_DETAIL } from '../constants/url';
import { fetch, p } from '../functions/fetch';
// import { addPayments } from '../actions/detail';
// import Popup from 'react-popup';


const DetailContainer = React.createClass({
    getInitialState() {
        let d = new Date();
        return {
            detail: {
                'payments': {
                    'sum': 0,
                    'list': []
                },
                'charges': {
                    'sum': 0,
                    'list': []
                },
                'costs': {
                    'sum': 0,
                    'list': []
                },
                'balance': 0
            },
            isOpenModalPayment: false,
            isOpenModalCharges: false,
            isOpenModalCosts: false,
            month: d.getUTCMonth().toString(),
            year: d.getFullYear(),
        }
    },

    getData() {
        // document.body.style.cursor = 'wait';

        fetch(API_DETAIL, (json) => {
            // this.props.addPayments(json);
            this.setState({
                detail: json
            });
            // document.body.style.cursor = 'default';
        }, [
            p('account', this.props.account),
            p('account_id', this.props.accountId),
            p('month', parseInt(this.state.month) + 1),
            p('year', this.state.year)
        ]);
    },

    componentWillMount() {
        // if (!this.props.detail.payments.list.length && !this.props.detail.charges.list.length) {
            this.getData();
        // }
    },

    openModalPayment() {
        this.setState({
            isOpenModalPayment: true
        });
    },
    closeModalPayment() {
        this.setState({
            isOpenModalPayment: false
        });
    },

    openModalCharges() {
        this.setState({
            isOpenModalCharges: true
        });
    },
    closeModalCharges() {
        this.setState({
            isOpenModalCharges: false
        });
    },

    openModalCosts() {
        this.setState({
            isOpenModalCosts: true
        });
    },
    closeModalCosts() {
        this.setState({
            isOpenModalCosts: false
        });
    },

    selectMonth(option) {
        this.setState({
            month: option.value
        });
    },
    selectYear(option) {
        this.setState({
            year: option.value
        });
    },
    handleSubmit() {
        this.getData();
    },

    render() {
        return (
            <DetailData
                detail={this.state.detail}
                isOpenModalPayment={this.state.isOpenModalPayment}
                isOpenModalCharges={this.state.isOpenModalCharges}
                isOpenModalCosts={this.state.isOpenModalCosts}
                month={this.state.month}
                year={this.state.year}
                openModalPayment={this.openModalPayment}
                closeModalPayment={this.closeModalPayment}
                openModalCharges={this.openModalCharges}
                closeModalCharges={this.closeModalCharges}
                openModalCosts={this.openModalCosts}
                closeModalCosts={this.closeModalCosts}
                selectMonth={this.selectMonth}
                selectYear={this.selectYear}
                handleSubmit={this.handleSubmit}
            />
        );
    }
});

let mapStateToProps = (state) => ({
    account: state.session.account.accountNumber,
    accountId: state.session.account.id,
    // detail: state.detail
});
// let mapDispatchToProps = (dispatch) => ({
    // addPayments: bindActionCreators(addPayments, dispatch)
// });

export default connect(mapStateToProps/*, mapDispatchToProps*/)(DetailContainer)
