import moment from 'moment';

require('./../styles/main.less');
export default ( entry = 'Welcome to WENOMOR2') => {
    const root = document.getElementById('root');
    const now = moment().format('MMM Do YYYY');
    root.innerHTML =    `<p>This is the entry file: <b>${entry}</b></p>
                        <p>${now}</p>` ;
};
