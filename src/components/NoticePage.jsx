import React from 'react';
import './NoticePage.less';

const Notice = (props, context) => (
    <div className="item">
        <div className="title" dangerouslySetInnerHTML={{__html: props.title}} />
        <div className="description" dangerouslySetInnerHTML={{__html: props.description}} />
    </div>
);

const NoticePage = React.createClass({
    render() {
        return (
            <div className='NoticePage'>
                <div className="title">{ (this.props.notices.length > 0) ? 'Уведомления' : 'Нет уведомлений' }</div>
                <div className="list">
                    {
                        this.props.notices.map((el, i) =>
                            <Notice
                                key = {i}
                                title = {el.title}
                                description = {el.description}
                            />
                        )
                    }
                </div>
            </div>
        );
    }
});

export default NoticePage;
