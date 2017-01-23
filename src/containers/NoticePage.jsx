import React, { PropTypes } from 'react';
import { NoticePage } from '../components';
import { connect } from 'react-redux'

const NoticePageContainer = React.createClass({
    render() {
        return (
            <NoticePage
                notices={this.props.notices}
            />
        );
    }
});

let mapStateToProps = (state) => ({ notices: state.notices.list });

export default connect(mapStateToProps)(NoticePageContainer)
