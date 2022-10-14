const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.url = process.env.DATABASE;
db.mongoose = mongoose;
module.exports = db;