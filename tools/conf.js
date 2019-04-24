const conf = require('rotating-file-stream');
const uuid = require('node-uuid');

module.exports = (morgan, app) =>{

    let accessLogStream = conf('access.log', {
        interval: '1d',
        path: 'log'
    });

    morgan.token('id', (req) => {
        return req.id;
    });

    morgan.token('cookies', (req) =>{
        return JSON.stringify(req.cookies);
    });

    morgan.token('body', (req) =>{
        return JSON.stringify(req.body);
    });

    morgan.token('date', () =>{
        let date = Date(Date.now());
        let dateArray = date.split(' ');
        let result = dateArray[0] + '/' + dateArray[2] + '/' + dateArray[1] + '/' + dateArray[3] + ':' + dateArray[4] + ' ' + dateArray[5];
        return '[' + result + ']';
    });

    morgan.token('plain-date', () => {
        return Date.now();
    });

    const assignId = (req, res, next) => {
        req.id = uuid.v4();
        next();
    };
    app.use(assignId);
    app.use(morgan('dev'));
    app.use(morgan(':id :remote-addr :date[clf] :method ":url" :status :response-time :body :cookies ' +
        ':referrer ":user-agent" :plain-date :remote-user', {stream: accessLogStream}));
};