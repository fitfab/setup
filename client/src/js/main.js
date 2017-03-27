import { intro } from './envinfo';

require('./../styles/main.less');
export default () => {
    const root = document.getElementById('root');
    root.innerHTML = `${intro()}`;
};
