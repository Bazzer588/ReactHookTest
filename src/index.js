import 'react-app-polyfill/ie11'; // has to be first
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// test code

if (window.addEventListener) {
    document.addEventListener('mouseleave', (ev) => {
        console.log('mouseleave',ev.buttons);
    });
}

// hot loading

if (module.hot) {
    module.hot.accept('./App', () => {
        console.log('MOD HOT');
        const NextApp = require('./App').default;
        ReactDOM.render(<NextApp />, document.getElementById('root'));
    });
}