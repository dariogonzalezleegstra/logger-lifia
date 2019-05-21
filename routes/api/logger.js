const mongoose = require('mongoose');
const model = require('../../models/Log');
const rrwebModel = require('../models/Rrweb');

module.exports = app => {
    app.post('/api/logger', (req, res, next) => {
        let newLog;
        req.body.events = JSON.parse(req.body.events);
        req.body.answers = mongoose.Types.ObjectId(req.body.answers);
        var log = new model.Log(req.body);
        log.save((err, saved) => {
            if (err) {
                console.log('error: ', err);
            }
            newLog = saved;
        }).then(
            () => res.send(newLog)
        )
    });

    app.post('/api/logger/rrweb', (req, res, next) => {
        console.log('req.body: ', req.body);
        let logged;
        rrwebModel.save((err, saved) => {
            if (err) console.log(err);
            console.log('saved: ', saved);
            logged = saved;
        }).then(
            () => res.send(logged)
        )
    });
};