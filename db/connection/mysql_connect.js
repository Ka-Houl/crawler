const Sequelize = require('sequelize');
const { mysql } = require('./../../config/db_config');

const seq = new Sequelize(...mysql.conf, mysql.base);

// seq.authenticate()
//     .then(() => {
//         console.log('mysql connect ok!!!');
//     })
//     .catch(err => {
//         console.log('err',err);
//     });

module.exports = seq;
