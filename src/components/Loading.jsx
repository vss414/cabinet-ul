import React from 'react';

import './Loading.less';

const Loading = React.createClass({
    render() {
        const style = {
            margin: this.props.margin ? this.props.margin : '15%'
        };
        return (
            <div className='loading'>
                <div className="helper" />
                <img src="/img/loading.gif"  style={style}/>
            </div>
        );
    }
});

export default Loading;
