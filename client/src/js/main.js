import moment from 'moment';
import { intro } from './envinfo';

require('./../styles/main.less');
export default () => {
    const root = document.getElementById('root');
    const now = moment().format('MMM Do YYYY');
    root.innerHTML = `${intro()}
                    <p>${now}</p>`;
};
