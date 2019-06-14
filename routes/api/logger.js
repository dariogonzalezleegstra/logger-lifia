const mongoose = require('mongoose');
const model = require('../../models/Log');
const rrwebModel = require('../../models/Rrweb');

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

    app.get('/api/logger/rrweb', (req, res, next) => {
        rrwebModel.Rrweb.find({}).then(
            data => {
                console.log('data: ', data);
                res.send(data)
            }
        ).catch(next);
    });

    app.post('/api/logger/rrweb', (req, res, next) => {
        console.log('req.body: ', req.body);
        let logged;

        var query = {id: req.body.id},
            update = {
                id: req.body.id,
                name: req.body.name,
                events: events.concat(req.body.events)
            },
            options = {upsert: true};

        rrwebModel.findOneAndUpdate(query, update, options, (error, result) => {
            if (!error) {
                //If the document doesn't exist
                if (!result) {
                    //Create
                    result = new rrwebModel(req.body);
                    console.log('Nuevo elemento creado');
                } else {
                    //result.events = result.event.concat(req.body.events);
                }


                result.save((error, saved) => {
                    if (error) {
                        throw error;
                    }
                })
            }
        });


        let test = new rrwebModel.Rrweb({
            events: req.body.events,
            id: req.body.id,
            name: req.body.name
        });

        test.save((err, saved) => {
            if (err) console.log(err);
            console.log('saved: ', saved);
            logged = saved;
        }).then(
            () => res.send(logged)
        )
    });
};
