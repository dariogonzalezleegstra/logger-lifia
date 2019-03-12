const model = require('../../models/Log');

module.exports = app => {
    app.post('/api/logger', (req, res, next) => {
        console.log('request received');
        console.log('req body: ', req.body);
        req.body.events = JSON.parse(req.body.events);
        var log = new model.Log(req.body);
        log.save((err) => {
            console.log('error: ', err);
        }).then(
            () => res.sendStatus(200)
        )
    });
};
