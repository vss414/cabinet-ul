import React from 'react';

import './PaymentHistoryData.less';

const Item = (props, context) => (
    <div className="item">
        <div className="date" dangerouslySetInnerHTML={{__html: props.date}} />
        <div className="title" dangerouslySetInnerHTML={{__html: props.title}} />
        <div className="value" dangerouslySetInnerHTML={{__html: props.value}} />
    </div>
);

const PaymentHistoryData = React.createClass({
    render() {
        return (
            <div className='PaymentHistoryData'>
                <div className="item header">
                    <div>Дата</div>
                    <div>Операция</div>
                    <div>Сумма</div>
                </div>
                {
                    this.props.list.map((el, i) =>
                        <Item
                            key = {i}
                            title={el.title}
                            date={el.date}
                            value={el.value}
                        />
                    )
                }
            </div>
        );
    }
});

export default PaymentHistoryData;
