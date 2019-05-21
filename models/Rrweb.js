const mongoose = require('mongoose');
const {Schema} = mongoose;
const ObjectId = Schema.Types.ObjectId;

const model = module.exports;

const rrwebSchema = new Schema ({
    events: {type: Object},
    createdAt: {type: Date, default: Date.now}
}, {collection: 'rrweb', timestamps: true});


model.Rrweb = mongoose.model('rrweb', rrwebSchema);
