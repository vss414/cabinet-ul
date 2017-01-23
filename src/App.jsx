import React from 'react';
import './App.less';

const App = React.createClass({
    render() {
        return (
            <div className="App">
                {this.props.children}
            </div>
        );
    }
});

export default App;
