const monk = require('monk');
const connectionString = process.env.MONGODB_URI || 'mongo:mongopass@csabaszilagyi.fi:27017';
const db = monk(connectionString);
 
module.exports = db;