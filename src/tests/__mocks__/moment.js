// this is not possible: import moment from 'moment';
// we have to grab the ORIGINAL version of moment, not the mocked one
const moment = require.requireActual('moment');

export default (timestamp = 0) => {
    return moment(timestamp);
};

// now are snapshot time is always going to match

