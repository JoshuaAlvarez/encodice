import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Search from './Search';

class SearchPage extends Component {
    componentDidMount() {
        const rootElement = document.getElementById('root');
        if (rootElement) {
            ReactDOM.hydrate(<Search />, rootElement);
        }
    }

    render() {
        return <div id="root" />;
    }
}

export default SearchPage;




