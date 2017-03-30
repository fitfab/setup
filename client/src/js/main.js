import React from 'react';
import { render } from 'react-dom';
import Characters from './swapi/components/characters.js';


require('./../styles/main.less');
const root = document.getElementById('root');

render(
    <Characters />,
    root
);
