import {GET_CURRENT_DATE} from './moment';

//create simple log
export const cLog = (log = '', color) => {
  const _selectColor = () => {
    switch (color) {
      case 'red':
        return '\x1B[31m';
        break;
      case 'blue':
        return '\x1B[34m';
        break;
      default:
        return '';
        break;
    }
  };
  console.log(`${_selectColor()}${log}`);
};

//callback to avoid re-render
export const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export const generateUID = () => {
  return `ID${getRandomNumber(10000, 99999)}`;
};

export const generateMonthData = () => {
  const currentMonth = GET_CURRENT_DATE('ll');

  const splitMonth = currentMonth.split(',');
  const month = splitMonth[0].substring(0, 3).trim(' ');
  const year = splitMonth[1].trim(' ');

  const result = `${month}-${year}`;

  return result;
};

//split array by monht id
export const splitByMonth = (arr = []) => {
  const result = arr.reduce((res, org) => {
    (res[org.monthId] = res[org.monthId] || []).push(org);
    return res;
  }, {});

  const obj = Object.entries(result);

  let temp = [];

  for (let i = 0; i < obj.length; i++) {
    temp.push({title: obj[i][0], data: obj[i][1]});
  }

  return temp;
};
