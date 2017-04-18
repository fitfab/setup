import React from 'react';
import { render } from 'react-dom';
import App from './App';

require('./../styles/main.less');

const root = document.getElementById('root');
render(
    <App />,
    root
);
