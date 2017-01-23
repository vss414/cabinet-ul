import React from 'react';

import './Slides.less';

const width = 1024;
const time = 3000;

const Slides = React.createClass({

    getInitialState() {
        return {
            left: 0
        }
    },

    carousel() {
        let left = this.state.left-width;
        if (left <= -width*this.props.slides.length) {
            left = 0;
        }

        this.setState({
            left: left
        });

        setTimeout(this.carousel, time);
    },

    componentDidMount() {
        if (this.props.slides.length) {
            setTimeout(this.carousel, time);
        }
    },

    render() {
        const style = {
            width: this.props.slides.length*100 +'%',
            left: this.state.left+'px'
        };

        if (this.props.slides.length) {
            return (
                <div className="slider">
                    <div className="slides" style={style}>
                        {
                            this.props.slides.map((item, i) =>
                                <a href={item.link}><img src={item.path}/></a>
                            )
                        }
                    </div>
                </div>
            );
        } else {
            return <div />;
        }
    }
});

export default Slides;
