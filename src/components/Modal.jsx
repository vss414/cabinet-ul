import React from 'react';
import './Modal.less';
let Modal = require('react-modal');

const customStyles = {
    // content : {
    //     top             : '50%',
    //     left            : '50%',
    //     right           : 'auto',
    //     bottom          : 'auto',
    //     marginRight     : '-50%',
    //     transform       : 'translate(-50%, -50%)',
    //     width           : '970px',
    //     height          : '550px'
    // }
};

const ModalData = React.createClass({
    // getInitialState() {
    //     return { isOpen: false };
    // },
    //
    // open() {
    //     this.setState({ isOpen: true });
    // },
    //
    // close() {
    //     this.setState({ isOpen: false });
    // },

    render() {
        return (
            <Modal
                className="Modal"
                overlayClassName="overlay"
                isOpen={this.props.isOpen}
                onRequestClose={this.props.close}
                style={customStyles} >
                <div className="close" onClick={this.props.close}>
                    <div className="icon"></div>
                </div>
                {this.props.content}
            </Modal>
        );
    }
});

export default ModalData;
