import React from 'react';
import { render } from 'react-dom';
import Quote from './quote';

require('./../styles/main.less');

const root = document.getElementById('root');
render(
    <Quote />,
    root
);
