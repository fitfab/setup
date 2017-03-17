import moment from 'moment';
console.log('mainjs')

const root = document.getElementById('root');
root.innerHTML = moment().format("MMM Do YY");
